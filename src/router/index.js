import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: 'Dashboard' }
  },
  // {
  //   path: '/analytics',
  //   name: 'Analytics',
  //   component: () => import('../views/Analytics.vue'),
  //   meta: { title: 'Analytics' }
  // },
  // {
  //   path: '/customers',
  //   name: 'Customers',
  //   component: () => import('../views/Customers.vue'),
  //   meta: { title: 'Customers' }
  // },
  // {
  //   path: '/products',
  //   name: 'Products',
  //   component: () => import('../views/Products.vue'),
  //   meta: { title: 'Products' }
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: () => import('../views/Settings.vue'),
  //   meta: { title: 'Settings' }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SaaS Dashboard` || 'SaaS Dashboard'
  next()
})

export default router
