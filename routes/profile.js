const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider')
const Patient = require('../models/Patient')

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
      const provider = await Provider.findOne({userId:providerId})
      res.locals.currUserId = req.user._id
      res.locals.provider = provider
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

router.post('/form',
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

  router.post('/edit',
      isLoggedIn,
      async (req,res,next) => {
          const provider = Provider.findOneAndUpdate({userID:req.user._id},
            {$set: {  providerName: req.body.providerName,
                      providerPronouns: req.body.providerPronouns,
                      providerEducation: req.body.providerEducation,
                      providerOrganization: req.body.providerOrganization,
                      providerAddress: req.body.providerAddress,
                      providerPhone: req.body.providerPhone,
                      providerEmail: req.body.providerEmail,
                      providerBio: req.body.providerBio,
                      userId: req.user._id
            }}, {new: true},
                function (err, docs) {
                  if (err){
                    console.log(err)
                  }
                  else {
                    console.log("Original Doc : ",docs);
                  }
            });
            console.log(provider)
          //res.render("todoVerification")
          res.redirect('/profile/' + req.user._id)
      });

module.exports = router;
