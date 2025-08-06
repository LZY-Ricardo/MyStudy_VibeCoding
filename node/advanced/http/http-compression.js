const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const zlib = require('zlib')


const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www', req.url))
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            filePath = path.join(filePath, '/index.html')
        }

        if (fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath)
            const stat = fs.statSync(filePath)
            const timeStamp = req.headers['if-modified-since']
            let status = 200
            if (timeStamp && Number(timeStamp) === stat.mtimeMs) {
                status = 304
            }
            const mimeType = mime.getType(ext)
            const responseHeaders = {
                'Content-Type': mimeType,
                'Cache-Control': 'max-age=86400',
                'Last-Modified': stat.mtimeMs,
            }
            const acceptEncoding = req.headers['accept-encoding'] || ' '// 客户端支持的压缩方式
            
            // text/plain text/html application/json
            const compress = /^(text|application)\//.test(mimeType)
            console.log('MIME类型:', mimeType, '是否需要压缩:', compress)
            if (compress && acceptEncoding) {
                console.log('客户端支持的压缩方式:', acceptEncoding)
                acceptEncoding.split(/\s*,\s*/).some((item) => {
                    if (item === 'gzip') {
                        console.log('使用gzip压缩');
                        responseHeaders['Content-Encoding'] = 'gzip'
                        return true
                    }
                    if (item === 'deflate') {
                        responseHeaders['Content-Encoding'] = 'deflate'
                        return true
                    }
                    if (item === 'br') {
                        responseHeaders['Content-Encoding'] = 'br'
                        return true
                    }
                    return false
                })
                // responseHeaders['content-encoding'] = 'gzip'
            }
  
            
            res.writeHead(status, responseHeaders)
            const compressEncoding = responseHeaders['Content-Encoding']
            console.log('最终使用的压缩编码:', compressEncoding)

            if (status === 200) {
                const fileStream = fs.createReadStream(filePath)
                if (compress && compressEncoding) {
                    let comp = null
                    if (compressEncoding === 'gzip') {
                        comp = zlib.createGzip()
                    } else if (compressEncoding === 'deflate') {
                        comp = zlib.createDeflate()
                    } else if (compressEncoding === 'br') {
                        comp = zlib.createBrotliCompress()
                    }
                    fileStream.pipe(comp).pipe(res)
                } else {
                    fileStream.pipe(res)
                }
            } else {
                res.end()
            }
        }
    }
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})

