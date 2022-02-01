const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const accountService = require('../accounts/account.service');

module.exports = {
  currentUser,
  submitForm,
  getPrevMonth,
  getCurrentMonth,
  getAllForms
}

async function currentUser() {
  // console.log("FormsService#15");
  const detail = accountService.currentUser();
  // console.log(detail);
  return detail;
}

async function submitForm(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'User') {
    return false;
  } else {
    let data = {
      approved: false,
      approved_date: null,
      approved_by: null,
      user: {
        id: detail._id,
        name: detail.name,
        submit_date: new Date(),
      },
      update_date: null,
      updated_by: null,
      canUpdate: false,
      month: params.month,
      year: params.year,
      circle: params.circle,
      division: params.division,
      hoa: params.hoa,
      data: params.data
    }
    const newForm = db.Form(data);
    await newForm.save();
    return true;
  };
}

// Currently not querying with division
async function getPrevMonth(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'User') {
    return false;
  } else {
    let year, month;
    params.month == 1 ? month = 12 : month = params.month - 1;
    params.month == 1 ? year = params.year - 1 : year = params.year;
    let data = await db.Form.find({ year: parseInt(year), month: month, circle: params.circle, hoa: params.hoa });
    return data.length ? data[0].data : [];
  }
}

async function getCurrentMonth(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'User') {
    return false;
  } else {
    let data = await db.Form.find({ year: parseInt(params.year), month: parseInt(params.month), circle: params.circle, hoa: params.hoa });
    return data.length ? data[0].data : [];
  }
}

async function getAllForms() {
  const detail = accountService.currentUser();
  // console.log(detail);
  if(detail.role == 'User') {
    return false;
  }
  else {
    let data = await db.Form.find();
    // console.log(data);
    return data.length ? data : [];
  }
}