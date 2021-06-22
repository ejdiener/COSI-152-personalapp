'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


//Create a page to create a patient
var CurrentProvidersSchema = Schema( {
  currentprovidersId: ObjectId,
  patientId: ObjectId,

  guardianName: String,
  guardianAddress: String,
  guardianPhone: String,
  guardianRelationToChild: String,
  guardianId: ObjectId,

  pcpName: String,
  pcpOrganization: String,
  pcpAddress: String,
  pcpPhone: String,
  pcpId: ObjectId,

  dbpName: String,
  dbpOrganization: String,
  dbpAddress: String,
  dbpPhone: String,
  dbpId: ObjectId,

  teacherName: String,
  teacherOrganization: String,
  teacherAddress: String,
  teacherPhone: String,
  teacherId: ObjectId,

  classroomAideName: String,
  classroomAideOrganization: String,
  classroomAideAddress: String,
  classroomAidePhone: String,
  classroomAideId: ObjectId,

  occupationalTherapistName: String,
  occupationalTherapistOrganization: String,
  occupationalTherapistAddress: String,
  occupationalTherapistPhone: String,
  occupationalTherapistId: ObjectId,

  speechLanguageTherapistName: String,
  speechLanguageTherapistOrganization: String,
  speechLanguageTherapistAddress: String,
  speechLanguageTherapistPhone: String,
  speechLanguageTherapistId: ObjectId,

  physicalTherapistName: String,
  physicalTherapistOrganization: String,
  physicalTherapistAddress: String,
  physicalTherapistPhone: String,
  physicalTherapistId: ObjectId,

  behavioralTherapistName: String,
  behavioralTherapistOrganization: String,
  behavioralTherapistAddress: String,
  behavioralTherapistPhone: String,
  behavioralTherapistId: ObjectId,

  cognitiveBehavioralTherapistName: String,
  cognitiveBehavioralTherapistOrganization: String,
  cognitiveBehavioralTherapistAddress: String,
  cognitiveBehavioralTherapistPhone: String,
  cognitiveBehavioralTherapistId: ObjectId,

  developmentalSpecialistName: String,
  developmentalSpecialistOrganization: String,
  developmentalSpecialistAddress: String,
  developmentalSpecialistPhone: String,
  developmentalSpecialistId: ObjectId,

  socialWorkerName: String,
  socialWorkerOrganization: String,
  socialWorkerAddress: String,
  socialWorkerPhone: String,
  socialWorkerId: ObjectId,
} );

module.exports = mongoose.model( 'CurrentProviders', CurrentProviders );
