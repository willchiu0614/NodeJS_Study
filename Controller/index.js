var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello!');
});

/* GET home page. */
router.get('/hello/:name', function(req, res, next) {
  res.send('hello ' + req.params.name + '!');
});

module.exports = router;

