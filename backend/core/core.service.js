const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
  createOrganization
}

async function createOrganization(req, res) {
  console.log("Coreservice-createOrg", req.body);
  if(await db.Core.findOne({ email: req.body.email }) || await db.Account.findOne({ email: req.body.email })) {
    throw "Email " + req.email + " already exists !";
  }
  // const org = new db.Core(req);
}