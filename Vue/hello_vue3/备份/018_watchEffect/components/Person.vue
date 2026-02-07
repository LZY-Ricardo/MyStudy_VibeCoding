<template>
  <div class="person">
    <h2>需求: 当水温达到60度, 或水位达到80cm, 给服务器发请求</h2>
    <h2>当前水温: {{ temp }}℃</h2>
    <h2>当前水位: {{ height }}cm</h2>
    <button @click="changeTemp">水温加十</button>
    <button @click="changeHeight">水位加十</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, watch, watchEffect } from 'vue';

// 数据
let temp = ref(0);
let height = ref(0);

// 方法
function changeTemp() {
  temp.value += 10;
}
function changeHeight() {
  height.value += 10;
}

// watch 监视
// watch([temp, height], (value) => {
//   // 从 value 中获取 temp 和 height 的最新值
//   let [newTemp, newHeight] = value;
//   console.log(newTemp, newHeight);
//   if (newTemp >= 60 || newHeight >= 80) {
//     console.log('水温或水位达到要求，给服务器发请求');
//   }
// })

// watchEffect 监视
watchEffect(() => {
  // console.log('watchEffect监视启动');
  if (temp.value >= 60 || height.value >= 80) {
    console.log('水温或水位达到要求，给服务器发请求');
  }
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
