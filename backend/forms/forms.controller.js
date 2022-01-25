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

function getPreviousMonth(req, res, next) {
  console.log("TeacherController-getPreviousMonth");
  console.log(req.query);
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
  console.log("TeacherController-getCurrentMonth");
  console.log(req.query);
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
  console.log("TeacherController-submitForm");
  formsService.submitForm(req.body)
  .then((result) => {
    if(!result) {
      res.status(403);
      res.send({ detail: "You do not have the permission to perform this action" });
    } else {
      console.log(result);
      res.send({ detail: "Data submitted successfully" })
    }
  })
}

module.exports = router;