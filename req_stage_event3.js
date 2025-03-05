const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event3 = function (req, res, query) {




    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]

        //const data = JSON.parse(fs.readFileSync("", "utf-8"));
    let marquer = {};
    let page = fs.readFileSync('stageEvent3/stageEvent3.html', "utf-8");


    last_page.push({"src":"/req_stage_event3"})
    last_page.push({"src":"/req_stage_event3"})
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_stage_event3;
