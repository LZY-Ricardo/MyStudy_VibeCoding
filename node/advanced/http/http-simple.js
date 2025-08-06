const http = require('http') // 引入http模块
http.createServer((req, res) => { // 创建HTTP服务器
  // 判断请求头Accept字段，内容协商
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'}) // 返回JSON
    res.end(JSON.stringify({msg: '你好，JSON！'}))
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}) // 返回HTML
    res.end('<h1>你好，HTTP模块！</h1>')
  }
}).listen(8080) // 监听8080端口