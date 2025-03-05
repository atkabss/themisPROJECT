const fs = require("fs")
const nunjucks = require("nunjucks")

const req_stage_event2 = function (req, res, query) {
 

    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))
    last_page=[]

    
    let marquer
    let page

    page = fs.readFileSync('stageEvent2/stage_event2.html', "utf-8")
    marquer = {}
    last_page.push({"src":"/req_stage_event2"})
    last_page.push({"src":"/req_stage_event2"})
    fs.writeFileSync('currentData/lastpage.json', JSON.stringify(last_page, null, 2), 'utf-8')

    page = nunjucks.renderString(page, marquer)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
}

module.exports = req_stage_event2