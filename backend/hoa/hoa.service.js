const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');


module.exports = {
    getAllHoas
};

async function getAllHoas() {
    const allHoas = await db.HOA.find();
    return allHoas;
}