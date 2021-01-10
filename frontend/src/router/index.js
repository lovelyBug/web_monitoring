import { createRouter, createWebHistory} from 'vue-router'


const routes = [
  { path: '/', component: () => import('@/views/home.vue') },
  { path: '/js_err', component: () => import('@/views/JsErr/index.vue') },
  { path: '/js_err_detail', component: () => import('@/views/JsErr/detail.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
