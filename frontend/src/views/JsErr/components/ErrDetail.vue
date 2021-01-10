<template>
  <a-modal
    v-model:visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    width="80%"
    title="错误详情"
  >
    <a-spin :spinning="loading" tip="Loading...">
      -
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
      visible: false,
      loading: false
    })
    const openDialog = (errorMessage) => {
      getJsErrInfoByType(errorMessage)
      state.visible = true
    }
    const closeDialog = () => {
      state.visible = false
    }
    const getJsErrInfoByType = async (errorMessage) => {
      try {
        state.loading = true
        const res = await API.getJsErrInfoByType({ errorMessage })
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
      closeDialog,
      getJsErrInfoByType
    }
  }
}
</script>

<style lang="scss" scoped>

</style>