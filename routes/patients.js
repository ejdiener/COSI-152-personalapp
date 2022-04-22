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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                                    /history                                    //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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
                        //------------------------------//
                        //------------------------------//
                        //          /pregbirth          //
                        //------------------------------//
                        //------------------------------//

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
    birth_order = parseInt(req.body.mother_older_children) + 1
    // Checkbox resolution ↓
    trimestersPrenatalCare = req.body.trimesters_prenatal_care
    if (typeof(trimestersPrenatalCare) == "undefined"){
      trimestersPrenatalCare = [""]
    } else if (typeof(trimestersPrenatalCare) == "string") {
      trimestersPrenatalCare = [trimestersPrenatalCare]
    }
    prenatalTests = req.body.prenatal_tests
    if (typeof(prenatalTests) == "undefined"){
      prenatalTests = [""]
    } else if (typeof(prenatalTests) == "string") {
      prenatalTests = [prenatalTests]
    }
    whenCigarettesPregnancy = req.body.when_cigarettes_pregnancy
    if (typeof(whenCigarettesPregnancy) == "undefined"){
      whenCigarettesPregnancy = [""]
    } else if (typeof(whenCigarettesPregnancy) == "string") {
      whenCigarettesPregnancy = [whenCigarettesPregnancy]
    }
    whenAlcoholPregnancy = req.body.when_alcohol_pregnancy
    if (typeof(whenAlcoholPregnancy) == "undefined"){
      whenAlcoholPregnancy = [""]
    } else if (typeof(whenAlcoholPregnancy) == "string") {
      whenAlcoholPregnancy = [whenAlcoholPregnancy]
    }
    usedDrugsPregnancy = req.body.used_drugs_pregnancy
    if (typeof(usedDrugsPregnancy) == "undefined"){
      usedDrugsPregnancy = [""]
    } else if (typeof(usedDrugsPregnancy) == "string") {
      usedDrugsPregnancy = [usedDrugsPregnancy]
    }
    whenDrugsPregnancy = req.body.when_drugs_pregnancy
    if (typeof(whenDrugsPregnancy) == "undefined"){
      whenDrugsPregnancy = [""]
    } else if (typeof(whenDrugsPregnancy) == "string") {
      whenDrugsPregnancy = [whenDrugsPregnancy]
    }
    firstCaregiver = req.body.first_caregiver
    if (typeof(firstCaregiver) == "undefined"){
      firstCaregiver = [""]
    } else if (typeof(firstCaregiver) == "string") {
      firstCaregiver = [firstCaregiver]
    }
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
      trimestersPrenatalCare: trimestersPrenatalCare,            // 1, 2, 3
      prenatalTests: prenatalTests,                      // had_ultrasound, had_amniocentesis, had_cvs
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
      whenCigarettesPregnancy: whenCigarettesPregnancy,           // 1, 2, 3, UNKNOWN
      usedAlcoholPregnancy: req.body.used_alcohol_pregnancy,              // TRUE, FALSE, UNKNOWN
      alcoholPerDayPregnancy: req.body.alcohol_per_day_pregnancy,           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
      whenAlcoholPregnancy: whenAlcoholPregnancy,              // 1, 2, 3, UNKNOWN
      usedDrugsPregnancy: usedDrugsPregnancy,                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
      usedDrugsPregnancyOther: req.body.used_drugs_pregnancy_other,
      whenDrugsPregnancy: whenDrugsPregnancy,                // 1, 2, 3, UNKNOWN
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
      firstCaregiver: firstCaregiver,                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
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
    // Checkbox resolution ↓
    trimestersPrenatalCare = req.body.trimesters_prenatal_care
    if (typeof(trimestersPrenatalCare) == "undefined"){
      trimestersPrenatalCare = [""]
    } else if (typeof(trimestersPrenatalCare) == "string") {
      trimestersPrenatalCare = [trimestersPrenatalCare]
    }
    prenatalTests = req.body.prenatal_tests
    if (typeof(prenatalTests) == "undefined"){
      prenatalTests = [""]
    } else if (typeof(prenatalTests) == "string") {
      prenatalTests = [prenatalTests]
    }
    whenCigarettesPregnancy = req.body.when_cigarettes_pregnancy
    if (typeof(whenCigarettesPregnancy) == "undefined"){
      whenCigarettesPregnancy = [""]
    } else if (typeof(whenCigarettesPregnancy) == "string") {
      whenCigarettesPregnancy = [whenCigarettesPregnancy]
    }
    whenAlcoholPregnancy = req.body.when_alcohol_pregnancy
    if (typeof(whenAlcoholPregnancy) == "undefined"){
      whenAlcoholPregnancy = [""]
    } else if (typeof(whenAlcoholPregnancy) == "string") {
      whenAlcoholPregnancy = [whenAlcoholPregnancy]
    }
    usedDrugsPregnancy = req.body.used_drugs_pregnancy
    if (typeof(usedDrugsPregnancy) == "undefined"){
      usedDrugsPregnancy = [""]
    } else if (typeof(usedDrugsPregnancy) == "string") {
      usedDrugsPregnancy = [usedDrugsPregnancy]
    }
    whenDrugsPregnancy = req.body.when_drugs_pregnancy
    if (typeof(whenDrugsPregnancy) == "undefined"){
      whenDrugsPregnancy = [""]
    } else if (typeof(whenDrugsPregnancy) == "string") {
      whenDrugsPregnancy = [whenDrugsPregnancy]
    }
    firstCaregiver = req.body.first_caregiver
    if (typeof(firstCaregiver) == "undefined"){
      firstCaregiver = [""]
    } else if (typeof(firstCaregiver) == "string") {
      firstCaregiver = [firstCaregiver]
    }
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
      pregbirth.trimestersPrenatalCare = trimestersPrenatalCare            // 1, 2, 3
      pregbirth.prenatalTests = prenatalTests                      // had_ultrasound, had_amniocentesis, had_cvs
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
      pregbirth.whenCigarettesPregnancy = whenCigarettesPregnancy           // 1, 2, 3, UNKNOWN
      pregbirth.usedAlcoholPregnancy = req.body.used_alcohol_pregnancy              // TRUE, FALSE, UNKNOWN
      pregbirth.alcoholPerDayPregnancy = req.body.alcohol_per_day_pregnancy           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
      pregbirth.whenAlcoholPregnancy = whenAlcoholPregnancy              // 1, 2, 3, UNKNOWN
      pregbirth.usedDrugsPregnancy = usedDrugsPregnancy                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
      pregbirth.usedDrugsPregnancyOther = req.body.used_drugs_pregnancy_other
      pregbirth.whenDrugsPregnancy = whenDrugsPregnancy                // 1, 2, 3, UNKNOWN
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
      pregbirth.firstCaregiver = firstCaregiver                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
      pregbirth.firstCaregiverOther = req.body.first_caregiver_other
      pregbirth.hadFeedingProblems = req.body.had_feeding_problems                // TRUE, FALSE, UNKNOWN
      pregbirth.feedingProblems = req.body.feeding_problems
      await pregbirth.save();
      res.redirect('/patients/'+req.body.patientId+'/history/pregbirth')
    } catch (e) {
      next(e)
    }
});
                        //------------------------------//
                        //------------------------------//
                        //        /familymedical        //
                        //------------------------------//
                        //------------------------------//
