<template>
  <div class="app">
    <h2>{{ msg }}</h2>
    <input type="text" v-model="msg" />
  </div>
</template>
<script lang="ts" setup name="App">
import { ref, customRef } from 'vue'
import useMsgRef from './useMsgRef'

// 使用 Vue 提供的默认ref定义响应式数据, 数据一变, 页面就更新
// let msg = ref('你好')

// 使用 useMsgRef来定义一个响应式数据且具有延迟效果
let { msg } = useMsgRef('你好', 2000)   

</script>
<style scoped>
.app {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}
</style>
