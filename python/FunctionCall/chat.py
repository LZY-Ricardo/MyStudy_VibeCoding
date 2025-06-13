from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv('.env.local')


client = OpenAI(
  api_key=os.getenv('Deepseek_API_Key'),
  base_url="https://api.deepseek.com/v1",
)

completion = client.chat.completions.create(
  model='deepseek-reasoner',
  messages=[
    {'role': 'system', 'content': '你是一个资深龙族粉丝,多次通读江南的小说《龙族》,非常喜欢这本小说,请你基于小说的内容,回答用户的问题。'},
    {'role': 'user', 'content': '请你告诉我楚子航的言灵是什么'},
    {'role': 'assistant', 'content': '根据江南《龙族》原著设定，**楚子航的言灵是“君焰”（序列号77）**。'},
    {'role': 'user', 'content': '请你告诉我君焰的具体能力'}
  ]
)

print('思考过程：')
print(completion.choices[0].message.reasoning_content)

print('最终答案：')
print(completion.choices[0].message.content)