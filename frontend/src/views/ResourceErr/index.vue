<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length" class="err-list-container">
    <div class="title-view">
      <span><WarningOutlined /> 资源报错类型（{{ errNum }}个）</span>
      <span><FieldTimeOutlined /> {{ currentTime }}点</span>
    </div>
    <a-table :data-source="jsDayErrList" :loading="loading" :columns="columns"/>
  </div>
  <empty-table v-else msg="赞！还没有错误数据呦~" />
</template>
<script>
import { Chart } from '@antv/g2'
import { onMounted, reactive, toRefs } from 'vue'
import * as API from '@/api/index.js'
import ANDROID_IMG from '@/assets/images/android.png'
import IOS_IMG from '@/assets/images/ios.png'
import WEB_IMG from '@/assets/images/web.png'
import USERS_IMG from '@/assets/images/users.png'
import moment from 'moment'
import {
  WarningOutlined,
  FieldTimeOutlined
} from '@ant-design/icons-vue';
import EmptyTable from '@/components/empty-table.vue'

export default {
  components: {
    WarningOutlined,
    FieldTimeOutlined,
    EmptyTable
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
          title: '资源链接',
          dataIndex: 'sourceUrl',
          key: 'sourceUrl',
          ellipsis: true
        },
        {
          title: '资源类型',
          dataIndex: 'elementType',
          width: '100px'
        },
        {
          title: '发生次数',
          dataIndex: 'num',
          width: '140px'
        },
        {
          title: '影响用户数',
          dataIndex: 'userNum',
          width: '120px'
        }
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
        getResourceErrInfoByHour(time)
      });
      chart.legend(false);
      chart
        .interval()
        .position('time*counts')
        .color('counts', () => '#6130F5')
      chart.render();
    }
    const getResourceErrListByHour = async () => {
      try {
        const params = { day: getDay() }
        const res = await API.getResourceErrListByHour(params)
        if(res.data.code === 200) {
          const errList = res.data.data.map(item => {
            item.count = +item.count
            return item
          })
          initLineChart(errList)
          const time = new Date().getHours()
          state.currentTime = `${getDay()} ${time}`
          getResourceErrInfoByHour(time)
        }
      } catch(e) {
        console.log(e)
      }
    }
    const getResourceErrInfoByHour = async (hour) => {
      try {
        state.loading = true
        const res = await API.getResourceErrInfoByHour({ hour })
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
      window.open(`/#/api_err_detail?errorMessage=${errorMessage}`)
    }
    const getDay = () => moment(new Date()).format('yy-MM-DD')
    onMounted(() => {
      getResourceErrListByHour()
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