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
    miscarriagesTotal: Number,
    hadTerminationAnomalies: String,           // TRUE, FALSE, UNKNOWN
    terminationAnomaliesTotal: Number,
    terminationAnomaliesCause: String,
    requiredFertilityTreatment: String,        // TRUE, FALSE, UNKNOWN
    fertilityTreatment: String,
    hadPrenatalCare: String,                   // TRUE, FALSE, UNKNOWN
    trimestersPrenatalCare: String,            // 1, 2, 3
    prenatalTests: String,                     // had_ultrasound, had_amniocentesis, had_cvs
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
    cigarettesPerDayPregnancy: Number,
    cigarettesPerDayPregnancyUnit: String,   // loose, packs
    whenCigarettesPregnancy: String,           // 1, 2, 3, UNKNOWN
    usedAlcoholPregnancy: String,              // TRUE, FALSE, UNKNOWN
    alcoholPerDayPregnancy: String,           // 1_per_week, 1_per_day, 2_plus_per_day, UNKNOWN
    whenAlcoholPregnancy: String,              // 1, 2, 3, UNKNOWN
    usedDrugsPregnancy: String,                // tobacco, marijuana, cocaine, heroin, painkillers, meth, other
    usedDrugsPregnancyOther: String,
    whenDrugsPregnancy: String,                // 1, 2, 3, UNKNOWN
    otherComplicationsPregnancy: String,
    motherAgeBirth: Number,
    fatherAgeBirth: Number,
    gestationalAge: Number,
    birthWeight: Number,
    pregnancyNumbers: String,                   // singleton, twin, triplet, other
    deliveryMethod: String,                     // vaginal, scheduled_caesarean, unplanned_caesarean, vaginal_after_caesarean, scheduled_induction, forcep_vaginal, vacuum_vaginal, UNKNOWN
    otherComplicationsDelivery: String,
    admittedToNICU: String,                    // TRUE, FALSE, UNKNOWN
    timeInNICU: String,
    complicationsNeonatal: String,
    firstCaregiver: String,                     // bio_mother, bio_father, bio_parents, adoptive_parents, grandparent, other_relative, foster_parent, other, UNKNOWN
    firstCaregiverOther: String,
    hadFeedingProblems: String,                // TRUE, FALSE, UNKNOWN
    feedingProblems: String
} );

module.exports = mongoose.model( 'PregBirth', PregBirthSchema );
