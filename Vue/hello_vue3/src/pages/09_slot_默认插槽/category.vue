<template>
  <div class="category">
    <h2>{{ title }}</h2>
    <slot>默认内容</slot>
  </div>
</template>
<script lang="ts" name="category" setup>
defineProps(['title'])
</script>
<style scoped>
  .category {
    background-color: skyblue;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    width: 200px;
    height: 300px;
}
h2{
  font-size: 24px;
  margin: 0 0 10px 0;
  background-color: orange;
  text-align: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 800
  ;
}
</style>