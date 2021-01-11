import { createRouter, createWebHashHistory} from 'vue-router'


const routes = [
  { path: '/', component: () => import('@/views/home.vue') },
  { path: '/js_err', component: () => import('@/views/JsErr/index.vue') },
  { path: '/js_err_detail', component: () => import('@/views/JsErr/detail.vue') },
  { path: '/:catchAll(.*)', component: () => import('@/views/home.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
