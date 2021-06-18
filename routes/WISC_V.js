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

router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await WISCV.find({userId:req.user._id})
      res.render('wiscvHome');
});


module.exports = router;
