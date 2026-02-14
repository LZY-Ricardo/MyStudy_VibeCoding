import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/props',
      children: [
        {
          path: '/props',
          component: () => import('@/pages/props/Parent.vue'),
          meta: { title: 'Props 传递' }
        },
        {
          path: '/custom-event',
          component: () => import('@/pages/custom-event/Parent.vue'),
          meta: { title: '自定义事件' }
        },
        {
          path: '/v-model',
          component: () => import('@/pages/v-model/Parent.vue'),
          meta: { title: 'v-model' }
        },
        {
          path: '/provide-inject',
          component: () => import('@/pages/provide-inject/Parent.vue'),
          meta: { title: 'Provide/Inject' }
        },
        {
          path: '/slots',
          component: () => import('@/pages/slots/Parent.vue'),
          meta: { title: '插槽 Slots' }
        },
        {
          path: '/refs',
          component: () => import('@/pages/refs/Parent.vue'),
          meta: { title: 'Refs 模板引用' }
        },
        {
          path: '/expose',
          component: () => import('@/pages/expose/Parent.vue'),
          meta: { title: 'Expose' }
        },
        {
          path: '/css-variable',
          component: () => import('@/pages/css-variable/Parent.vue'),
          meta: { title: 'CSS 变量' }
        },
        {
          path: '/mitt',
          component: () => import('@/pages/mitt/Parent.vue'),
          meta: { title: 'Mitt 事件总线' }
        },
        {
          path: '/pinia',
          component: () => import('@/pages/pinia/Parent.vue'),
          meta: { title: 'Pinia 状态管理' }
        }
      ]
    }
  ]
})

export default router
