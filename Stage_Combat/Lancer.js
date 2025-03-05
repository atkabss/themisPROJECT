document.addEventListener('DOMContentLoaded', () => {


    const afficheZone = document.getElementById('Affiche-Zone');


// 1. 声明全局变量
let enemyHealth = {};
let enemyMax = {};

// 2. 创建异步函数
(async function () {
    let Personnages = [];
    let Cartes = [];
    let Monster = [];
    let Situation = [];
    let Feed_Back = [];

    // HP 计算用的临时数组
    let List_Count = [];

    // 3. 获取数据
    const FB_Data = await GetData(); 
    const FB_Situation = await GetSituation(); 

    if (FB_Data && FB_Situation) { 
        // 4. 解析数据
        Personnages = FB_Data.personnage;
        Cartes = FB_Data.cartes;
        Monster = FB_Data.monster;
        Situation = FB_Situation.Lance_Situation;
        Feed_Back = FB_Situation.FB_Situation;

        console.log("Personnages:", Personnages);
        console.log("Cartes:", Cartes);
        console.log("Monster:", Monster);
        console.log("Situation:", Situation);
        console.log("Feed_Back:", Feed_Back);

        // 5. 计算敌人 HP
        for (let i = 1; i < 4; i++) { // 修正索引，确保 0 开始
            console.log("Monster est:", Monster)
            console.log("Situation est:", Situation)
            console.log("Situation[i].ID est:",Situation[i].ID)
            console.log("Monster[Situation[i].ID] est:", Monster[Situation[i].ID])
            let monsterId = Situation[i].ID;
            let computedHP = Monster[monsterId].HP;

            List_Count.push(computedHP);
        }

        console.log("List Count HP enemies sont :", List_Count);

        // 6. 初始化敌人血量
        enemyHealth = {
            'enemy-1': List_Count[0],
            'enemy-2': List_Count[1],
            'enemy-3': List_Count[2]
        };
        enemyMax = { ...enemyHealth };

        console.log("enemyHealth", enemyHealth);
        console.log("enemyMax", enemyMax);

        // 7. 更新血量 UI
        update_Health("enemy-1");
        update_Health("enemy-2");
        update_Health("enemy-3");

        // 8. 运行游戏初始化
        initGame();
    } else {
        console.error("Failed to fetch data.");
    }
})();


    // 在其他地方使用 enemyHealth 和 enemyMax
    function initGame() {
        console.log("Enemy 1 Health:", enemyHealth['enemy-1']); // 应该正常显示
        console.log("Enemy 2 Max Health:", enemyMax['enemy-2']); // 应该正常显示
    }


    let playerShield = 0;

    // 更新护盾图标
    const shieldImg = document.getElementById('player-shield-img');
    const shieldNumber = document.getElementById('player-shield-number');


    // 获取所有 .enemy 元素
    const enemies = document.querySelectorAll(".enemy");

    // 定义一个空列表用于存储结果
    const intentions_List = [];

    // 遍历每个 enemy 查询 ittention
    enemies.forEach(enemy => {
        // 获取 intention 部分
        const intentionElement = enemy.querySelector(".enemy-intention");

        // 获取图片路径
        const imgElement = intentionElement.querySelector("img");
        const imgSrc = imgElement ? imgElement.src : null;

        // 获取数值信息
        const textContent = intentionElement.textContent.trim();

        // 如果需要解析数值
        const parsedValues = textContent.includes('x')
            ? textContent.split('x').map(num => parseInt(num.trim()))
            : [parseInt(textContent.trim())];

        // 将提取的结果存入列表
        intentions_List.push({
            id: enemy.id, // 获取敌人的 id
            imgSrc: imgSrc, // 图片路径
            values: parsedValues // 数值信息
        });
    });

    //回合结束
    const endTurnButton = document.getElementById('end-turn');
    let Tour_Number = 1; // 初始化回合数
    if (endTurnButton) {
        endTurnButton.addEventListener('click', async () => {
            await Ittention_Work(shieldNumber);

            const maxCost = 5;
            let currentCost = 1;
    
            const update_Cost_Animation = async () => {
                for (let cost = currentCost; cost <= maxCost; cost++) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    document.getElementById('cost-bar').textContent = `${cost}/${maxCost}`; // 更新文本
                    document.getElementById('Cost_Rest').src = `public/images/Cost_${cost}.png`; // 更新图片
                }
            };


            // 播放视频的function
            const playVideo = function () {
                // 创建视频元素
                const video = document.createElement('video');
                video.src = 'public/images/TourStart.mp4';  // 视频路径
                video.type = 'video/mp4';
                video.autoplay = true;  // 自动播放
                video.loop = false;  // 不循环
                video.style.position = 'absolute';  // 设置为绝对定位
                video.style.top = '0';  // 顶部对齐
                video.style.left = '0';  // 左侧对齐
                video.style.width = '100%';  // 视频宽度填充屏幕
                video.style.height = '100%';  // 视频高度填充屏幕
                video.style.zIndex = '1000';  // 确保视频在其他内容之上

                // 将视频元素添加到页面
                document.body.appendChild(video);

                // 播放结束后移除视频
                video.onended = () => {
                    document.body.removeChild(video);
                };
            }

            playVideo();
            

            // 清空卡牌容器
            const Cards_Container = document.getElementById('cards-container')
            Cards_Container.innerHTML = '';
    
            // 开始动画
            await update_Cost_Animation();

            // 清除已创建标记
            cards_Created = false;

            // 归零护盾
            playerShield = 0;
            shieldImg.innerHTML = ''; // 清空图片
            shieldNumber.textContent = ''; // 清空护盾数值


            // 重新创建卡牌
            createCards();  
    
            // 更新最终状态为最大值
            document.getElementById('cost-bar').textContent = `${maxCost}/${maxCost}`;
            document.getElementById('Cost_Rest').src = `public/images/Cost_${maxCost}.png`;


            console.log("Tour :" + Tour_Number);
            Tour_Number += 1;
            const Round_Counter = document.getElementById('Tour-Number');
            if (Round_Counter) {
                Round_Counter.textContent = Tour_Number; // 修改显示文本
            }
        });
    }  

    

    // 更新指定敌人的血条
    function update_Health(Select_ID) {
        const healthBar = document.getElementById(`health-bar-${Select_ID.split('-')[1]}`);
        const healthText = document.getElementById(`health-text-${Select_ID.split('-')[1]}`);
        const currentHealth = enemyHealth[Select_ID];
        const max_Health = enemyMax[Select_ID];

        // 计算血量百分比，确保范围在 0-100%
        const healthPercentage = Math.max((currentHealth / max_Health) * 100, 0);
        healthBar.style.background = `linear-gradient(to right, red ${healthPercentage}%, gray 0%)`;
        healthText.textContent = `${currentHealth}/${max_Health}`;

        // 更新血条宽度和文本
        healthText.style.width = `${healthPercentage}%`;
        healthText.textContent = `${currentHealth}/${max_Health}`;

        // 确保血条可见
        healthBar.style.display = 'block'; // 或者 'flex'，根据你的布局
        healthText.style.display = 'block'; // 或者 'flex'，根据你的布局
    }




    // 玩家治疗函数
    function heal_Player(healAmount) {
        playerHealth = Math.min(playerHealth + healAmount, playerMaxHealth); // 血量不能超过最大值
        update_PlayerHealth();
    }

    // 玩家护盾
    function Shield_Player(healAmount) {
        // 更新玩家护盾值，确保不会超过最大血量
        playerShield = playerShield + healAmount;

        // 如果玩家有护盾，显示图片和护盾数值
        if (playerShield > 0) {
            // 设置护盾图片
            if (shieldImg) {
                shieldImg.innerHTML = '<img src="public/images/Shield.png" alt="Shield Icon" style="width: 100%; height: 100%;">';
            }

            // 显示护盾数值
            if (shieldNumber) {
                shieldNumber.textContent = playerShield; // 显示护盾值
            }
        } else {
            console.log("Shield number unkonw")
        }
    }



    // 处理卡牌拖动事件 Réaction de Drag Card en route
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', (e) => {
        console.log("card.id:", card.id);
        console.log("card:", card);
        
        // 将 card.id 转换为字符串，以便与 API 数据中的 ID 匹配, Chercher ID par api/data
        const cardId = card.id.toString(); // 确保是字符串类型
        console.log("Parsed cardId:", cardId);

        
        // 查找对应的卡牌数据, Chercher des cartes sur data
        
        const cardData = Cartes.find(c => c.ID === cardId);
        if (!cardData) {
            console.error("Card not found in Cartes:", cardId);
            return;
        }
        console.log("Card data found:", cardData);
        
        // 获取Get Resultat
        let Resultat;
        try {
            Resultat = Skill_Card(Cartes, Personnages[0], cardId).Resultat;
            Type = Skill_Card(Cartes, Personnages[0], cardId).Type;
        } catch (error) {
            console.error("Error in Skill_Card for card ID", cardId, error);
            Resultat = 0;  // 如果出错，则设为默认值
        }
        
        console.log("FB resultat Change:", Resultat);
        
        
        console.log("Carte select Type:", Type);

        const CostChange = cardData.Cost;
        console.log("Cost Change:", CostChange);
        
        // 假设 data-target-enemy 存储对应敌人 ID
        
        const Select_ID = card.dataset.targetEnemy;
        
    
            // 动态展示选中卡牌的数据
            const infoPanel = document.getElementById('card-info-panel');
            if (infoPanel) {
                // 清空旧数据
                infoPanel.innerHTML = '';
                
                console.log("Data" + card.id)
                // 显示新的卡牌数据
                const title = document.createElement('h3');
                title.textContent = `Card Name: ${card.id}`;
                const cost = document.createElement('p');
                cost.textContent = `Cost: ${CostChange}`;
                const select = document.createElement('p');
                select.textContent = `Target: ${Select_ID}`
                const typeElement = document.createElement('p');
                typeElement.textContent = `Type de carte est: ${Type}`;
                const Rsultat = document.createElement('p');
                Rsultat.textContent = `Resultat Change: ${Resultat || 'N/A'}`;
    
                infoPanel.appendChild(title);
                infoPanel.appendChild(cost);
                infoPanel.appendChild(select);
                infoPanel.appendChild(typeElement);
                infoPanel.appendChild(Rsultat);

                setTimeout(() => {
                    infoPanel.style.opacity = '0';
                    infoPanel.style.transition = 'opacity 1s';
    
                    setTimeout(() => {
                        infoPanel.innerHTML = ''; // 清空所有内容
                        infoPanel.style.opacity = '1'; // 重置透明度
                    }, 3000);
                }, 2000);
    
            }
        
        // 存储卡牌相关信息 Enreigestrement des infos par setData
        e.dataTransfer.setData('health-change', JSON.stringify({ Resultat, CostChange, Select_ID }));
        e.dataTransfer.setData('card-id', card.id); // 传递卡牌 id
    });
});

