// 创建一个路由器，并暴露出去

// 第一步: 引入createRouter函数
import { createRouter, createWebHistory} from 'vue-router'
// 引入路由组件
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import News from '@/components/News.vue'

// 第二步: 创建路由器
const router = createRouter({
  history: createWebHistory(), // 路由器的工作模式
  routes: [ // 一个一个的路由规则
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/news',
      component: News
    }
  ]
})

// 第三步: 导出路由器
export default router
