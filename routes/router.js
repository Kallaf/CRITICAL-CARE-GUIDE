var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LOGO' });
});

router.get('/deliriumScoring.html', function(req, res, next) {
  res.render('deliriumScoring', { title: 'LOGO' });
});

router.get('/agitationRSSScoring.html', function(req, res, next) {
  res.render('agitationRSSScoring', { title: 'LOGO' });
});

module.exports = router;
