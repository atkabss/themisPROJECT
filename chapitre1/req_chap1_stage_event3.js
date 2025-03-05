const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event3 = function (req, res, query) {

    // let id = query.id

    let recap = [
        `Voici le résumé de la situation : il y a quelques jours, j’ai entamé une investigation pour tenter de coincer à nouveau Guzman, le grand chef de la mafia.
         Il a récemment été arrêté, et son procès a commencé. Cependant, la séance a été reportée de deux jours en raison de la prétendue complexité de l’affaire.
        Ne voulant pas perdre de temps, j’ai décidé de mener ma propre enquête afin de trouver des preuves supplémentaires. Pourtant, un doute persiste : 
        suis-je sur la bonne voie ? Ai-je les moyens de prouver définitivement sa culpabilité ? Le temps presse, et chaque décision pourrait tout changer…

 `,
        `Le principal suspect, un chef cuisinier réputé, affirme n'avoir aucun lien avec le crime. Pourtant, son comportement nerveux et certaines incohérences dans ses déclarations vous ont poussé à examiner de plus près sa cuisine.
        Sur place, vous faites plusieurs découvertes troublantes :
        Un couteau ensanglanté, soigneusement dissimulé dans une boîte de céréales.
        Des traces de sang effacées à moitié sur le sol près du plan de travail, comme si quelqu'un avait tenté de nettoyer précipitamment.
        Une liste écrite à la main, contenant le nom de la victime et une série de mots énigmatiques liés à des plats spécifiques.
        Ces indices vous laissent face à un dilemme : agir immédiatement, approfondir les analyses ou chercher des réponses auprès du suspect. Le temps presse, et chaque minute compte pour résoudre l’affaire.
        Que faites-vous ? `


    ]

    let choix = [
        `   <div class="choice" id="first"><a href="/req_stage_event21?link=0"> choix 1</a></div>
            <div class="choice" id="second"><a href="/chapitre1/ending.html"> choix 2</a></div>
            <div class="choice" id="third"><a href="/req_stage_event21?link=3"> choix 3</a></div>`,

        `<div class="choice" id="first"><a href="/req_stage_event21?link=0"> choix 1</a></div>
            <div class="choice" id="second"><a href="/req_stage_event21?link=2"> choix 2</a></div>
            <div class="choice" id="third"><a href="/req_stage_event21?link=3"> choix 3</a></div>`,
    ]

    let choix_info = [
        ["Faire arrêter immédiatement le suspect en présentant les preuves trouvées comme suffisamment accablantes.",
            "RENDRE JUSTICE PAR MOI MEME ",
            "Interroger à nouveau le suspect pour confronter ses déclarations avec les éléments découverts, espérant obtenir des aveux."
        ],
        ["Faire arrêter immédiatement le suspect en présentant les preuves trouvées comme suffisamment accablantes.",
            "Convoquer un expert légiste pour analyser en détail les preuves collectées avant de prendre une décision finale.",
            "Interroger à nouveau le suspect pour confronter ses déclarations avec les éléments découverts, espérant obtenir des aveux."
        ]

    ]


    // let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    // last_page = []

    //const data = JSON.parse(fs.readFileSync("", "utf-8"));
    let marquer = {};
    marquer.recap = recap[0]
    marquer.choix = choix[0]
    marquer.choix_info = JSON.stringify(choix_info[0])
    let page = fs.readFileSync('chapitre1/chap1_stageEvent3.html', "utf-8");


    // last_page.push({ "src": "/req_stage_event3" })
    // last_page.push({ "src": "/req_stage_event3" })
    // fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_stage_event3;
