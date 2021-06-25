'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


//Create a page to create a patient
var PatientSchema = Schema( {
  patientName: String,
  patientPronouns: String,
  patientAddress: String,
  patientPhone: String,
  patientBio: String,
  CurrentProvidersIds: [{type:ObjectId, ref:"Provider"}],                 // SCHEMA?? of current providers

  PregBirthHistory: ObjectId,                 // SCHEMA: Stores results of PregBirthHistory form
//  DevelopmentHistory: ObjectId,               // SCHEMA: Stores results of DevelopmentHistory form
//  HealthHistory: ObjectId,                    // SCHEMA: Stores results of HeathHistory form
//  SocialHistory: ObjectId,                    // SCHEMA: Stores results of SocialHistory form
  FamilyMedHistory: ObjectId,                 // SCHEMA: Stores results of FamilyMedHistory form
//  EducationHistory: ObjectId,                 // SCHEMA: Stores results of EducationHistory form
//  ProvidersHistory: ObjectId,                 // SCHEMA: Stores results of ProvidersHistory form

  EvaluationHistory: [Schema.Types.ObjectId],                // LIST?? of previous evaluations
} );

module.exports = mongoose.model( 'Patient', PatientSchema );


// Patient stores history (which includes a lot of forms, but only one copy of each one)
  // The whole history can be passed into a history page, where it can be displayed as a whole
    // Both the whole history or the individual parts of the history can be exported to a .doc file
