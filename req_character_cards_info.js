const fs = require("fs")
const nunjucks = require("nunjucks");
const req_character_cards_info = function (req, res, query) {
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]

    let data1 = JSON.parse(fs.readFileSync('currentData/data.json'))
    let marquer;
    let page;
    let data;
    let cards = ""
    let true_card_list = []
    let character = query.perso
    console.log(character)
    let place
    data1.character = character

    if (character == "boy") {
        place = " right: 0 ; "

    }
    else {
        place = " left: 0 ;"
    }


    data = JSON.parse(fs.readFileSync('characterSelection/ressources/card.json', 'utf-8'))

    for (let element of data) {
        if (element.bloquer === 'false') { // Vérifie la chaîne "false"
            cards += `<button id="${element.id}"><img src="${element.source}" alt="${element.name}"></button>`;
            true_card_list.push(element); // Ajoute directement à la liste
        }
    }
    console.log(cards)
    console.log(true_card_list)
    console.log(data1)

    page = fs.readFileSync('characterSelection/characterCardsinfo.html', 'utf-8');

    marquer = {};
    marquer.place = place
    marquer.id = data1.id
    marquer.bouton = cards;
    marquer.true_card_list = JSON.stringify(true_card_list);
    page = nunjucks.renderString(page, marquer);
    last_page.push({"src":"/req_character_cards_info"})
    last_page.push({"src":"/req_character_cards_info"})
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')
    fs.writeFileSync('currentData/data.json', JSON.stringify(data1, null, 2), 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_character_cards_info;
