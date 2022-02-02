const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const circleService = require('./circles.service');

// routes
router.get('/getAllCircles', getAllCircles);

function getAllCircles(req, res, next) {
    circleService.getAllCircles()
        .then(circles => {res.send(circles)})
        .catch(next);
}

module.exports = router;