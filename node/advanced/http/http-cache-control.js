const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const checksum = require('checksum')


const server = http.createServer((req, res) => {
    // console.log(__dirname);
    // join 会直接将参数拼接起来，不会处理路径分隔符 resolve 会处理路径分隔符 在参数之间如果缺少分隔符 会自动添加
    let filePath = path.resolve(__dirname, path.join('www', req.url))
    if (fs.existsSync(filePath)) {
        let stat = fs.statSync(filePath)
        console.log(stat);
        if (stat.isDirectory()) { // 是文件夹...
            filePath = path.resolve(filePath, 'index.html')
        }
        if (fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath)
            // const timeStamp = req.headers['if-modified-since']
            // let status = 200
            // if (timeStamp && Number(timeStamp) === stat.mtimeMs) {
            //     status = 304
            // }
            // const contentType = mime.getType(ext)
            // res.writeHead(status, {
            //     'Content-Type': contentType, charset: 'utf-8',
            //     'Cache-Control': 'max-age=86400',
            //     "last-modified": stat.mtimeMs,
            // })
            // if (status === 200) {
            //     const fileStream = fs.createReadStream(filePath)
            //     fileStream.pipe(res)
            // } else {
            //     res.end()
            // }

            checksum.file(filePath, (err, sum) => {
                const resStream = fs.createReadStream(filePath)
                sum = `"${sum}"`

                if (req.headers['if-none-match'] === sum) {
                    res.writeHead(304, {
                        'Content-Type': mime.getType(ext),
                        'Cache-Control': 'max-age=86400',
                        'etag': sum
                    })
                    res.end()
                } else {
                    res.writeHead(200, {
                        'Content-Type': mime.getType(ext), charset: 'utf-8',
                        'Cache-Control': 'max-age=86400',
                        "etag": sum
                    })
                    resStream.pipe(res)
                }


            })
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('<h1>404 Not Found</h1>')
    }
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})
