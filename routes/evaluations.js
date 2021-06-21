const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluations')
const WISCV = require('../models/WISCV')
const WJIVACH = require('../models/WJIVACH')

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.evals = await Evaluation.find({userId:req.user._id})
      res.render('homeEvaluation');
});

router.post('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.evals = await Evaluation.find({userId:req.user._id})
      res.render('homeEvaluation');
});



router.get('/:evalID/form',
  isLoggedIn,
  async (req, res, next) => {
    res.render('formWISCV');
});

router.get('/show',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.eval = await WISCV.find({userId:req.user._id})
    res.render('viewWISCV');
});

router.post('/show',
  isLoggedIn,
  async (req, res, next) => {
      console.log("2")
      const wiscv = new WISCV({
        userId: req.user._id,
        evalId: {type:ObjectId,index:true},
        wisc_vDate: req.body.wisc_vDate,
        wisc_vSI: req.body.wisc_vSI,
        wisc_vVC: req.body.wisc_vVC,
        wisc_vIN: req.body.wisc_vIN,
        wisc_vCO: req.body.wisc_vCO,
        wisc_vBD: req.body.wisc_vBD,
        wisc_vVP: req.body.wisc_vVP,
        wisc_vMR: req.body.wisc_vMR,
        wisc_vFW: req.body.wisc_vFW,
        wisc_vPC: req.body.wisc_vPC,
        wisc_vAR: req.body.wisc_vAR,
        wisc_vDS: req.body.wisc_vDS,
        wisc_vPS: req.body.wisc_vPS,
        wisc_vLN: req.body.wisc_vLN,
        wisc_vCD: req.body.wisc_vCD,
        wisc_vSS: req.body.wisc_vSS,
        wisc_vCA: req.body.wisc_vCA,
        wisc_vVCI: req.body.wisc_vVCI,
        wisc_vVSI: req.body.wisc_vVSI,
        wisc_vFRI: req.body.wisc_vFRI,
        wisc_vWMI: req.body.wisc_vWMI,
        wisc_vPSI: req.body.wisc_vPSI,
        wisc_vQRI: req.body.wisc_vQRI,
        wisc_vAWMI: req.body.wisc_vAWMI,
        wisc_vNVI: req.body.wisc_vNVI,
        wisc_vGAI: req.body.wisc_vGAI,
        wisc_vCPI: req.body.wisc_vCPI,
        wisc_vNSI: req.body.wisc_vNSI,
        wisc_vSTI: req.body.wisc_vSTI,
        wisc_vSRI: req.body.wisc_vSRI,
        wisc_vFSIQ: req.bodywisc_vFSIQ
        })
      await wiscv.save();
      res.locals.eval = wiscv
      //res.render("todoVerification")
      res.render('viewWISCV')
});
