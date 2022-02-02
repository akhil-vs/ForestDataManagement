const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const formsService = require('./forms.service');

router.get('/prevmonth', getPreviousMonth);
router.get('/currentmonth', getCurrentMonth);
router.post('/submit', submitForm);
router.get('/getAllForms', getAllForms);

function getPreviousMonth(req, res, next) {
   formsService.getPrevMonth(req.query)
  .then(
    (result) => {
      if(!result) {
        res.status(403);
        res.send({ detail: "You do not have the permission to perform this action" });
      } else {
        // console.log("getPreviousMonth", result);
        res.send(result);
      }
    }
  )
}

function getCurrentMonth(req, res, next) {
  formsService.getCurrentMonth(req.query)
  .then(
    (result) => {
      if(!result) {
        res.status(403);
        res.send({ detail: "You do not have the permission to perform this action" });
      } else {
        // console.log("getCurrentMonth", result);
        res.send(result);
      }
    }
  )
}

function submitForm(req, res, next) {
  formsService.submitForm(req.body)
  .then((result) => {
    if(!result) {
      res.status(403);
      res.send({ detail: "You do not have the permission to perform this action" });
    } else {
      res.send({ detail: "Data submitted successfully" })
    }
  })
}

function getAllForms(req, res, next) {
  formsService.getAllForms()
  .then((result) => {
    // console.log(result);
    if(!result) {
      res.status(403);
      res.send({ detail: "You do not have the permission to perform this action" });
    } else {
      // console.log(result);
      res.send(result)
    }
  })
}

module.exports = router;