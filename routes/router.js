var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LOGO' });
});

router.get('/delirium', function(req, res, next) {
  res.render('delirium', { title: 'LOGO' });
});

module.exports = router;
