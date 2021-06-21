const express = require('express');
const router = express.Router();
const preg_birth = require('../models/PregBirth')

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
      res.render('homeHistory');
});

router.get('/pregbirth/form',
  isLoggedIn,
  async (req, res, next) => {
      res.render('formPregBirthHistory');
});

router.get('/pregbirth',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.hist = await PregBirth.find({userId:req.user._id})
    res.render('viewPregBirthHistory');
});


module.exports = router;
