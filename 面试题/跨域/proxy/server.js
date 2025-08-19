const http =require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
    // 向他人的后端发送请求, 拿到数据发送给我的前端
    http.request({
        host: '192.168.1.75',
        port: '3000',
        method: 'GET',
        path: '/',
        headers: {}
    }, (proxyRes) => {
        proxyRes.on('data', (data) => {
            console.log(data.toString());
            res.end(data.toString())
        })
    }).end()
})

server.listen(3000, () => {
    console.log('server is running 3000')
})
