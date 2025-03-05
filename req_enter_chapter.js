const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event21 = function (req, res, query) {

    let chapitreID =query.chapter
    let data = JSON.parse(fs.readFileSync('currentData/data.json'))
    console.log(data)
    console.log(chapitreID)
    data.id = chapitreID
    data.chapter= chapitreID
    console.log(data.id)
    console.log(data)
    console.log(data)

    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]
    let chapitre = JSON.parse(fs.readFileSync('chapitres/chapitre.json'))
    let chapitreBg = chapitre[data.id-1].image_de_fond
    let card_Bg = chapitre[data.id-1].image_de_fond_carte


    let marquer = {};
    marquer.id = chapitreID.id
    marquer.background= chapitreBg
    marquer.card_Bg = card_Bg
    let page = fs.readFileSync('chapterSelection/enterChapter.html', "utf-8");


    page = nunjucks.renderString(page, marquer);

    last_page.push({"src":"/req_enter_chapter"})
    last_page.push({"src":"/req_enter_chapter"})
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')

    fs.writeFileSync( 'currentData/data.json',JSON.stringify(data , null , 2) , 'utf-8')
    fs.writeFileSync( 'chapitres/chapitre.json',JSON.stringify(chapitre , null , 2) , 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_stage_event21;
