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
