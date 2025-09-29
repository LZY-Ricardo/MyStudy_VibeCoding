<template>
  <div>
    <label>
      请输入问题：
      <input type="text" v-model="message" />
      <button @click="sendMessage">发送</button>
    </label>
  </div>
  <div>{{ status }}</div>
  <div>
    <div>{{content}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('请帮我列出当前目录下的文件')
const status = ref('')
const content = ref('')

const sendMessage = async () => {
  if (!message.value) {
    return
  }
  status.value = '思考中...'
  const headers = {
    'Content-Type': 'application/json'
  }
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers,
    body: JSON.stringify({ message: message.value })
  })
  const data = await response.json()
  status.value = '思考完成'
  content.value = data.reply
}



</script>

<style lang="css" scoped>

</style>