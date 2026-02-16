<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <h1>Vue3 组件间通信</h1>
    </header>

    <!-- 主体内容 -->
    <div class="main-container">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <nav class="nav-menu">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="nav-item"
            active-class="active"
          >
            <span class="nav-icon">{{ route.icon }}</span>
            <span class="nav-text">{{ route.title }}</span>
          </router-link>
        </nav>
      </aside>

      <!-- 右侧展示区域 -->
      <main class="content">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { ref } from 'vue'

interface Route {
  path: string
  title: string
  icon: string
}

const routes = ref<Route[]>([
  { path: '/01-props', title: 'Props 传递', icon: '📦' },
  { path: '/02-custom-event', title: '自定义事件', icon: '🎯' },
  { path: '/03-mitt', title: 'Mitt 事件总线', icon: '📡' },
  { path: '/04-v-model', title: 'v-model', icon: '🔗' },
  { path: '/05-attrs', title: '$attrs', icon: '📋' },
  { path: '/06-refs-parent', title: '$refs & $parent', icon: '🔍' },
  { path: '/07-provide-inject', title: 'Provide/Inject', icon: '💉' },
  { path: '/08-pinia', title: 'Pinia 状态管理', icon: '🗄️' },
  { path: '/09-slots', title: '插槽 Slots', icon: '🎰' }
])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid #e4e7ed;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.nav-menu {
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: #606266;
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  cursor: pointer;
}

.nav-item:hover {
  background: #f5f7fa;
  color: #409eff;
  border-left-color: #409eff;
}

.nav-item.active {
  background: #ecf5ff;
  color: #409eff;
  border-left-color: #409eff;
  font-weight: 500;
}

.nav-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-size: 15px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  min-height: calc(100vh - 200px);
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar,
.content::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-thumb,
.content::-webkit-scrollbar-thumb {
  background: #dcdfe6;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover,
.content::-webkit-scrollbar-thumb:hover {
  background: #c0c4cc;
}
</style>
