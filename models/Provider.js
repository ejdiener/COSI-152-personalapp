'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


var PatientSchema = Schema( {
  providerId: ObjectId,
  providerName: String,
  providerEducation: String,
  providerOrganization: String,
  providerAddress: String,
  providerPhone: String,
  providerEmail: String,
  

  patientId: ObjectId,  //LIST

} );

module.exports = mongoose.model( 'Patient', PatientSchema );
