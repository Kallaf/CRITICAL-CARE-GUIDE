var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

router.get('/index.html', function(req, res, next) {
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

router.get('/criteriaParalytics.html', function(req, res, next) {
  res.render('criteriaParalytics', { title: 'Criteria for the use of paralytics in ICU patients' });
});

router.get('/paralytics.html',function(req,res,next){
  res.render('paralytics',{title: 'Paralytics'});
});

router.get('/painScoring.html',function(req,res,next){
  res.render('painScoring',{title: 'Pain scoring'});
});


router.get('/painCaution.html',function(req,res,next){
  res.render('painCaution',{title: 'Pain Cautions'});
});


router.get('/deliriumCaution.html',function(req,res,next){
  res.render('deliriumCaution',{title: 'Delirium cautions'});
});

router.get('/precipitatingfactors.html',function(req,res,next){
  res.render('precipitatingfactors.hbs',{title: 'Precipitating factors'});
});

router.get('/painprecipitatingfactors.html',function(req,res,next){
  res.render('painprecipitatingfactors.hbs',{title: 'Precipitating factors for pain'});
});


router.get('/agitationprecipitatingfactors.html',function(req,res,next){
  res.render('agitationprecipitatingfactors.hbs',{title: 'Precipitating factors for agitation'});
});


router.get('/deliriumprecipitatingfactors.html',function(req,res,next){
  res.render('deliriumprecipitatingfactors.hbs',{title: 'Precipitating factors for delirium'});
});

module.exports = router;
