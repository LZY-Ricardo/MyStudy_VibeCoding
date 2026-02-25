<template>
  <div class="app">
    <h2>我是App组件 {{ msg }}</h2>
    <hello />
    <Child />
  </div>
</template>

<script setup lang="ts" name="App">
import Child from './Child.vue'
import { Suspense } from 'vue'
</script>

<style scoped>
.app {
  padding: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
