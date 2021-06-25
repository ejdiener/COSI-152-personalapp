/*
const router = require('express').Router({mergeParams: true});

const preg_birth = require('../models/PregBirth')
router.use('/patients', require('../routes/patients'));


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
      let patientId = req.patientId;
      res.render('homeHistory');
});

router.get('/pregbirth',
  isLoggedIn,
  async (req, res, next) => {
    let patientId = req.patientId;
    res.locals.hist = await PregBirth.find({patientId:req.params.patientId})
    res.render('viewPregBirthHistory');
});

router.get('/pregbirth/form',
  isLoggedIn,
  async (req, res, next) => {
      let patientId = req.patientId;
      res.render('formPregBirthHistory');
});


module.exports = router;
*/
