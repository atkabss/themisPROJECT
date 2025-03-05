const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event1 = function (req, res, query) {
    let i
    i = query.event1ID
    console.log(i)

    let dialogue = [
        [   

            { text: "Guzman est arrivé assez en retard pour son jugement.", speaker: "char1" },
            { text: "Ce qui ne m'étonne pas pour un grand chef de la mafia.", speaker: "char2" },
            { text: "Ça fait un moment que j'essaye de le coincer, mais il me file toujours entre les doigts.", speaker: "char1" },
            { text: "La session a bien commencé, et comme toujours, il est accusé de plusieurs crimes.", speaker: "char2" }

        ],
        ["suite a un manque de preuves et a la complexite de laffaire le juge decide de cloturer la session et de la reouvrir dans 2 jours ",
        "je connais guzman et je sais quil a deja acheter tous les membres du jury ",
        "il faut que je trouve des preuves contre lui !",
        "Par chance, j'ai réussi à mettre la main sur son dossier, et celui-ci mentionnait une obsession pour des objets anciens, en particulier les montres à gousset. "

        ],
        ["xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxx"
        ]
    ]
    let lien = [
        "mission1=true&mission2=true&mission3=true",
        "mission1=true&mission2=true&mission3=true&mission4=true",
        `mission1=true&mission2=true&mission3=true&mission4=true&mission5=true&mission6=true&mission7=true`
    ]
    console.log(lien[i])

console.log(dialogue[i])
    let page = fs.readFileSync('chapitre1/essai.html', "utf-8");

    //const data = JSON.parse(fs.readFileSync("", "utf-8"));
    let marquer = {};
    marquer.lien = lien[i]
    marquer.dialogue = JSON.stringify(dialogue[i])
    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_stage_event1;
