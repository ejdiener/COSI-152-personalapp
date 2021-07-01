const express = require('express');
const router = express.Router();
//const historyRouter = require('../routes/history').Router({mergeParams: true});

const Provider = require('../models/Provider')
const Patient = require('../models/Patient')
const PregBirth = require('../models/PregBirth')



router.get('/',
  isLoggedIn,
  async (req, res, next) => {
    const provider = await Provider.findOne({userId:req.user._id})
    res.locals.provider = provider
    const patientIds = provider.patientIds
    const patients = await Patient.find({"_id":{$in:patientIds}})
    res.locals.patients = patients
    console.log(res.locals.patients)
    res.render('showPatients');
  });

router.get('/new/form',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.provider = await Provider.findOne({userId:req.user._id})
    res.render('formPatientProfile');
  });

router.post('/new/form',
  isLoggedIn,
  async (req, res, next) => {
    const patient = new Patient(
    { patientName: req.body.patientName,
      patientPronouns: req.body.patientPronouns,
      patientAddress: req.body.patientAddress,
      patientPhone: req.body.patientPhone,
      patientEmail: req.body.patientEmail,
      patientBio: req.body.patientBio,
    })
    await patient.save();
    console.log(patient._id)
    const provider = await Provider.findOne({userId:req.user._id})
    patient.CurrentProvidersIds.push(provider._id);
    await patient.save();
    provider.patientIds.push(patient._id);
    await provider.save();
    //res.render("todoVerification")
    res.redirect('/patients')
});

router.get('/:patientID',
  isLoggedIn,
  async (req, res, next) => {
    let patientId = req.params.patientID;
    console.log(patientId)
    const patient = await Patient.findOne({_id:patientId})
    res.locals.patient = patient
    console.log(patient)
    res.render('profilePatient');
  });

//--------------------------------------------------------------------------------//
//                                    /history                                    //
//--------------------------------------------------------------------------------//
router.get('/:patientId/history',
  isLoggedIn,
  async (req, res, next) => {
    let patientID = req.params.patientId;
    let patient = await Patient.findOne({_id:patientID})
    let pregBirth = await PregBirth.findOne({patientId:patientID})
    console.log(pregBirth)
    res.locals.patient = patient
    res.locals.pregbirth = pregBirth
    res.render('showHistory');
  });

router.get('/:patientId/history/pregbirth',
  isLoggedIn,
  async (req, res, next) => {
    console.log("7 " + req.params.patientId)
    let patientId = req.params.patientId;
    let patient = await Patient.findOne({_id:patientId})
    let pregbirth = await PregBirth.findOne({patientId:patientId})
    console.log(pregbirth)
    res.locals.patient = patient
    res.locals.pregbirth = pregbirth
    res.render('showPregBirthHistory');
});

router.get('/:patientId/history/pregbirth/form',
  isLoggedIn,
  async (req, res, next) => {
      let patientId = req.params.patientId;
      res.locals.patientId = patientId
      res.render('formPregBirthHistory');
});

router.get('/:patientId/history/pregbirth/edit',
  isLoggedIn,
  async (req, res, next) => {
      let patientId = req.params.patientId;
      res.locals.patientId = patientId
      console.log("2")
      console.log(patientId)
      res.locals.pregbirth = await PregBirth.findOne({patientId:patientId})
      res.render('editPregBirthHistory');
});

