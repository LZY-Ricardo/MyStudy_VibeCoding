<template>
  <div class="news">
    <!-- 左侧导航栏 -->
    <aside class="news-sidebar">
      <h2>新闻列表</h2>
      <ul>
        <li v-for="news in newList" :key="news.id" class="nav-item">
          <!-- 第一种写法：使用路径参数 -->
          <!-- 
          <RouterLink 
          :to="`/news/detail/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink>
 -->
          <!-- 第二种写法：使用查询参数 -->
          <RouterLink :to="{
            name: '新闻详情',
            params: {
              id: news.id,
              title: news.title,
              content: news.content
            }
          }">{{ news.title }}</RouterLink>
        </li>
      </ul>
    </aside>

    <!-- 右侧内容区 -->
    <main class="news-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

const newList = reactive([
  { id: 1, title: '新闻1', content: '这是新闻1的内容' },
  { id: 2, title: '新闻2', content: '这是新闻2的内容' },
  { id: 3, title: '新闻3', content: '这是新闻3的内容' },
])
</script>

<style scoped>
.news {
  display: flex;
  height: 100vh;
}

/* 左侧导航栏 */
.news-sidebar {
  width: 250px;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.news-sidebar h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.news-sidebar ul {
  /* list-style: none; */
  padding: 0;
  margin: 0;
}

.news-sidebar li::marker {
  margin-bottom: 10px;
  color: #2196f3;
}

.nav-item {
  padding: 12px 15px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.nav-item:hover {
  background-color: #e3f2fd;
  border-color: #2196f3;
}

/* 右侧内容区 */
.news-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}
</style>
