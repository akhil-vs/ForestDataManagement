const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const hoaService = require('./hoa.service');

// routes
router.get('/getAllHoas', getAllHoas);

function getAllHoas(req, res, next) {
    console.log("Inside getAllHoas()")
    hoaService.getAllHoas()
        .then(hoas => {res.send(hoas)})
        .catch(next);
}

module.exports = router;