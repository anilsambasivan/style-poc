# Style Scribe API

This is the backend API for the Style Scribe Templates application, which enables document template extraction, storage, and verification.

## Technologies Used

- ASP.NET Core 9.0
- C#
- Aspose.Words for document processing
- Entity Framework Core with PostgreSQL
- RESTful API architecture

## Features

- Extract styles from DOCX documents
- Store template information in PostgreSQL database
- Verify documents against saved templates
- Manage templates (create, view, delete)

## Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- PostgreSQL database server
- Aspose.Words license (trial version is used by default)

### Setup

1. Clone the repository
2. Configure your PostgreSQL connection string in `appsettings.json`
3. Run the database migrations:
   ```
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
4. Run the application:
   ```
   dotnet run
   ```

## API Endpoints

### Templates

- `GET /api/templates` - Get all templates
- `GET /api/templates/{id}` - Get a specific template with styles
- `POST /api/templates/upload` - Upload a DOCX file to extract styles
- `POST /api/templates/save` - Save a template with styles
- `DELETE /api/templates/{id}` - Delete a template

### Verification

- `POST /api/verification?templateId={id}` - Verify a document against a template

## Project Structure

- `Controllers/` - API endpoints
- `Models/` - Data models
- `Services/` - Business logic
- `Data/` - Database context and configuration

## License

This project uses Aspose.Words, which requires a license for production use. The current implementation uses the evaluation version. 