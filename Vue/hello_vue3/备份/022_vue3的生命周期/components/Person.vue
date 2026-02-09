<template>
  <div class="person">
   <h2>当前求和位: {{ sum }}</h2>
   <button @click="add">点我sum + 1</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

// 数据
let sum = ref(0)

// 方法
function add() {
  sum.value += 1
}

// 创建 beforeCreate created
console.log('Person组件创建了');

// 挂载前
onBeforeMount(() => {
  console.log('挂载前');
})

// 挂载完毕
onMounted(() => {
  console.log('子挂载完毕');
})

// 更新前
onBeforeUpdate(() => {
  console.log('更新前');
})

// 更新完毕
onUpdated(() => {
  console.log('更新完毕');
})

// 卸载前
onBeforeUnmount(() => {
  console.log('卸载前');
})

// 卸载完毕
onUnmounted(() => {
  console.log('卸载完毕');
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
