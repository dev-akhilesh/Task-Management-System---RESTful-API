
# Task Management System API

Welcome to the Task Management System API. This API allows users to manage tasks with CRUD (Create, Read, Update, Delete) operations. Users can sign up, log in, and manage their tasks.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Task Routes](#task-routes)


## Features
- User authentication (signup, login, logout)
- Task management (create, read, update, delete tasks)
- JWT-based authentication and authorization
- MongoDB database integration with Mongoose


## Prerequisites
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dev-akhilesh/Task-Management-System---RESTful-API.git
    <!-- cd task-management-system -->
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the required environment variables (see [Environment Variables](#environment-variables) section).

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_jwt_secret
```

## Usage
-  Start the server:

```bash
npm start
```
- The API will be available at http://localhost:3000.


## API Documentation
The API documentation (Swagger) can be accessed at http://localhost:3000/api-docs.


## Routes

1) #### User Signup:

- Endpoint: `POST /users/signup`
- Body:
```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "mypassword"
}
```
2) User Login:

- Endpoint: `POST /users/login`
- Body:
```json
{
  "email": "john.doe@example.com",
  "password": "mypassword"
}
```
3) User Logout:

- Endpoint: `GET /users/logout`
- Headers: Authorization: Bearer <your_token_here>

#### Task Endpoints

1) Create a Task:

- Endpoint: `POST /tasks`
- Headers: Authorization: Bearer <your_token_here>
- Body:
```json
{
  "title": "New Task",
  "description": "Details of the task",
  "due_date": "2024-06-30"
}
```
2) Get All Tasks:

- Endpoint: `GET /tasks`
- Headers: Authorization: Bearer <your_token_here>

3) Get Task by ID: 
- Endpoint: `GET /tasks/{id}`
- Headers: Authorization: Bearer <your_token_here>
- Parameters:
 - - `id`: The ID of the task you want to retrieve.

4) Update Task by ID: 
- Endpoint: `PATCH /tasks/{id}`
- Headers: Authorization: Bearer <your_token_here>
- Parameters:
- - `id`: The ID of the task you want to update.
- Body:
```json
{
  "title": "Updated Task Title",
  "description": "Updated details of the task",
  "due_date": "2024-07-01",
  "priority": "high",
  "status": "in progress"
}
```
5) Delete Task by ID:
- Endpoint: `DELETE /tasks/{id}`
- Headers: Authorization: Bearer <your_token_here>
- Parameters:
- - `id`: The ID of the task you want to delete.


## Testing the API
You can test the API endpoints using tools like Postman or through the Swagger UI. The Swagger UI provides a web-based interface where you can interact with the API endpoints directly.

### Running Tests Locally
To run the automated tests for the API, use the following command:

```bash
npm test
```
This command will execute the tests defined in your project and report any issues. Make sure to have your development environment properly set up before running tests.
