const fs = require("fs")
const nunjucks = require("nunjucks")
const req_stage_event21 = function (req, res, query) {
    const nombre = query.link;
    let items = JSON.parse(fs.readFileSync('backPack/ressources/item.json'))
    let item_gained = JSON.parse(fs.readFileSync('backPack/ressources/item_gained.json'))
    let cards = JSON.parse(fs.readFileSync('backPack/ressources/card.json'))
    let card_gained = JSON.parse(fs.readFileSync('backPack/ressources/card_gained.json'))

    if (query.item) {
        item_gained.push(items[query.item])
        fs.writeFileSync('backpack/ressources/item_gained.json', JSON.stringify(item_gained, null, 2), "utf-8")

    }
    if (query.card) {
        card_gained.push(cards[query.card])
        fs.writeFileSync('backpack/ressources/card_gained.json', JSON.stringify(card_gained, null, 2), "utf-8")

    }




    const data = JSON.parse(fs.readFileSync("stageEvent2/ressources/data.json", "utf-8"));
    let marquer = {};
    let page = fs.readFileSync('chapitre1/chap1_stage_event21.html', "utf-8");
    let lien
    if (query.mission == 4) {
        marquer.numb = 6
        marquer.preci = `&precis=true`
        lien = `/req_chapitre1_map?mission1=true&mission2=true&mission3=true&mission4=true&mission6=true&precis=true `
    }
    if (query.mission == 1) {
        marquer.numb = 5
        lien = `/req_chapitre1_map?mission1=true&mission2=true&mission3=true&mission4=true&mission5=true`

    }
    if (query.mission == "combat1") {
        lien = `/req_chapitre1_map?mission1=true&mission2=true&mission3=true&mission4=true&mission5=true&mission6=true`
    }
    if (query.mission == "combat2") {
        lien = `/req_chapitre1_map?mission1=true&mission2=true&mission3=true&mission4=true&mission5=true&mission6=true&mission7=true&mission8=true`
    }

    let FB_combat = JSON.parse(fs.readFileSync('data/FB_Combat.json', 'utf-8'))
    let lance = JSON.parse(fs.readFileSync('data/Lance.json', 'utf-8'))
    //let a , b , c
    lance[0].HP = FB_combat[0].HP_Joueur
    lance[0].EXP = FB_combat[0].EXP

    fs.writeFileSync('data/FB_Combat.json', JSON.stringify(FB_combat, null, 2), 'utf-8')
    fs.writeFileSync('data/Lance.json', JSON.stringify(lance, null, 2), 'utf-8')



    marquer.exp = data[nombre].exp;
    marquer.lien = lien
    marquer.explication = data[nombre].explanation;
    marquer.path = data[nombre].item;
    marquer.itemImage = `<img id="item-image" class="item-image" src="chapitre1/ressources/item${nombre}.jpg" alt="Item">`;

    page = nunjucks.renderString(page, marquer);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};

module.exports = req_stage_event21;
