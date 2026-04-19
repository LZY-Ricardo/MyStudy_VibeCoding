// p03-streaming.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "查询指定城市的当前天气",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: '城市名称，如"北京"、"上海"',
          },
        },
        required: ["city"],
      },
    },
  },
];

function get_weather(city: string): string {
  const data: Record<string, string> = {
    北京: "晴，22°C，东南风 3 级",
    上海: "多云，18°C，东风 2 级",
    广州: "小雨，26°C，南风 2 级",
  };
  return data[city] ?? `暂无 ${city} 的天气数据`;
}


// 执行单个工具调用
function executeTool(name: string, input: Record<string, string>): string { 
  if (name === "get_weather") {
    return get_weather(input.city);
  }
  return `Unknown tool: ${name}`;
}

async function runStreamingAgent(userMessage: string): Promise<void> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: userMessage,
    }
  ];

  while (true) {
    // 启动流式输出
    const stream = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "openai/gpt-oss-120b:free",
      messages,
      tools,
      stream: true,
    });

    // 收集本轮的文本内容和工具调用
    let textContent = "";
    const toolCalls: Array<{
      id: string;
      type: "function";
      function: {
        name: string;
        arguments: string;
      };
    }> = [];

    // 当前正在构建的工具调用(参数 json 分多个 delta 推送)
    let currentToolCall: {
      index: number;
      id: string;
      name: string;
      arguments: string;
    } | null = null;

    let finishReason: string | null = null;

    for await (const chunk of stream) {
      const delta = chunk.choices[0].delta;

      // 文本片段直接打印到终端
      if (delta.content) {
        process.stdout.write(delta.content);
        textContent += delta.content;
      }

      // 工具调用增量处理
      if (delta.tool_calls) {
        for (const toolCallDelta of delta.tool_calls) {
          if (toolCallDelta.index !== undefined) {
            if (
              currentToolCall === null ||
              currentToolCall.index !== toolCallDelta.index
            ) {
              // 新工具调用开始， 先保存上一个
              if (currentToolCall) {
                toolCalls.push({
                  id: currentToolCall.id,
                  type: "function",
                  function: {
                    name: currentToolCall.name,
                    arguments: currentToolCall.arguments,
                  },
                });
              }

              currentToolCall = {
                index: toolCallDelta.index,
                id: toolCallDelta.id ?? "",
                name: toolCallDelta.function?.name ?? "",
                arguments: toolCallDelta.function?.arguments ?? "",
              };

              if (toolCallDelta.function?.name) {
                process.stdout.write(
                  `\n[工具调用开始] ${toolCallDelta.function.name}(`,
                );
              }
            } else {
              // 同一工具调用的参数增量
              if (toolCallDelta.function?.arguments) {
                currentToolCall.arguments += toolCallDelta.function.arguments;
              }
            }
          }
        }
      }
      if (chunk.choices[0].finish_reason) {
        finishReason = chunk.choices[0].finish_reason;
      }
    }
    // 保存最后一个工具调用
    if (currentToolCall) {
      toolCalls.push({
        id: currentToolCall.id,
        type: "function",
        function: {
          name: currentToolCall.name,
          arguments: currentToolCall.arguments,
        },
      });
      process.stdout.write(`${currentToolCall.arguments}]\n`);
    }

    // 构建 assistant 消息并加入历史
    const assistantMessage: OpenAI.ChatCompletionAssistantMessageParam = {
      role: "assistant",
      content: textContent || null,
    };
    if (toolCalls.length > 0) {
      assistantMessage.tool_calls = toolCalls;
    }
    messages.push(assistantMessage);

    if (finishReason === "stop") {
      // 模型已生成完整文本回复，结束循环
      process.stdout.write("\n");
      return;
    }

    if (finishReason !== "tool_calls") {
      process.stdout.write(
        `\n[未处理的 finish_reason: ${finishReason ?? "null"}]\n`,
      );
      return;
    }

 // 执行所有工具调用，收集结果
    for (const toolCall of toolCalls) {
      let parsedInput: Record<string, string> = {}
      try {
        parsedInput = JSON.parse(toolCall.function.arguments) as Record<string, string>
      } catch {
        parsedInput = {}
      }

      const result = executeTool(toolCall.function.name, parsedInput)
      console.log(`[工具结果: ${result}]`)

      // 把工具结果推回 messages，继续下一轮流式
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: result,
      })
    }

  }
}

// 运行
process.stdout.write('> 北京天气和上海天气怎么样，适合跑步吗？\n')
runStreamingAgent('北京天气和上海天气怎么样，适合跑步吗？').catch(console.error)