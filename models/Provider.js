'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


var ProviderSchema = Schema( {
  userId: ObjectId,
  providerName: String,
  providerPronouns: String,
  providerRole: String,
  providerEducation: String,
  providerOrganization: String,
  providerAddress: String,
  providerPhone: String,
  providerEmail: String,
  providerBio: String,
//  providerPhoto: File,

  patientIds: [{type:ObjectId, ref:"Patient"}],  //LIST

} );

module.exports = mongoose.model( 'Provider', ProviderSchema );
