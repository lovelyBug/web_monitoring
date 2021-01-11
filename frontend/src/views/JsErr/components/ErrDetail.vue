<template>
  <a-modal
    v-model:visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    width="80%"
    title="错误详情"
  >
    <a-spin :spinning="loading" tip="Loading...">
      {{ jsErrDetail }}
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