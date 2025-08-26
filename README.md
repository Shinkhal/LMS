# Lead Manager CRM (Assignment)

A full-stack **Lead Management CRM** application built with **React (frontend)** and **Node.js/Express (backend)**.  
It allows users to **create, view, edit, delete, filter, and manage leads** with authentication and role-based access.  

---

## 📂 Project Structure
```

project-root/
│── backend/      # Node.js + Express + MongoDB
│── frontend/     # React + Tailwind + shadcn + TanStack Table
│── README.md     # Documentation

````

---

## ⚙️ Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, TanStack Table, Axios, React-Toastify  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication  
- **Other:** REST APIs, Pagination, Filtering, Toast Notifications  

---

## 🚀 Features
- 🔐 **Authentication** – Secure login/signup with JWT  
- ➕ **CRUD for Leads** – Add, edit, delete, and view lead details  
- 🔎 **Filters & Search** – Filter by status, city, email  
- 📊 **Lead Scoring** – Visual score indicator  
- 📑 **Pagination** – Frontend + backend integrated pagination  
- ⚡ **Toast Notifications** – Success & error handling  
- 🛡 **Validations** – Both frontend & backend validations  

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repo
```bash
git clone https://github.com/Shinkhal/LMS.git
cd LMS
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

* Run backend:

```bash
npm start
```

Server runs at: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

* Update `frontend/src/api/axios.js` base URL:

```js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
```

* Run frontend:

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/auth/register` | Register user    |
| POST   | `/api/auth/login`  | Login user       |
| GET    | `/api/auth/me`     | Get user profile |
| PUT    | `/api/auth/me`     | Update user profile |

### Lead Routes

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/api/leads`     | Get leads (with filters/pagination) |
| POST   | `/api/leads`     | Create new lead                     |
| GET    | `/api/leads/:id` | Get single lead details             |
| PUT    | `/api/leads/:id` | Update lead                         |
| DELETE | `/api/leads/:id` | Delete lead                         |

---

## ✅ Completed Assignment Checklist

* [x] Authentication (Login/Signup)
* [x] Lead CRUD (Create, Read, Update, Delete)
* [x] Pagination (frontend + backend)
* [x] Filters (Apply Filters button)
* [x] Lead Details Page
* [x] Lead Edit Page
* [x] Toast Notifications + Validations
* [x] Clean UI with Tailwind + shadcn

---

## 📌 How to Run

1. Start backend → `npm start` inside `/backend`
2. Start frontend → `npm run dev` inside `/frontend`
3. Open `http://localhost:3000` in browser
4. Login/signup and manage leads 🎉

---

## 👨‍💻 Author

**Your Name**
GitHub: [Shinkhal](https://github.com/Shinkhal)

