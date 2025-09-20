const url = 'https://www.baidu.com/order/home?user=Tom&id=123&city=%E5%8D%97%E6%98%8C&id=6666&id=7777'

// 期望输出格式
const expectedOutput = {
    protocol: 'https:',
    hostName: 'www.baidu.com',
    path: '/order/home',
    query: {
        user: 'Tom',
        id: [123, 6666, 7777], // 注意这里应该包含所有id值
        city: '南昌'
    }
}

/**
 * 使用正则表达式解析URL
 * @param {string} url - 待解析的URL字符串
 * @returns {object} 解析后的URL对象
 */
function parseUrlWithRegex(url) {
    // 1. 使用正则匹配URL的各个部分
    const urlRegex = /^(https?):\/\/([^\/\?]+)(\/[^\?]*)?(\?.*)?$/
    const match = url.match(urlRegex)
    console.log(match);
    
    
    if (!match) {
        throw new Error('无效的URL格式')
    }
    
    const [, protocol, hostName, path = '', queryString = ''] = match
    
    // 2. 解析查询参数
    const query = parseQueryString(queryString)
    
    return {
        protocol: protocol + ':',
        hostName,
        path: path || '/',
        query
    }
}

/**
 * 解析查询字符串
 * @param {string} queryString - 查询字符串（包含?）
 * @returns {object} 解析后的查询参数对象
 */
function parseQueryString(queryString) {
    const query = {}
    
    if (!queryString || queryString === '?') {
        return query
    }
    
    // 移除开头的?号
    const cleanQuery = queryString.replace(/^\?/, '')
    
    // 使用正则匹配所有键值对
    const paramRegex = /([^&=]+)=([^&]*)/g
    let match
    
    while ((match = paramRegex.exec(cleanQuery)) !== null) {
        const key = decodeURIComponent(match[1])
        const value = decodeURIComponent(match[2])
        
        // 处理重复参数（转换为数组）
        if (query[key]) {
            if (Array.isArray(query[key])) {
                query[key].push(isNaN(value) ? value : Number(value))
            } else {
                query[key] = [query[key], isNaN(value) ? value : Number(value)]
            }
        } else {
            query[key] = isNaN(value) ? value : Number(value)
        }
    }
    
    return query
}

/**
 * 更简洁的正则解析方式（一步到位）
 * @param {string} url - 待解析的URL
 * @returns {object} 解析结果
 */
function parseUrlOneStep(url) {
    // 一个更复杂的正则，直接匹配所有部分
    const fullRegex = /^(https?):\/\/([^\/\?]+)(\/[^\?]*)?\??(.*)?$/
    const match = url.match(fullRegex)
    
    if (!match) return null
    
    const [, protocol, hostName, path, queryString] = match
    
    // 解析查询参数
    const query = {}
    if (queryString) {
        // 匹配所有参数对
        const params = queryString.match(/([^&=]+)=([^&]*)/g) || []
        
        params.forEach(param => {
            const [key, value] = param.split('=').map(decodeURIComponent)
            
            if (query[key]) {
                query[key] = Array.isArray(query[key]) 
                    ? [...query[key], isNaN(value) ? value : Number(value)]
                    : [query[key], isNaN(value) ? value : Number(value)]
            } else {
                query[key] = isNaN(value) ? value : Number(value)
            }
        })
    }
    
    return {
        protocol: protocol + ':',
        hostName,
        path: path || '/',
        query
    }
}

// 测试解析结果
console.log('=== 方法一：分步解析 ===')
const result1 = parseUrlWithRegex(url)
console.log(JSON.stringify(result1, null, 2))

console.log('\n=== 方法二：一步解析 ===')
const result2 = parseUrlOneStep(url)
console.log(JSON.stringify(result2, null, 2))

console.log('\n=== 验证结果 ===')
console.log('协议匹配:', result1.protocol === expectedOutput.protocol)
console.log('主机名匹配:', result1.hostName === expectedOutput.hostName)
console.log('路径匹配:', result1.path === expectedOutput.path)
console.log('查询参数匹配:', JSON.stringify(result1.query) === JSON.stringify(result2.query))