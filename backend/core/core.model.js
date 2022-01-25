const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organization = new Schema({
  name: { type: String },
  admin_mail: { type: String },
  admin_first_name: { type: String },
  admin_last_name: { type: String },
  admin_phone: { type: Number }
})

module.exports = mongoose.model('Organization', organization);