// 获取卡牌容器
const cardsContainer = document.querySelector('.cards');

let Personnages = [];
let Cartes = [];
let Monster = [];
//Data fb
fetch("http://localhost:5000/api/data")
    .then((response) => response.json())
    .then((data) => {
        Personnages = data.personnage;
        Cartes = data.cartes;
        Monster = data.monster;
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    


// 标记是否已创建卡牌
let cards_Created = false;

// 函数：动态创建卡牌并插入到 .cards 容器中
function createCards() {
  // 如果卡牌已经创建过了，跳过创建
  if (cards_Created) {
    return;
  }

  // 创建卡牌
  const new_Cards = [
    { id: '2001', img: 'public/images/2001.jpg', draggable: true, targetEnemy: 'enemy-1', effect: 'shield' },
    { id: '2002', img: 'public/images/2002.jpg', draggable: true, targetEnemy: 'enemy-2', effect: 'attack' },
    { id: '2003', img: 'public/images/2003.jpg', draggable: true, targetEnemy: 'enemy-3', effect: 'shield' },
    { id: '2004', img: 'public/images/2004.jpg', draggable: true, targetEnemy: 'enemy-2', effect: 'attack' },
    { id: '2005', img: 'public/images/2005.jpg', draggable: true, targetEnemy: 'enemy-1', effect: 'attack' },
    { id: '2006', img: 'public/images/2006.jpg', draggable: true, targetEnemy: 'enemy-3', effect: 'attack' },
    { id: '2007', img: 'public/images/2007.jpg', draggable: true, targetEnemy: 'enemy-2', effect: 'attack' }
  ];

  let Desk_List = FB_Cartes();
  let Main_List = Random_get(Desk_List, 5);

  // 循环添加卡牌
  new_Cards.forEach((card, index) => {
    if (Main_List.includes(index)) {
      addCard(card.id, card.img, card.draggable, card.targetEnemy, card.effect);
    }
  });

  // 标记卡牌已经创建
  cards_Created = true;
}

// 函数：动态创建卡牌并插入到 .cards 容器中
function addCard(cardId, imgSrc, draggable, targetEnemy, cardEffect) {
  // 创建卡牌的外层 div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.id = cardId;
  cardDiv.draggable = draggable;
  cardDiv.setAttribute('data-target-enemy', targetEnemy);
  cardDiv.setAttribute('data-card', cardEffect);

  // 创建卡牌的图片元素
  const img = document.createElement('img');
  img.className = 'Cartes';
  img.src = imgSrc;

  // 将图片插入到卡牌外层 div
  cardDiv.appendChild(img);

  // 为卡牌绑定 dragstart 事件监听器
  cardDiv.addEventListener('dragstart', (e) => {
    console.log("card.id:", cardId);
    console.log("card:", cardDiv);

    // 查找对应的卡牌数据
    const cardData = Cartes.find(c => c.ID === cardId);
    if (!cardData) {
      console.error("Card not found in Cartes:", cardId);
      return;
    }
    console.log("Card data found:", cardData);

    // 获取 Resultat
    let Resultat;
    try {
      Resultat = Skill_Card(Cartes, Personnages[0], cardId).Resultat;
      Type = Skill_Card(Cartes, Personnages[0], cardId).Type;
    } catch (error) {
      console.error("Error in Skill_Card for card ID", cardId, error);
      Resultat = 0;  // 如果出错，则设为默认值
    }
    console.log("Health Change:", Resultat);
    console.log("Type est:" + Type)

    const CostChange = cardData.Cost;
    console.log("Cost Change:", CostChange);

    const Select_ID = cardDiv.dataset.targetEnemy;  // 假设 data-target-enemy 存储对应敌人 ID

        // 动态展示选中卡牌的数据
        const infoPanel = document.getElementById('card-info-panel');
        if (infoPanel) {
            // 清空旧数据
            infoPanel.innerHTML = '';
            
            // 显示新的卡牌数据
            const title = document.createElement('h3');
            title.textContent = `Card Name: ${cardId}`;
            const cost = document.createElement('p');
            cost.textContent = `Cost: ${CostChange}`;
            const select = document.createElement('p');
            select.textContent = `Target: ${Select_ID}`
            const typeElement = document.createElement('p');
            typeElement.textContent = `Type de carte est: ${Type}`;
            const healthChange = document.createElement('p');
            healthChange.textContent = `Health Change: ${Resultat || 'N/A'}`;

            infoPanel.appendChild(title);
            infoPanel.appendChild(cost);
            infoPanel.appendChild(select);
            infoPanel.appendChild(typeElement);
            infoPanel.appendChild(healthChange);

            setTimeout(() => {
                infoPanel.style.opacity = '0';
                infoPanel.style.transition = 'opacity 1s';

                setTimeout(() => {
                    infoPanel.innerHTML = ''; // 清空所有内容
                    infoPanel.style.opacity = '1'; // 重置透明度
                }, 1000);
            }, 2000);

        }


    // 存储卡牌相关信息
    e.dataTransfer.setData('health-change', JSON.stringify({ Resultat, CostChange, Select_ID }));
    e.dataTransfer.setData('card-id', cardId); // 传递卡牌 id
  });

  // 将新卡牌插入到卡牌容器中
  cardsContainer.appendChild(cardDiv);
}



// 首次创建卡牌
createCards();
window.createCards = createCards;

