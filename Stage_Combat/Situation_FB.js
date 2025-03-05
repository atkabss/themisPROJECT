window.GetSituation = async function () {
    try {
        // 获取数据
        const response = await fetch("http://localhost:5000/combat/situation");
        const data = await response.json();

        // 确保数据格式正确
        console.log("Data received:", data);
        console.log("Lance_Situation after fetch:", data.Lance_Situation);
        console.log("FB_Situation after fetch:", data.FB_Situation);


        // 返回数据供其他地方使用
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // 返回 null 表示出错
    }
};
