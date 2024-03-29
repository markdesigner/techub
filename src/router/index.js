import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // redirect: { name: 'home' },
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('../views/snake/index.vue')
    },
    {
      path: '/zadiacSign',
      name: 'zadiacSign',
      component: () => import('../views/ZadiacSignView.vue')
    },
    
  ]
})

export default router
