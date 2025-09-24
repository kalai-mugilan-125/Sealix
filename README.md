# Sealix: A Verifiable Credentials Platform

## Project Overview

Sealix is a full-stack web application designed to create, issue, verify, and manage verifiable digital credentials. The platform serves three main user roles:

* **Issuers**: Organizations (e.g., universities, companies) that create and issue digital documents.
* **Verifiers**: Entities (e.g., employers, government agencies) that need to securely verify the authenticity of credentials.
* **Users**: Individuals who receive, manage, and share their own credentials.

The project is structured as a full-stack application with a clear separation of a backend API and a frontend client.

## Key Goals

* **Security**: Ensure credentials are tamper-proof and cryptographically secure.
* **Decentralization**: Utilize blockchain technology to provide a single source of truth for verification.
* **Interoperability**: Adhere to standards for verifiable credentials to ensure they can be used across different platforms.
* **Usability**: Provide a clean, intuitive interface for all three user roles to manage their documents and verifications.

## Technology Stack

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: Node.js, Express, TypeScript
* **Database**: PostgreSQL
* **Cryptography**: Libraries for hashing and digital signatures

---

## Main Project Directories & File Functionality

### Backend

The backend is a RESTful API built with Node.js and TypeScript. It is responsible for handling all business logic, data storage, and communication with the blockchain.

* **server.ts**: The main entry point of the backend application. It initializes the Express server, connects to the database, and sets up routes and middleware.
* **controllers/**: Contains the logic for handling incoming HTTP requests. Each controller corresponds to a specific resource (e.g., `auth.controller.ts` for user authentication).
* **routes/**: Defines the API endpoints. Each file maps a URL path to its corresponding controller function.
* **models/**: Defines the data models for the database using a library like TypeORM or Sequelize. This includes `User.ts`, `Document.ts`, and `Verification.ts`.
* **services/**: Encapsulates the core business logic. Services are called by controllers to perform tasks such as creating a user, issuing a document, or verifying a credential.
* **database/**: Manages the database connection and schema migrations.

### Frontend

The frontend is a single-page application built with Next.js. It provides the user interface for interacting with the backend API.

* **src/app/**: Uses Next.js's App Router to define the main pages of the application.

  * **issuer/**: Pages and components for the Issuer dashboard (e.g., issuing new documents, managing existing ones).
  * **verifier/**: Pages and components for the Verifier dashboard (e.g., verifying documents, viewing verification history).
  * **auth/**: Pages for user authentication, including login and registration.
* **src/components/**: Reusable React components used throughout the application, such as `Navbar.tsx`, `Sidebar.tsx`, and various UI elements.
* **src/lib/api.ts**: Manages all API calls to the backend. Uses Axios to make requests and handles authentication headers and error responses. Can also contain mock data for frontend development.
* **src/context/AuthContext.tsx**: A React Context that manages global authentication state (e.g., logged-in status, user role).

---

## How to Run the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kalai-mugilan-125/Sealix
   cd Sealix
   ```

2. **Install dependencies for both projects:**

   ```bash
   npm run install:all
   ```

3. **Configure environment variables:**

   * Create a `.env` file in the `backend/` directory and configure your database connection.
   * Create a `.env.local` file in the `frontend/` directory and set:

     ```bash
     NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
     ```

4. **Run the full-stack application:**

   ```bash
   npm run start
   ```

   This will start the backend server on `localhost:5000` and the frontend server on `localhost:3000`.

---

## API Documentation

API documentation will be generated once API endpoints are finalized.

---

## Support

For any questions or issues, please refer to the project's issues tracker.
