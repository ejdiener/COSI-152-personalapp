'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


//Create a page to create a patient
var PatientSchema = Schema( {
  patientId: ObjectId,
  patientName: String,
  patientGuardian: String,      // ObjectId??
  currentProviders: ObjectId,

  PregBirthHistory: ObjectId,                 // SCHEMA: Stores results of PregBirthHistory form
  DevelopmentHistory: ObjectId,               // SCHEMA: Stores results of DevelopmentHistory form
  HealthHistory: ObjectId,                    // SCHEMA: Stores results of HeathHistory form
  SocialHistory: ObjectId,                    // SCHEMA: Stores results of HeathHistory form
  FamilyMedHistory: ObjectId,                 // SCHEMA: Stores results of PregBirthHistory form
  EducationHistory: ObjectId,                 // SCHEMA: Stores results of ProvidersHistory form
  EvaluationHistory: ObjectId,                // LIST?? of previous evaluations
  ProvidersHistory: ObjectId,                 // SCHEMA: Stores results of ProvidersHistory form
  CurrentProviders: ObjectId,                 // SCHEMA?? of current providers

} );

module.exports = mongoose.model( 'Patient', PatientSchema );


// Patient stores history (which includes a lot of forms, but only one copy of each one)
  // The whole history can be passed into a history page, where it can be displayed as a whole
    // Both the whole history or the individual parts of the history can be exported to a .doc file

// Patient stores multiple evaluations, which in turn stores a bundle of tests
  // The whole evaluation can be displayed as a whole, including all test Schemas stored within
    // Each individual test can also be viewed, but more likely the test will be viewed as part of the whole evaluation
      // It would almost be best to have the WISC-V and WJ-IV-ACH stored as 'templates' that could be embedded into the display for the evaluation.
      // Evaluation results as a whole can be exported to a .doc file