router.post('/history/pregbirth/form',
  isLoggedIn,
  async (req, res, next) => {
    const patient = await Patient.findOne({_id:req.body.patientID})
    let total_children = req.body.mother_total_children
    let older_children = req.body.mother_older_children
    const birth_order = older_children + 1
    const pregbirth = new PregBirth(
    { patientId: patient._id,
      adoptionStatus: req.body.adoption_status,                     // TRUE, FALSE
      countryOfOrigin: req.body.country_of_origin,
      motherTotalPregnancies: req.body.mother_total_pregnancies,
      motherTotalChildren: req.body.mother_total_children,
      motherOlderChildren: req.body.mother_older_children,
      birthOrder: birth_order,
      hadMiscarriage: req.body.had_miscarriage,                     // TRUE, FALSE, UNKNOWN
      miscarriagesTotal: req.body.miscarriages_total,
      hadTerminationAnomalies: req.body.had_termination_anomalies,           // TRUE, FALSE, UNKNOWN
      terminationAnomaliesTotal: req.body.termination_anomalies_total,
      terminationAnomaliesCause: req.body.termination_anomalies_cause,
      requiredFertilityTreatment: req.body.required_fertility,                  // TRUE, FALSE, UNKNOWN
      fertilityTreatment: req.body.fertility_treatment,
      hadPrenatalCare: req.body.had_prenatal_care,                   // TRUE, FALSE, UNKNOWN
      trimestersPrenatalCare: req.body.trimesters_prenatal_care,            // 1, 2, 3
      prenatalTests: req.body.prenatal_tests,                      // had_ultrasound, had_amniocentesis, had_cvs
      prenatalDiagnosis: req.body.prenatal_diagnosis,
      hadInfectionPregnancy: req.body.had_infection_pregnancy,             // TRUE, FALSE, UNKNOWN
      infectionPregnancy: req.body.infection_pregnancy,
      hadHypertensionPregnancy: req.body.had_hypertension_pregnancy,          // TRUE, FALSE, UNKNOWN
      hadDiabetesPregnancy: req.body.had_diabetes_pregnancy,              // TRUE, FALSE, UNKNOWN
      usedOverTheCounterPregnancy: req.body.used_overthecounter_pregnancy,       // TRUE, FALSE, UNKNOWN
      overTheCounterPregnancy: req.body.overthecounter_pregnancy,
      usedHerbalPregnancy: req.body.used_herbal,                         // TRUE, FALSE, UNKNOWN
      herbalPregnancy: req.body.herbal_pregnancy,
      usedPrescriptionPregnancy: req.body.used_prescription_pregnancy,         // TRUE, FALSE, UNKNOWN
      prescriptionPregnancy: req.body.prescription_pregnancy,
      usedCigarettesPregnancy: req.body.used_cigarettes_pregnancy,           // TRUE, FALSE, UNKNOWN
      cigarettesPerDayPregnancy: req.body.cigarettes_per_day_pregnancy,
      cigarettesPerDayPregnancyUnit: req.body.cigarettes_per_day_pregnancy_unit,   // loose, packs
      whenCigarettesPregnancy: req.body.when_cigarettes_pregnancy,           // 1, 2, 3, UNKNOWN
      usedAlcoholPregnancy: req.body.used_alcohol_pregnancy,              // TRUE, FALSE, UNKNOWN
      alcoholPerDayPregnancy: req.body.alcohol_per_day_pregnancy,           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
      whenAlcoholPregnancy: req.body.when_alcohol_pregnancy,              // 1, 2, 3, UNKNOWN
      usedDrugsPregnancy: req.body.used_drugs_pregnancy,                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
      usedDrugsPregnancyOther: req.body.used_drugs_pregnancy_other,
      whenDrugsPregnancy: req.body.when_drugs_pregnancy,                // 1, 2, 3, UNKNOWN
      otherComplicationsPregnancy: req.body.other_complications_pregnancy,
      motherAgeBirth: req.body.mother_age_birth,
      fatherAgeBirth: req.body.father_age_birth,
      gestationalAge: req.body.gestational_age,
      birthWeight: req.body.birth_weight,
      pregnancyNumbers: req.body.pregnancy_numbers,                   // singleton, twin, triplet, other
      deliveryMethod: req.body.delivery_method,                     // vaginal, scheduled_caesarean, unplanned_caesarean, vaginal_after_caesarean, scheduled_induction, forcep_vaginal, vacuum_vaginal, UNKNOWN
      otherComplications_delivery: req.body.other_complications_delivery,
      admittedToNICU: req.body.admitted_to_nicu,                    // TRUE, FALSE, UNKNOWN
      timeInNICU: req.body.time_in_nicu,
      complicationsNeonatal: req.body.complications_neonatal,
      firstCaregiver: req.body.first_caregiver,                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
      firstCaregiverOther: req.body.first_caregiver_other,
      hadFeedingProblems: req.body.had_feeding_problems,                // TRUE, FALSE, UNKNOWN
      feedingProblems: req.body.feeding_problems,
    })
    await pregbirth.save();
    patient.pregBirthHistory = pregbirth._id
    await patient.save();
    console.log(patient.pregBirthHistory)
    console.log(pregbirth._id)
    console.log(pregbirth.patientId)
    console.log(patient._id)
    res.redirect('/patients/'+patient._id+'/history/pregbirth')
});

