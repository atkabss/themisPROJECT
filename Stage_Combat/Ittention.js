



(async function () {
  //let Personnages = [];
  //let Cartes = [];
  let Monster = [];

  const FB_Data = await GetData(); // 等待 GetData() 返回结果

  if (FB_Data) { // 确保数据加载成功
      //Personnages = FB_Data.personnage;
      //Cartes = FB_Data.cartes;
      Monster = FB_Data.monster;

      //console.log("Personnages:", Personnages);
      //console.log("Cartes:", Cartes);
      console.log("Monster:", Monster);
  } else {
      console.error("Failed to fetch data.");
  }
})();


// 修改 `Animation_Ittention`，支持 `await`
const Animation_Ittention = function(Img) {
    return new Promise(resolve => {
        if (!Img) return resolve(); // 防止 null 报错

        Img.style.transform = "scale(1.5)";
        Img.style.transition = "transform 0.3s ease-in-out";

        setTimeout(() => {
            Img.style.transform = "scale(1)"; // 0.3 秒后恢复
            setTimeout(resolve, 300); //0.3 秒后才算完成
        }, 300);
    });
};

// 创建卡牌
const Ittention_Base = [
    { data_type: 'Defense-Shield',   img: 'public/images/ittention-defense.PNG', alt: 'defense' },
    { data_type: 'Defense-Barrier',  img: 'public/images/ittention-defense.PNG', alt: 'Barrier' },
    { data_type: 'Defense-Parer',    img: 'public/images/ittention-defense.PNG', alt: 'Parer' },
    { data_type: 'Attack-M',         img: 'public/images/ittention-attack.PNG',  alt: 'attack' },
    { data_type: 'Attack-L',         img: 'public/images/ittention-attack.PNG',  alt: 'attack' },
    { data_type: 'Attack-XL',        img: 'public/images/ittention-attack.PNG',  alt: 'attack' },
    { data_type: 'Special-1',        img: 'public/images/ittention-special.PNG', alt: 'special' }
  ];


