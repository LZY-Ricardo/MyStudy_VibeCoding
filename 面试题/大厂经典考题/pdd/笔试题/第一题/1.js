async function searchGoods(keyword) {
    // 模拟接口调用
    await new Promise(resolve => setTimeout(resolve, 300));
    return [keyword + '商品1', keyword + '商品2'];
}

const res = await searchGoods('iphone')
console.log(res);

// 搜索热词
const hotKeys = ['iPhone', 'iPad', '华为', '小米'];

/**
 * 创建搜索处理器
 * @returns Function 搜索处理函数
 */
function createSearchManager() {
    // TODO: 实现剩余代码
    let timer = null;

    return function (keyword) {
        // 请补充代码
    };
}

const searchManager = createSearchManager();