router.post('/history/pregbirth/edit',
  isLoggedIn,
  async (req, res, next) => {
    let older_children = req.body.mother_older_children
    const birth_order = parseInt(older_children) + 1
    console.log("1")
    console.log(req.body.patientId)
    const patient = await Patient.findOne({_id:req.body.patientId})
    try {
      const pregbirth = await PregBirth.findOne({patientId:req.body.patientId})
      pregbirth.adoptionStatus = req.body.adoption_status                     // TRUE, FALSE
      pregbirth.countryOfOrigin = req.body.country_of_origin
      pregbirth.motherTotalPregnancies = req.body.mother_total_pregnancies
      pregbirth.motherTotalChildren = req.body.mother_total_children
      pregbirth.motherOlderChildren = req.body.mother_older_children
      pregbirth.birthOrder = birth_order
      pregbirth.hadMiscarriage = req.body.had_miscarriage                     // TRUE, FALSE, UNKNOWN
      pregbirth.miscarriagesTotal = req.body.miscarriages_total
      pregbirth.hadTerminationAnomalies = req.body.had_termination_anomalies           // TRUE, FALSE, UNKNOWN
      pregbirth.terminationAnomaliesTotal = req.body.termination_anomalies_total
      pregbirth.terminationAnomaliesCause = req.body.termination_anomalies_cause
      pregbirth.requiredFertilityTreatment = req.body.required_fertility                  // TRUE, FALSE, UNKNOWN
      pregbirth.fertilityTreatment = req.body.fertility_treatment
      pregbirth.hadPrenatalCare = req.body.had_prenatal_care                   // TRUE, FALSE, UNKNOWN
      pregbirth.trimestersPrenatalCare = req.body.trimesters_prenatal_care            // 1, 2, 3
      pregbirth.prenatalTests = req.body.prenatal_tests                      // had_ultrasound, had_amniocentesis, had_cvs
      pregbirth.prenatalDiagnosis = req.body.prenatal_diagnosis
      pregbirth.hadInfectionPregnancy = req.body.had_infection_pregnancy             // TRUE, FALSE, UNKNOWN
      pregbirth.infectionPregnancy = req.body.infection_pregnancy
      pregbirth.hadHypertensionPregnancy = req.body.had_hypertension_pregnancy          // TRUE, FALSE, UNKNOWN
      pregbirth.hadDiabetesPregnancy = req.body.had_diabetes_pregnancy              // TRUE, FALSE, UNKNOWN
      pregbirth.usedOverTheCounterPregnancy = req.body.used_overthecounter_pregnancy       // TRUE, FALSE, UNKNOWN
      pregbirth.overTheCounterPregnancy = req.body.overthecounter_pregnancy
      pregbirth.usedHerbalPregnancy = req.body.used_herbal                         // TRUE, FALSE, UNKNOWN
      pregbirth.herbalPregnancy = req.body.herbal_pregnancy
      pregbirth.usedPrescriptionPregnancy = req.body.used_prescription_pregnancy         // TRUE, FALSE, UNKNOWN
      pregbirth.prescriptionPregnancy = req.body.prescription_pregnancy
      pregbirth.usedCigarettesPregnancy = req.body.used_cigarettes_pregnancy           // TRUE, FALSE, UNKNOWN
      pregbirth.cigarettesPerDayPregnancy = req.body.cigarettes_per_day_pregnancy
      pregbirth.cigarettesPerDayPregnancyUnit = req.body.cigarettes_per_day_pregnancy_unit   // loose, packs
      pregbirth.whenCigarettesPregnancy = req.body.when_cigarettes_pregnancy           // 1, 2, 3, UNKNOWN
      pregbirth.usedAlcoholPregnancy = req.body.used_alcohol_pregnancy              // TRUE, FALSE, UNKNOWN
      pregbirth.alcoholPerDayPregnancy = req.body.alcohol_per_day_pregnancy           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
      pregbirth.whenAlcoholPregnancy = req.body.when_alcohol_pregnancy              // 1, 2, 3, UNKNOWN
      pregbirth.usedDrugsPregnancy = req.body.used_drugs_pregnancy                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
      pregbirth.usedDrugsPregnancyOther = req.body.used_drugs_pregnancy_other
      pregbirth.whenDrugsPregnancy = req.body.when_drugs_pregnancy                // 1, 2, 3, UNKNOWN
      pregbirth.otherComplicationsPregnancy = req.body.other_complications_pregnancy
      pregbirth.motherAgeBirth = req.body.mother_age_birth
      pregbirth.fatherAgeBirth = req.body.father_age_birth
      pregbirth.gestationalAge = req.body.gestational_age
      pregbirth.birthWeight = req.body.birth_weight
      pregbirth.pregnancyNumbers = req.body.pregnancy_numbers                   // singleton, twin, triplet, other
      pregbirth.deliveryMethod = req.body.delivery_method                     // vaginal, scheduled_caesarean, unplanned_caesarean, vaginal_after_caesarean, scheduled_induction, forcep_vaginal, vacuum_vaginal, UNKNOWN
      pregbirth.otherComplications_delivery = req.body.other_complications_delivery
      pregbirth.admittedToNICU = req.body.admitted_to_nicu                    // TRUE, FALSE, UNKNOWN
      pregbirth.timeInNICU = req.body.time_in_nicu
      pregbirth.complicationsNeonatal = req.body.complications_neonatal
      pregbirth.firstCaregiver = req.body.first_caregiver                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
      pregbirth.firstCaregiverOther = req.body.first_caregiver_other
      pregbirth.hadFeedingProblems = req.body.had_feeding_problems                // TRUE, FALSE, UNKNOWN
      pregbirth.feedingProblems = req.body.feeding_problems
      await pregbirth.save();
      console.log("4 " +req.body.patientId)
      res.redirect('/patients/'+req.body.patientId+'/history/pregbirth')
    } catch (e) {
      next(e)
    }
});


//--------------------------------------------------------------------------------//
//                                  /evaluations                                  //
//--------------------------------------------------------------------------------//







module.exports = router;
