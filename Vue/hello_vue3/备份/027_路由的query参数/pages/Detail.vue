<template>
  <ul class="news-list">
    <li>编号：{{ id }}</li>
    <li>标题: {{ title }}</li>
    <li>内容：{{ content }}</li>
  </ul>
</template>
<script setup lang="ts" name="About">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

// 使用 computed 确保路由变化时自动更新
const id = computed(() => route.query.id);
const title = computed(() => route.query.title);
const content = computed(() => route.query.content);
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
