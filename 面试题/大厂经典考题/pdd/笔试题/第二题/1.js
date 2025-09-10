const config = {
    api: {
        endpoints: { prod: 'https://api.prod.com' },
        timeout: 5000
    },
    features: {
        flags: ['feature_a', 'feature_b', 'feature_c'],
        settings: { 'enable-cache': true }
    },
    users: [] // 空数组，用于测试边界
};

function getValue(data, path, defaultValue = undefined) {
    if (!path) {
        return defaultValue
    }

    path = path.replace(/\.\.+/g, '.').replace(/\[(-?\d+)\]/g, '.$1')
    // console.log(path);

    const pathArr = path.split('.')

    let current = data
    for (let key of pathArr) {
        if (Array.isArray(current) && key < current.length) {
            if (key >= 0) {
                current = current[key]
            } else if (current.length + Number(key) >= 0) {
                current = current[current.length + Number(key)]
            } else {
                return defaultValue
            }
        } else if (key in current) {
            current = current[key]
        } else {
            return defaultValue
        }
    }
    return current
}

// 测试各种路径情况
console.log(getValue(config, 'api.endpoints.prod'));  // 输出: "https://api.prod.com"
console.log(getValue(config, 'api.timeout'));         // 输出: 5000
console.log(getValue(config, 'features.flags[2]'));   // 输出: "feature_c"（数组正索引）
console.log(getValue(config, 'features.flags[-1]'));  // 输出: "feature_c"（数组负索引）
console.log(getValue(config, 'features.settings.enable-cache'));  // 输出: true（特殊属性名）
console.log(getValue(config, 'users[-1]', 'default'));  // 输出: "default"（空数组访问失败）
console.log(getValue(config, '', 'emptyPathDefault'));  // 输出: "emptyPathDefault"（空路径）
console.log(getValue(config, 'nonExistent.path', 'notFound'));  // 输出: "notFound"（路径不存在）