// Work in Progress
router.get('/:patientId/history/familymedical',
  isLoggedIn,
  async (req, res, next) => {
    console.log(req.params.patientId)
    let patientId = req.params.patientId;
    let patient = await Patient.findOne({_id:patientId})
    let familymedical = await FamilyMedical.findOne({patientId:patientId})
    console.log(familymedical)
    res.locals.patient = patient
    res.locals.familymedical = familymedical
    res.render('showFamilyMedicalHistory');
});

router.get('/:patientId/history/familymedical/form',
  isLoggedIn,
  async (req, res, next) => {
      let patientId = req.params.patientId;
      res.locals.patientId = patientId
      res.render('formFamilyMedicalHistory');
});

router.get('/:patientId/history/familymedical/edit',
  isLoggedIn,
  async (req, res, next) => {
      let patientId = req.params.patientId;
      res.locals.patientId = patientId
      console.log(patientId)
      res.locals.familymedical = await FamilyMedical.findOne({patientId:patientId})
      res.render('editFamilyMedicalHistory');
});

router.post('/history/familymedical/form',
  isLoggedIn,
  async (req, res, next) => {
    const patient = await Patient.findOne({_id:req.body.patientID})
    // Checkbox resolution ↓
    familyRelationAlcohol = req.body.family_relation_alcohol
    if (typeof(familyRelationAlcohol) == "undefined"){
      familyRelationAlcohol = [""]
    } else if (typeof(familyRelationAlcohol) == "string") {
      familyRelationAlcohol = [familyRelationAlcohol]
    }
    familyRelationADHD = req.body.family_relation_adhd
    if (typeof(familyRelationADHD) == "undefined"){
      familyRelationADHD = [""]
    } else if (typeof(familyRelationADHD) == "string") {
      familyRelationADHD = [familyRelationADHD]
    }
    familyRelationAutism = req.body.family_relation_autism
    if (typeof(familyRelationAutism) == "undefined"){
      familyRelationAutism = [""]
    } else if (typeof(familyRelationAutism) == "string") {
      familyRelationAutism = [familyRelationAutism]
    }
    familyRelationBehaviorProblems = req.body.family_relation_behaviorproblems
    if (typeof(familyRelationBehaviorProblems) == "undefined"){
      familyRelationBehaviorProblems = [""]
    } else if (typeof(familyRelationBehaviorProblems) == "string") {
      familyRelationBehaviorProblems = [familyRelationBehaviorProblems]
    }
    familyRelationBipolar = req.body.family_relation_bipolar
    if (typeof(familyRelationBipolar) == "undefined"){
      familyRelationBipolar = [""]
    } else if (typeof(familyRelationBipolar) == "string") {
      familyRelationBipolar = [familyRelationBipolar]
    }
    familyRelationVisualImpaired = req.body.family_relation_visuallyimpaired
    if (typeof(familyRelationVisualImpaired) == "undefined"){
      familyRelationVisualImpaired = [""]
    } else if (typeof(familyRelationVisualImpaired) == "string") {
      familyRelationVisualImpaired = [familyRelationVisualImpaired]
    }
    familyRelationCeliac = req.body.family_relation_celiac
    if (typeof(familyRelationCeliac) == "undefined"){
      familyRelationCeliac = [""]
    } else if (typeof(familyRelationCeliac) == "string") {
      familyRelationCeliac = [familyRelationCeliac]
    }
    familyRelation = req.body.family_relation_cerebralpalsy
    if (typeof(familyRelation) == "undefined"){
      familyRelationCerebralPalsy = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationCerebralPalsy = [familyRelation]
    }
    familyRelation = req.body.family_relation_hearingproblems
    if (typeof(familyRelation) == "undefined"){
      familyRelationHearingProblems = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationHearingProblems = [familyRelation]
    }
    familyRelation = req.body.family_relation_depression
    if (typeof(familyRelation) == "undefined"){
      familyRelationDepression = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationDepression = [familyRelation]
    }
    familyRelation = req.body.family_relation_diabetes
    if (typeof(familyRelation) == "undefined"){
      familyRelationDiabetes = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationDiabetes = [familyRelation]
    }
    familyRelation = req.body.family_relation_drugs
    if (typeof(familyRelation) == "undefined"){
      familyRelationDrugs = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationDrugs = [familyRelation]
    }
    familyRelation = req.body.family_relation_genetic
    if (typeof(familyRelation) == "undefined"){
      familyRelationGenetic = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationGenetic = [familyRelation]
    }
    familyRelation = req.body.family_relation_heartproblems
    if (typeof(familyRelation) == "undefined"){
      familyRelationHeartProblems = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationHeartProblems = [familyRelation]
    }
    familyRelation = req.body.family_relation_heartrhythm
    if (typeof(familyRelation) == "undefined"){
      familyRelationHeartRhythm = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationHeartRhythm = [familyRelation]
    }
    familyRelation = req.body.family_relation_intellectual
    if (typeof(familyRelation) == "undefined"){
      familyRelationIntellectual = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationIntellectual = [familyRelation]
    }
    familyRelation = req.body.family_relation_dyscalculia
    if (typeof(familyRelation) == "undefined"){
      familyRelationDyscalculia = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationDyscalculia = [familyRelation]
    }
    familyRelation = req.body.family_relation_migraine
    if (typeof(familyRelation) == "undefined"){
      familyRelationMigraine = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationMigraine = [familyRelation]
    }
    familyRelation = req.body.family_relation_ocd
    if (typeof(familyRelation) == "undefined"){
      familyRelationOCD = [""]
    } else if (typeof(familyRelation) == "string") {
      familyRelationOCD = [familyRelation]
    }
    familyRelationPanicAttacks = req.body.family_relation_panicattacks
    if (typeof(familyRelationPanicAttacks) == "undefined"){
      familyRelationPanicAttacks = [""]
    } else if (typeof(familyRelationPanicAttacks) == "string") {
      familyRelationPanicAttacks = [familyRelationPanicAttacks]
    }
    familyRelationAbuse = req.body.family_relation_abuse
    if (typeof(familyRelationAbuse) == "undefined"){
      familyRelation = [""]
    } else if (typeof(familyRelationAbuse) == "string") {
      familyRelationAbuse = [familyRelationAbuse]
    }
    familyRelationPTSD = req.body.family_relation_ptsd
    if (typeof(familyRelationPTSD) == "undefined"){
      familyRelationPTSD = [""]
    } else if (typeof(familyRelationPTSD) == "string") {
      familyRelationPTSD = [familyRelationPTSD]
    }
    familyRelationDyslexia = req.body.family_relation_dyslexia
    if (typeof(familyRelationDyslexia) == "undefined"){
      familyRelationDyslexia = [""]
    } else if (typeof(familyRelationDyslexia) == "string") {
      familyRelationDyslexia = [familyRelationDyslexia]
    }
    familyRelationSchizophrenia = req.body.family_relation_schizophrenia
    if (typeof(familyRelationSchizophrenia) == "undefined"){
      familyRelationSchizophrenia = [""]
    } else if (typeof(familyRelationSchizophrenia) == "string") {
      familyRelationSchizophrenia = [familyRelationSchizophrenia]
    }
    familyRelationSchoolProblems = req.body.family_relation_schoolproblems
    if (typeof(familyRelationSchoolProblems) == "undefined"){
      familyRelationSchoolProblems = [""]
    } else if (typeof(familyRelationSchoolProblems) == "string") {
      familyRelationSchoolProblems = [familyRelationSchoolProblems]
    }
    familyRelationSocialProblems = req.body.family_relation_socialproblems
    if (typeof(familyRelationSocialProblems) == "undefined"){
      familyRelationSocialProblems = [""]
    } else if (typeof(familyRelationSocialProblems) == "string") {
      familyRelationSocialProblems = [familyRelationSocialProblems]
    }
    familyRelationSpeechLanguage = req.body.family_relation_speechlanguage
    if (typeof(familyRelationSpeechLanguage) == "undefined"){
      familyRelationSpeechLanguage = [""]
    } else if (typeof(familyRelationSpeechLanguage) == "string") {
      familyRelationSpeechLanguage = [familyRelationSpeechLanguage]
    }
    familyRelationThyroid = req.body.family_relation_thyroid
    if (typeof(familyRelationThyroid) == "undefined"){
      familyRelationThyroid = [""]
    } else if (typeof(familyRelationThyroid) == "string") {
      familyRelationThyroid = [familyRelationThyroid]
    }
    familyRelationTics = req.body.family_relation_tics
    if (typeof(familyRelationTics) == "undefined"){
      familyRelationTics = [""]
    } else if (typeof(familyRelationTics) == "string") {
      familyRelationTics = [familyRelationTics]
    }
    familyRelationLawTrouble = req.body.family_relation_lawtrouble
    if (typeof(familyRelationLawTrouble) == "undefined"){
      familyRelationLawTrouble = [""]
    } else if (typeof(familyRelationLawTrouble) == "string") {
      familyRelationLawTrouble = [familyRelationLawTrouble]
    }
    familyRelationDysgraphia = req.body.family_relation_dysgraphia
    if (typeof(familyRelationDysgraphia) == "undefined"){
      familyRelationDysgraphia = [""]
    } else if (typeof(familyRelationDysgraphia) == "string") {
      familyRelationDysgraphia = [familyRelationDysgraphia]
    }
    const familymedical = new FamilyMedical(
    { patientId: patient._id,
      familyAlcohol: req.body.family_alcohol,
      familyRelationAlcohol: familyRelationAlcohol,
      familyRelationsAlcoholElaborate: req.body.family_relation_alcohol_elaborate,
      familyADHD: req.body.family_adhd,
      familyRelationADHD: familyRelationADHD,
      familyRelationADHDElaborate: req.body.family_relation_adhd_elaborate,
      familyAutism: req.body.family_autism,
      familyRelationAutism: familyRelationAutism,
      familyRelationAutismElaborate: req.body.family_relation_autism_elaborate,
      familyBehaviorProblems: req.body.family_behaviorproblems,
      familyRelationBehaviorProblems: familyRelationBehaviorProblems,
      familyRelationBehaviorProblemsElaborate: req.body.family_relation_behaviorproblems_elaborate,
      familyBipolar: req.body.family_bipolar,
      familyRelationBipolar: familyRelationBipolar,
      familyRelationBipolarElaborate: req.body.family_relation_bipolar_elaborate,
      familyVisualImpaired: req.body.family_visuallyimpaired,
      familyRelationVisualImpaired: familyRelationVisualImpaired,
      familyRelationVisualImpairedElaborate: req.body.family_relation_visuallyimpaired_elaborate,
      familyCeliac: req.body.family_celiac,
      familyRelationCeliac: familyRelationCeliac,
      familyRelationCeliacElaborate: req.body.family_relation_celiac_elaborate,
      familyCerebralPalsy: req.body.family_cerebralpalsy,
      familyRelationCerebralPalsy: familyRelationCerebralPalsy,
      familyRelationCerebralPalsyElaborate: req.body.family_relation_cerebralpalsy_elaborate,
      familyHearingProblems: req.body.family_hearingproblems,
      familyRelationHearingProblems: familyRelationHearingProblems,
      familyRelationHearingProblemsElaborate: req.body.family_relation_hearingproblems_elaborate,
      familyDepression: req.body.family_depression,
      familyRelationDepression: familyRelationDepression,
      familyRelationDepressionElaborate: req.body.family_relation_depression_elaborate,
      familyDiabetes: req.body.family_diabetes,
      familyRelationDiabetes: familyRelationDiabetes,
      familyRelationDiabetesElaborate: req.body.family_relation_diabetes_elaborate,
      familyDrugs: req.body.family_drugs,
      familyRelationDrugs: familyRelationDrugs,
      familyRelationDrugsElaborate: req.body.family_relation_drugs_elaborate,
      familySeizures: req.body.family_seizures,
      familyRelationSeizures: familyRelationSeizures,
      familyRelationSeizuresElaborate: req.body.family_relation_seizures_elaborate,
      familyGenetic: req.body.family_genetic,
      familyRelationGenetic: familyRelationGenetic,
      familyRelationGeneticElaborate: req.body.family_relation_genetic_elaborate,
      familyHeartProblems: req.body.family_heartproblems,
      familyRelationHeartProblems: familyRelationHeartProblems,
      familyRelationHeartProblemsElaborate: req.body.family_relation_heartproblems_elaborate,
      familyHeartRhythm: req.body.family_heartrhythm,
      familyRelationHeartRhythm: familyRelationHeartRhythm,
      familyRelationHeartRhythmElaborate: req.body.family_relation_heartrhythm_elaborate,
      familyIntellectual: req.body.family_intellectual,
      familyRelationIntellectual: familyRelationIntellectual,
      familyRelationIntellectualElaborate: req.body.family_relation_intellectual_elaborate,
      familyDyscalculia: req.body.family_dyscalculia,
      familyRelationDyscalculia: familyRelationDyscalculia,
      familyRelationDyscalculiaElaborate: req.body.family_relation_dyscalculia_elaborate,
      familyMigraine: req.body.family_migraine,
      familyRelationMigraine: familyRelationMigraine,
      familyRelationMigraineElaborate: req.body.family_relation_migraine_elaborate,
      familyOCD: req.body.family_ocd,
      familyRelationOCD: familyRelationOCD,
      familyRelationOCDElaborate: req.body.family_relation_ocd_elaborate,
      familyPanicAttacks: req.body.family_panicattacks,
      familyRelationPanicAttacks: familyRelationPanicAttacks,
      familyRelationPanicAttacksElaborate: req.body.family_relation_panicattacks_elaborate,
      familyAbuse: req.body.family_abuse,
      familyRelationAbuse: familyRelationAbuse,
      familyRelationAbuseElaborate: req.body.family_relation_abuse_elaborate,
      familyPTSD: req.body.family_ptsd,
      familyRelationPTSD: familyRelationPTSD,
      familyRelationPTSDElaborate: req.body.family_relation_ptsd_elaborate,
      familyDyslexia: req.body.family_dyslexia,
      familyRelationDyslexia: familyRelationDyslexia,
      familyRelationDyslexiaElaborate: req.body.family_relation_dyslexia_elaborate,
      familySchizophrenia: req.body.family_schizophrenia,
      familyRelationSchizophrenia: familyRelationSchizophrenia,
      familyRelationSchizophreniaElaborate: req.body.family_relation_schizophrenia_elaborate,
      familySchoolProblems: req.body.family_schoolproblems,
      familyRelationSchoolProblems: familyRelationSchoolProblems,
      familyRelationSchoolProblemsElaborate: req.body.family_relation_schoolproblems_elaborate,
      familySocialProblems: req.body.family_socialproblems,
      familyRelationSocialProblems: familyRelationSocialProblems,
      familyRelationSocialProblemsElaborate: req.body.family_relation_socialproblems_elaborate,
      familySpeechLanguage: req.body.family_speechlanguage,
      familyRelationSpeechLanguage: familyRelationSpeechLanguage,
      familyRelationSpeechLanguageElaborate: req.body.family_relation_speechlanguage_elaborate,
      familyThyroid: req.body.family_thyroid,
      familyRelationThyroid: familyRelationThyroid,
      familyRelationThyroidElaborate: req.body.family_relation_thyroid_elaborate,
      familyTics: req.body.family_tics,
      familyRelationTics: familyRelationTics,
      familyRelationTicsElaborate: req.body.family_relation_tics_elaborate,
      familyLawTrouble: req.body.family_lawtrouble,
      familyRelationLawTrouble: familyRelationLawTrouble,
      familyRelationLawTroubleElaborate: req.body.family_relation_lawtrouble_elaborate,
      familyDysgraphia: req.body.family_dysgraphia,
      familyRelationDysgraphia: familyRelationDysgraphia,
      familyRelationDysgraphiaElaborate: req.body.family_relation_dysgraphia_elaborate,
    })
    await familymedical.save();
    patient.familyMedicalHistory = familymedical._id
    await patient.save();
    console.log(patient.familyMedicalHistory)
    console.log(familymedical._id)
    console.log(familymedical.patientId)
    console.log(patient._id)
    res.redirect('/patients/'+patient._id+'/history/pregbirth')
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//                                  /evaluations                                  //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//







module.exports = router;
