<template>
  <div class="child">
    <h2>我是Child组件 {{ msg }}</h2>
    <p>当前求和：{{ sum }}</p>
    <h4 v-beauty="sum">好开心</h4>
    <Hello />
  </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'

const sum = ref(0)




</script>

<style scoped>
.child {
  padding: 10px;
  background-color: skyblue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
