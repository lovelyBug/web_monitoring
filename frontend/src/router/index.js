import { createRouter, createWebHistory} from 'vue-router'


const routes = [
  { path: '/', component: () => import('@/views/JsErr/index.vue') },
  { path: '/js_err', component: () => import('@/views/JsErr/index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
