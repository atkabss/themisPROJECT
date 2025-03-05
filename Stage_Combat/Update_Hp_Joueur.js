// 玩家血量定义
let playerHealth;
let playerMaxHealth;

// 定义一个回调函数
function processHealth(playerHealth, playerMaxHealth) {
    console.log("Player Health:", playerHealth);
    console.log("Player Max Health:", playerMaxHealth);
}

(async function () {
    let Personnages = [];

    const FB_Data = await GetSituation(); // 等待 GetData() 返回结果
    console.log("IUHJ FB_Data", FB_Data)

    if (FB_Data) { 
        Personnages = FB_Data.Lance_Situation;
        playerHealth = Personnages[0].HP;
        playerMaxHealth = Personnages[0].HP_Max;
    
        processHealth(playerHealth, playerMaxHealth);
        
        // 立即更新血量条，确保 UI 里显示正确数据
        update_PlayerHealth();
    }
    
})();

// 显示失败信息
function display_LoseMessage() {
    const loseMessage = document.createElement('div');
    loseMessage.textContent = "You Lose!";
    loseMessage.className = "lose-message";
    document.body.appendChild(loseMessage);

    // 样式设置
    loseMessage.style.position = "fixed";
    loseMessage.style.top = "0";
    loseMessage.style.left = "0";
    loseMessage.style.right = "0";
    loseMessage.style.bottom = "0";
    loseMessage.style.display = "flex";
    loseMessage.style.alignItems = "center";
    loseMessage.style.justifyContent = "center";
    loseMessage.style.fontSize = "70px";
    loseMessage.style.fontWeight = "bold";
    loseMessage.style.color = "red";
    loseMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    loseMessage.style.zIndex = "99999";
}

// 更新玩家血量条的函数
window.update_PlayerHealth = async function () {
    console.log("\n\n\nIn Update HP Joueur\n\n\n")

    const healthBar = document.getElementById('player-health-bar'); // 血量条元素
    const healthText = document.getElementById('player-health-text'); // 血量文本

    // 计算血量百分比，确保范围在 0%-100%
    const healthPercentage = Math.max((playerHealth / playerMaxHealth) * 100, 0);
    healthBar.style.background = `linear-gradient(to right, red ${healthPercentage}%, gray 0%)`;

    // 更新血量文本内容
    healthText.style.width = `${healthPercentage}%`;
    healthText.textContent = `${playerHealth}/${playerMaxHealth}`;

    // 检查玩家是否死亡
    if (playerHealth <= 0) {
        console.log("Player has died!");
        display_LoseMessage();
    }
}

// 玩家受伤函数
window.damage_Player = function (damage, shieldNumber, shieldImg) {
    console.log("\n\n\n")

    let playerShield;
    // 检查该元素是否有内容
    // 确保 `playerShield` 是一个有效数字
    if(shieldNumber.textContent){
        playerShield = parseInt(shieldNumber.textContent) || 0;
    }
    else{
        playerShield = 0;
    }

    console.log("Shield est: " + playerShield)
    console.log("Player HP est: "+ playerHealth)
    console.log("Damage est:" + damage)
    if(playerShield > damage)
    {
        playerShield -= damage;
        damage = 0;
    }
    else if(playerShield <= damage)
    {
        damage -= playerShield;
        playerShield = 0;
        shieldImg.innerHTML = ''; // 清空图片
        shieldNumber.textContent = ''; // 清空护盾数值
    }
    playerHealth = Math.max(playerHealth - damage, 0); // 血量不能低于 0
    update_PlayerHealth();
}
