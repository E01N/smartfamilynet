# 📊 SmartFamilyNet – Parent Dashboard

This is the frontend dashboard for **SmartFamilyNet**, built with **React + Vite**. It allows parents to log in and view/manage their children's internet activity.

## 🚀 Features

- Login with email + password (JWT-based auth)
- View list of registered children
- See per-child:
  - Website access logs
  - Blocked and allowed domains
  - Recent activity
- Clean, responsive UI with persistent login via localStorage

## 🛠️ Tech Stack

- React 18
- Vite
- Axios
- Custom CSS with Google Fonts
- JWT handling and API integration

## ▶️ Running Locally

1. Make sure the backend is running at `http://localhost:5000`
2. From this folder:

```bash
npm install
npm run dev
