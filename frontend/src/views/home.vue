<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length" class="err-list-container">
    <!-- <div
      v-for="(dayErr, index) in jsDayErrList"
      :key="dayErr.id"
      class="err-list-item"
      :class="{ mt: !index }"
      @click="getJsErrDetail(dayErr.id)"
    >
      <div class="msg-item">{{ dayErr.uploadType }}</div>
      <div class="msg-item">{{ dayErr.errorMessage }}</div>
      <div class="msg-item"><img :src="WEB_IMG" class="device-icon"></div>
      <div class="msg-item">{{ dayErr.browserName }}</div>
      <div class="msg-item">发生时间：{{ dayErr.createdAt }}</div>
    </div> -->
    <a-table :data-source="jsDayErrList" :loading="loading" :columns="columns">
      <template #operation="{}">
        <a-button size="small" type="link">查看错误详情</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
// import { useRouter } from 'vue-router'
import { Chart } from '@antv/g2'
import { onMounted, reactive, toRefs } from 'vue'
import * as API from '@/api/index.js'
import ANDRIOD_IMG from '@/assets/images/andriod.png'
import IOS_IMG from '@/assets/images/ios.png'
import WEB_IMG from '@/assets/images/web.png'

export default {
  setup () {
    // const router = useRouter()
    // const toHome = (() => {
    //   router.push('/about')
    // })
    const state = reactive({
      jsDayErrList: [],
      jsErrDetail: {},
      ANDRIOD_IMG,
      IOS_IMG,
      WEB_IMG,
      loading: false,
      columns: [
        {
          title: '错误类型',
          dataIndex: 'uploadType',
          key: 'uploadType',
          ellipsis: true
        },
        {
          title: '错误信息',
          dataIndex: 'errorMessage',
          key: 'errorMessage',
          ellipsis: true
        },
        {
          title: '设备名称',
          dataIndex: 'deviceName',
          key: 'deviceName',
          ellipsis: true
        },
        {
          title: '浏览器类型',
          dataIndex: 'browserName',
          key: 'browserName',
          ellipsis: true
        },
        {
          title: '地理位置',
          dataIndex: 'country',
          key: 'country',
          ellipsis: true
        },
        {
          title: '发生时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
        },
      ]
    })
    const initLineChart = (errList) => {
      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 200,
        padding: [20, 20, 30, 20]
      });
      chart.data(errList);

      chart.scale('count', {
        nice: true,
      });
      chart.axis('happenDay', {
        tickLine: null,
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction('element-active');
      chart.on('interval:click', (ev) => {
        const intervalElement = ev.target.get('element');
        const data = intervalElement.getModel().data;
        getJsDayError(data.happenDay)
      });
      chart.legend(false);
      chart
        .interval()
        .position('happenDay*count')
      chart.render();
    }
    const getJsErrList = async () => {
      try {
        const res = await API.jsErrList()
        if(res.data.code === 200) {
          const errList = res.data.data.map(item => {
            item.count = +item.count
            return item
          })
          initLineChart(errList)
        }
      } catch(e) {
        console.log(e)
      }
    }
    const getJsDayError = async (day) => {
      try {
        state.loading = true
        const res = await API.jsDayError({ day })
        if(res.data.code === 200) {
          state.jsDayErrList = res.data.data.map(item => {
            item.key = item.id
            return item
          })
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    const getJsErrDetail = async (errId) => {
      try {
        const res = await API.jsErrDetail({ errId })
        if(res.data.code === 200) {
          state.jsErrDetail = res.data.data
        }
      } catch(e) {
        console.log(e)
      }
    }
    onMounted(() => {
      getJsErrList()
    })
    return {
      ...toRefs(state),
      getJsErrDetail
    }
  }
}
</script>
<style lang="less"  scoped>
.err-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  .err-list-item {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #E8E8EA;
    cursor: pointer;
    &.mt {
      border-top: 1px solid #E8E8EA;
    }
    .msg-item {
      padding: 0 12px;
      .device-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>