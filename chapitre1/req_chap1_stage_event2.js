// Traitement de "req_commencer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;

const trait = function (req, res, query) {
    let id = query.link
   let division

    division = [
        [
        `/* Configuration pour 2 divisions */
        .slice1 {
        background-color: #e74c3c;
        transform: rotate(0deg);
            }
        .slice2 {
        background-color: #3498db;
        transform: rotate(180deg);
            }`,

        ],
        [
            `/* Configuration pour 3 divisions */
        .slice1 {
            background-color: #e74c3c;
            transform: rotate(0deg);
        }
        .slice2 {
            background-color: #f39c12;
            transform: rotate(120deg);
        }
        .slice3 {
            background-color: #1abc9c;
            transform: rotate(240deg);
        }`
        ],
        ////////////4mission
        [
            `
            /* Configuration pour 4 divisions */
        .slice1 {
            background-color: #e74c3c;
            transform: rotate(0deg);
        }
        .slice2 {
            background-color: #f39c12;
            transform: rotate(90deg);
        }
        .slice3 {
            background-color: #1abc9c;
            transform: rotate(180deg);
        }
        .slice4 {
            background-color: #9b59b6;
            transform: rotate(270deg);
        }
            `
        ],
        [///5div
            `
            /* Configuration pour 5 divisions */
        .slice1 {
            background-color: #e74c3c;
            transform: rotate(0deg);
        }
        .slice2 {
            background-color: #f39c12;
            transform: rotate(72deg);
        }
        .slice3 {
            background-color: #f1c40f;
            transform: rotate(144deg);
        }
        .slice4 {
            background-color: #2ecc71;
            transform: rotate(216deg);
        }
        .slice5 {
            background-color: #3498db;
            transform: rotate(288deg);
        }

              `
        ],
        [
            `/* Configuration pour 6 divisions */
        .slice1 {
            background-color: #e74c3c;
            transform: rotate(0deg);
        }
        .slice2 {
            background-color: #f39c12;
            transform: rotate(60deg);
        }
        .slice3 {
            background-color: #f1c40f;
            transform: rotate(120deg);
        }
        .slice4 {
            background-color: #2ecc71;
            transform: rotate(180deg);
        }
        .slice5 {
            background-color: #1abc9c;
            transform: rotate(240deg);
        }
        .slice6 {
            background-color: #34495e;
            transform: rotate(300deg);
        }`
        ],
        [
        `/* Configuration pour 8 divisions */
        .slice1 {
            background-color: #e74c3c;
            transform: rotate(0deg);
        }
        .slice2 {
            background-color: #f39c12;
            transform: rotate(45deg);
        }
        .slice3 {
            background-color: #f1c40f;
            transform: rotate(90deg);
        }
        .slice4 {
            background-color: #2ecc71;
            transform: rotate(135deg);
        }
        .slice5 {
            background-color: #1abc9c;
            transform: rotate(180deg);
        }
        .slice6 {
            background-color: #3498db;
            transform: rotate(225deg);
        }
        .slice7 {
            background-color: #9b59b6;
            transform: rotate(270deg);
        }
        .slice8 {
            background-color: #34495e;
            transform: rotate(315deg);
        }
        `
        ]
    ]

let choice_type = [
    [`<a href="/req_stage_event21?link=0" class="slice slice1" data-texte=" vous avez fait une recherche dans sa chambre  et vous avez trouver des documents  "></a>`]
    ,[`<div class="slice slice4 false "  data-texte=" vous avez fait fauxxx" ></div>`]
]

let chap1_stage_event2 = {
    "mission1":`<a href="/req_chap1_stage_event21?link=1&mission=4&item=1"  class="slice slice1" data-texte=" j'ai trouve une vielle montre dans son bureau je la prends et ....  "></a>
                <div class="slice slice3 false "  data-texte=" Il ya un tiroir ferme a clé peut etre devrais-je chercher la cle" ></div>
                <div class="slice slice2 false "  data-texte=" il a un gout tres mauvais pour les tableaux peut etre est ce pour dissuder les gens de s'en approcher ? ..." ></div>
                <div class="slice slice4 false "  data-texte=" je vais jeter un coup d'oeil en bas des meubles ...." ></div>
                <a href="/req_chap1_stage_event21?link=2&mission=1&card=1" id="deuxieme"  style="visibility: hidden;" class="slice slice1" data-texte=" j'ai trouve une vielle montre dans son bureau je la prends et .... "></a>
                `
    ,"mission2":`<a href="/req_stage_event21?link=3" class="slice slice1" data-texte=" vous avez fait une recherche dans sa chambre  et vous avez trouver des documents  "></a>
                <a href="/req_stage_event21?link=1" class="slice slice2" data-texte=" vous avez fait une recherche dans sa cuisine et vous avez trouver larme du crime  "></a>
                <div class="slice slice3 false "  data-texte=" vous avez fait une recherche sur le balcon et vous avez trouver un indice" ></div>
                <div class="slice slice4 false "  data-texte=" vous avez fait fauxxx" ></div>
                `

    
}

let mission 
if(query.choix_miss == "mission1"){
    mission = chap1_stage_event2.mission1
}
if(query.choix_miss == "mission2"){
    mission = chap1_stage_event2.mission2
}

    let marqueurs;
    let page;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('chapitre1/chap1_stage_event2.html', 'utf-8');

    marqueurs = {};
    marqueurs.style_Css = division[2]
    marqueurs.division = mission
    marqueurs.erreur = "";
    marqueurs.pseudo = "";
    page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;
