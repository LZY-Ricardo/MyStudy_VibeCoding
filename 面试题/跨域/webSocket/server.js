const webSocket = require('ws')

const ws = new webSocket.Server({
    port: 3000
})

let count = 0

ws.on('connection', (socket) => {
    console.log('建立连接成功');
    socket.on('message', (data) => { // 接收客户端发送过来的数据
        // console.log(JSON.parse(data));
        socket.send('欢迎访问服务端')
        setInterval(() => {
            count++
            socket.send(count)
        }, 5000)
    })
})
