const fs = require("fs")
const nunjucks = require("nunjucks")
const req_chapter_selection = function (req, res, query) {
    let chapitre = ''
    let data
    let last_page = JSON.parse(fs.readFileSync('currentData/lastpage.json'))


    data = JSON.parse(fs.readFileSync('chapitres/chapitre.json', 'utf-8'))




    for (i = 0; i < data.length; i++) {
        if (data[i].chapitre === true) {
            chapitre += `        <div class="chapitres">
            <h3>Chapitre ${i + 1}</h3>
            <div class="chapitre unlock" id="chap">

                <a href="${data[i].src}"><img src="chapterSelection/ressources/33Hn.gif" alt=""></a>
            </div>
        </div>`
        }
        else {
            chapitre += `
            <div class="chapitres">
                <h3>Chapitre ${i + 1}</h3>
                <div class="chapitre" id="lock">lock</div>
        </div>
            `
        }
    }
    console.log(chapitre)

    let marquer = {};
    marquer.chapitre = chapitre
    let page = fs.readFileSync('chapterSelection/chapterSelection.html', "utf-8");



    page = nunjucks.renderString(page, marquer);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
    return; // Ajoutez un retour
};

module.exports = req_chapter_selection;
