const mongoose = require('mongoose');

const UsageLogSchema = new mongoose.Schema({
  macAddress: { type: String, required: true },
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child' },
  event: String,
  domain: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UsageLog', UsageLogSchema);
