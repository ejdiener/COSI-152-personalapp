'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



module.exports = mongoose.model( 'PregBirth', PregBirthSchema );
