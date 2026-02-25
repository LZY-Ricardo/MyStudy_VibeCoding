<template>
  <div class="child">
    <h2>我是Child组件</h2>
    <p>当前求和：{{ sum }}</p>
  </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'
import axios from 'axios';

const sum = ref(0)
let { data: { hitokoto } } = await axios.get('https://v1.hitokoto.cn/?c=l')
console.log(hitokoto);



</script>

<style scoped>
.child {
  padding: 10px;
  background-color: skyblue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
