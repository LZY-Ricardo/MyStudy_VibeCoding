// 创建一个路由器，并暴露出去

// 第一步: 引入createRouter函数
import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
// 引入路由组件
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'
import Detail from '@/pages/Detail.vue'

// 第二步: 创建路由器
const router = createRouter({
  history: createWebHistory(), // 路由器的工作模式 createWebHistory()是HTML5的history模式，createWebHashHistory()是hash模式
  routes: [ // 一个一个的路由规则
    {
      name: '默认',
      path: '/',
      redirect: '/home' // 重定向到首页
    },
    {
      name: '首页',
      path: '/home',
      component: Home
    },
    {
      name: '新闻',
      path: '/news',
      component: News,
      children: [ // 二级路由
        {
          name: '新闻详情',
          path: 'detail/:id/:title/:content', // 二级路由的路径不需要加斜杠
          component: Detail,
          // 第一种写法: 将路由收到的所有params参数作为 props 传给路由组件
          // props: true 

          // 第二张写法: 函数写法, 可以自己决定将什么作为 props 传给路由组件
          props(route) {
            return route.query
          }
          
          // 第三种写法: 对象写法, 只能传递静态数据
          // props: {
          //   id: 100,
          //   title: '新闻标题',
          //   content: '新闻内容'
          // }
        }
      ]
    },
    {
      name: '关于',
      path: '/about',
      component: About
    },
  ]
})

// 第三步: 导出路由器
export default router
