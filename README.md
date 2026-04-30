# Team Task Manager – Full‑Stack Web App

A full‑stack task management application where admins can create projects, assign tasks, and track progress, while members can update task statuses. Built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Railway (backend) and Vercel (frontend).

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://task-manager-4sxn.vercel.app](https://task-manager-4sxn.vercel.app)
- **Backend API (Railway):** [https://taskmanager-production-ab3f.up.railway.app](https://taskmanager-production-ab3f.up.railway.app)

---

## 📌 Features

- **Authentication** – Signup / Login with JWT
- **Role‑Based Access** – Admin vs Member
- **Project Management** – Create, view, and add members to projects
- **Task Management** – Create, assign, update status (Todo / In Progress / Done)
- **Dashboard** – Overview of tasks (for members) and projects (for admins)
- **Responsive UI** – Tailwind CSS, dark theme
- **Real‑Time Updates** – State managed with Redux Toolkit

---

## 🛠️ Tech Stack

### Frontend
- React (with Hooks)
- Redux Toolkit (state management)
- React Router DOM
- Axios
- Tailwind CSS
- Vercel (deployment)

### Backend
- Node.js + Express
- MongoDB Atlas (NoSQL)
- Mongoose ODM
- JWT Authentication
- bcryptjs
- Railway (deployment)

---

## 📁 Folder Structure
```text
TaskManager/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, Login, Signup, etc.
│   │   ├── store/         # Redux Toolkit slices
│   │   └── App.js
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth guards (JWT)
│   └── server.js          # Entry point
└── README.md
