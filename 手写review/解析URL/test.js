const url = 'https://www.baidu.com/order/home?user=Tom&id=123&city=%E5%8D%97%E6%98%8C&id=6666&id=7777'

// 1. decodeURIComponent() - 解码URI组件（最常用）
const encodedCity = '%E5%8D%97%E6%98%8C'
const decodedCity = decodeURIComponent(encodedCity)
console.log('解码后的城市名:', decodedCity) // 输出: 南昌

// 2. decodeURI() - 解码完整URI（保留特殊字符如 ? & =）
const encodedUrl = 'https://www.baidu.com/order/home?city=%E5%8D%97%E6%98%8C'
const decodedUrl = decodeURI(encodedUrl)
console.log('解码后的URL:', decodedUrl)

// 3. 使用URLSearchParams解析查询参数（推荐方式）
const urlObj = new URL(url)
const params = new URLSearchParams(urlObj.search)

console.log('解析后的查询参数:')
console.log(params);
for (const [key, value] of params) {
  console.log(`${key}: ${value}`) // URLSearchParams会自动解码
}

// 4. 手动解析并解码查询参数
function parseUrlParams(url) {
  const params = {}
  const urlObj = new URL(url)
  const searchParams = urlObj.searchParams
  
  // 处理重复参数（如多个id）
  for (const [key, value] of searchParams) {
    if (params[key]) {
      // 如果参数已存在，转换为数组
      if (Array.isArray(params[key])) {
        params[key].push(decodeURIComponent(value))
      } else {
        params[key] = [params[key], decodeURIComponent(value)]
      }
    } else {
      params[key] = decodeURIComponent(value)
    }
  }
  
  return params
}

const parsedParams = parseUrlParams(url)
console.log('手动解析的参数:', parsedParams)