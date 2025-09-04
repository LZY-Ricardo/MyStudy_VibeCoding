const http = require('http')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs-extra')

// 辅助函数：解析 POST 请求体
const resolvePost = (req) => {
  return new Promise((resolve, reject) => {
    let chunk = ''
    req.on('data', (data) => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}

// 合并片段
const mergeChunks = async (filePath, fileName, size) => {
    let chunksPath = fs.readdirSync(filePath)
    console.log(chunksPath);
    chunksPath.sort((a, b) => {
        return a.split('-').pop() - b.split('-').pop()
    })
    
    // 创建最终的合并文件路径
    const finalFilePath = path.resolve(filePath, fileName)
    
    const arr = chunksPath.map((chunkFile, index) => {
        return pipeStream(
            path.resolve(filePath, chunkFile),
            fs.createWriteStream(finalFilePath, {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
    await Promise.all(arr)
}


// 管道流 
const pipeStream = (path, writeStream) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path)
        readStream.pipe(writeStream)
        readStream.on('end', () => { // 流式资源合并完成
            // 移除切片
            fs.removeSync(path)
            resolve()
        })
    })
}

const server = http.createServer(async(req, res) => {
  res.writeHead(200, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "*",
    "access-control-allow-headers": "*",
  })
  if (req.method === 'OPTIONS') { // 预检请求
    res.status = 200
    res.end()
    return
  }

  if (req.url === '/upload') {
    // 接受前端传过来的 formData
    // req.on('data', (data) => {
    //   console.log(data)
    // })

    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      // console.log(fields)
      // console.log(files)
      const [file] = files.file  // 5M 的资源
      const [fileName] = fields.fileName
      const [chunkName] = fields.chunkName
      // 保存文件
      const chunkDir = path.resolve(__dirname, 'qiepian', `${fileName}-chunks`)
      if (!fs.existsSync(chunkDir)) {  // 路径是否有效
        fs.mkdirsSync(chunkDir)
      }
      fs.moveSync(file.path, `${chunkDir}/${chunkName}`)

      res.end(
        JSON.stringify({
          code: 200,
          msg: '上传成功'
        })
      )
      
    })

  }

  if (req.url === '/merge') {
    const {fileName, size} = await resolvePost(req)
    console.log(fileName, size);
    const filePath = path.resolve(__dirname, 'qiepian', `${fileName}-chunks`)
    await mergeChunks(filePath, fileName, size)
    res.end(
        JSON.stringify({
            code: 200,
            msg: '合并成功'
        })
    )
  }

})

server.listen(3000, () => {
  console.log('server is running')
})