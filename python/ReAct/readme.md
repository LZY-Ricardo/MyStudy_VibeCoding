# Agent 智能体
- LLM 开发的一种设计模式, 让 LLM 变得更聪明的一种套路
- 通过结合 LLM 和其他工具或数据源, 增强其能力

# ReAct
Reason + Action 思维链 + 外部工具调用
- 构建一个智能体
- 这种思想是让 LLM 将一个大问题拆分成多个小问题。一步一步解决

1. 一个良好的 Prompt 设计
2. 向 LLM 提问
3. LLM 接收到人类问题后, 根据我们设定的步骤去思考, 去调用外部工具
4. 将 LLM 返回的结果, 和思考过程, 回传给 LLM 模型 --- (轮询)
   1. LLM 先分析出来自己是要用哪一个工具函数的
   2. 我们再将 LLM 的分析结果传回给大模型
   3. 大模型调用对应的工具函数得到数据
   4. 继续将得到的数据传给 LLM 

5. LLM 得到最终答案后, 告诉人类
