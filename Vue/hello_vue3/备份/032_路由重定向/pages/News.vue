<template>
  <div class="news">
    <!-- 左侧导航栏 -->
    <aside class="news-sidebar">
      <h2>新闻列表</h2>
      <ul>
        <li v-for="news in newList" :key="news.id" class="nav-item">
          <button @click="showNewsDetail(news)">查看新闻</button>
          <RouterLink
            :to="{
              name: '新闻详情',
              query: {
                id: news.id,
                title: news.title,
                content: news.content,
              },
            }"
            >{{ news.title }}</RouterLink
          >
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
import { RouterView, RouterLink, useRouter } from 'vue-router'

const newList = reactive([
  { id: 1, title: '新闻1', content: '这是新闻1的内容' },
  { id: 2, title: '新闻2', content: '这是新闻2的内容' },
  { id: 3, title: '新闻3', content: '这是新闻3的内容' },
])

const router = useRouter()

interface NewsInter {
  id: number
  title: string
  content: string
}

function showNewsDetail(news: NewsInter) {
  router.push({
    name: '新闻详情',
    query: {
      id: news.id,
      title: news.title,
      content: news.content,
    },
  })
}
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
