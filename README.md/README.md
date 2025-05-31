# SmartFamilyNet

> Simple, privacy-friendly internet filtering for families — powered by a Raspberry Pi.

## Overview

SmartFamilyNet is a full-stack parental control platform built with:

- **Raspberry Pi Zero 2 W** *(SmartFilter agent)*
- **MongoDB Atlas** *(Cloud Database)*
- **Node.js + Express** *(REST API backend)*
- **React + Vite** *(Frontend dashboard)*

It allows parents to:

- View internet usage logs per child
- Monitor accessed or blocked sites
- Apply custom domain blocklists and time limits
- Interact with a simple dashboard on web or mobile

> This project focuses on **local filtering** using affordable hardware, privacy-first cloud storage, and an intuitive UI for non-technical parents.



## Features

### 🎛️ Web Dashboard
- Responsive React frontend built with Vite
- Secure login for parents with JWT-based authentication
- Child list with real-time summaries
- View blocked and accessed sites
- Daily internet usage logs
- Token-based session memory via localStorage

### 🌐 SmartFilter Agent (Pi Zero 2 W)
- Logs DNS-level activity by device MAC address
- Sends logs to cloud backend via REST API
- Lightweight and runs headlessly on boot
- Designed for home networks with minimal setup

### 🧠 Backend API (Node + Express)
- RESTful endpoints for:
  - Viewing child profiles
  - Retrieving per-child activity logs
  - Updating blocklists and time limits
- MongoDB integration with Mongoose models
- Secure route handling with bearer tokens

### ☁️ Cloud Storage
- MongoDB Atlas stores:
  - User accounts
  - Child profiles
  - Device info
  - Activity logs
- Scalable and easily queryable for analytics


## 📁 Project Structure & Installation

    ### 🗂 Folder Structure

        SMARTFAMILYNET/
        ├── README.md                   # Project documentation
        ├── smartfamilynet-backend/     # Node.js + Express API
        │   ├── models/                 # Mongoose models (User, Child, UsageLog)
        │   ├── routes/                 # API routes (auth, children, devices)
        │   ├── middleware/             # Auth middleware
        │   ├── server.js               # Main Express server entry
        ├── smartfamilynet-dashboard/   # React + Vite frontend
        │   ├── src/components/         # Dashboard & Login components
        │   ├── src/App.jsx             # Main app entry
        │   ├── src/App.css             # Custom styles
        ├── pi-setup/                   # Raspberry Pi setup scripts (planned)
        ├── mobile-app/                 # (Future) Mobile interface
        └── docs/                       # (Optional) Design notes or architecture diagrams


    ### 🧰 Requirements

        To run SmartFamilyNet, you'll need the following tools installed:

        #### 💻 Local Development
        - **Node.js** (v18 or higher recommended)
        - **npm** (v9+ recommended)
        - **MongoDB Atlas** account (or local MongoDB for testing)
        - **VS Code** (or another preferred IDE)

        #### 🧪 Backend Dependencies
        - `express`
        - `mongoose`
        - `dotenv`
        - `bcryptjs`
        - `jsonwebtoken`
        - `cors`
        - `nodemon` (for local development)

        #### 🎨 Frontend Dependencies
        - `react`
        - `vite`
        - `axios`
        - `react-icons`

        #### 📡 Hardware (For SmartFilter Agent)
        - Raspberry Pi Zero 2 W (or any Pi running Debian-based OS)
        - Node.js installed on the Pi
        - Internet connection via Wi-Fi

        You’ll also need to create a `.env` file in the `smartfamilynet-backend` directory with your MongoDB URI and JWT secret:

        ```env
        MONGO_URI=your-mongodb-connection-string
        JWT_SECRET=your-jwt-secret-key


