import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/01-props',
      children: [
        {
          path: '/01-props',
          component: () => import('@/pages/01_props/Parent.vue'),
          meta: { title: 'Props 传递' }
        },
        {
          path: '/02-custom-event',
          component: () => import('@/pages/02_custom-event/Parent.vue'),
          meta: { title: '自定义事件' }
        },
        {
          path: '/03-mitt',
          component: () => import('@/pages/03_mitt/Parent.vue'),
          meta: { title: 'Mitt 事件总线' }
        },
        {
          path: '/04-v-model',
          component: () => import('@/pages/04_v-model/Parent.vue'),
          meta: { title: 'v-model' }
        },
        {
          path: '/05-attrs',
          component: () => import('@/pages/05_$attrs/Parent.vue'),
          meta: { title: '$attrs' }
        },
        {
          path: '/06-refs-parent',
          component: () => import('@/pages/06_$refs-$parent/Parent.vue'),
          meta: { title: '$refs & $parent' }
        },
        {
          path: '/07-provide-inject',
          component: () => import('@/pages/07_provide-inject/Parent.vue'),
          meta: { title: 'Provide/Inject' }
        },
        {
          path: '/08-pinia',
          component: () => import('@/pages/08_pinia/Parent.vue'),
          meta: { title: 'Pinia 状态管理' }
        },
        {
          path: '/09-slots',
          component: () => import('@/pages/09_slots/Parent.vue'),
          meta: { title: '插槽 Slots' }
        }
      ]
    }
  ]
})

export default router
