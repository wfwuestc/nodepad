var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/notes', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/notes/add', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/notes/edit', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/notes/delete', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
