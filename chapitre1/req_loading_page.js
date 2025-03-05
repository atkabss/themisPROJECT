
const fs = require("fs");
const nunjucks = require("nunjucks");const { json } = require("stream/consumers");
;

const trait = function (req, res, query) {

    let enemy_ID = query.enemies


    let marqueurs;
    let page;
    let FB_combat = JSON.parse(fs.readFileSync('data/FB_Combat.json' , 'utf-8'))
    let lance = JSON.parse(fs.readFileSync('data/Lance.json' , 'utf-8'))
    //let a , b , c
    // lance[0].HP = FB_combat[0].HP_Joueur
    // lance[0].EXP = FB_combat[0].EXP


    // function generateRandomNumbers() {
    //     let values = [-1, 0, 1, 2];
        
    //     let a = values[Math.floor(Math.random() * values.length)];
    //     let b = values[Math.floor(Math.random() * values.length)];
    //     let c = values[Math.floor(Math.random() * values.length)];
    
    //     return { a, b, c };
    // }
    
    // let { a, b, c } = generateRandomNumbers();
    // console.log(a, b, c);
    



    lance[1].ID = Number(enemy_ID[0])
    lance[2].ID = Number(enemy_ID[1])
    lance[3].ID = Number(enemy_ID[2])

    // AFFICHAGE DE LA PAGE D'ACCUEIL


    fs.writeFileSync('data/FB_Combat.json' , JSON.stringify(FB_combat , null , 2) , 'utf-8')
    fs.writeFileSync('data/Lance.json' , JSON.stringify(lance , null , 2) , 'utf-8')

    page = fs.readFileSync('enterGame/chargement.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.pseudo = "";
    page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;
