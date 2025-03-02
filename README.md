# Task Management Application

This is a full-stack Task Management application built with React, TypeScript, Node.js, and PostgreSQL. The application allows users to register, log in, and manage their tasks (create, update, delete, and mark as complete).

---

## Demo Recording

[Watch the demo](https://uic.zoom.us/rec/share/v346_DxGSiuPdzXsQ9yXcKL5LVIIMOTIHmx8H7hOPtJ60cNg9xWbZ1PA-VlLFwdF.mmAct0XmHZikrFT4?startTime=1740284176000)

## Features

- User registration and login with JWT authentication.
- Create, update, delete, and view tasks.
- Mark tasks as complete.
- Protected routes for authenticated users.

## Technologies Used

- **Frontend**:

  - React
  - TypeScript
  - Material-UI
  - React Router

- **Backend**:

  - Node.js
  - Express
  - Sequelize
  - JWT
  - bcrypt

- **Database**: PostgreSQL

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (v6 or higher)

Make sure PostgreSQL is running and accessible on your local machine. On Windows, you can manage PostgreSQL via services or pgAdmin.

# Project Setup

## Backend

Navigate to the `backend` folder and install dependencies:

```sh
cd backend
npm install
```

Before starting the server, create a `.env` file in the `backend` folder with the following content:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=krishna
JWT_SECRET=testme
```

Then start the development server:

```sh
npm run dev
```

## Frontend

Navigate to the `frontend` folder and install dependencies:

```sh
cd frontend
npm install
```

Then start the development server:

```sh
npm run dev
```

## Salary Expectations

```
$20/hour × 40 hours/week × 4 weeks/month = $3,200 per month
```
