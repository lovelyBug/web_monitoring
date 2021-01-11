<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length" class="err-list-container">
    <div class="title-view">
      <span><WarningOutlined /> JS报错类型（{{ errNum }}个）</span>
      <span><FieldTimeOutlined /> {{ currentTime }}点</span>
    </div>
    <a-table :data-source="jsDayErrList" :loading="loading" :columns="columns">
      <template #errorMessage="{text}">
        <span>{{text}}</span>
      </template>
      <template #deviceInfo="{record}">
        <div class="device-info">
          <span><IeOutlined />（{{ record.pcNum }}次）</span>
          <span><AndroidFilled />（{{ record.androidNum }}次）</span>
          <span><AppleFilled />（{{ record.iosNum }}次）</span>
          <span><TeamOutlined />（{{ record.userNum }}个）</span>
        </div>
      </template>
      <template #operation="{record}">
        <a-button size="small" type="link" @click="openErrDetail(record.errorMessage)">详情</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import { Chart } from '@antv/g2'
import { onMounted, reactive, toRefs } from 'vue'
import * as API from '@/api/index.js'
import ANDROID_IMG from '@/assets/images/android.png'
import IOS_IMG from '@/assets/images/ios.png'
import WEB_IMG from '@/assets/images/web.png'
import USERS_IMG from '@/assets/images/users.png'
import {
  IeOutlined,
  AndroidFilled,
  AppleFilled,
  TeamOutlined,
  WarningOutlined,
  FieldTimeOutlined
} from '@ant-design/icons-vue';

export default {
  components: {
    IeOutlined,
    AndroidFilled,
    AppleFilled,
    TeamOutlined,
    WarningOutlined,
    FieldTimeOutlined
  },
  setup () {
    const state = reactive({
      jsDayErrList: [],
      jsErrDetail: {},
      ANDROID_IMG,
      IOS_IMG,
      WEB_IMG,
      USERS_IMG,
      currentTime: '',
      errNum: 0,
      loading: false,
      columns: [
        {
          title: '错误类型',
          dataIndex: 'errorMessage',
          key: 'errorMessage',
          ellipsis: true
        },
        {
          title: '设备错误信息',
          dataIndex: 'deviceInfo',
          slots: { customRender: 'deviceInfo' },
          width: '360px'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
          width: '80px',
          align: 'center'
        },
      ]
    })
    const initLineChart = (errList) => {
      const chart = new Chart({
        container: "container",
        theme: {
          defaultColor: '#6130F5',
        },
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
        .color('counts', () => '#6130F5')
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
          state.jsDayErrList = data.map((item, index) => {
            item.key = index
            return item
          })
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    const openErrDetail = (errorMessage) => {
      window.open(`/#/js_err_detail?errorMessage=${errorMessage}`)
    }
    onMounted(() => {
      getJsErrListByHour()
    })
    return {
      ...toRefs(state),
      openErrDetail
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
  .device-info {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .device-icon {
    width: 16px;
    height: 16px;
  }
}
</style>