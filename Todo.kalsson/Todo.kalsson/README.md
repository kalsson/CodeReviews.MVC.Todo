# Todo List Manager

Manage your todos efficiently with this single-page application (SPA) built using JavaScript, Entity Framework Core, and ASP.NET MVC in .NET 8. This project is designed to handle CRUD operations (Create, Read, Update, Delete) for managing a todo list.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

---

## Overview

This project is a fully functional **todo list manager** implemented as an MVC application with SPA functionality. It uses a **frontend JavaScript-based SPA** to dynamically update the todo list without refreshing the page. The backend consists of an **ASP.NET MVC** architecture (Controllers, Views, Models) with **Entity Framework Core** for database management.

---

## Features

- **Single Page Application (SPA)**: No page redirection, and the front-end dynamically updates.
- **Manage Todos**: Includes Add, Edit, and Delete functionality.
- **Confirmation Modals** for Delete and Update operations.
- **Mark Todos as Complete/Incomplete**: Easily toggle completion status.
- **Real-time Updates**: Todos list refreshes automatically after every operation.
- **Robust Feedback**: Confirmation messages for pending and successful updates.
- **Database Support**: Built entirely on **SQL Server** via **Entity Framework Core**.

---

## Technologies Used

### Frontend:
- **HTML/CSS/Bootstrap** (for responsive styling and layout).
- **JavaScript (ES6)**:
    - SPA functionality using the `fetch()` API for synchronous calls.

### Backend:
- **ASP.NET MVC Framework**:
    - MVC Architecture (Controllers, Views, Models).
- **C# .NET 8** for server-side logic.
- **Entity Framework Core** for ORM and migrations.

### Database:
- **SQL Server**.

---

## Prerequisites

Make sure to install the following tools:

### Required Tools
1. **.NET 8 SDK** (latest version to run the backend).  
   [Download here](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
2. **SQL Server** (for database support).

---

## Setup and Installation

### Step 1: Clone the repository
Clone this repository to your local machine.

---

### Step 2: Configure the Database
1. Open the `appsettings.json` file in the project.
2. Update the `ConnectionStrings` section with your database connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Your_SQL_Server_Connection_String_Here"
}
```

3. Run the Entity Framework migrations to create the required database and table:

```bash
dotnet ef database update
```

---

### Step 3: Run the Application
1. Start the ASP.NET MVC Application:

```bash
dotnet run
```

2. Open your browser and navigate to `http://localhost:5000` (or the specified port).

---

## API Endpoints

Here’s a summary of the API endpoints exposed by the `TodoController`:

| **HTTP Method** | **Endpoint**       | **Description**                   |
|------------------|--------------------|-----------------------------------|
| **GET**         | `/Todo`           | Fetch all todos.                 |
| **POST**        | `/Todo`           | Create a new todo.               |
| **PUT**         | `/Todo/{id}`      | Update an existing todo.         |
| **DELETE**      | `/Todo/{id}`      | Delete a specific todo.          |

Payload examples:
- **POST** (`/Todo`):
  ```json
  { "name": "New Task", "isComplete": false }
  ```

- **PUT** (`/Todo/1`):
  ```json
  { "id": 1, "name": "Updated Task Name", "isComplete": true }
  ```

---

## Usage

Once the application is running, you can use the following features:

1. Add a new task by filling out the input form and clicking "Add".
2. Mark tasks as complete or incomplete by checking/unchecking the checkbox.
3. Edit tasks by clicking the **Edit** button, modifying the task, and saving changes.
4. Delete tasks by clicking the **Delete** button and confirming the action.

All operations will update the todo list in real-time without page reloads.

---
