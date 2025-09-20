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

function parser(url) {
    let arr = url.split('//')
    const protocol = arr[0]    
    let arr1 = arr[1].split('/')
    const hostName = arr1[0]
    const arr2 = arr[1].split('?')
    const arr3 = arr2[0].split('/')
    const path = '/' + arr3.slice(1).join('/')
    const queryArr = arr2[1].split('&')    
    const query = {}
    queryArr.forEach((item) => {
        const [key, value] = item.split('=')
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

const newUrl = parser(decodeURI(url))
console.log(newUrl);
