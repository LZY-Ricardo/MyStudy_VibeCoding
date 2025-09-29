import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

// 创建一个 MCP 客户端
export async function createClient() {
  const client = new Client({
    name: 'Demo',
    version: '1.0.0',
  })

  // 创建一个标准输入输出传输通道
  const transport = new StdioClientTransport({ // 和 mcp 服务器连接
    command: 'node',
    args: ['server.js'],
  })
  await client.connect(transport)
  console.log('MCP 客户端已连接');
  return client
}