const axios = require('axios');
const os = require('os');

const BACKEND_URL = 'https://your-backend.com/api/device';
const POLL_INTERVAL = 30000; // 30 seconds

// Get MAC address of wlan0
function getMAC() {
  const interfaces = os.networkInterfaces();
  const wlan = interfaces['wlan0'] || [];
  const mac = wlan.find(i => i.mac)?.mac;
  return mac || 'unknown';
}

async function pollConfig() {
  const mac = getMAC();
  console.log(`[SmartFilter] MAC: ${mac}`);

  try {
    const res = await axios.get(`${BACKEND_URL}/${mac}/config`);
    const config = res.data;

    // Simulate applying config
    console.log(`[SmartFilter] Received config:`, config);

    // TODO: Apply DNS blocklist, enforce time limits, etc.

  } catch (err) {
    console.error('[SmartFilter] Error polling config:', err.message);
  }
}

setInterval(pollConfig, POLL_INTERVAL);
pollConfig();
