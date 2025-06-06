const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: { type: String },
  mac: { type: String, required: true, unique: true },
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true }
});

module.exports = mongoose.model('Device', DeviceSchema);