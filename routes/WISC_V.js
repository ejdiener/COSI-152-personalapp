const express = require('express');
const router = express.Router();
const WISCV = require('../models/WISCV')

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
