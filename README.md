# 🎓 Students API — NestJS + PostgreSQL

REST API backend for the Students Table app.

---

## 📁 Project Structure

```
students-api/
├── src/
│   ├── students/
│   │   ├── student.entity.ts       ← PostgreSQL table definition
│   │   ├── students.controller.ts  ← API route handlers
│   │   ├── students.service.ts     ← Business logic & DB queries
│   │   ├── students.module.ts      ← Students feature module
│   │   ├── create-student.dto.ts   ← Validation for POST
│   │   └── update-student.dto.ts   ← Validation for PATCH
│   ├── app.module.ts               ← Root module + DB config
│   └── main.ts                     ← App entry point + CORS
├── .env                            ← Your DB credentials (edit this!)
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## 🚀 Setup Instructions

### Step 1 — Create the PostgreSQL Database

Open **pgAdmin** or **psql** and run:

```sql
CREATE DATABASE students_db;
```

### Step 2 — Configure .env

Open `.env` and update with your PostgreSQL password:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_actual_password   ← CHANGE THIS
DB_NAME=students_db
PORT=3001
```

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Start the backend

```bash
npm run start:dev
```

You should see:
```
🚀 Students API running at http://localhost:3001
📋 Endpoints:
   GET    http://localhost:3001/students
   POST   http://localhost:3001/students
   PATCH  http://localhost:3001/students/:id
   DELETE http://localhost:3001/students/:id
```

> The `students` table is **auto-created** in PostgreSQL on first run (synchronize: true).

---

## 🔌 Connect React Frontend

Replace `src/hooks/useStudents.js` in your React project with the
`useStudents.js` file provided in this folder.

Then run both together:
- **Backend**: `npm run start:dev` (port 3001)
- **Frontend**: `npm start` (port 3000)

---

## 📡 API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/students` | — | Get all students |
| GET | `/students/:id` | — | Get one student |
| POST | `/students` | `{name, email, age}` | Add student |
| PATCH | `/students/:id` | `{name?, email?, age?}` | Update student |
| DELETE | `/students/:id` | — | Delete student |

### Example POST request:
```json
{
  "name": "Aria Chen",
  "email": "aria@university.edu",
  "age": 21
}
```

### Example Response:
```json
{
  "id": 1,
  "name": "Aria Chen",
  "email": "aria@university.edu",
  "age": 21,
  "createdAt": "2026-03-09T10:00:00.000Z",
  "updatedAt": "2026-03-09T10:00:00.000Z"
}
```

---

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| name | Required, min 2 characters |
| email | Required, valid email format, unique |
| age | Required, number between 1–120 |

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| NestJS | Backend framework |
| TypeORM | Database ORM |
| PostgreSQL | Database |
| class-validator | Request validation |
| @nestjs/config | .env management |
