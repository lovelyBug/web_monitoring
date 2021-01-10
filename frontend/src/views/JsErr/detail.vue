<template>
  <a-table :data-source="jsDetailList" bordered :loading="loading" :columns="columns">
      <template #operation="{record}">
        <a-button size="small" type="link" @click="openErrDetail(record.errorMessage)">详情</a-button>
      </template>
    </a-table>
  <ErrDetail ref="errDetail"/>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import * as API from '@/api/index.js'


export default {
  setup () {
    const route = useRoute()
    console.log(route)
    const state = reactive({
      jsDetailList: [],
      loading: false,
      columns: [
        {
          title: '错误信息',
          dataIndex: 'errorMessage',
          key: 'errorMessage',
          ellipsis: true
        },
        {
          title: '页面',
          dataIndex: 'simpleUrl',
          key: 'simpleUrl',
          ellipsis: true
        },
        {
          title: '设备',
          dataIndex: 'errorMessage',
          key: 'errorMessage',
          ellipsis: true
        },
        {
          title: '客户IP地址',
          dataIndex: 'monitorIp',
          key: 'monitorIp',
          ellipsis: true
        },
        {
          title: '浏览器信息',
          dataIndex: 'browserInfo',
          key: 'browserInfo',
          ellipsis: true
        },
        {
          title: '发生时间',
          dataIndex: 'happenDate',
          key: 'happenDate',
          ellipsis: true
        },
      ]

    })
    const getJsDetailList = async () => {
      try {
        const errorMessage = route.query.errorMessage
        state.loading = true
        const res = await API.getJsErrInfoByType({ errorMessage })
        if(res.data.code === 200) {
          state.jsDetailList = res.data.data
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    onMounted(() => {
      getJsDetailList()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less"  scoped>
</style>