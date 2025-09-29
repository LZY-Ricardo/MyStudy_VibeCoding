import { EventEmitter } from 'node:events'
import { createClient } from '../mcp/client.js'
import axios from 'axios'

export class LLM {
    mcpClient = createClient()
    constructor(model, base_url, api_key) {
        this.model = model
        this.base_url = base_url
        this.api_key = api_key
    }

    get headers() {
        if (this.api_key) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.api_key}`,
            }
        }
    }

    async listTools() { // 列出所有工具
        return (await (await this.mcpClient).listTools()).tools.map(tool => {
            return {
                type: 'function',
                function: {
                    name: tool.name,
                    description: tool.description,
                    parameters: tool.parameters,
                }
            }
        })
    }

    async callTool(tool_name, tool_args) { // 调用工具
        const result = await (await this.mcpClient).callTool({
            name: tool_name,
            arguments: tool_args,
        })
        return {
            role: 'tool',
            name: tool_name,
            content: result.content[0].text,
        }
    }

    async chat(messages) { // 聊天
        const tools = await this.listTools()
        const response = await axios.post(`${this.base_url}/api/chat`, {
            model: this.model,
            messages,
            tools,
            stream: false,
        }, {
            headers: this.headers,
        })

        const data = response.data

        const reply = data.message.content
        const tool_calls = data.message.tool_calls

        if (tool_calls && tool_calls.length > 0) { // 大模型想要调用我们告知给它的工具
            const list = tool_calls.map(tool_call => { // 将大模型想要触发的工具全部触发
                console.log(tool_call);
                if (Object.keys(tool_call.function.arguments).length === 0) {
                    tool_call.function.arguments.path = '.'
                }
                return this.callTool(tool_call.function.name, tool_call.function.arguments)
            })
            const result = await Promise.all(list)
            return await this.chat([...messages, ...result]) // 工具执行完后的结果告知大模型
        }

        return reply

    }

}