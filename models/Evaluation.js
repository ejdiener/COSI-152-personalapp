'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var EvaluationSchema = Schema( {
  patientId: ObjectId,
  providerId: ObjectId,
  dateRequestEval: Date,
  dateFinishEval: Date,
  wiscvId: ObjectId,
  wjivachId: ObjectId,
} );

module.exports = mongoose.model( 'Evaluation', EvaluationSchema );
