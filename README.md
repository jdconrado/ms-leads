# Leads Service

## Overview

The Leads Service is a backend service built with NestJS to manage leads. It uses various technologies and libraries to provide a robust and scalable solution for handling lead data.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Automapper**: A convention-based object-object mapper in .NET.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **MongoDB**: A NoSQL database for storing lead data.
- **Jest**: A delightful JavaScript testing framework.
- **Swagger**: A tool for API documentation.
- **Class-validator**: A library for validation of object properties.

## Project Structure

```
src/
├── api/
│   ├── commons/
│   │   ├── dtos/
│   │   └── utils/
│   ├── leads/
│   │   ├── cqrs/
│   │   │   ├── commands/
│   │   │   └── queries/
│   │   ├── dtos/
│   │   │   └── requests/
│   │   ├── profiles/
│   │   └── lead.controller.ts
├── domain/
│   ├── enums/
│   ├── models/
│   └── primitives/
├── main.ts
├── app.module.ts
test/
├── jest-e2e.json
├── app.e2e-spec.ts
```

## Features

### Entities and Models

- **Lead**: Represents a lead with properties like first name, last name, contact information, etc.
- **ContactInfo**: Represents contact information for a lead.
- **LeadFilter**: Used for filtering leads during search operations.
- **OffsetPagination**: Used for pagination in search results.

### DTOs (Data Transfer Objects)

- **LeadDto**: Data transfer object for Lead.
- **CreateLeadDto**: DTO for creating a new lead.
- **PatchLeadDto**: DTO for updating an existing lead.
- **SearchLeadRequestDto**: DTO for searching leads.
- **ContactInfoDto**: DTO for contact information.

### ORM Usage

- **TypeORM**: Used for interacting with the MongoDB database. It provides a repository pattern for managing entities.

### Automapper Profiles

- **LeadProfile**: Defines mappings between DTOs and models using Automapper.

### Controllers

- **LeadController**: Handles HTTP requests related to leads, such as creating, updating, deleting, and searching leads.

### Type Exports for Frontend Integration

The service exports various types and DTOs to facilitate easier integration with frontend applications. These types ensure that the frontend and backend are in sync regarding the data structures being used.

- **LeadDto**: Used on the frontend to represent lead data.
- **CreateLeadDto**: Used on the frontend to create new leads.
- **PatchLeadDto**: Used on the frontend to update existing leads.
- **SearchLeadRequestDto**: Used on the frontend to search for leads.
- **ContactInfoDto**: Used on the frontend to represent contact information.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/msvox-leads.git
   ```
2. Install dependencies:
   ```bash
   cd msvox-leads
   npm install
   ```

### Running the Application

- Development mode:
  ```bash
  npm run start:dev
  ```
- Production mode:
  ```bash
  npm run start:prod
  ```

### Running Tests

- Unit tests:
  ```bash
  npm run test
  ```
- End-to-end tests:
  ```bash
  npm run test:e2e
  ```

### API Documentation

The API documentation is available at `/api` when the application is running. It is generated using Swagger.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
