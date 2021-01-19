<template>
  <div class="title">错误信息汇总：</div>
  <a-table :data-source="jsDetailList" bordered :loading="loading" :columns="columns" rowKey="id">
      <template #operation="{record}">
        <a-button size="small" type="link" @click="openErrDetail(record.id)">详情</a-button>
      </template>
    </a-table>
  <ErrDetail ref="errDetail"/>
</template>
<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import * as API from '@/api/index.js'
import ErrDetail from './components/ErrDetail'
import moment from 'moment'

export default {
  components: { ErrDetail },
  setup () {
    const errDetail = ref(null)
    const route = useRoute()
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
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
          width: '80px',
          align: 'center'
        }
      ]

    })
    const getJsDetailList = async () => {
      try {
        const errorMessage = route.query.errorMessage
        state.loading = true
        const res = await API.getJsErrInfoByType({ errorMessage, date: getDay() })
        if(res.data.code === 200) {
          state.jsDetailList = res.data.data
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    const openErrDetail = (id) => {
      errDetail.value.openDialog(id)
    }
    const getDay = () => moment(new Date()).format('yy-MM-DD')
    onMounted(() => {
      getJsDetailList()
    })
    return {
      ...toRefs(state),
      openErrDetail,
      errDetail
    }
  }
}
</script>

<style lang="less"  scoped>
.title {
  margin: 12px 0;
}
</style>