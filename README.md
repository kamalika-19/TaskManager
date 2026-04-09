# Task Manager Application

## Overview

This is a simple full-stack Task Manager application built to demonstrate core frontend and backend development skills. The application allows users to create, view, update, and delete tasks through a RESTful API.

---

## Features

### Core Functionality

* Create a new task
* View all tasks
* Mark a task as completed
* Delete a task

### Additional Functionality

* Edit an existing task title
* Filter tasks by status (all, active, completed)
* Persistent storage using a JSON file

---

## Tech Stack

### Frontend

* React (functional components and hooks)
* CSS for styling

### Backend

* Node.js
* Express.js

### Storage

* File-based storage using JSON and Node.js fs module

---

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── tasks.js
│   │   ├── store.js
│   │   ├── tasks.json
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── .gitignore
```

---

## API Endpoints

| Method | Endpoint   | Description                 |
| ------ | ---------- | --------------------------- |
| GET    | /tasks     | Retrieve all tasks          |
| POST   | /tasks     | Create a new task           |
| PATCH  | /tasks/:id | Update task title or status |
| DELETE | /tasks/:id | Delete a task               |

---

## Setup Instructions

### 1. Clone the repository

```
git clone <repository-url>
cd <repository-folder>
```

### 2. Run the backend

```
cd backend
npm install
npm start
```

Backend runs on http://localhost:3001

### 3. Run the frontend

Open a new terminal:

```
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

---

## Data Persistence

Tasks are stored in a local JSON file:

```
backend/src/tasks.json
```

Data persists across server restarts.

---

## Assumptions and Trade-offs

* File-based storage is used instead of a database for simplicity and quick setup.
* The application is designed for single-user usage and does not handle concurrent writes.
* UI is kept minimal to prioritize functionality and code structure.

---

## Future Improvements

* Integrate a database (MongoDB or PostgreSQL)
* Improve UI/UX design
* Add authentication and user management
* Implement automated tests
* Deploy the application

---

## Summary

This project demonstrates:

* Full-stack development using React and Node.js
* REST API design and integration
* State management with React hooks
* Basic validation and error handling
* Persistent storage without a database
