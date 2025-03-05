const fs = require("fs")
const nunjucks = require("nunjucks")
const req_warning = function (req, res, query) {


    let marquer = {};
    let page = fs.readFileSync('menu/warning.html', "utf-8");



    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_warning;
