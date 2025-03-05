

const fs = require("fs");
const nunjucks = require("nunjucks");;

const enterGame = function (req, res, query) {

    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]
    



    let marqueurs;
    let page;


    

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('enterGame/enterGame.html', 'utf-8');
    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.pseudo = "";
    page = nunjucks.renderString(page, marqueurs);
    last_page.push({"src":"/req_enter_game"})

    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = enterGame;
