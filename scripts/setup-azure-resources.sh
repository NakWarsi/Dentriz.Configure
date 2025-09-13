#!/bin/bash

# Bash script to set up Azure resources for API deployment
# Run this script in Azure Cloud Shell or with Azure CLI installed

set -e

# Default values
LOCATION="East US"
APP_SERVICE_PLAN_NAME=""
SERVICE_PRINCIPAL_NAME="github-actions-dentriz"

# Function to display usage
usage() {
    echo "Usage: $0 -g <resource-group> -a <app-service-name> [-l <location>] [-p <app-service-plan>] [-s <service-principal-name>]"
    echo ""
    echo "Required parameters:"
    echo "  -g, --resource-group    Azure resource group name"
    echo "  -a, --app-service       Azure App Service name"
    echo ""
    echo "Optional parameters:"
    echo "  -l, --location          Azure location (default: East US)"
    echo "  -p, --app-service-plan  App Service plan name (default: <app-service-name>-plan)"
    echo "  -s, --service-principal Service principal name (default: github-actions-dentriz)"
    echo "  -h, --help              Show this help message"
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -g|--resource-group)
            RESOURCE_GROUP_NAME="$2"
            shift 2
            ;;
        -a|--app-service)
            APP_SERVICE_NAME="$2"
            shift 2
            ;;
        -l|--location)
            LOCATION="$2"
            shift 2
            ;;
        -p|--app-service-plan)
            APP_SERVICE_PLAN_NAME="$2"
            shift 2
            ;;
        -s|--service-principal)
            SERVICE_PRINCIPAL_NAME="$2"
            shift 2
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "Unknown option $1"
            usage
            ;;
    esac
done

# Validate required parameters
if [[ -z "$RESOURCE_GROUP_NAME" || -z "$APP_SERVICE_NAME" ]]; then
    echo "❌ Error: Resource group name and App Service name are required"
    usage
fi

# Set default App Service plan name if not provided
if [[ -z "$APP_SERVICE_PLAN_NAME" ]]; then
    APP_SERVICE_PLAN_NAME="${APP_SERVICE_NAME}-plan"
fi

echo "🚀 Setting up Azure resources for Dentriz.Configure.Api deployment..."

# Check if user is logged in to Azure
CONTEXT=$(az account show --query "user.name" -o tsv 2>/dev/null || echo "")
if [[ -z "$CONTEXT" ]]; then
    echo "❌ Not logged in to Azure. Please run 'az login' first."
    exit 1
fi

echo "✅ Logged in as: $CONTEXT"

# Get subscription ID
SUBSCRIPTION_ID=$(az account show --query "id" -o tsv)
echo "📋 Using subscription: $SUBSCRIPTION_ID"

# Create resource group
echo "📦 Creating resource group: $RESOURCE_GROUP_NAME"
az group create --name "$RESOURCE_GROUP_NAME" --location "$LOCATION" --output none

# Create App Service plan
echo "📋 Creating App Service plan: $APP_SERVICE_PLAN_NAME"
az appservice plan create --name "$APP_SERVICE_PLAN_NAME" --resource-group "$RESOURCE_GROUP_NAME" --sku "B1" --is-linux --output none

# Create App Service
echo "🌐 Creating App Service: $APP_SERVICE_NAME"
az webapp create --resource-group "$RESOURCE_GROUP_NAME" --plan "$APP_SERVICE_PLAN_NAME" --name "$APP_SERVICE_NAME" --runtime "DOTNET|8.0" --output none

# Configure App Service settings
echo "⚙️ Configuring App Service settings..."
az webapp config appsettings set --resource-group "$RESOURCE_GROUP_NAME" --name "$APP_SERVICE_NAME" --settings "ASPNETCORE_ENVIRONMENT=Production" --output none

# Create service principal for GitHub Actions
echo "🔐 Creating service principal for GitHub Actions..."
SP_OUTPUT=$(az ad sp create-for-rbac --name "$SERVICE_PRINCIPAL_NAME" --role contributor --scopes "/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP_NAME" --sdk-auth --output json)

# Get publish profile
echo "📄 Getting publish profile..."
PUBLISH_PROFILE=$(az webapp deployment list-publishing-profiles --resource-group "$RESOURCE_GROUP_NAME" --name "$APP_SERVICE_NAME" --xml --output tsv)

echo "✅ Azure resources created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add the following secrets to your GitHub repository:"
echo "   - AZURE_CREDENTIALS: $SP_OUTPUT"
echo "   - AZURE_WEBAPP_PUBLISH_PROFILE: [XML content from publish profile]"
echo "   - AZURE_RESOURCE_GROUP: $RESOURCE_GROUP_NAME"
echo ""
echo "2. Update the workflow files with your App Service name: $APP_SERVICE_NAME"
echo ""
echo "3. Create and push a tag to deploy:"
echo "   git tag api-v1.0.0"
echo "   git push origin api-v1.0.0"
echo ""
echo "🌐 Your API will be available at: https://$APP_SERVICE_NAME.azurewebsites.net"
echo "📚 Swagger UI will be available at: https://$APP_SERVICE_NAME.azurewebsites.net/swagger"

# Save publish profile to file
echo "$PUBLISH_PROFILE" > publish-profile.xml
echo ""
echo "💾 Publish profile saved to: publish-profile.xml"
echo "   Copy the content of this file to the AZURE_WEBAPP_PUBLISH_PROFILE secret"
