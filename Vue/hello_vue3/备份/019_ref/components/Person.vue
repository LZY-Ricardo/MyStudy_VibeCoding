<template>
  <div class="person">
    <h1>中国</h1>
    <h2 ref="title2">北京</h2>
    <h3>顶顶顶</h3>
    <button @click="showLog">点我输出h2这个元素</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, defineExpose } from 'vue';

// 创建一个 title2, 用于存储 ref 标记的内容
let title2 = ref(null)
let a = ref(0)
let b = ref(1)
let c = ref(2)
console.log(title2.value); // 输出 null
function showLog() {
  console.log(title2.value);
}

defineExpose({
  a,
  b,
  c
})
</script>

<style scoped>
.person {
  width: 800px;
  height: 800px;
  background-color: lightblue;
  box-shadow: 10px 5px 10px rgba(25, 48, 488, 0.8);
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
