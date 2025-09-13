#!/bin/bash

# Bash script to create and push API deployment tags

set -e

# Function to display usage
usage() {
    echo "Usage: $0 <version> [message]"
    echo ""
    echo "Parameters:"
    echo "  version    Version number (e.g., 1.0.0, 1.2.3, 2.0.0-beta)"
    echo "  message    Optional commit message (default: 'Deploy API version <version>')"
    echo ""
    echo "Examples:"
    echo "  $0 1.0.0"
    echo "  $0 1.2.3 \"Fix critical bug in authentication\""
    echo "  $0 2.0.0-beta \"Deploy beta version with new features\""
    exit 1
}

# Check if version is provided
if [[ $# -lt 1 ]]; then
    echo "❌ Error: Version number is required"
    usage
fi

VERSION="$1"
MESSAGE="${2:-Deploy API version $VERSION}"
TAG_NAME="api-v$VERSION"

echo "🚀 Creating deployment tag: $TAG_NAME"

# Check if tag already exists
if git tag -l | grep -q "^$TAG_NAME$"; then
    echo "❌ Tag $TAG_NAME already exists!"
    echo "Use a different version number or delete the existing tag first."
    exit 1
fi

# Create and push tag
echo "📝 Creating tag: $TAG_NAME"
git tag -a "$TAG_NAME" -m "$MESSAGE"

echo "📤 Pushing tag to remote..."
git push origin "$TAG_NAME"

echo "✅ Tag $TAG_NAME created and pushed successfully!"
echo "🔄 GitHub Actions will now deploy your API to Azure..."
echo ""
echo "📊 Monitor the deployment at:"
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')
echo "   https://github.com/$REPO_NAME/actions"
