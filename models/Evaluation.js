'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var EvaluationSchema = Schema( {
  userId: ObjectId,
  dateEval: Date
} );

module.exports = mongoose.model( 'Evaluation', EvaluationSchema );
