'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var PatientHistorySchema = Schema( {
    patientId: ObjectId,

// Pregnancy and Birth
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
    feedingProblems: String,

// Family Medical History
    familyAlcohol: String,
    familyRelationAlcohol: [{type:String}],
    familyRelationsAlcoholElaborate: String,
    familyADHD: String,
    familyRelationADHD: [{type:String}],
    familyRelationADHDElaborate: String,
    familyAutism: String,
    familyRelationAutism: [{type:String}],
    familyRelationAutismElaborate: String,
    familyBehaviorProblems: String,
    familyRelationBehaviorProblems: [{type:String}],
    familyRelationBehaviorProblemsElaborate: String,
    familyBipolar: String,
    familyRelationBipolar: [{type:String}],
    familyRelationBipolarElaborate: String,
    familyVisualImpaired: String,
    familyRelationVisualImpaired: [{type:String}],
    familyRelationVisualImpairedElaborate: String,
    familyCeliac: String,
    familyRelationCeliac: [{type:String}],
    familyRelationCeliacElaborate: String,
    familyCerebralPalsy: String,
    familyRelationCerebralPalsy: [{type:String}],
    familyRelationCerebralPalsyElaborate: String,
    familyHearingProblems: String,
    familyRelationHearingProblems: [{type:String}],
    familyRelationHearingProblemsElaborate: String,
    familyDepression: String,
    familyRelationDepression: [{type:String}],
    familyRelationDepressionElaborate: String,
    familyDiabetes: String,
    familyRelationDiabetes: [{type:String}],
    familyRelationDiabetesElaborate: String,
    familyDrugs: String,
    familyRelationDrugs: [{type:String}],
    familyRelationDrugsElaborate: String,
    familySeizures: String,
    familyRelationSeizures: [{type:String}],
    familyRelationSeizuresElaborate: String,
    familyGenetic: String,
    familyRelationGenetic: [{type:String}],
    familyRelationGeneticElaborate: String,
    familyHeartRhythm: String,
    familyRelationHeartRhythm: [{type:String}],
    familyRelationHeartRhythmElaborate: String,
    familyHeartProblems: String,
    familyRelationHeartProblems: [{type:String}],
    familyRelationHeartProblemsElaborate: String,
    familyIntellectual: String,
    familyRelationIntellectual: [{type:String}],
    familyRelationIntellectualElaborate: String,
    familyDyscalculia: String,
    familyRelationDyscalculia: [{type:String}],
    familyRelationDyscalculiaElaborate: String,
    familyMigraine: String,
    familyRelationMigraine: [{type:String}],
    familyRelationMigraineElaborate: String,
    familyOCD: String,
    familyRelationOCD: [{type:String}],
    familyRelationOCDElaborate: String,
    familyPanicAttacks: String,
    familyRelationPanicAttacks: [{type:String}],
    familyRelationPanicAttacksElaborate: String,
    familyAbuse: String,
    familyRelationAbuse: [{type:String}],
    familyRelationAbuseElaborate: String,
    familyPTSD: String,
    familyRelationPTSD: [{type:String}],
    familyRelationPTSDElaborate: String,
    familyDyslexia: String,
    familyRelationDyslexia: [{type:String}],
    familyRelationDyslexiaElaborate: String,
    familySchizophrenia: String,
    familyRelationSchizophrenia: [{type:String}],
    familyRelationSchizophreniaElaborate: String,
    familySchoolProblems: String,
    familyRelationSchoolProblems: [{type:String}],
    familyRelationSchoolProblemsElaborate: String,
    familySocialProblems: String,
    familyRelationSocialProblems: [{type:String}],
    familyRelationSocialProblemsElaborate: String,
    familySpeechLanguage: String,
    familyRelationSpeechLanguage: [{type:String}],
    familyRelationSpeechLanguageElaborate: String,
    familyThyroid: String,
    familyRelationThyroid: [{type:String}],
    familyRelationThyroidElaborate: String,
    familyTics: String,
    familyRelationTics: [{type:String}],
    familyRelationTicsElaborate: String,
    familyLawTrouble: String,
    familyRelationLawTrouble: [{type:String}],
    familyRelationLawTroubleElaborate: String,
    familyDysgraphia: String,
    familyRelationDysgraphia: [{type:String}],
    familyRelationDysgraphiaElaborate: String,
} );

module.exports = mongoose.model( 'PatientHistory', PatientHistorySchema );
