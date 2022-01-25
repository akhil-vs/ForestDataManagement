const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  teachers: Array,
  students: Array
})

module.exports = mongoose.model('Class', schema);