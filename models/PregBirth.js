'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var PregBirthSchema = Schema( {
    patientId: ObjectId,
    adoptionStatus: String,                    // TRUE, FALSE
    countryOfOrigin: String,
    motherTotalPregnancies: Number,
    motherTotalChildren: Number,
    motherOlderChildren: Number,
    birthOrder: Number,
    hadMiscarriage: String,                    // TRUE, FALSE, UNKNOWN
    miscarriagesTotal: String,
    hadTerminationAnomalies: String,           // TRUE, FALSE, UNKNOWN
    terminationAnomaliesTotal: String,
    terminationAnomaliesCause: String,
    requiredFertilityTreatment: String,        // TRUE, FALSE, UNKNOWN
    fertilityTreatment: String,
    hadPrenatalCare: String,                   // TRUE, FALSE, UNKNOWN
    trimestersPrenatalCare: [{type:String}],            // 1, 2, 3
    prenatalTests: [{type:String}],                     // had_ultrasound, had_amniocentesis, had_cvs
    prenatalDiagnosis: String,
    hadInfectionPregnancy: String,             // TRUE, FALSE, UNKNOWN
    infectionPregnancy: String,
    hadHypertensionPregnancy: String,          // TRUE, FALSE, UNKNOWN
    hadDiabetesPregnancy: String,              // TRUE, FALSE, UNKNOWN
    usedOverTheCounterPregnancy: String,       // TRUE, FALSE, UNKNOWN
    overTheCounterPregnancy: String,
    usedHerbalPregnancy: String,               // TRUE, FALSE, UNKNOWN
    herbalPregnancy: String,
    usedPrescriptionPregnancy: String,         // TRUE, FALSE, UNKNOWN
    prescriptionPregnancy: String,
    usedCigarettesPregnancy: String,           // TRUE, FALSE, UNKNOWN
    cigarettesPerDayPregnancy: String,
    cigarettesPerDayPregnancyUnit: String,   // loose, packs
    whenCigarettesPregnancy: [{type:String}],           // 1, 2, 3, UNKNOWN
    usedAlcoholPregnancy: String,              // TRUE, FALSE, UNKNOWN
    alcoholPerDayPregnancy: String,           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
    whenAlcoholPregnancy: [{type:String}],              // 1, 2, 3, UNKNOWN
    usedDrugsPregnancy: [{type:String}],                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
    usedDrugsPregnancyOther: String,
    whenDrugsPregnancy: [{type:String}],                // 1, 2, 3, UNKNOWN
    otherComplicationsPregnancy: String,
    motherAgeBirth: Number,
    fatherAgeBirth: Number,
    gestationalAge: String,
    birthWeight: String,
    pregnancyNumbers: String,                   // singleton, twin, triplet, other
    deliveryMethod: String,                     // vaginal, scheduled_caesarean, unplanned_caesarean, vaginal_after_caesarean, scheduled_induction, forcep_vaginal, vacuum_vaginal, UNKNOWN
    otherComplicationsDelivery: String,
    admittedToNICU: String,                    // TRUE, FALSE, UNKNOWN
    timeInNICU: String,
    complicationsNeonatal: String,
    firstCaregiver: [{type:String}],                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
    firstCaregiverOther: String,
    hadFeedingProblems: String,                // TRUE, FALSE, UNKNOWN
    feedingProblems: String
} );

module.exports = mongoose.model( 'PregBirth', PregBirthSchema );
