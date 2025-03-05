
"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;

const req_items = function (req, res, query) {

	let marqueurs;
	let page;
	let data;
	let collected_items = 0;
	let cards = ""
	let true_card_list = []
	data = JSON.parse(fs.readFileSync('galery/ressources/card.json', 'utf-8'))
	// let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
	// if (last_page.length == 1) {
	// 	marqueurs.last_page = last_page[0].src

	// }
	// if (last_page.length == 2) {
	// 	marqueurs.last_page = last_page[1].src

	// } 
	data = JSON.parse(fs.readFileSync('galery/ressources/item.json', 'utf-8'))

	for (let element of data) {
		if (element.bloquer === 'false') { // Vérifie la chaîne "false"
			collected_items += 1;
			cards += `<button id="${element.id}"><img src="${element.source}" alt="${element.name}"></button>`;
			true_card_list.push(element); // Ajoute directement à la liste
		}
	}




	page = fs.readFileSync('galery/item.html', 'utf-8');

	marqueurs = {};
	marqueurs.carte_collecte = collected_items;
	marqueurs.bouton = cards;
	marqueurs.true_card_list = JSON.stringify(true_card_list);
	page = nunjucks.renderString(page, marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = req_items;
