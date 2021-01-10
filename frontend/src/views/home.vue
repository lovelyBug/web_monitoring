<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length" class="err-list-container">
    <!-- <div
      v-for="(dayErr, index) in jsDayErrList"
      :key="dayErr.id"
      class="err-list-item"
      :class="{ mt: !index }"
      @click="getJsErrInfoByType(dayErr.id)"
    >
      <div class="msg-item">{{ dayErr.uploadType }}</div>
      <div class="msg-item">{{ dayErr.errorMessage }}</div>
      <div class="msg-item"><img :src="WEB_IMG" class="device-icon"></div>
      <div class="msg-item">{{ dayErr.browserName }}</div>
      <div class="msg-item">发生时间：{{ dayErr.createdAt }}</div>
    </div> -->
    <div class="title-view">
      <span>JS报错类型：（{{ errNum }}个）</span>
      <span>{{ currentTime }}点</span>
    </div>
    <a-table :data-source="jsDayErrList" :loading="loading" :columns="columns">
      <template #operation="{record}">
        <a-button size="small" type="link" @click="getJsErrInfoByType(record.errorMessage)">错误详情</a-button>
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
      currentTime: '',
      errNum: 0,
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
          dataIndex: 'happenDate',
          key: 'happenDate',
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
        padding: [20, 20, 30, 24]
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
        const {time} = data
        state.currentTime = `2020-11-24 ${time}`
        getJSErrInfoByHour(time)
      });
      chart.legend(false);
      chart
        .interval()
        .position('time*counts')
      chart.render();
    }
    const getJsErrListByHour = async () => {
      try {
        const params = { day: '20201124' }
        const res = await API.getJsErrListByHour(params)
        if(res.data.code === 200) {
          const errList = res.data.data.map(item => {
            item.count = +item.count
            return item
          })
          initLineChart(errList)
          const { time } = errList[errList.length - 1]
          state.currentTime = `2020-11-24 ${time}`
          getJSErrInfoByHour(time)
        }
      } catch(e) {
        console.log(e)
      }
    }
    const getJSErrInfoByHour = async (hour) => {
      try {
        state.loading = true
        const res = await API.getJSErrInfoByHour({ hour })
        if(res.data.code === 200) {
          const { data } = res.data
          state.errNum = data.length
          state.jsDayErrList = data.map(item => {
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
    const getJsErrInfoByType = async (errorMessage) => {
      try {
        const res = await API.getJsErrInfoByType({ errorMessage })
        if(res.data.code === 200) {
          state.jsErrDetail = res.data.data
        }
      } catch(e) {
        console.log(e)
      }
    }
    onMounted(() => {
      getJsErrListByHour()
    })
    return {
      ...toRefs(state),
      getJsErrInfoByType
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
  // font-size: 12px;
  .title-view {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 6px;
  }
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