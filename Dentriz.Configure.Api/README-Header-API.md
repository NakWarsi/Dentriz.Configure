# Header Configuration API

This API provides endpoints to manage header configuration data stored in Azure Cosmos DB.

## Setup Instructions

### 1. Azure Cosmos DB Setup

1. Create an Azure Cosmos DB account
2. Create a database named `DentrizConfigure`
3. Create a container named `Configurations` with partition key `/partitionKey`
4. Update the connection string in `appsettings.json` or `appsettings.Development.json`

### 2. Configuration

Update the following in your configuration files:

```json
{
  "ConnectionStrings": {
    "CosmosDB": "AccountEndpoint=https://your-cosmosdb-account.documents.azure.com:443/;AccountKey=your-cosmosdb-key;"
  },
  "CosmosDB": {
    "DatabaseName": "DentrizConfigure",
    "ContainerName": "Configurations"
  }
}
```

### 3. Local Development with Cosmos DB Emulator

For local development, you can use the Cosmos DB Emulator:

1. Install Azure Cosmos DB Emulator
2. Start the emulator
3. Use the connection string in `appsettings.Development.json`:
   ```
   AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==
   ```

## API Endpoints

### GET /api/header
Get the current header configuration.

**Response:**
```json
{
  "id": "header-config",
  "partitionKey": "header",
  "logoAlt": "DentRiz Dental Clinic Logo",
  "logoImage": "/images/clinic/logo.png",
  "clinicName": "DentRiz Dental Clinic",
  "tagline": "Multi Speciality Dental Clinic & Implant Center",
  "navItems": [
    {
      "label": "Home",
      "route": "/",
      "exact": true
    }
  ],
  "backgroundColor": "#ffffff",
  "textColor": "#1e3c72",
  "lastUpdated": "2024-01-01T00:00:00Z",
  "version": "1.0"
}
```

### POST /api/header
Create or update the header configuration.

**Request Body:**
```json
{
  "clinicName": "Updated Clinic Name",
  "tagline": "Updated Tagline",
  "backgroundColor": "#f0f0f0",
  "navItems": [
    {
      "label": "Home",
      "route": "/",
      "exact": true
    },
    {
      "label": "Services",
      "route": "/services",
      "exact": false
    }
  ]
}
```

### PUT /api/header
Update specific fields of the header configuration.

**Request Body:** Same as POST, but only updates provided fields.

### DELETE /api/header
Delete the header configuration.

### POST /api/header/reset
Reset the header configuration to default values.

### PUT /api/header/nav-items
Update only the navigation items.

**Request Body:**
```json
[
  {
    "label": "Home",
    "route": "/",
    "exact": true
  },
  {
    "label": "About",
    "route": "/about",
    "exact": false
  }
]
```

## Data Model

### HeaderConfig
- `id`: Unique identifier (always "header-config")
- `partitionKey`: Partition key (always "header")
- `logoAlt`: Alt text for the logo
- `logoImage`: Path to the logo image
- `clinicName`: Name of the clinic
- `tagline`: Clinic tagline
- `navItems`: Array of navigation items
- `backgroundColor`: Background color
- `textColor`: Text color
- `logoTextColor`: Logo text color
- `taglineColor`: Tagline color
- `navLinkColor`: Navigation link color
- `navLinkHoverColor`: Navigation link hover color
- `navLinkActiveColor`: Active navigation link color
- `mobileMenuBgColor`: Mobile menu background color
- `mobileMenuTextColor`: Mobile menu text color
- `clinicNameFontFamily`: Font family for clinic name
- `taglineFontFamily`: Font family for tagline
- `navLinkFontFamily`: Font family for navigation links
- `lastUpdated`: Timestamp of last update
- `version`: Configuration version

### NavItem
- `label`: Display text for the navigation item
- `route`: Route path
- `exact`: Whether the route should match exactly

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK`: Success
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include a message field:
```json
{
  "message": "Error description"
}
```

## CORS

The API is configured to allow CORS requests from any origin for development purposes. In production, you should configure specific origins.

## Testing

You can test the API using:
1. Swagger UI (available at `/swagger` in development)
2. Postman or similar tools
3. curl commands

Example curl command:
```bash
curl -X GET "https://localhost:5001/api/header" \
  -H "accept: application/json"
```
