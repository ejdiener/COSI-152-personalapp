const express = require('express');
const router = express.Router();
//const historyRouter = require('../routes/history').Router({mergeParams: true});

const Provider = require('../models/Provider')
const Patient = require('../models/Patient')
const PregBirth = require('../models/PregBirth')



router.get('/',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.provider = await Provider.findOne({userId:req.user._id})
    res.render('showPatients');
  });

router.get('/new/form',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.provider = await Provider.findOne({userId:req.user._id})
    res.render('formPatientProfile');
  });

router.get('/:patientID',
  isLoggedIn,
  async (req, res, next) => {
    let patientId = req.params.patientId;
    res.render('profilePatient');
  });

router.get('/:patientId/history',
    isLoggedIn,
    async (req, res, next) => {
        let patientId = req.params.patientId;
        res.locals.pregbirth = await PregBirth.findOne({patientId:patientId})
        res.render('homeHistory');
  });

  router.get('/:patientId/history/pregbirth',
    isLoggedIn,
    async (req, res, next) => {
      let patientId = req.params.patientId;
      res.locals.pregbirth = await PregBirth.findOne({patientId:patientId})
      res.render('viewPregBirthHistory');
  });

  router.get('/:patientId/history/pregbirth/form',
    isLoggedIn,
    async (req, res, next) => {

        let patientId = req.params.patientId;
        res.render('formPregBirthHistory');
  });

  router.get('/:patientId/history/pregbirth/edit',
    isLoggedIn,
    async (req, res, next) => {
        let patientId = req.params.patientId;
        res.locals.pregbirth = await PregBirth.findOne({patientId:patientId})
        res.render('editPregBirthHistory');
  });

module.exports = router;