// 允许在目标区域放置卡牌
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (e) => {
    // 阻止浏览器执行默认行为的方法
    e.preventDefault();
});

// 放下卡牌效果 Déposer la cartes
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    // 获取传递的数据 Get data Par JSON
    let { Resultat, CostChange, Select_ID } = JSON.parse(e.dataTransfer.getData('health-change'));
    const draggedCardId = e.dataTransfer.getData('text/plain'); // 获取卡牌的 id
    const delete_CardId = e.dataTransfer.getData('card-id');

    //Corriger si enemy_select morte
    //更替敌人，如果死亡
    while (enemyHealth[Select_ID] <= 0) {
        console.log("Correction de select en route")
        let List_Vivants = [];
        for (let i = 1; i <= 3; i++) {
            if (enemyHealth[`enemy-${i}`] > 0) {
                //console.log("List de Vivant " + List_Vivants);
                List_Vivants.push(`enemy-${i}`);
                //console.log("List de Vivant après " + List_Vivants);
                //console.log("Corriger " + Select_ID)
                let Random_Select = Math.floor(Math.random() * List_Vivants.length);
                //console.log(Random_Select)
                //console.log(List_Vivants[Random_Select])
                Select_ID = List_Vivants[Random_Select];
                //console.log("à " + Select_ID )
            }
        }
    }


    // 更新数据 update la situation
    if (Select_ID in enemyHealth) {
        // 更新能量条 update COST
        const currentCost = parseInt(document.getElementById('cost-bar').textContent.split('/')[0]);
        const maxCost = parseInt(document.getElementById('cost-bar').textContent.split('/')[1]);

        if (currentCost >= CostChange) {
            const newCost = currentCost - CostChange;
            document.getElementById('cost-bar').textContent = `${newCost}/${maxCost}`;
            document.getElementById('Cost_Rest').src = `public/images/Cost_${newCost}.png`;

            // 运行卡牌 Action cartes
            switch(Type)
            {
                case "Attack":
                    enemyHealth[Select_ID] = Math.max(enemyHealth[Select_ID] - Resultat, 0);
                    update_Health(Select_ID);
                    break;
                case "Shield":
                case "Parer":
                case "Barrier":
                    Shield_Player(Resultat)
                    break;
                default:
                    console.log("Cartes unknow");
                    break;
            }


            // 从拖动的卡牌中获取图片路径 Un affichage de Cartes pour vérifier 
            const cardImagePath = `${draggedCardId}`;
            const cardImage = document.createElement('img');
            cardImage.className = 'used-card-image';
            cardImage.src = cardImagePath;
            afficheZone.appendChild(cardImage);

            // 设置短暂延迟后淡出 Animation de retard et disparer
            setTimeout(() => {
                cardImage.style.opacity = '0';
                cardImage.style.transition = 'opacity 1s';

                setTimeout(() => {
                    afficheZone.removeChild(cardImage);
                }, 1000);
            }, 1000);

            // 删除卡牌
            const draggedCard = document.getElementById(delete_CardId);
            if (draggedCard) {
                draggedCard.remove(); // 删除 DOM 中的卡牌元素
            }
        } else {
            alert("Cost not enough！");
        }

        // 检查血量是否归零
        if (enemyHealth[Select_ID] <= 0) {
            const enemyElement = document.getElementById(Select_ID);

            // 显示透明化效果
            enemyElement.style.opacity = 0.8;

            if (!enemyElement.querySelector('.defeated-overlay')) {
                const overlayText = document.createElement("div");
                overlayText.textContent = "Dead!";
                overlayText.className = "defeated-overlay";
                enemyElement.appendChild(overlayText);
            }
        }
    }

    





    // 判断是否赢得比赛
    if (Object.values(enemyHealth).every(health => health <= 0)) {
        const winMessage = document.createElement('div');
        winMessage.textContent = "Win!";
        winMessage.className = "win-message";
        document.body.appendChild(winMessage);

        winMessage.style.position = "fixed";
        winMessage.style.top = "0";
        winMessage.style.left = "0";
        winMessage.style.right = "0";
        winMessage.style.bottom = "0";
        winMessage.style.display = "flex";
        winMessage.style.alignItems = "center";
        winMessage.style.justifyContent = "center";
        winMessage.style.fontSize = "70px";
        winMessage.style.fontWeight = "bold";
        winMessage.style.color = "gold";
        winMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        winMessage.style.padding = "50px";
        winMessage.style.borderRadius = "20px";
        winMessage.style.border = "5px solid gold";
        winMessage.style.textShadow = "0 0 10px gold, 0 0 20px gold, 0 0 30px gold";
        winMessage.style.zIndex = "99999";

            // Ajoute un délai de 3 secondes avant le rafraîchissement/redirection
    setTimeout(() => {
        // Remplacez 'https://example.com' par le lien que vous voulez ouvrir
        window.location.href = '/req_chap1_stage_event21?link=0&mission=combat1';
    }, 4000); // Temps en millisecondes (3000 ms = 3 secondes)
    }
});


    // 初始化血量条
    Object.keys(enemyHealth).forEach(update_Health);
    // 初始化玩家血量
    update_PlayerHealth();

    // 示例：玩家受伤和治疗
    document.getElementById('damage-btn').addEventListener('click', () => damage_Player(20, shieldNumber, shieldImg));
    document.getElementById('heal-btn').addEventListener('click', () => heal_Player(15));
    

    // fs write 失败后角色的血量数据，反馈到主服务器。
});
