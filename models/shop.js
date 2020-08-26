const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String, default: 'nopic.png' },
  location: {
    lat: Number,
    lgn: Number
  },
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'shops'
});

schema.virtual('menus', {
  ref: 'Menu', //ลิงก์ไปที่โมเดล Menu
  localField: '_id', //_id ฟิลด์ของโมเดล Shop (ไฟล์นี้)
  foreignField: 'shop' //shop ฟิลด์ของโมเดล Menu (fk)
});

const shop = mongoose.model('Shop', schema);

module.exports = shop;