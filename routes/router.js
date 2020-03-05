var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

router.get('/deliriumScoring.html', function(req, res, next) {
  res.render('deliriumScoring', { title: 'Delirium scoring' });
});

router.get('/agitationScoring.html', function(req, res, next) {
  res.render('agitationScoring', { title: 'Agitation scoring' });
});


router.get('/agitationManagement.html', function(req, res, next) {
  res.render('agitationManagement', { title: 'Agitation management' });
});



router.get('/painManagement.html', function(req, res, next) {
  res.render('painManagement', { title: 'Pain management' });
});


router.get('/deliriumManagement.html', function(req, res, next) {
  res.render('deliriumManagement', { title: 'Deliriumm anagement' });
});

router.get('/drugsCauseDelirium.html', function(req, res, next) {
  res.render('drugsCauseDelirium', { title: 'Drugs cause delirium.' });
});


module.exports = router;
