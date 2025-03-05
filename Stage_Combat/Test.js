// 父容器绑定 dragstart 事件
const cardsContainer = document.getElementById('cards-container'); // 卡牌父容器

cardsContainer.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.card'); // 确保事件来源于卡牌元素
    if (!card) return; // 如果不是卡牌，直接返回

    console.log("card.id:", card.id);
    console.log("card:", card);

    const cardId = card.id.toString(); // 确保是字符串类型
    console.log("Parsed cardId:", cardId);

    const cardData = Cartes.find(c => c.ID === cardId);
    if (!cardData) {
        console.error("Card not found in Cartes:", cardId);
        return;
    }
    console.log("Card data found:", cardData);

    let healthChange;
    try {
        healthChange = Skill_Card(Cartes, Personnages[0], cardId).Resultat;
    } catch (error) {
        console.error("Error in Skill_Card for card ID", cardId, error);
        healthChange = 0; // 如果出错，默认值为 0
    }

    console.log("Health Change:", healthChange);

    const CostChange = cardData.Cost;
    console.log("Cost Change:", CostChange);

    const Select_ID = card.dataset.targetEnemy; // 假设 data-target-enemy 存储对应敌人 ID

    // 存储卡牌相关信息
    e.dataTransfer.setData('health-change', JSON.stringify({ healthChange, CostChange, Select_ID }));
    e.dataTransfer.setData('card-id', card.id); // 传递卡牌 id
});
