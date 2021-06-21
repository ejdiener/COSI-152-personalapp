'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var WJIVACHSchema = Schema( {
  userId: ObjectId,
  evalId: ObjectId,
  WJ_IV_ACHdate: Date,
  WJ_IV_ACH_1: Number,
  WJ_IV_ACH_2: Number,
  WJ_IV_ACH_3: Number,
  WJ_IV_ACH_4: Number,
  WJ_IV_ACH_5: Number,
  WJ_IV_ACH_6: Number,
  WJ_IV_ACH_7: Number,
  WJ_IV_ACH_8: Number,
  WJ_IV_ACH_9: Number,
  WJ_IV_ACH_10: Number,
  WJ_IV_ACH_11: Number,
  WJ_IV_ACH_12: Number,
  WJ_IV_ACH_13: Number,
  WJ_IV_ACH_14: Number,
  WJ_IV_ACH_15: Number,
  WJ_IV_ACH_16: Number,
  WJ_IV_ACH_17: Number,
  WJ_IV_ACH_18: Number,
  WJ_IV_ACH_19: Number,
  WJ_IV_ACH_20: Number,
  WJ_IV_ACH_r: Number,
  WJ_IV_ACH_br: Number,
  WJ_IV_ACH_brs: Number,
  WJ_IV_ACH_rc: Number,
  WJ_IV_ACH_rf: Number,
  WJ_IV_ACH_rr: Number,
  WJ_IV_ACH_m: Number,
  WJ_IV_ACH_bm: Number,
  WJ_IV_ACH_mcs: Number,
  WJ_IV_ACH_mps: Number,
  WJ_IV_ACH_wl: Number,
  WJ_IV_ACH_bwl: Number,
  WJ_IV_ACH_bws: Number,
  WJ_IV_ACH_we: Number,
  WJ_IV_ACH_as: Number,
  WJ_IV_ACH_af: Number,
  WJ_IV_ACH_aa: Number,
  WJ_IV_ACH_ak: Number,
  WJ_IV_ACH_pgk: Number,
  WJ_IV_ACH_ba: Number
} );

module.exports = mongoose.model( 'WJIVACH', WJIVACHSchema );
