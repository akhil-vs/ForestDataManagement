const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formData = new Schema({
  approved: Boolean,
  approved_date: Date,
  approved_by: String,
  user: {
      id: String,
      name: String,
      submit_date: Date,
  },
  update_date: Date,
  updated_by: Number,
  canUpdate: Boolean,
  month: Number,
  year: Number,
  circle: String,
  division: String,
  hoa: String,
  data: Array
})

// module.exports = mongoose.model('Teacher', fullDetails);
module.exports = mongoose.model('Form', formData);