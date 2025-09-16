// 搜索防抖、热门推荐和请求竞速处理
/**
 * 创建一个搜索管理器，用于处理搜索防抖、热门推荐和请求竞速问题
 * @returns {Function} 搜索处理函数，接收搜索关键词作为参数
 */
function createSearchManager() {
    // 定时器ID，用于实现防抖功能（避免频繁输入时多次调用接口）
    let timer = null;
    // 请求ID计数器，用于标识每次请求的唯一性，解决请求竞速问题
    let currentRequestId = 0;

    /**
     * 处理搜索逻辑的函数
     * @param {string} keyword - 用户输入的搜索关键词
     * @returns {Promise<void>} 无返回值，结果通过console输出
     */
    return async function (keyword) {
        // 清除之前的定时器：如果用户在300ms内继续输入，取消上一次的搜索计划
        clearTimeout(timer);

        // 处理热门推荐逻辑
        // 将关键词转换为小写，统一匹配规则（不区分大小写）
        const lowerKeyword = keyword.toLowerCase();
        // 从预设的热门词列表(hotKeys)中筛选包含当前关键词的推荐词
        const matchedHotKeys = hotKeys.filter(item => 
            item.toLowerCase().includes(lowerKeyword)
        );
        // 如果有匹配的推荐词，输出推荐结果
        if (matchedHotKeys.length > 0) {
            console.log(`为你推荐：${matchedHotKeys.join(', ')}`);
        }

        // 处理空关键词场景：如果用户清空输入，输出"重新搜索"并终止函数
        if (keyword.trim() === '') {
            console.log('重新搜索');
            return;
        }

        // 防抖处理：等待用户输入停止300ms后再执行实际搜索
        timer = setTimeout(async () => {
            // 生成当前请求的唯一ID（前置自增确保ID唯一且递增）
            const requestId = ++currentRequestId;
            
            // 调用搜索接口获取结果（假设searchGoods是已实现的搜索函数）
            const result = await searchGoods(keyword);
            
            // 关键逻辑：只有最新的请求（ID与当前计数器一致）才输出结果
            // 防止因网络延迟导致旧请求的结果覆盖新请求的结果
            if (requestId === currentRequestId) {
                console.log(result);
            }
        }, 300); // 300ms的延迟时间，可根据需求调整
    };
}

// 代码核心逻辑总结：
// 防抖机制：通过setTimeout和clearTimeout实现，用户连续输入时不会频繁调用搜索接口，只有停顿 300ms 后才执行，减少无效请求。
// 热门推荐：实时根据用户输入的关键词，从预设的hotKeys中筛选匹配的推荐词并展示，提升搜索体验。
// 请求竞速处理：使用currentRequestId标记每次请求，确保只有最后一次发起的请求结果会被输出，避免因网络延迟导致的结果混乱（旧请求结果覆盖新结果）。
// 边界处理：针对空关键词场景做了特殊处理，输出 "重新搜索" 提示。
