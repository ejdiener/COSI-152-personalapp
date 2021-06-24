var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.user = req.user._id
  res.render('index', { title: 'Express' });
});

module.exports = router;
