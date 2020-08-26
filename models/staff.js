const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  salary: { type: Number },
  created: { type: Date, default: Date.now }
},{
  collection: 'staffs'
});

const staff = mongoose.model('Staff', schema);

module.exports = staff;