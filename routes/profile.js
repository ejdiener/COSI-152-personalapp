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
    async (req, res, next) => {
      const providerId = req.params.providerId
      console.log(providerId)
      const provider = await Provider.findOne({userId:providerId})
      res.locals.provider = provider
      console.log(provider)
      res.render('homeProviderProfile')
    })

router.get('/',
    isLoggedIn,
      async (req, res, next) => {
      res.redirect('/profile/form/' + req.user.id)
    })

router.get('/form/:userId',
    isLoggedIn,
    (req,res) => {
      res.render('formProviderProfile')
    })

router.post('/',
    isLoggedIn,
    async (req, res, next) => {
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
          // Convert the Model instance to a simple object using Model's 'toObject' function
          // to prevent weirdness like infinite looping...
          const upsertData = provider.toObject();

          // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
          delete upsertData._id;

          // Do the upsert, which works like this: If no Contact document exists with
          // _id = contact.id, then create a new doc using upsertData.
          // Otherwise, update the existing doc with upsertData
          Provider.update({_id: provider.id}, upsertData, {upsert: true});
          //res.render("todoVerification")
        res.redirect('/profile/' + req.user._id)
    });

module.exports = router;
