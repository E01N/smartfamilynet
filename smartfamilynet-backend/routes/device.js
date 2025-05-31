const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const UsageLog = require('../models/UsageLog');

// @route   GET /api/device/:mac/config
// @desc    Return blocklist and time limits for a device by MAC address
// @access  Public (add token/auth later)
router.get('/:mac/config', async (req, res) => {
  const { mac } = req.params;

  try {
    // Find the child with this device MAC
    const child = await Child.findOne({ 'devices.macAddress': mac });

    if (!child) {
      return res.status(404).json({ msg: 'Device not linked to any child profile' });
    }

    res.json({
      childId: child._id,
      blockList: child.blockList || [],
      timeLimits: child.timeLimits || [],
      status: 'OK'
    });
  } catch (err) {
    console.error('[Device Config Error]', err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/device/:mac/logs
// @desc    Receive usage/activity logs from SmartFilter agent
// @access  Public (secure later)
router.post('/:mac/logs', async (req, res) => {
  const { mac } = req.params;
  const { logs } = req.body;

  try {
    if (!logs || !Array.isArray(logs)) {
      return res.status(400).json({ msg: 'Invalid or missing logs' });
    }

// Look up child (optional)
const child = await Child.findOne({ 'devices.macAddress': mac });
const childId = child ? child._id : null;

// Save each log
for (const entry of logs) {
  const newLog = new UsageLog({
    macAddress: mac,
    child: childId,
    event: entry.event,
    domain: entry.domain,
    timestamp: entry.timestamp || new Date()
  });
  await newLog.save();
}

res.status(200).json({ msg: 'Logs saved to database' });
  } catch (err) {
    console.error('[Device Log Error]', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
