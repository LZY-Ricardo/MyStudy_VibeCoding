const url = 'https://www.baidu.com/order/home?user=Tom&id=123&city=%E5%8D%97%E6%98%8C&id=6666&id=7777' // 'https://www.baidu.com/order/home?user=Tom&id=123&city=南昌'
const urlDecode = decodeURI(url)

const output = {
    protocol: 'https:',
    hostName: 'www.baidu.com',
    path: '/order',
    query: {
        user: 'Tom',
        id: [123, 6666],
        city: '南昌'
    }
}

function parser(url) {
    const protocolArr = url.split('://')
    const protocol = protocolArr[0]
    const hostName = protocolArr[1].split('/')[0]
    const path = protocolArr[1].split('?')[0].slice(hostName.length)
    const queryArr = protocolArr[1].split('?')[1].split('&')
    const query = {}
    queryArr.forEach((item) => {
        const itemArr = item.split('=')
        const key = itemArr[0]
        const value = itemArr[1]
        if (query[key]) {
            if (Array.isArray(query[key])) {
                query[key].push(value)
            } else {
                query[key] = [query[key], value]
            }
        } else {
            query[key] = value
        }
    })
    return {
        protocol,
        hostName,
        path,
        query
    }
}
console.log(parser(urlDecode));
