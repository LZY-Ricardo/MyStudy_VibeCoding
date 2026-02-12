<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about page.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('About page mounted');
});

onUnmounted(() => {
  console.log('About page unmounted');
});
</script>

<style scoped>
.about {
  padding: 20px;
}
</style>
