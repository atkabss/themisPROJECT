const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event21 = function (req, res, query) {


    const data = JSON.parse(fs.readFileSync("", "utf-8"));
    let marquer = {};
    let page = fs.readFileSync('', "utf-8");



    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_stage_event21;
