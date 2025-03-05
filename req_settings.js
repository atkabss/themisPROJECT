const fs = require("fs")
const nunjucks = require("nunjucks");;

const settings = function (req, res, query) {
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    if (last_page.length == 1) {
        marqueurs.return = last_page[0].src

    }
    if (last_page.length == 2) {
        marqueurs.return = last_page[1].src

    }     let marqueurs;
    let page;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('settings/settings.html', 'utf-8');

    marqueurs = {};
  
    marqueurs.erreur = "";
    marqueurs.pseudo = "";
    page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = settings;
