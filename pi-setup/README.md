## 🧰 Raspberry Pi Backend Deployment Guide

This guide walks through deploying the SmartFamilyNet backend on a Raspberry Pi Zero 2 W using Node.js, MongoDB Atlas, and local Wi-Fi access.

---

### 🔧 Prerequisites

- Raspberry Pi Zero 2 W
- MicroSD card (8GB minimum, Class 10 recommended)
- Raspberry Pi Imager tool
- Wi-Fi connection (2.4GHz network)
- USB power supply
- Keyboard + monitor (initial setup) or SSH access

---

### 🖥️ Step-by-Step Setup

#### 1. Flash Raspberry Pi OS (Lite)

- Use [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to flash **Raspberry Pi OS Lite** to the microSD.
- Before writing, click the ⚙️ icon and set:
  - **Hostname** (e.g., `raspberrypi.local`)
  - **Enable SSH**
  - **Set Wi-Fi SSID + password**
  - **Set locale/keyboard layout**
- Insert SD into Pi and power it up.

> ✅ If Wi-Fi setup succeeds, the Pi should auto-connect and be discoverable via `raspberrypi.local` or your router's device list.

---

#### 2. Connect via SSH

```bash
ssh pi@raspberrypi.local
```

If that fails, use your router admin page to find the Pi's IP and connect via `ssh pi@<ip-address>`.

---

#### 3. Install Node.js & npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```bash
node -v
npm -v
```

---

#### 4. Clone the Project

```bash
git clone https://github.com/E01N/smartfamilynet.git
cd smartfamilynet/smartfamilynet-backend
```

---

#### 5. Install Dependencies

```bash
npm install
```

---

#### 6. Configure Environment Variables

Create a `.env` file inside `smartfamilynet-backend`:

```bash
nano .env
```

Add:

```
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
```

Press `Ctrl + X`, then `Y`, then `Enter` to save.

---

#### 7. Start the Server

```bash
npm run dev
```

You should see `Server is running on port 5000` if successful.

---

#### 8. (Optional) Keep Server Running with PM2

```bash
sudo npm install -g pm2
pm2 start server.js --name smartfamilynet
pm2 save
pm2 startup
```

---

### 🧪 Test Your API

Open your browser or use `curl`:

```bash
curl http://<your-pi-ip>:5000/api/test
```
