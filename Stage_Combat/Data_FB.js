window.GetData = async function () {
    try {
        // 获取数据
        const response = await fetch("http://localhost:5000/api/data");
        const data = await response.json();

        // 确保数据格式正确
        console.log("Data received:", data);
        console.log("Personnages after fetch:", data.personnage);
        console.log("Cartes after fetch:", data.cartes);
        console.log("Monster after fetch:", data.monster);

        // 初始化游戏
        initializeGame(data);

        // 返回数据供其他地方使用
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // 返回 null 表示出错
    }
};

// 游戏初始化函数
function initializeGame(data) {
    if (!data || data.personnage.length === 0 || data.cartes.length === 0) {
        console.error("Data not properly loaded. Personnages or Cartes is empty.");
        return;
    }

    console.log("Game initialized with:", data);
    // 在这里继续进行游戏逻辑
}