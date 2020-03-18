var express = require('express');
var router = express.Router();
var longt = 0.00;
var latt = 0.00 ;
var jsonData ;
var https = require('https');

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

  
	var nom_ville = req.body.nom_ville;
	var urlHttps = 'https://geocode.xyz/' + nom_ville + '?json=1&auth=129969521496761168735x1973';
 
	console.log(urlHttps);
	https.get(urlHttps, (resp) => {

		let data = '';
		resp.on('data', (d) => {
			data += d;
		});
		
	
		resp.on('end', () => {
			console.log(data);
			var resultat = JSON.parse(data);
			var msg = nom_ville;
			longt = resultat.longt;
      latt = resultat.latt;
      if(longt == 0 && latt == 0){
       
        res.render('error', { title: "Erreur lors du chargement de la page", typeError: "Nom de ville eronée" ,message: "Veuillez vérrifiez le nom de volle saisie"});
      } else {

        res.render('ville', { villeName: nom_ville, longValue: longt ,lattValue: latt});
      }

		});

		}).on("error", (err) => {
		
			console.log("Error: " + err.msg);
			res.render('error', { title: "Erreur lors du chargement de la page", typeError: "Erreur serveur" ,message: "Veuillez nous excuser pour la géne occasionnée"});
	});

});


module.exports = router;
