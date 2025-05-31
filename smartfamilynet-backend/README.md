# 🔧 SmartFamilyNet – Backend API

This is the **Express + MongoDB** backend for the **SmartFamilyNet** project — a smart internet monitoring and control system designed for families.

## 📦 Features

- JWT-based user authentication (login and registration)
- MongoDB models for:
  - Parents
  - Children
  - Devices
  - Usage logs
- API endpoints for:
  - Retrieving child data and summaries
  - Receiving device logs
  - Managing time limits and blocked domains

## 🧰 Requirements

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- `.env` file with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartfamilynet
JWT_SECRET=your_jwt_secret
```

💡 Tip: Make sure `.env` is in `.gitignore` and never committed to version control.

## ▶️ Getting Started

1. Navigate into the backend folder:

```bash
cd smartfamilynet-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The backend should be available at: `http://localhost:5000`

## 📁 Folder Structure

```
smartfamilynet-backend/
│
├── models/          # Mongoose schemas
│   ├── User.js
│   ├── Child.js
│   └── UsageLog.js
│
├── routes/          # Express routes
│   ├── auth.js
│   ├── children.js
│   └── device.js
│
├── middleware/      # Custom middleware (e.g. auth)
│
├── .env             # Environment variables (not committed)
├── .gitignore
├── server.js        # Main entry point
└── package.json
```

## 🔐 Authentication

All child and device routes are secured using JWT. Include the token as a Bearer header:

```http
Authorization: Bearer <your_token_here>
```

## 📬 API Overview

### Auth

- `POST /api/auth/login` — login with email & password

### Children

- `GET /api/children` — get children for logged-in parent
- `GET /api/children/:id/summary` — get usage summary for a child

### Device

- `GET /api/device/:mac/config` — return time limits and blocklist
- `POST /api/device/:mac/logs` — submit usage logs from the Pi

---

## 📌 Notes

- Usage logs are stored in MongoDB and summarized per child
- Data is returned in parent-facing and device-facing formats

---
