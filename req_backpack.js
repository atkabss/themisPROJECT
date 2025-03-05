// Traitement de "req_commencer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;

const req_backpack = function (req, res, query) {

    let marqueurs;
    let page;
    let data;
    let dataI
    let collected_cards = 0;
    let cards = ""
    let items = ""
    let true_card_list = []
    data = JSON.parse(fs.readFileSync('backpack/ressources/card.json', 'utf-8'))
    dataI = JSON.parse(fs.readFileSync('backpack/ressources/item.json', 'utf-8'))
    for (let element of data) {
        if (element.bloquer === 'false') { // Vérifie la chaîne "false"
            collected_cards += 1;
            cards += `<button id="${element.id}"><img src="${element.source}" alt="${element.name}"></button>`;
            true_card_list.push(element); // Ajoute directement à la liste
        }
    }
    for (let element of dataI) {
        if (element.bloquer === 'false') { // Vérifie la chaîne "false"
            items += ` <div class="item">
            <img src="${element.source}" alt="Item 1">
                <p>${element.description}</p>
            </div>`;
        }
    }



    page = fs.readFileSync('backpack/backpack.html', 'utf-8');

    marqueurs = {};
    marqueurs.items = items;
    marqueurs.bouton = cards;
    marqueurs.true_card_list = JSON.stringify(true_card_list);
    page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = req_backpack;
