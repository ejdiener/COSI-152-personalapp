const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider')

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/:providerId',
    isLoggedIn,
    async (req,res,next) => {
      const providerId = req.params.providerId
      console.log(providerId)
      const provider = await Provider.findOne({userId:providerId})
      res.locals.currUserId = req.user._id
      res.locals.provider = provider
      console.log(provider)
      res.render('profileProvider')
    })

router.get('/',
    isLoggedIn,
      async (req,res,next) => {
      res.redirect('/profile/' + req.user._id)
    })

router.get('/form/:userId',
    isLoggedIn,
    (req,res) => {
      res.render('formProviderProfile')
    })

router.get('/edit/:userId',
    isLoggedIn,
    async (req,res,next) => {
      res.locals.provider = await Provider.findOne({userId:req.user._id})
      res.render('editProviderProfile')
    })

router.post('/',
    isLoggedIn,
    async (req,res,next) => {
        await Provider.deleteMany({userId:req.user._id})
        const provider = new Provider(
          { providerName: req.body.providerName,
            providerPronouns: req.body.providerPronouns,
            providerEducation: req.body.providerEducation,
            providerOrganization: req.body.providerOrganization,
            providerAddress: req.body.providerAddress,
            providerPhone: req.body.providerPhone,
            providerEmail: req.body.providerEmail,
            providerBio: req.body.providerBio,
            userId: req.user._id
          })
        await provider.save();
        //res.render("todoVerification")
        res.redirect('/profile/' + req.user._id)
    });

module.exports = router;
