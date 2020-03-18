var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});
router.get('/ville', function(req, res, next) {
  var params = req.query.nom_ville; 
  res.render('ville', { villeName: params});
  console.log("Mon parametre est : " + params);
 
});
router.post('/ville', function(req, res, next) {
  var params = req.body.nom_ville; 
  res.render('ville', { villeName: params});
  console.log("Mon parametre est : " + params);
 
});

module.exports = router;
