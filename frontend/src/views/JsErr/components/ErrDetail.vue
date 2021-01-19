<template>
  <a-modal
    v-model:visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    width="80%"
    title="错误详情"
  >
    <a-spin :spinning="loading" tip="Loading...">
      <div class="row"><span class="label">设备信息：</span>{{ `${jsErrDetail.deviceName} ${jsErrDetail.os}` }}</div>
      <div class="row"><span class="label">浏览器：</span>{{ `${jsErrDetail.browserName} ${jsErrDetail.browserVersion}` }}</div>
      <div class="row"><span class="label">IP地址：</span>{{ `${jsErrDetail.monitorIp} ${jsErrDetail.country} ${jsErrDetail.city || ''} ${jsErrDetail.province || ''} ${jsErrDetail.city || ''}` }}</div>
      <div class="row"><span class="label">错误信息：</span>{{ jsErrDetail.errorMessage }}</div>
      <div class="row"><span class="label">堆栈类型：</span>{{ jsErrDetail.errorStack }}</div>
      <div class="row"><span class="label">浏览器信息：</span>{{ jsErrDetail.browserInfo }}</div>
      <div class="row"><span class="label">错误页面：</span>{{ jsErrDetail.completeUrl }}</div>
      <div class="row"><span class="label">发生时间：</span>{{ jsErrDetail.happenDate }}</div>
      <div class="row"><span class="label">浏览器信息：</span>{{ jsErrDetail.browserInfo }}</div>
    </a-spin>
    <template #footer>
      <a-button key="back" @click="closeDialog">
        关闭
      </a-button>
    </template>
  </a-modal>
  
</template>

<script>
import * as API from '@/api/index.js'
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      jsErrDetail: {},
      visible: false,
      loading: false
    })
    const openDialog = (id) => {
      getJsErrInfoById(id)
      state.visible = true
    }
    const closeDialog = () => {
      state.visible = false
    }
    const getJsErrInfoById = async (id) => {
      try {
        state.loading = true
        const res = await API.getJsErrInfoById({ id })
        if(res.data.code === 200) {
          state.jsErrDetail = res.data.data
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    return {
      ...toRefs(state),
      openDialog,
      closeDialog
    }
  }
}
</script>

<style scoped>
.row {
  line-height: 30px;
}
.label {
  font-weight: 600;
}
</style>