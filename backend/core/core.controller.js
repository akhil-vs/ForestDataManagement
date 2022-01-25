const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const accountService = require('./core.service');

router.post('/organization', createOrganization);

function createOrganization(req, res) {
  console.log("Corecontroller-createOrg", req.body);
  accountService.createOrganization(req)
  .then((result) => {
    res.json(result);
  })
}

module.exports = router;