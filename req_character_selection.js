const fs = require("fs")
const nunjucks = require("nunjucks")
const req_character_selection = function (req, res, query) {
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]
   
    let marquer = {};
   // marquer.id=chapitreID
    let page = fs.readFileSync('characterSelection/characterSelection.html', "utf-8");



    page = nunjucks.renderString(page, marquer);
    last_page.push({"src":"/req_character_selection"})
    last_page.push({"src":"/req_character_selection"})
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_character_selection;
