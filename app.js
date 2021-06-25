const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const layouts = require("express-ejs-layouts");
//const auth = require('./config/auth.js');


const mongoose = require( 'mongoose' );
//mongoose.connect( `mongodb+srv://${auth.atlasAuth.username}:${auth.atlasAuth.password}@cluster0-yjamu.mongodb.net/authdemo?retryWrites=true&w=majority`);
mongoose.connect( 'mongodb://localhost/authDemo');
//const mongoDB_URI = process.env.MONGODB_URI
//mongoose.connect(mongoDB_URI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});

const authRouter = require('./routes/authentication');
const isLoggedIn = authRouter.isLoggedIn
const loggingRouter = require('./routes/logging');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const toDoRouter = require('./routes/todo');
const toDoAjaxRouter = require('./routes/todoAjax');
const profileRouter = require('./routes/profile');
const patientsRouter = require('./routes/patients');
const historyRouter = require('./routes/history');

const wiscvRouter = require('./routes/WISC_V');
const tempRouter = require('./routes/temp');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(layouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRouter)
app.use(loggingRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/patients', patientsRouter);

app.use('/todo',toDoRouter);
app.use('/todoAjax',toDoAjaxRouter);

// Can you do /evaluations/:evalID/WISC_V
app.use('/WISC_V',wiscvRouter);
app.use('/temp',tempRouter);

const myLogger = (req,res,next) => {
  console.log('inside a route!')
  next()
}

const Patient = require('./models/Patient');
const Provider = require('./models/Provider');

app.post("/formNewPatient",
  isLoggedIn,
  async (req, res, next) => {
    const patient = new Patient(
    { patientName: req.body.patientName,
      patientPronouns: req.body.patientPronouns,
      patientAddress: req.body.patientAddress,
      patientPhone: req.body.patientPhone,
      patientBio: req.body.patientBio,
    })
    await patient.save();
    console.log(patient._id)
    const provider = await Provider.findOne({userId:req.user._id})
    patient.updateOne(
      {$push: {CurrentProvidersIds:req.user._id}},
      {safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      });
    provider.updateOne(
      {$push: {PatientIds:patient._id}},
      {safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      });
    //res.render("todoVerification")
    res.redirect('/patients')
  });

app.get('/WJIVACH/form',
  isLoggedIn,
  (req,res) => {  res.render('formWJIVACH')
})


app.get('/profile',
    isLoggedIn,
    (req,res) => {
      res.render('profile')
    })

app.get('/history/pregbirth/form',
    isLoggedIn,
    (req,res) => {
      res.render('formPregBirthHistory')
})

app.get('/WJ_IV_ACHform',
    isLoggedIn,
    (req,res) => {
      res.render('formWJIVACH')
})

app.get('/editProfile',
    isLoggedIn,
    (req,res) => res.render('editProfile'))

app.post('/editProfile',
    isLoggedIn,
    async (req,res,next) => {
      try {
        let username = req.body.username
        let age = req.body.age
        req.user.username = username
        req.user.age = age
        req.user.imageURL = req.body.imageURL
        await req.user.save()
        res.redirect('/profile')
      } catch (error) {
        next(error)
      }

    })


app.use('/data',(req,res) => {
  res.json([{a:1,b:2},{a:5,b:3}]);
})

const User = require('./models/User');

app.get("/test",async (req,res,next) => {
  try{
    const u = await User.find({})
    console.log("found u "+u)
  }catch(e){
    next(e)
  }

})

/*
app.get("/WISC_V/form", (request,response) => {
  response.render("wiscvForm")
}) */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
