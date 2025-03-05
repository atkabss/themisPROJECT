const fs = require('fs');
const path = require('path');

// 计算 HP 的函数
function calculate(expression, context) {
    const fn = new Function("Level", `return ${expression};`);
    return fn(context.Level);
}

const getData = (req, res) => {
    const cartesPath = path.join(__dirname, './data', 'Cartes.json');
    const personnagePath = path.join(__dirname, './data', 'Personnage.json');
    const MonsterPath = path.join(__dirname, './data', 'Monster_Base.json');

    fs.readFile(cartesPath, 'utf-8', (err, cartesData) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error reading Cartes.json' }));
            return;
        }

        fs.readFile(personnagePath, 'utf-8', (err, personnageData) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading Personnage.json' }));
                return;
            }

            const Personnage = JSON.parse(personnageData);
            // 遍历每个角色并计算其 HP
            Personnage.forEach(Personnage => {
                const calculatedHP = calculate(Personnage.HP, { Level: Personnage.Level });
                Personnage.HP = calculatedHP; // 将公式替换为计算后的值
            });

            fs.readFile(MonsterPath, 'utf-8', (err, monsterData) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error reading Monster.json' }));
                    return;
                }

                const Monster = JSON.parse(monsterData);

                // 遍历每个怪物并计算其 HP
                Monster.forEach(Monster => {
                    const calculatedHP = calculate(Monster.HP, { Level: Monster.Level });
                    const calculatedForce = calculate(Monster.Force, { Level: Monster.Level });
                    // 将公式替换为计算后的值
                    Monster.HP = calculatedHP; 
                    Monster.Force = calculatedForce;
                });

                const responseData = {
                    cartes: JSON.parse(cartesData),
                    personnage: Personnage,
                    monster: Monster,
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(responseData));
            });
        });
    });
};

module.exports = getData;
