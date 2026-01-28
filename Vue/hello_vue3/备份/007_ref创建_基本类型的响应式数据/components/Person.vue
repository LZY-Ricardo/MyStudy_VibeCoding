<template>
  <div class="person">
    <h2>{{ a }}</h2>
    <h2>姓名: {{ name }}</h2>
    <h2>年龄: {{ age }}</h2>
    <h2>地址: {{ address }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<!-- <script lang="ts">
export default {
  name: 'Person',
}
</script> -->

<script setup lang="ts" name="Person">
import { ref } from 'vue'
let a = '666'
// 数据
let name = ref('张三')
let age = ref(18)
let tel = '123-456-7890'
let address = '北京市朝阳区'

console.log('1', name)
console.log('2', age);
console.log('3', tel);
console.log('4', address);

// 方法
function changeAge() {
  console.log('changeName 被调用了')
  age.value += 1
  console.log('修改后的 age:', age.value)
}
function changeName() {
  console.log('changeAge 被调用了')
  name.value = '李四' // 注意： 这样修改name, 页面不会发生变化
  console.log('修改后的 name:', name.value) // name 确实修改了，但name不是响应式
}
function showTel() {
  console.log('showTel 被调用了')
  alert(`联系方式: ${tel}`)
}
</script>

<style scoped>
.person {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
button {
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
