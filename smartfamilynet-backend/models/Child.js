const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  devices: [
    {
      name: String,
      macAddress: String,
    }
  ],
  timeLimits: [
    {
      start: String, // e.g., "08:00"
      end: String,   // e.g., "20:00"
      days: [String] // e.g., ["Mon", "Tue", "Wed"]
    }
  ],
  blockList: [String],

  usageLogs: [
  {
    date: String, // e.g., "2025-05-18"
    duration: String, // e.g., "2h 15m"
    topSites: [String]
  }
],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Child', ChildSchema);

// POST /api/children/:id/devices
router.post('/:id/devices', authenticateToken, async (req, res) => {
  const { name, macAddress } = req.body;

  try {
    const child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });

    child.devices.push({ name, macAddress });
    await child.save();

    res.json(child.devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});