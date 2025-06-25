# 定义一个客户端，用于从 LLM 获取响应
from openai import OpenAI
import os
from dotenv import load_dotenv  # 加载环境变量
load_dotenv('.env.local')

client = OpenAI(
  api_key=os.getenv('DEEPSEEK_API_KEY'),
  base_url='https://api.deepseek.com/v1'
)