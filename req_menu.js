const fs = require("fs")
const nunjucks = require("nunjucks")
const req_menu = function (req, res, query) {
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    
    
    let marquer = {};

    marquer.continue=last_page[1].src
    
    
    let page = fs.readFileSync('menu/menu.html', "utf-8");

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_menu;
