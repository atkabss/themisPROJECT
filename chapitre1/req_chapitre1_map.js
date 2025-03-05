// Traitement de "req_commencer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;

const trait = function (req, res, query) {
	let missio1 = query.mission1
	let missio2 = query.mission2
	let missio3 = query.mission3
	let missio4 = query.mission4
	let missio5 = query.mission5
	let missio6 = query.mission6
	let missio7 = query.mission7
	let missio8 = query.mission8
	let missio9 = query.mission9
	let missio10 = query.mission10
	let missio11 = query.mission11
	let missio12 = query.mission12
	let missio13 = query.mission13
	let missio14 = query.mission14
	let missio15 = query.mission14
	let missio16 = query.mission16
	let missio

	console.log(query.mission1)
	console.log(missio1)
	for (let i = 1; i <= 14; i++) {
		let mission = eval(`missio${i}`);
		console.log(mission)
		if (mission == "true") {
			eval(`missio${i} = 'visible'`);
		} else {
			eval(`missio${i} = 'hidden'`);
		}
	}
	console.log(missio1)
	



	let marqueurs;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('chapitre1/chapitre1_map.html', 'utf-8');

	marqueurs = {};
		if(query.precis == "true"){
		marqueurs.precis=`style="border-right: 0;"`
	}
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	marqueurs.missio1 = missio1
	marqueurs.missio2 = missio2
	marqueurs.missio3 = missio3
	marqueurs.missio4 = missio4
	marqueurs.missio5 = missio5
	marqueurs.missio6 = missio6
	marqueurs.missio7 = missio7
	marqueurs.missio8 = missio8
	marqueurs.missio9 = missio9
	marqueurs.missio10 =missio10
	marqueurs.missio11 =missio11
	marqueurs.missio12 =missio12
	marqueurs.missio13 =missio13
	marqueurs.missio14 =missio14
	marqueurs.missio15 =missio15
	marqueurs.missio16 =missio16
	page = nunjucks.renderString(page, marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
