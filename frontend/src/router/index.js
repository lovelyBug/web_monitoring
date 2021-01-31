import { createRouter, createWebHashHistory} from 'vue-router'


const routes = [
  { path: '/', component: () => import('@/views/home.vue') },
  { path: '/js_err', component: () => import('@/views/JsErr/index.vue') },
  { path: '/js_err_detail', component: () => import('@/views/JsErr/detail.vue') },
  { path: '/api_err', component: () => import('@/views/ApiErr/index.vue') },
  { path: '/resource_err', component: () => import('@/views/ResourceErr/index.vue') },
  { path: '/api_analysis', component: () => import('@/views/ApiAnalysis/index.vue') },
  { path: '/user_log', component: () => import('@/views/UserLog/index.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
