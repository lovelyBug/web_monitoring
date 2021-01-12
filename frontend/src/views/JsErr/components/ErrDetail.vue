<template>
  <a-modal
    v-model:visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    width="80%"
    title="错误详情"
  >
    <a-spin :spinning="loading" tip="Loading...">
      <div class="row">设备信息：{{ `${jsErrDetail.deviceName} ${jsErrDetail.os}` }}</div>
      <div class="row">浏览器：{{ `${jsErrDetail.browserName} ${jsErrDetail.browserVersion}` }}</div>
      <div class="row">IP地址：{{ `${jsErrDetail.monitorIp} ${jsErrDetail.city} ${jsErrDetail.country} ${jsErrDetail.province} ${jsErrDetail.city}` }}</div>
      <div class="row">错误信息：{{ jsErrDetail.errorMessage }}</div>
      <div class="row">堆栈类型：{{ jsErrDetail.errorStack }}</div>
      <div class="row">浏览器信息：{{ jsErrDetail.browserInfo }}</div>
      <div class="row">错误页面：{{ jsErrDetail.completeUrl }}</div>
      <div class="row">发生时间：{{ jsErrDetail.happenDate }}</div>
      <div class="row">浏览器信息：{{ jsErrDetail.browserInfo }}</div>
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

<style lang="scss" scoped>

</style>