import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { exec } from 'child_process'

// 创建一个 MCP 服务器
const server = new McpServer({
  name: 'Demo',
  version: '1.0.0',
})

// 往 MCP 对象上添加一个工具
server.tool('listFiles', '列出当前目录下的所有文件', { path: z.string() }, async ({ path }) => {
  return new Promise((resolve, reject) => {
    exec(`dir ${path}`, async (err, stdout, stderr) => {
      if (err) {
        reject(err)
        return
      }
      if (stderr) {
        console.log(stderr)
      }
      resolve({
        content: [{ type: 'text', text: `已获取到目录 ${path} 下的文件列表: \n\`\`\`\n${stdout}\`\`\`\n` }]
      })
    })
  })
})

// 创建一个标准输入输出传输通道
const transport = new StdioServerTransport()
await server.connect(transport)
console.error('MCP 服务器已连接');