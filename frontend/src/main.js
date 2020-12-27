import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
// import './monitor/index.js'
import './monitor-new/index.js'
import { message } from 'ant-design-vue'
import router from './router/index.js'
// import './style/antd.less'

const app = createApp(App)
app.use(Antd)
app.use(router)
app.config.globalProperties.$message = message
app.mount('#app')
