'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Document in one collection has an ID, put that ID into another document

var WISCVSchema = Schema( {
  providerId: ObjectId,
  patientId: ObjectId,
  evalId: ObjectId,
  wisc_vDate: Date,
  wisc_vSI: Number,
  wisc_vVC: Number,
  wisc_vIN: Number,
  wisc_vCO: Number,
  wisc_vBD: Number,
  wisc_vVP: Number,
  wisc_vMR: Number,
  wisc_vFW: Number,
  wisc_vPC: Number,
  wisc_vAR: Number,
  wisc_vDS: Number,
  wisc_vPS: Number,
  wisc_vLN: Number,
  wisc_vCD: Number,
  wisc_vSS: Number,
  wisc_vCA: Number,
  wisc_vVCI: Number,
  wisc_vVSI: Number,
  wisc_vFRI: Number,
  wisc_vWMI: Number,
  wisc_vPSI: Number,
  wisc_vQRI: Number,
  wisc_vAWMI: Number,
  wisc_vNVI: Number,
  wisc_vGAI: Number,
  wisc_vCPI: Number,
  wisc_vNSI: Number,
  wisc_vSTI: Number,
  wisc_vSRI: Number,
  wisc_vFSIQ: Number
} );

module.exports = mongoose.model( 'WISCV', WISCVSchema );
