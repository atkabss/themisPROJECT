window.Skill_Card = function(Cartes, Personnage, id) {
    let result = {}; // 默认返回空对象
    let Level
    // 根据卡片ID选择对应的处理逻辑
    switch(id) {
        case "2001":
            Level = Cartes[1]?.Level;  // 使用可选链运算符防止 undefined 错误
            if (Level === undefined) {
                console.error("Cartes[1] is undefined");
                return result;  // 返回空对象
            }

            switch (Level) {
                case "0":
                    result = {
                        Type: 'Shield',
                        Resultat: (15 + 2 * Personnage.Level + 3 * Level),
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Barrier',
                        Resultat: (15 + 2 * Personnage.Level + 3 * Level),
                    };
                    break;
                case "2":
                    result = {
                        Type: "Barrier",
                        Resultat: (15 + 3 * Personnage.Level + 3 * Level),
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2001:", Level);
                    break;
            }
            break;

        case "2002":
            let card = Cartes[2];
            if (!card) {
                console.error("Cartes[2] is undefined");
                return result;  // 返回空对象
            }
            //card.Cost = Personnage.Cost;
            Level = card.Level;
            switch (Level) {
                case "0":
                    result = {
                        Type: 'Shield',
                        Resultat: Math.floor(15 + Personnage.Level*2)
                        //Math.floor(1 + card.Cost / 3),
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Parer',
                        Resultat: Math.floor(25 + Personnage.Level*2)
                        //Math.floor(1 + (card.Cost + 1) / 3),
                    };
                    break;
                case "2":
                    result = {
                        Type: "Parer",
                        Resultat: Math.floor(35 + Personnage.Level*2)
                        //Math.floor(2 + (card.Cost + 2) / 3),
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2002:", Level);
                    break;
            }
            break;

        case "2003":
            result = {
                Type: 'Shield',
                Resultat: 20,
                Buff: "0"
            };
            break;

        case "2004":
            Level = Cartes[4]?.Level; // 使用可选链运算符
            if (Level === undefined) {
                console.error("Cartes[4] is undefined");
                return result;  // 返回空对象
            }
            switch (Level) {
                case "0":
                    result = {
                        Type: 'Attack',
                        Resultat: (15 + 3 * Personnage.Level + 3 * Level),
                        Buff: "0"
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Attack',
                        Resultat: (15 + 3 * Personnage.Level + 4 * Level),
                        Buff: "0"
                    };
                    break;
                case "2":
                    result = {
                        Type: "Attack",
                        Resultat: (15 + 4 * Personnage.Level + 4 * Level),
                        Buff: "Blind",
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2004:", Level);
                    break;
            }
            break;

        case "2005":
            Level = Cartes[5]?.Level; // 使用可选链运算符
            if (Level === undefined) {
                console.error("Cartes[5] is undefined");
                return result;  // 返回空对象
            }
            switch (Level) {
                case "0":
                    result = {
                        Type: 'Attack',
                        Resultat: Math.floor(1 + 7 * Personnage.Level + 5 * Level + Personnage.Energie),
                        Buff: "Goal_1"
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Attack',
                        Resultat: Math.floor(1 + 7.5 * Personnage.Level + 5.5 * Level + Personnage.Energie),
                        Buff: "Goal_1"
                    };
                    break;
                case "2":
                    result = {
                        Type: 'Attack',
                        Resultat: Math.floor(1 + 7 * Personnage.Level + 6 * Level + Personnage.Energie),
                        Buff: "Goal_1"
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2005:", Level);
                    break;
            }
            break;

        case "2006":
            Level = Cartes[6]?.Level; // 使用可选链运算符
            if (Level === undefined) {
                console.error("Cartes[6] is undefined");
                return result;  // 返回空对象
            }
            switch (Level) {
                case "0":
                    result = {
                        Type: 'Attack',
                        Resultat: (20 + 2 * Personnage.Level + 2 * Level),
                        Buff: "Now_Trible"
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Attack',
                        Resultat: (22 + 3 * Personnage.Level + 2 * Level),
                        Buff: "Now_Trible"
                    };
                    break;
                case "2":
                    result = {
                        Type: "Attack",
                        Resultat: (27 + 3 * Personnage.Level + 5 * Level),
                        Buff: "Now_Trible"
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2006:", Level);
                    break;
            }
            break;

        case "2007":
            Level = Cartes[7]?.Level; // 使用可选链运算符
            if (Level === undefined) {
                console.error("Cartes[7] is undefined");
                return result;  // 返回空对象
            }
            switch (Level) {
                case "0":
                    result = {
                        Type: 'Attack',
                        Resultat: (15 + 3 * Personnage.Level + 10 * Level),
                        Buff: ["Gaol_0", "Allume_2"]
                    };
                    break;
                case "1":
                    result = {
                        Type: 'Attack',
                        Resultat: (15 + 3 * Personnage.Level + 12 * Level),
                        Buff: ["Gaol_0", "Allume_2"]
                    };
                    break;
                case "2":
                    result = {
                        Type: "Attack",
                        Resultat: (15 + 4 * Personnage.Level + 13 * Level),
                        Buff: ["Gaol_0", "Allume_2"]
                    };
                    break;
                default:
                    console.warn("Unknown Level for card 2007:", Level);
                    break;
            }
            break;

        default:
            console.warn("Unknown card ID:", id);
            break;
    }

    return result;  // 确保返回一个对象
};
