const fs = require('fs');
const path = require('path');


const Get_Situation = (req, res) => {
    const Lance_Combat_Path = path.join(__dirname, './data', 'Lance.json');
    const FeedBack_Combat_Path = path.join(__dirname, './data', 'FB_Combat.json');

    fs.readFile(Lance_Combat_Path, 'utf-8', (err, Lance_Data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error reading Lance.json' }));
            return;
        }

        fs.readFile(FeedBack_Combat_Path, 'utf-8', (err, FB_Combat_Data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading FB_Combat.json' }));
                return;
            }



                const Reponse_Data = {
                    Lance_Situation: JSON.parse(Lance_Data),
                    FB_Situation: JSON.parse(FB_Combat_Data),
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(Reponse_Data));
            });
        });
    };

module.exports = Get_Situation;
