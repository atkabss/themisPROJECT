const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event21 = function (req, res, query) {
    const nombre = query.link;

    const data = JSON.parse(fs.readFileSync("stageEvent2/ressources/data.json", "utf-8"));
    let marquer = {};
    let page = fs.readFileSync('stageEvent2/stage_event21.html', "utf-8");

    marquer.exp = data[nombre].exp;
    marquer.explication = data[nombre].explanation;
    marquer.path = data[nombre].item;
    marquer.itemImage = `<img id="item-image" class="item-image" src="stageEvent2/ressources/item${nombre}.jpg" alt="Item">`;

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};

module.exports = req_stage_event21;
