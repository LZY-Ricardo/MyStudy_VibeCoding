import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1',
})

// 工具声明: 告诉这个模型这个做什么, 有什么参数
const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
        type: 'function',
        function: {
            name: 'get_weather',
            description: '查询指定城市的当前的天气',
            parameters: {
                type: 'object',
                properties: {
                    city: {
                        type: 'string',
                        description: '城市名称,如上海、北京'
                    }
                },
                required: ['city']
            }
        }
    }
]   

// 真实项目中在这里调用天气API，这里用模拟数据
function get_weather(city: string): string { 
    const data: Record<string, string> = {
        '北京': '晴，22°C，东南风 3 级',
        '上海': '多云，18°C，东风 2 级',
        '广州': '小雨，26°C，南风 2 级',
    }
    return data[city] || `${city} 的天气数据不存在`;
}

async function runAgent(userMessage: string): Promise<void> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {role: 'user', content: userMessage}
    ]

    // 循环次数记录
    let count: number = 1
    while (true) { 
        // 监控循环次数
        console.log(`--------- 目前是第 ${count} 次循环---------`)
        count += 1

        const response = await client.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'openai/gpt-oss-120b:free',
            tools,
            messages,
        })

        // 将模型回复加入历史对话
        console.log(`模型整体输出：`)
        console.dir(response, { depth: null })

        const message = response.choices[0].message
        messages.push(message)

        // Agent输出内容 有内容才打印 工具调用场景下 message.content 可能为空 模型可能返回 tool_calls
        if (message.content) { 
            console.log(`Agent: ${message.content}`)
        }

        // 检查停止原因
        if (response.choices[0].finish_reason === 'stop') { 
            // 模型已经生成最终文本回复, 退出循环
            return
        }

        // 兜底策略 出现了当前代码没有覆盖到的情况 某些模型可能返回别的 finish_reason 当前代码没处理,就直接停掉
        if (response.choices[0].finish_reason !== 'tool_calls' || !message.tool_calls) { 
            console.log(`未处理的 finish_reason: ${response.choices[0].finish_reason}`)
            return
        }

        // 模型要调用工具，逐个执行并收集结果
        for (const toolCall of message.tool_calls) { 
            if (toolCall.type !== 'function') continue

            console.log(`${toolCall.function.name}(${toolCall.function.arguments})`);

            let result: string
            if (toolCall.function.name === 'get_weather') {
                const input = JSON.parse(toolCall.function.arguments) as { city?: string }
                result = get_weather(input.city ?? '')
            } else { // 返回了当前代码不认识的工具,就返回一个错误提示字符 而不是直接崩溃
                result = `Unknown tool: ${toolCall.function.name}`
            }

            console.log(`Tool result: ${result}`)

            // 把工具结果推回给对话，让模型继续循环
            messages.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                content: result
            })
        }
    }
}

// 运行
runAgent('北京天气怎么样？适合出去跑步吗？').catch(error => { 
    console.log(error);
    process.exitCode = 1
})