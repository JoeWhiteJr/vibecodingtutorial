# Project Manager

A full-stack project management application built with Docker.

## Tech Stack

- **Database:** PostgreSQL 15
- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Containerization:** Docker Compose

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:JoeWhiteJr/vibecodingtutorial.git
   cd vibecodingtutorial
   ```

2. Start the application:
   ```bash
   docker compose up --build
   ```

3. Open the app:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure

```
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── db.js
│       └── routes/projects.js
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── components/ProjectList.jsx
└── db/
    └── init.sql
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/:id/tasks` | Get tasks for a project |
| POST | `/api/projects/:id/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update task status |

## Usage

1. Create a new project using the input form
2. Click "Show Tasks" to expand a project
3. Add tasks to a project
4. Update task status using the dropdown (Pending, In Progress, Completed)

## Commands

```bash
# Start containers
docker compose up -d

# Stop containers
docker compose down

# View logs
docker compose logs -f

# Rebuild after changes
docker compose up --build
```