window.Ittention_Work = async function(shieldNumber)
{
    console.log("\n\n\nIttention\n\n\n")





            //1.更改回合图标为敌方颜色
            const IMG_Tour = document.getElementById('Tour-IMG')
            const Enemy_Tour_IMG = document.createElement('img');
            Enemy_Tour_IMG.className = 'round-turn-img';
            Enemy_Tour_IMG.src = "public/images/Tour-others.png";
            Enemy_Tour_IMG.alt = "敌方回合";

            // 将图片插入到卡牌外层 div
            IMG_Tour.appendChild(Enemy_Tour_IMG);

            //2.敌方意图在发动时放大
            // 获取敌人区域和所有敌人
            const Enemies = document.getElementById("Enemy-Part");
            const enemies = Enemies.querySelectorAll(".enemy"); // 获取所有 .enemy

            // 遍历敌人，检查状态
            for (let Num = 0; Num < enemies.length; Num++) {
                const enemy = enemies[Num]; // 当前敌人
                const HP_Element = enemy.querySelector(".hp"); // 获取该敌人的 hp 元素
                const HP_Value = parseInt(HP_Element.textContent.trim(), 10); // 提取血量并转为数字
                let Img_ID = document.getElementById(`Itention-${Num+1}`);

                const monsterId = `enemy-${Num + 1}`;
                const Monster_Select = document.getElementById(monsterId);

                if (HP_Value > 0) {
                    // 如果敌人未死亡
                    console.log(`Enemies ${Num + 1} reste à vie，faire marcher ittention.js`);

                    // 获取意图图片并运行（示例操作，动态更改图片）
                    const Intention_Element = enemy.querySelector(".enemy-intention img"); // 获取意图图标
                    if (Intention_Element) {
                        const Intention_Type = Intention_Element.dataset.type; // 获取意图类型（如 attack, defense, special）
                        const Select_Res = document.getElementById(`Resultat-${Num+1}`)
                        const shieldImg = document.getElementById('player-shield-img');
                        let Resultat_FB = Select_Res.textContent.trim(); // 去除前后空格
                        console.log("Resultat_FB est :" + Resultat_FB)
                        console.log("Intention Type", Intention_Type);
                        await Animation_Ittention(Img_ID);
                        
                        // 3.根据意图类型运行逻辑
                        switch (Intention_Type) {
                            case 'Attack-M':
                            case 'Attack-L':
                            case 'Attack-XL':
                                console.log(`Enemies ${Num + 1} Lance attack!`);
                                // 这里可以插入攻击逻辑
                                //Update_HP_Joueur.js
                                damage_Player(Resultat_FB, shieldNumber, shieldImg);
                                break;
                            case "Defense-Shield":
                            case 'Defense-Barrier':
                            case 'Defense-Parer':
                                console.log(`Enemies ${Num + 1} Lance Shield!`);
                                // 这里可以插入防御逻辑
                                break;
                            case "special-1":
                                console.log(`Enemies ${Num + 1} Lance Speciale skill!`);
                                // 这里可以插入特殊技能逻辑
                                break;
                            default:
                                console.log(`Enemies ${Num + 1} unKNOW skill!`);
                        }
                    }
                            } else {
                                // 如果敌人已死亡
                                console.log(`Enemies ${Num + 1} mortes!`);
                            }

                        
                        update_PlayerHealth();



                        let Tour_Number = document.getElementById('Tour-Number').textContent;
                        console.log("Ittention part FB Tour :" + Tour_Number);
                        //4.更替意图
                        let Monster_ID = Monster_Select.dataset.id;
                        console.log("Monster id : " + Monster_ID);
                        console.log("Select parte est: " + (Monster[Monster_ID].Logic).toString())
                        let Logic_Longeur = (Monster[Monster_ID].Logic).toString().length;
                        console.log("Longeur Logic est : " + Logic_Longeur)
                        let Count, Logic_Select;

                        if (Tour_Number - 1 >= Logic_Longeur) {
                            Count = Tour_Number - Logic_Longeur; 
                            Logic_Select = (Monster[Monster_ID].Logic).toString()[Count]; 
                        }
                        else {
                            Logic_Select = (Monster[Monster_ID].Logic).toString()[Tour_Number-1]; 
                        }
                        console.log("Logic select tour: " + Tour_Number + " est " + Logic_Select);

                        // 你可以在这里访问 Count 和 Logic_Select 变量
                        console.log(Count, Logic_Select);


                        let Intention_Delete = document.getElementById(`enemy-intention-${Num+1}`)

                        // 检查元素是否存在
                        if (Intention_Delete) {
                            // 清空当前内容
                            Intention_Delete.innerHTML = "";

                            // 创建新的内容
                            const newImage = document.createElement("img");
                            newImage.className = "enemy-intention";
                            newImage.id = `Itention-${Num+1}`; // 根据你的代码动态设置 ID
                            // 这里可以根据不同意图设置不同图片
                            newImage.src = Ittention_Base[Logic_Select].img;
                            // 设置数据类型，假设是攻击意图
                            newImage.dataset.type = Ittention_Base[Logic_Select].data_type

                            //Feed back de Monster.js
                            console.log("Type de Ittention est: " + newImage.dataset.type);
                            let Resultat = Monster_FB(newImage.dataset.type, Monster[Monster_ID]).Resultat
                            console.log("Resultat est : " + Resultat)

                            // 创建新的文本内容
                            const newText = document.createElement("br");

                            // 创建一个新的容器元素来包含文本
                            const textContainer = document.createElement("span");
                            textContainer.id = `Resultat-${Num+1}`;  // 给 <br> 元素添加 id
                            textContainer.textContent = Resultat; // 将文本内容添加到容器元素中

                            // 将新的内容添加到 `enemy-intention-{Num}` 中
                            Intention_Delete.appendChild(newImage);
                            Intention_Delete.appendChild(newText);
                            Intention_Delete.appendChild(textContainer);
                        } else {
                            console.warn(`Pas trouver：enemy-intention-${Num}`);
                        }



            }




            //Bns.延迟释放


            
}