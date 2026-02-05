<template>
  <div class="person">
    <h1>情况一: 监视【ref】定义的基本类型数据</h1>
    <h2>当前求和：{{ sum }}</h2>
    <button @click="add">加1</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, watch } from 'vue';

// 数据
let sum = ref(0);   

// 方法
function add() {
  sum.value++;
}

// 监视 情况一: 监视【ref】定义的基本类型数据
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log('sum变化了', newValue, oldValue);
  if (newValue >= 10) {
    stopWatch(); // 停止监视
  }
})
console.log(stopWatch);

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
