// Traitement de "req_commencer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;
let data 
let cards = ""
let true_card_list=[]
const trait = function (req, res, query) {
	data = JSON.parse(fs.readFileSync('characterSelection/ressources/card.json', 'utf-8'))
	for (let element of data) {
        if (element.bloquer === 'false') { // Vérifie la chaîne "false"
            cards += `<button id="${element.id}"><img src="${element.source}" alt="${element.name}"></button>`;
            true_card_list.push(element); // Ajoute directement à la liste
        }
    }

	let marquer;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('chapitre1/boy_information_carte.html', 'utf-8');

	marquer = {};
	marquer.bouton = cards;
    marquer.true_card_list = JSON.stringify(true_card_list);

	page = nunjucks.renderString(page, marquer);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
