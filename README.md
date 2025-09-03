# ChatBuddy - Real-time Chat Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg) ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-yellow.svg) ![Prisma](https://img.shields.io/badge/Prisma-5.x-purple.svg)

This repository contains the backend server for **ChatBuddy**, a modern real-time chat application. It's built with Node.js, Express, and Socket.IO, following a scalable, layered architecture for maintainability.

---

## Features ✨

* **Real-time Messaging:** Bidirectional communication using WebSockets (Socket.IO).
* **Layered Architecture:** Follows a clean MVC-like pattern (Routes → Controllers → Services → Repositories) for a clear separation of concerns.
* **Type-Safe Database ORM:** Uses **Prisma** for robust, type-safe interactions with a PostgreSQL database.
* **Data Validation:** Employs **Zod** for schema validation on incoming request data (DTOs).
* **REST API:** Provides RESTful endpoints for fetching initial application state (e.g., chat lists).

---

## Architecture Overview

The backend is structured in a decoupled, layered architecture to make it scalable and easy to test.

* **Routes:** Define the API endpoints and connect them to controller methods.
* **Controllers:** Handle the HTTP request/response cycle, parse incoming data, and perform validation.
* **Services:** Contain the core business logic of the application.
* **Repositories:** The only layer that interacts directly with the database, abstracting all data access logic.

---

## Getting Started

### ### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A PostgreSQL database (e.g., via [Supabase](https://supabase.com/))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd echosphere-server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    Then, add your database connection string to the `.env` file.
    ```env
    # .env
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```

4.  **Run database migrations:**
    Apply the schema to your database using Prisma.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:4000`.

---

## API Endpoints & WebSocket Events

### REST API

All REST endpoints are prefixed with `/api/v1`.

| Method | Endpoint        | Description                   |
| :----- | :-------------- | :---------------------------- |
| `GET`  | `/chats`        | Fetches a list of all chats.  |
| `POST` | `/chats`        | Creates a new chat.           |

### WebSocket Events

The server listens for and emits the following events:

* **Receiving Event:** `sendMessage`
    * **Payload:** `{ author: string, message: string }`
    * **Description:** A client sends this event to the server to broadcast a new message.

* **Emitting Event:** `receiveMessage`
    * **Payload:** `{ author: string, message: string }`
    * **Description:** The server broadcasts this event to all connected clients when a new message is sent.
