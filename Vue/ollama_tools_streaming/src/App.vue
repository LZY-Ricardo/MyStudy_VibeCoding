<script setup lang="js">
import { ref, computed } from 'vue';
import { marked } from 'marked';

const question = ref('帮我列出当前目录下的所有文件');
const content = ref('');
const think = ref(''); // 添加缺失的 think 响应式变量

/**
 * 发送聊天请求到后端API
 * 处理用户输入并获取AI回复
 */
const update = async () => {
  try {
    if (!question.value) {
      return;
    }
    content.value = '思考中...';
    console.log('点击了发送按钮', question.value);  
    
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: question.value,
      }),
    });
    
    const data = await response.json();
    console.log(data);
    content.value = data.reply;
  } catch (error) {
    console.error('请求失败:', error);
    content.value = '请求失败，请检查服务器是否启动';
  }
};

/**
 * 提取并处理思考内容的计算属性
 * 从AI回复中解析<think>标签内的思考过程
 */
const thinkContent = computed(() => {
  if (content.value.startsWith('<think>')) {
    // 修复正则表达式：[\s\S*?] 应该是 [\s\S]*?
    const match = content.value.match(/^<think>([\s\S]*?)<\/think>/im);
    if (match) {
      // 如果找到完整的think标签，返回其中的内容
      return match[1].trim();
    } else {
      // 如果只有开始标签没有结束标签，返回去掉开始标签的内容
      return content.value.replace(/^<think>/, '').trim();
    }
  }
  // 如果不是think内容，返回空字符串
  return '';
});

/**
 * 提取并渲染回复内容的计算属性
 * 将Markdown格式的回复转换为HTML，排除think部分
 */
const replyContent = computed(() => {
  let cont = '';
  if (content.value.startsWith('<think>')) {
    // 提取</think>标签后的内容作为实际回复
    const parts = content.value.split('</think>');
    cont = parts.length > 1 ? parts[1].trim() : '';
  } else {
    // 如果没有think标签，直接使用全部内容
    cont = content.value;
  }
  return marked(cont);
});
</script>

<template>
  <div>
    <h1>Ollama Tools Streaming</h1>
    <div>
      <label for="prompt">请输入提示：</label>
      <input type="text" id="prompt" placeholder="请输入提示" v-model="question">
      <button @click="update" id="send-btn">发送</button>
    </div>
    <div class="output">
      <div class="think">
        <div>{{ thinkContent }}</div>
        <div v-html="replyContent"></div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.output {
  margin-top: 20px;
}
.think {
  margin-bottom: 20px;
}
</style>