'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


var PregBirthSchema = Schema( {
    patientId: ObjectId,
    adoption_status: String,                     // TRUE, FALSE
    country_of_origin: String,
    mother_total_pregnancies: Number,
    mother_total_children: Number,
    mother_older_children: Number,
    had_miscarriage: String,                     // TRUE, FALSE, UNKNOWN
    miscarriages_total: Number,
    had_termination_anomalies: String,           // TRUE, FALSE, UNKNOWN
    termination_anomalies_total: Number,
    termination_anomalies_cause: String,
    required_fertility: String,                  // TRUE, FALSE, UNKNOWN
    fertility_treatment: String,
    had_prenatal_care: String,                   // TRUE, FALSE, UNKNOWN
    trimesters_prenatal_care: String,            // 1, 2, 3
    prenatal_tests: String,                      // had_ultrasound, had_amniocentesis, had_cvs
    prenatal_diagnosis: String,
    had_infection_pregnancy: String,             // TRUE, FALSE, UNKNOWN
    infection_pregnancy: String,
    had_hypertension_pregnancy: String,          // TRUE, FALSE, UNKNOWN
    had_diabetes_pregnancy: String,              // TRUE, FALSE, UNKNOWN
    used_overthecounter_pregnancy: String,       // TRUE, FALSE, UNKNOWN
    overthecounter_pregnancy: String,
    used_herbal: String,                         // TRUE, FALSE, UNKNOWN
    herbal_pregnancy: String,
    used_prescription_pregnancy: String,         // TRUE, FALSE, UNKNOWN
    prescription_pregnancy: String,
    used_cigarettes_pregnancy: String,           // TRUE, FALSE, UNKNOWN
    cigarettes_per_day_pregnancy: Number,
    cigarettes_per_day_pregnancy_unit: String,   // loose, packs
    when_cigarettes_pregnancy: String            // 1, 2, 3, UNKNOWN

} );
/*
        <td> ...use alcohol during the pregnancy? </td>
        <td> <input type="radio" name ="used_alcohol_pregnancy" value="TRUE">&nbsp;YES&nbsp;&nbsp;
             <input type="radio" name ="used_alcohol_pregnancy" value="FALSE">&nbsp;NO&nbsp;&nbsp;
             <input type="radio" name ="used_alcohol_pregnancy" value="UNKNOWN">&nbsp;UNKNOWN<br><br>
             If yes, how many drinks?<br>
                <input type="radio" name="alcohol_per_day_pregnancy" value="1_per_week"> &nbsp;1 drink or less per week&nbsp;&nbsp;
                <input type="radio" name="alcohol_per_day_pregnancy" value="1_per_day"> &nbsp;1 drink or less per day&nbsp;&nbsp;
                <input type="radio" name="alcohol_per_day_pregnancy" value="2_per_day"> &nbsp;2 drinks or more per day&nbsp;&nbsp;
                <input type="radio" name="alcohol_per_day_pregnancy" value="UNKNOWN"> Amount unknown<br><br>
             During which trimester(s)?<br>
                <input type="checkbox" name="when_alcohol_pregnancy" value="1">&nbsp;1st&nbsp;&nbsp;
                <input type="checkbox" name="when_alcohol_pregnancy" value="2">&nbsp;2nd&nbsp;&nbsp;
                <input type="checkbox" name="when_alcohol_pregnancy" value="3">&nbsp;3rd&nbsp;&nbsp;
                <input type="checkbox" name="when_alcohol_pregnancy" value="UNKNOWN">&nbsp;Unknown&nbsp;&nbsp;</td>
    </tr>
    <tr>
        <td> ...use any substances during the pregnancy? </td>
        <td> <input type="checkbox" name ="used_drugs_pregnancy" value="tobacco">&nbsp;Tobacco (vaping, chewing, etc.)&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="marijuana">&nbsp;Marijuana/cannabis&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="cocaine">&nbsp;Cocaine&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="heroin">&nbsp;Heroin&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="painkillers">&nbsp;Painkillers&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="cocaine">&nbsp;Methamphetamine&nbsp;&nbsp;
             <input type="checkbox" name ="used_drugs_pregnancy" value="others">&nbsp;Other:&nbsp;
                <input type="text" name="used_drugs_pregnancy_other"><br><br>
             During which trimester(s)?&nbsp;
                <input type="checkbox" name="when_drugs_pregnancy" value="1">&nbsp;1st&nbsp;&nbsp;
                <input type="checkbox" name="when_drugs_pregnancy" value="2">&nbsp;2nd&nbsp;&nbsp;
                <input type="checkbox" name="when_drugs_pregnancy" value="3">&nbsp;3rd&nbsp;&nbsp;
                <input type="checkbox" name="when_drugs_pregnancy" value="UNKNOWN">&nbsp;Unknown&nbsp;&nbsp;</td>
    </tr>
    <tr>
        <td> ...have any other complications during the pregnancy? </td>
        <td> <textarea name="other_complications_pregnancy" rows="2" cols="40"></textarea></td>
    </tr>
  </tbody>
</table>
<hr>

<h3> Birth History </h3>
<div class="row">
  <div class="col"> What was the age of the birth mother when this child was born? </div>
  <div class="col"> <input type="number" name ="mother_age_birth"></div>
</div>
<div class="row">
  <div class="col"> What was the age of the birth father when this child was born? </div>
  <div class="col"> <input type="number" name ="father_age_birth"></div>
</div>
<div class="row">
  <div class="col"> What was the gestational age of the child when born (i.e. how many weeks)? </div>
  <div class="col"> <input type="text" name ="gestational_age"></div>
</div>
<div class="row">
  <div class="col"> What was the birth weight of the child? </div>
  <div class="col"> <input type="text" name ="gestational_age"></div>
</div>

<table class="table table-bordered table-striped"
  <tbody>
    <tr>
        <td> Was this child... </td>
        <td> <input type="radio" name ="pregnancy_numbers" value="singleton">&nbsp;A singleton&nbsp;&nbsp;
             <input type="radio" name ="pregnancy_numbers" value="twin">&nbsp;One of twins&nbsp;&nbsp;
             <input type="radio" name ="pregnancy_numbers" value="triplet">&nbsp;One of triplets&nbsp;&nbsp;
             <input type="radio" name ="pregnancy_numbers" value="other">&nbsp;Other multiple</td>
    </tr>
    <tr>
        <td> Was this child born by... </td>
        <td> <input type="radio" name ="delivery_method" value="vaginal">&nbsp;Vaginal birth&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Scheduled Caesarean section&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Unplanned Caesarean section&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Vaginal birth after previous C-section&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Scheduled induction&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Forecep-assisted vaginal delivery&nbsp;&nbsp;
             <input type="radio" name ="delivery_method" value="caesarean">&nbsp;Vacuum-assisted vaginal delivery&nbsp;&nbsp;</td>
    </tr>
    <tr>
        <td> Were there any complications during labor/delivery? </td>
        <td> <textarea name="other_complications_delivery" rows="2" cols="40"></textarea> </td>
    </tr>
    <tr>
        <td> Was this child admitted to the Special Care Nursery or Neonatal Intensive Care Unit (NICU)? </td>
        <td> <input type="radio" name ="admitted_to_nicu" value="TRUE">&nbsp;YES&nbsp;&nbsp;
             <input type="radio" name ="admitted_to_nicu" value="FALSE">&nbsp;NO&nbsp;&nbsp;
             <input type="radio" name ="admitted_to_nicu" value="UNKNOWN">&nbsp;UNKNOWN<br><br>
             If yes, how long was this child hospitalized (if known)?&nbsp;<input type="text" name="time_in_nicu"></td>
    </tr>
    <tr>
        <td> Did this child have any problems within the first few days of life? </td>
        <td> <textarea name="other_complications_delivery" rows="2" col="40"></textarea> </td>
    </tr>
    <tr>
        <td> When discharged from the hospital, who did your child go home with? </td>
        <td> <input type="checkbox" name="first_caregiver" value="bio_mother">&nbsp;Biological mother&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="bio_father">&nbsp;Biological father&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="bio_parents">&nbsp;Biological parents&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="adoptive_parents">&nbsp;Adoptive parents&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="grandparent">&nbsp;Grandparent(s)&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="other_relative">&nbsp;Other relative(s)&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="foster_parent">&nbsp;Foster parent(s)&nbsp;&nbsp;
             <input type="checkbox" name="first_caregiver" value="other">&nbsp;Other<br><br>
                If other or other relative, please elaborate (if known).&nbsp;<input type="text" name="first_caregiver_other"> </td>
    </tr>
    <tr>
        <td> Did this child have any feeding problems as a newborn or infant? </td>
        <td> <input type="radio" name ="had_feeding_problems" value="TRUE">&nbsp;YES&nbsp;&nbsp;
             <input type="radio" name ="had_feeding_problems" value="FALSE">&nbsp;NO&nbsp;&nbsp;
             <input type="radio" name ="had_feeding_problems" value="UNKNOWN">&nbsp;UNKNOWN<br>
                If yes, please elaborate (if known).&nbsp;<input type="text" name="feeding_problems"> </td>
*/

module.exports = mongoose.model( 'PregBirth', PregBirthSchema );
