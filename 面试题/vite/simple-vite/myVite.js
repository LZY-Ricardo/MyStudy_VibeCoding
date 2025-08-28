const http = require('http')
const fs = require('fs')
const path = require('path')
// 引入一个可以转换 jsx 语法的模块

function rewriteImport(content) {
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function(s0, s1) {
        console.log(s0, s1)
        if (s1[0] !== '.' && s1[1] !== '/') {
            return ` from '/@modules/${s1}'`
        } else {
            return s0
        }
    })
}

const server = http.createServer((req, res) => {
    const { url } = req 
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        let content = fs.readFileSync('./index.html', 'utf-8')
        res.end(content)
    } else if (url.endsWith('.js')) { // /src/main.js
        const p = path.resolve(__dirname, url.slice(1))
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        const content = fs.readFileSync(p, 'utf-8')
        res.end(rewriteImport(content))
    } else if (url.startsWith('/@modules/')) { // 去 node_modules 中读取源码
        // const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''))
        // const module = url.replace('/@modules/', '').split('/')[0]
        // const p = path.resolve(prefix, `cjs/${module}.development.js`)
        let newUrl = url.replace('/@modules/', '')
        let name = '', ext = ''
        if (newUrl === 'react') {
            name = 'react'
            ext = 'react'
        } else if (newUrl === 'react-dom/client') {
            name = 'react-dom'
            ext = 'react-dom-client'
        }
        const p = path.resolve(__dirname, 'node_modules', `${name}/cjs/${ext}.development.js`)
        const content = fs.readFileSync(p, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        res.end(rewriteImport(content))
    }
})

server.listen(5173, () => {
    console.log('server is running at http://localhost:5173')
})
