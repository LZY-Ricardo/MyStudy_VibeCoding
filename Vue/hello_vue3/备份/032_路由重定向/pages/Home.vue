<template>
  <div class="home">
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// onMounted(() => {
//   setTimeout(() => {
//     router.push('/news');
//   }, 3000);
// });
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
