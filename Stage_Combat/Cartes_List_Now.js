// 随机打乱数组
function Melange(list) {
    for (let i = list.length - 1; i > 0; i--) 
    {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [list[i], list[randomIndex]] = [list[randomIndex], list[i]];
    }
    return list;
}


function createNumberList(min, countPerNumber) {
    const list = [];
    for (let i = 0; i < countPerNumber; i++) 
    {
        list.push(min);
    }
    return list;
}


// 使用示例：创建一个包含 1-7 的数字，每个数字出现特定次数的数组
const result_1 = createNumberList(1, 4);
const result_2 = createNumberList(2, 2);
const result_3 = createNumberList(3, 1);
const result_4 = createNumberList(4, 4);
const result_5 = createNumberList(5, 2);
const result_6 = createNumberList(6, 2);
const result_7 = createNumberList(7, 1);


let cartePool = [];
window.FB_Cartes = function () {
    if (cartePool.length === 0) {
        cartePool = Melange([...result_1, ...result_2, ...result_3, ...result_4, ...result_5, ...result_6, ...result_7]);
    }
    return cartePool;
};


window.Random_get = function(list, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * list.length);
        result.push(list[randomIndex]); // 将随机抽取的元素加入结果
        list.splice(randomIndex, 1); // 从临时列表中删除已抽取元素
        if (list.length === 0) 
        {
            list = FB_Cartes(); // 使用 FB_Cartes 重置牌池
        }
    }
    return result;
};

