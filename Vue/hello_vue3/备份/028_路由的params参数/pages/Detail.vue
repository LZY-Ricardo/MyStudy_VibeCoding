<template>
  <ul class="news-list">
    <li>编号：{{ route.params.id }}</li>
    <li>标题: {{ route.params.title }}</li>
    <li>内容：{{ route.params.content }}</li>
  </ul>
</template>
<script setup lang="ts" name="About">
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.params)


</script>

<style scoped>
.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.news-list li {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
