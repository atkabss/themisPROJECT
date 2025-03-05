const fs = require("fs")
const nunjucks = require("nunjucks");
const { text } = require("stream/consumers");
const req_roguelike_map = function (req, res, query) {
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    let chapitre = JSON.parse(fs.readFileSync('currentData/data.json'))
    let chapterID = chapitre.id
    console.log(chapterID)
    last_page=[]
    let data = JSON.parse(fs.readFileSync('RogueLike_Map/ressources/data.json', "utf-8"))
    console.log(data)
    let text = data[chapterID - 1].mission


    let marquer = {};
    marquer.missionExplanation = JSON.stringify(text)
    marquer.id = chapterID
    last_page.push({"src":"/req_roguelike_map"})
    last_page.push({"src":"/req_roguelike_map"})
    console.log(last_page)
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')

    let page = fs.readFileSync('RogueLike_Map/Map.html', "utf-8");

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_roguelike_map;
