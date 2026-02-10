<template>
  <div class="app">
    <!-- 标题区 -->
    <Header />
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <!-- 展示区 -->
    <div class="main-content">
        <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.title {
  text-align: center;
  color: #42b983;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
}

.navigate {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.navigate a {
  color: white;
  text-decoration: none;
  padding: 10px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.navigate a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.navigate a.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.main-content {
  padding: 40px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 12px;
  color: #6c757d;
  font-size: 16px;
  border: 2px dashed #dee2e6;
}
</style>
