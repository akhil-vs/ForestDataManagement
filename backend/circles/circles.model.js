const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  code: String
})

module.exports = mongoose.model('Circle', schema);