/**
 * 从嵌套数据结构中安全获取指定路径的值
 * @param {Object|Array} data - 要从中获取值的源数据（对象或数组）
 * @param {string} path - 要访问的属性路径（支持点符号和方括号语法，如"a.b[0].c"）
 * @param {*} [defaultValue=undefined] - 当路径不存在时返回的默认值
 * @returns {*} 路径对应的 value 或 defaultValue
 */
function getValue(data, path, defaultValue = undefined) {
    // 处理空路径情况：如果路径为空字符串，直接返回默认值
    if (!path) {
        return defaultValue;
    }

    // 路径解析逻辑：
    // 1. 替换连续的点号为单个点号（处理类似"a..b"的不规范路径）
    // 2. 使用点号(.)、左方括号([)、右方括号(])作为分隔符分割路径
    // 3. 过滤掉空字符串片段（处理分割后产生的空值）
    const pathSegments = path
        .replace(/\.+/g, '.')          // 替换连续点号为单个点号
        .split(/\.|\[|\]/)             // 按点号和方括号分割
        .filter(segment => segment !== '');  // 过滤空片段

    // 用于存储当前遍历到的数据节点
    let current = data;

    // 遍历路径片段，逐级访问数据
    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];

        // 处理数组索引情况（包括负索引）
        // 判断条件：以0开头的字符串或可以转换为数字的字符串
        if (segment.startsWith('0') || !isNaN(Number(segment))) {
            // 将片段转换为数字索引
            let index = Number(segment);

            // 处理负索引（如-1表示最后一个元素）
            if (index < 0) {
                // 检查当前数据是否为有效的非空数组
                // 如果不是数组或为空数组，无法使用负索引，返回默认值
                if (!Array.isArray(current) || current.length === 0) {
                    return defaultValue;
                }
                // 将负索引转换为正索引（例如：数组长度为3，-1 → 2）
                index = current.length + index;
            }

            // 验证索引有效性：当前必须是数组，且索引在有效范围内
            if (Array.isArray(current) && index >= 0 && index < current.length) {
                // 移动到数组的指定索引位置
                current = current[index];
            } else {
                // 索引无效（非数组或索引越界），返回默认值
                return defaultValue;
            }
        } else {
            // 处理对象属性情况（非数字的路径片段）
            // 检查当前数据是否为非空对象，且包含该属性
            if (current && typeof current === 'object' && segment in current) {
                // 移动到对象的指定属性
                current = current[segment];
            } else {
                // 对象属性不存在，返回默认值
                return defaultValue;
            }
        }

        // 中间结果检查：如果当前值为null或undefined，返回默认值
        // 避免后续访问时出现"Cannot read property 'x' of undefined"错误
        if (current === undefined || current === null) {
            return defaultValue;
        }
    }

    // 遍历完所有路径片段，返回最终找到的值
    return current;
}

// 测试用例：一个包含嵌套对象和数组的复杂数据结构
const config = {
    api: {
        endpoints: { prod: 'https://api.prod.com' },  // 嵌套对象
        timeout: 5000                                 // 数字属性
    },
    features: {
        flags: ['feature_a', 'feature_b', 'feature_c'],  // 数组
        settings: { 'enable-cache': true }                // 包含特殊字符的属性名
    },
    users: []  // 空数组
};

// 测试各种路径情况
console.log(getValue(config, 'api.endpoints.prod'));  // 输出: "https://api.prod.com"
console.log(getValue(config, 'api.timeout'));         // 输出: 5000
console.log(getValue(config, 'features.flags[2]'));   // 输出: "feature_c"（数组正索引）
console.log(getValue(config, 'features.flags[-1]'));  // 输出: "feature_c"（数组负索引）
console.log(getValue(config, 'features.settings.enable-cache'));  // 输出: true（特殊属性名）
console.log(getValue(config, 'users[-1]', 'default'));  // 输出: "default"（空数组访问失败）
console.log(getValue(config, '', 'emptyPathDefault'));  // 输出: "emptyPathDefault"（空路径）
console.log(getValue(config, 'nonExistent.path', 'notFound'));  // 输出: "notFound"（路径不存在）



// 函数功能解析
// 参数说明：
// data：要从中获取值的源数据（对象或数组）
// path：要访问的属性路径（如 api.endpoints.prod 或 features.flags[2]）
// defaultValue：当路径不存在时返回的默认值，默认为 undefined
// 路径处理逻辑：
// 首先处理空路径情况，如果路径为空则直接返回默认值
// 将路径字符串解析为路径片段数组：
// 替换连续的点号为单个点号
// 使用点号（.）和方括号（[、]）作为分隔符分割路径
// 过滤掉空字符串片段
// 值获取逻辑：
// 遍历路径片段，逐级访问数据
// 对每个片段进行判断：
// 如果是数字（包括负索引），则当作数组索引处理
// 负索引会被转换为对应的正索引（如数组长度为 3 时，-1 对应 2）
// 否则当作对象属性处理
// 在任何一步访问失败（如属性不存在、索引越界等），都会返回默认值
// 如果中间结果为 undefined 或 null，也会返回默认值
// 测试用例解析
// 给定测试数据 config 是一个嵌套对象，包含 api、features 和 users 三个属性：

// getValue(config, 'api.endpoints.prod')
// 获取 api.endpoints.prod 的值，输出 https://api.prod.com
// getValue(config, 'api.timeout')
// 获取 api.timeout 的值，输出 5000
// getValue(config, 'features.flags[2]')
// 获取 features.flags 数组的第 3 个元素，输出 feature_c
// getValue(config, 'features.flags[-1]')
// 使用负索引获取 features.flags 数组的最后一个元素，输出 feature_c
// getValue(config, 'features.settings.enable-cache')
// 获取 features.settings 中的 enable-cache 属性，输出 true
// getValue(config, 'users[-1]', 'default')
// users 是一个空数组，访问其最后一个元素会失败，返回默认值 default
// getValue(config, '', 'emptyPathDefault')
// 空路径，返回默认值 emptyPathDefault
// getValue(config, 'nonExistent.path', 'notFound')
// 访问不存在的路径，返回默认值 notFound