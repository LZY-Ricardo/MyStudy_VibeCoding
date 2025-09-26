import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import { exec } from 'child_process';

// 加载环境变量配置
dotenv.config({
  path: ['.env.local', '.env'],
});

const app = express();
const port = 3000;

// 解析 JSON 请求体
app.use(express.json());

/**
 * 聊天接口 - 与 Ollama API 交互
 * 支持工具调用功能，可以执行文件列表查询
 */
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // 从环境变量获取配置
  const model = process.env.OLLAMA_MODEL;
  const base_url = process.env.OLLAMA_API;

  // 验证环境变量是否配置
  if (!model || !base_url) {
    console.error('环境变量配置错误: OLLAMA_MODEL 或 OLLAMA_API 未设置');
    return res.status(500).json({ 
      error: '服务器配置错误：请检查环境变量 OLLAMA_MODEL 和 OLLAMA_API 是否正确设置' 
    });
  }

  // 验证 URL 格式
  try {
    new URL(base_url);
  } catch (urlError) {
    console.error('OLLAMA_API URL 格式错误:', base_url);
    return res.status(500).json({ 
      error: `服务器配置错误：OLLAMA_API URL 格式不正确 (${base_url})` 
    });
  }

  const messages = [
    {
      role: 'system',
      content: '如果有需要，你可以调用DirFiles工具查找当前目录下的文件和文件夹',
    },
    {
      role: 'user',
      content: message
    }
  ]

  try {
    // 调用 Ollama API
    const response = await axios.post(`${base_url}/api/chat`, {
      model,
      messages,
      tools: [{
        type: 'function',
        function: {
          name: 'DirFiles',
          description: '查找当前目录下的文件和文件夹',
        }
      }],
      stream: false,
    });
    
    const reply = response.data.message.content;

    // 检查是否有工具调用
    if (response.data.message.tool_calls && 
        response.data.message.tool_calls.length && 
        response.data.message.tool_calls[0].function?.name === 'DirFiles') {
      
      // 执行 Windows dir 命令获取文件列表
      exec('dir', async (error, stdout, stderr) => {
        if (error) {
          console.error(`执行 dir 命令时出错: ${error}`);
          res.status(500).json({ error: `执行 dir 命令时出错: ${error}` });
          return;
        }
        if (stderr) {
          console.error(`dir 命令执行出错: ${stderr}`);
        }
        messages.push({
          role: 'tool',
          name: 'DirFiles',
          content: `当前目录文件列表：\n\`\`\`\n${stdout}\`\`\``,
        })
        const response = await axios.post(`${base_url}/api/chat`, {
          model,
          messages,
          stream: false,
        });
        // 返回 AI 的回复和文件列表
        res.json({ 
          reply: response.data.message.content,
        });
      });
    } else {
      // 如果没有工具调用，直接返回 AI 回复
      res.json({ reply });
    }

  } catch (error) {
    console.error(`请求 Ollama API 时出错: ${error}`);
    res.status(500).json({ error: `请求 Ollama API 时出错: ${error}` });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});