const net = require('net')

function responseData(str, status=200, desc='OK') {
  return `HTTP/1.1 ${status} ${desc}\r\nConnection: keep-alive\r\nContent-Type: text/html\r\nContent-Length: ${str.length}\r\nDate: ${new Date()}\r\n\r\n${str}`;
}

const server = net.createServer((socket) => {  // 建立连接时
  socket.on('data', (data) => {
    const matched = data.toString().match(/^GET ([/\w]+) HTTP/)
    console.log(matched);
    
    if (matched) {
      const path = matched[1]
      if (path === '/') {
        socket.write(responseData('<h1>hello world</h1>'))
      } else {
        socket.write(responseData('<h1>404 Not Found</h1>', 404, 'Not Found'))
      }
    }
    // console.log(`DATA:\n\n${data}`);
  })
  socket.on('close', () => {
    console.log('连接断开');
  })
})

server.listen(8080, () => {
  console.log('server is running at http://127.0.0.1:8080')
})