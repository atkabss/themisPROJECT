const http = require("http");
const url = require("url");

//////////////// que poour le chapitre 1
const req_entrer_chapitre1 = require('./chapitre1/req_chapitre1')
const req_choix_personnage = require('./chapitre1/req_choix_personnage')
const req_chapitre1_map = require('./chapitre1/req_chapitre1_map')
const req_chap1_stage_evnt1 = require('./chapitre1/req_chap1_stage_event1')
const req_chap1_stage_evnt2 = require('./chapitre1/req_chap1_stage_event2')
const req_chap1_stage_evnt21 = require('./chapitre1/req_chap1_stage_event21')
const req_chap1_stage_evnt3 = require('./chapitre1/req_chap1_stage_event3')
const req_backpack_chap1 = require('./chapitre1/req_backpack_chap1')
const req_boy_information_cards = require('./chapitre1/req_boy_information_carte')
const req_loading_page = require('./chapitre1/req_loading_page')


////////////////// fin pour le chapitre1 






//////////////// premier serveur mais franchemt je dois arranger tout ca

const req_character_cards_info = require("./req_character_cards_info")
const req_character_selection = require("./req_character_selection")
const req_enterGame = require("./req_enterGame")
const req_chapter_selection = require('./req_chapter_selection')
const req_enter_chapter = require('./req_enter_chapter')
const req_settings = require("./req_settings")
const req_menu = require("./req_menu")
const req_warning = require("./req_warning")
const req_stage_event1 = require("./req_stage_event1")
const req_stage_event2 = require("./req_stage_event2")
const req_stage_event21 = require("./req_stage_event21")
const req_stage_event3 = require("./req_stage_event3")
const req_roguelike_map = require("./req_roguelike_map")
const req_galery = require("./req_galery");
const req_item = require("./req_item")
const req_backpack = require("./req_backpack")
const req_battle_end = require("./req_battle_end")
const req_ending = require("./req_ending")
const req_level_Up_Bonus = require("./req_Level_Up_Bonus");

//////////////// fin du premier serveur 

//Correction en route
//Ne touche RRRRRRRRRIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const req_Combat_Server = require('./Stage_Combat/req_Combat');
const req_data = require("./req_GetData");
const req_situation = require("./req_Situation");
//Ne touche RRRRRRRRRIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//////// statiques 
const req_static = require("./req_static")
const req_erreur = require("./req_erreur");
//////// fin statiques 





let mon_serveur;
let port;


const traite_requete = function (req, res, query) {
    let requete;
    let pathname;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    try {
        switch (pathname) {
            case '/':
            case '/req_enterGame':
                req_enterGame(req, res, query)
                break
            case '/req_settings':
                req_settings(req, res, query)
                break



            /////////////////////////////////// modification dangeureuse partie du chapitre1 donttttt touchhhhhhh!!!!!!

            case '/req_entrer_chapitre1':
                req_entrer_chapitre1(req, res, query)
                break
            case '/req_choix_person_chap1':
                req_choix_personnage(req, res, query)
                break
            case '/req_boy_info_card':
                req_boy_information_cards(req, res, query)
                break
            case '/req_chapitre1_map':
                req_chapitre1_map(req, res, query)
                break
            case '/req_backpack_chap1':
                req_backpack_chap1(req, res, query)
                break
            case '/req_chap1_stage_event1':
                req_chap1_stage_evnt1(req, res, query)
                break
            case '/req_chap1_stage_event2':
                req_chap1_stage_evnt2(req, res, query)
                break
            case '/req_chap1_stage_event21':
                req_chap1_stage_evnt21(req, res, query)
                break
            case '/req_chap1_stage_event3':
                req_chap1_stage_evnt3(req, res, query)
                break
            case '/req_loading':
                req_loading_page(req, res, query)
                break

            /////////////////////////////////////// modification dangeureuse dont touchhhhhh!!!!!!!!
            case '/req_chapter_selection':
                req_chapter_selection(req, res, query)
                break
            case '/req_enter_chapter':
                req_enter_chapter(req, res, query)
                break
            case '/req_menu':
                req_menu(req, res, query)
                break
            case '/req_warning':
                req_warning(req, res, query)
                break
            case '/req_character_cards_info':
                req_character_cards_info(req, res, query)
                break
            case '/req_character_selection':
                req_character_selection(req, res, query)
                break
            case '/req_stage_event2':
                req_stage_event2(req, res, query);
                break;
            case '/req_stage_event1':
                req_stage_event1(req, res, query);
                break;
            case '/req_stage_event3':
                req_stage_event3(req, res, query);
                break;
            case '/req_stage_event21':
                req_stage_event21(req, res, query);
                break;
            case '/req_roguelike_map':
                req_roguelike_map(req, res, query);
                break;
            case '/req_galery':
                req_galery(req, res, query);
                break;
            case '/req_item':
                req_item(req, res, query);
                break;
            case '/req_backpack':
                req_backpack(req, res, query);
                break;
            case '/req_battle_end':
                req_battle_end(req, res, query);
                break;
            case '/req_level_Up_Bonus':
                req_level_Up_Bonus(req, res, query);
                break;
            case '/req_ending':
                req_ending(req, res, query);
                break;

            //Arthur Parts;
            //Ne touche RRRRRRRRRIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            case '/req_stage_Combat':
                req_Combat_Server(req, res, query);
                break;

            case '/api/data':
                req_data(req, res);
                break;

            case '/combat/situation':
                req_situation(req, res);
                break;

            //Ne touche RRRRRRRRRIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



            default:
                req_static(req, res, query);
                return;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);

        if (!res.headersSent) { // Vérifiez avant d'envoyer une erreur
            req_erreur(req, res, query);
        }
    }
};



//creation et lncement du serveur 

mon_serveur = http.createServer(traite_requete)
port = 5000
console.log("port : " + port)
mon_serveur.listen(port)


