# MCP 用来做什么？
  - 一套规则（协议），是 AI 客户端和 AI 服务端之间的通信协议。它规定了 AI 客户端和 AI 服务端一定要按照一套标准来传输

    1. 前端的效能工具的开发
    2. 面试亮点

# 前置知识
 - 通讯方式：
  1. stdio 标准输入输出流
  (通信效率高，简洁，但是只能在本地使用)
   
  
 - 通讯格式：JSON-RPC
  1. request: {
        jsonrpc: '2.0',
        method: 'sum',
        params: {
          'a': 1,
          'b': 2
        },
        id: 1
      }
 
  2. response: {
        jsonrpc: '2.0',
        result: 3,
        id: 1
      }

 - 客户端向服务端以 stdio 的方式请求，必须要按照 JSON-RPC 协议来传递请求参数，服务端向客户端以stdio的方式响应，也必须按照 JSON-RPC 协议来传递相应数据，这种约定就叫做协议


# MCP服务的开发
1. 技术层面
2. 使用场景

- 初始化: initialize
  - requset: {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        name: 'tools',
        arguments: {},
        protocolVersion: '2025-06-18',
        capabilities: {
          roots: {
            listChanged: true
          },
          sampling: {},
          elicitation: {}
        },
        clientInfo: {
          name: 'ExampleClient',
          version: '1.0.0',
          title: 'Example Client'
        }
      }
    }

  - response: {
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        capabilities: {
          logging: {},
          prompts: {
            listChanged: true
          },
          resources: {
            subscribe: true,
            listChanged: true
          },
          tools: {
            listChanged: true
          }
        },
        serverInfo: { 
          name: 'ExampleServer',
          version: '1.0.0',
          title: 'Example Server'
        },
        instructions: "Optional instructions for the client"
      },
      
    }

- 工具发现: tools/list
 客户端得先知道服务端有哪些工具，才能调用

  - request: {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  }
  
  - response: {
    jsonrpc: '2.0',
    id: 1,
    result: {
      tools: [
        {
          name: 'sum',
          arguments: {
            a: {
              type: 'number',
              description: '第一个数'
            },
            b: {
              type: 'number',
              description: '第二个数'
            }
          }
        },
        {
          xxxx
        }
      ]
    }
  }

- 工具调用: tools/call
  - request: {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',  
    params: {
      name: 'sum',
      arguments: {
        a: 1,
        b: 2
      }
    }
  }
  - response: {
    jsonrpc: '2.0',
    id: 1,
    result: {
      content: [
        {
          type: 'text',
          text: '两数之和结果为：3'
        }
      ]
    }
  }



# 请你介绍一下 MCP 和 FunctionCall 有什么区别？
 MCP 就是在 JSON-RPC 协议的基础上，定义了一套规则，用于 AI 客户端和 AI 服务端之间的通信。
 FunctionCall 是 MCP 协议中的一种工具调用方式，用于调用服务端的工具。