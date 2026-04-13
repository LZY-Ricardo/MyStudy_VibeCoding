import OpenAI from 'openai'
import get_weather from './tools/getWeather.js'
import search_web from './tools/searchWeb.js'
import calculate from './tools/calculate.js'

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1',
})

const REACT_SYSTEM_PROMPT = `你是一个使用 ReAct（Reasoning and Acting）框架的 AI 助手。

在每次回答时，你必须严格遵守以下格式：

当需要使用工具时：
Thought: [你的推理过程，解释为什么需要这个工具]
Action: [工具名称]
Action Input: [JSON 格式的参数，必须是合法 JSON]

当你看到工具结果（以 Observation: 开头）后，继续：
Thought: [基于观察结果的再推理]
Action: [下一个工具] 或
Final Answer: [当你有足够信息时，给出最终回答]

规则：
1. 每次只能执行一个 Action
2. Action Input 必须是合法的 JSON 对象
3. 有足够信息后必须输出 Final Answer 结束
4. 不要在 Thought 外增加额外解释文字`

// 工具函数类型
export type ToolFunction = (input: Record<string, string>) => string

// 工具注册表
const toolRegistry: Record<string, ToolFunction> = {
    get_weather,
    search_web,
    calculate,
}


// 工具说明（给模型参考）
const TOOLS_DESCRIPTION = `
可用工具：

1. get_weather
   描述：查询指定城市的当前天气
   参数：{"city": "城市名称"}

2. search_web
   描述：搜索网页获取信息
   参数：{"query": "搜索关键词"}

3. calculate
   描述：执行数学计算
   参数：{"expression": "数学表达式，如 '(22 + 18) / 2'"}
`

// 解析结果类型
type ReActOutput =
    | { type: 'action'; thought: string; action: string; actionInput: Record<string, string> }
    | { type: 'final'; thought: string; answer: string }
    | { type: 'unknown'; raw: string }


function parseReActOutput(text: string): ReActOutput {
    const thoughtMatch = text.match(/Thought:\s*([\s\S]*?)(?=\nAction:|\nFinal Answer:|$)/)
    const actionMatch = text.match(/Action:\s*(.+)/)
    const actionInputMatch = text.match(/Action Input:\s*(\{[\s\S]*?\})/)
    const finalAnswerMatch = text.match(/Final Answer:\s*([\s\S]+)/)

    const thought = thoughtMatch?.[1]?.trim() ?? ''

    // 情况1：找到 Final Answer
    if (finalAnswerMatch) {
        return {
            type: 'final',
            thought,
            answer: finalAnswerMatch[1].trim(),
        }
    }

    // 情况2：找到 Action
    if (actionMatch && actionInputMatch) {
        const actionName = actionMatch[1].trim()
        let actionInput: Record<string, string> = {}

        try {
            const parsed: unknown = JSON.parse(actionInputMatch[1])
            if (typeof parsed === 'object' && parsed !== null) {
                actionInput = parsed as Record<string, string>
            }
        } catch {
            // JSON 解析失败，保留空对象
            console.warn(`[ReAct] Action Input 解析失败: ${actionInputMatch[1]}`)
        }

        return {
            type: 'action',
            thought,
            action: actionName,
            actionInput,
        }
    }

    // 情况3：格式不符合预期
    return { type: 'unknown', raw: text }
}

class ReActAgent {
    constructor(private readonly maxSteps = 10) { }

    async run(userInput: string): Promise<void> {
        console.log(`用户: ${userInput}\n`)

        // 构建初始对话：system prompt 包含工具说明和格式要求
        const systemPrompt = `${REACT_SYSTEM_PROMPT}\n\n${TOOLS_DESCRIPTION}`

        // ReAct 使用纯文本对话，不使用 tools 参数
        // 工具调用通过文本格式约定，手动解析执行
        const messages: OpenAI.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput },
        ]

        let count:number = 1
        for (let step = 0; step < this.maxSteps; step++) {
            console.log(`第 ${count} 次循环`);
            count++
            
            const response = await client.chat.completions.create({
                model: process.env.OPENAI_MODEL || 'openai/gpt-oss-120b:free',
                messages,
            })

            const responseText = response.choices[0].message.content ?? ''

            const parsed = parseReActOutput(responseText)

            if (parsed.type === 'final') {
                // 打印最后的 Thought（如果有）
                if (parsed.thought) {
                    console.log(`Thought: ${parsed.thought}`)
                }
                console.log(`\nFinal Answer: ${parsed.answer}`)
                return
            }

            if (parsed.type === 'action') {
                // 打印推理过程
                console.log(`Thought: ${parsed.thought}`)
                console.log(`Action: ${parsed.action}`)
                console.log(`Action Input: ${JSON.stringify(parsed.actionInput)}`)

                // 执行工具
                const toolFn = toolRegistry[parsed.action]
                const observation = toolFn
                    ? toolFn(parsed.actionInput)
                    : `错误：未知工具 "${parsed.action}"，可用工具：${Object.keys(toolRegistry).join(', ')}`

                console.log(`Observation: ${observation}\n`)

                // 把这一步的推理和观察加入对话历史
                messages.push({ role: 'assistant', content: responseText })
                messages.push({
                    role: 'user',
                    content: `Observation: ${observation}`,
                })

                continue
            }

            // 格式解析失败：尝试直接作为最终回答处理
            console.warn(`[ReAct] 格式解析失败，原始输出：\n${parsed.raw}`)
            console.log(`\nFinal Answer: ${parsed.raw}`)
            return
        }

        console.log(`\n[ReAct] 已达到最大步数限制 (${this.maxSteps})，停止执行。`)
    }
}

// 运行示例
async function main(): Promise<void> {
    const agent = new ReActAgent()
    await agent.run('北京和上海哪个城市今天更适合户外跑步？')
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})