const express = require('express');
const Child = require('../models/Child');
const UsageLog = require('../models/UsageLog');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

// @route POST /api/children
// @desc  Create a child profile and assign devices
router.post('/', authMiddleware, async (req, res) => {
  const { name, devices } = req.body;
  const parentId = req.user.id;

  try {
    const child = new Child({
      name,
      parent: parentId,
      devices: devices || [],
    });

    await child.save();
    res.status(201).json(child);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route GET /api/children
// @desc  Get all children for logged-in parent
router.get('/', authMiddleware, async (req, res) => {
  try {
    const children = await Child.find({ parent: req.user.id });
    res.json(children);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

// @route POST /api/children/:id/timelimits
// @desc  Add time limits for a child
router.post('/:id/timelimits', authMiddleware, async (req, res) => {
  const { start, end, days } = req.body;

  try {
    const child = await Child.findOne({ _id: req.params.id, parent: req.user.id });
    if (!child) return res.status(404).json({ msg: 'Child not found' });

    const newLimit = { start, end, days };
    child.timeLimits.push(newLimit);
    await child.save();

    res.status(200).json(child.timeLimits);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route POST /api/children/:id/blocklist
// @desc  Add websites to child's block list
router.post('/:id/blocklist', authMiddleware, async (req, res) => {
  const { blockedSites } = req.body;

  try {
    const child = await Child.findOne({ _id: req.params.id, parent: req.user.id });
    if (!child) return res.status(404).json({ msg: 'Child not found' });

    // Merge new sites without duplicating
    const uniqueSites = new Set([...child.blockList, ...blockedSites]);
    child.blockList = Array.from(uniqueSites);

    await child.save();
    res.status(200).json({ blockList: child.blockList });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route GET /api/children/:id/usage
// @desc  Simulate and return child usage report
router.get('/:id/usage', authMiddleware, async (req, res) => {
  try {
    const child = await Child.findOne({ _id: req.params.id, parent: req.user.id });
    if (!child) return res.status(404).json({ msg: 'Child not found' });

    // Simulated usage data (this would eventually come from logs or router)
    const mockReport = {
      date: new Date().toISOString().split('T')[0], // e.g., "2025-05-18"
      totalTimeToday: "2h 30m",
      topSites: ["youtube.com", "roblox.com", "minecraft.net"],
      blockedAttempts: ["tiktok.com", "reddit.com"]
    };

    res.status(200).json(mockReport);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/children/:id/logs
// @desc    Get all logs for a child (must be owned by logged-in parent)
// @access  Private (parent-only)
router.get('/:id/logs', authMiddleware, async (req, res) => {
  try {
    const childId = req.params.id;

    // Verify the child belongs to the logged-in parent
    const child = await Child.findOne({ _id: childId, parent: req.user.id });
    if (!child) {
      return res.status(404).json({ msg: 'Child not found or not yours' });
    }

    const logs = await UsageLog.find({ child: childId }).sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    console.error('[Get Logs Error]', err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id/summary', authMiddleware, async (req, res) => {
  try {
    const childId = req.params.id;

    // Confirm the parent owns this child
    const child = await Child.findOne({ _id: childId, parent: req.user.id });
    if (!child) {
      return res.status(404).json({ msg: 'Child not found or not yours' });
    }

    // Fetch all logs for the child
    const logs = await UsageLog.find({ child: childId }).sort({ timestamp: -1 });

    // Summary calculations
    const totalLogs = logs.length;
    const blockedSites = new Set();
    const accessedSites = new Set();

    const recentActivity = logs.slice(0, 10).map(log => ({
      time: log.timestamp.toISOString(),
      domain: log.domain,
      event: log.event
    }));

    logs.forEach(log => {
      if (log.event.toLowerCase().includes('block')) {
        blockedSites.add(log.domain);
      } else {
        accessedSites.add(log.domain);
      }
    });

    res.json({
      child: child.name,
      summary: {
        totalLogs,
        lastActivity: logs[0]?.timestamp,
        blockedSites: Array.from(blockedSites),
        accessedSites: Array.from(accessedSites)
      },
      recentActivity
    });
  } catch (err) {
    console.error('[Child Summary Error]', err.message);
    res.status(500).send('Server error');
  }
});
