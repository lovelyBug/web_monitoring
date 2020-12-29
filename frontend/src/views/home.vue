<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length" class="err-list-container">
    <div
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
    </div>
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
      WEB_IMG
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
        const res = await API.jsDayError({ day })
        if(res.data.code === 200) {
          state.jsDayErrList = res.data.data
        }
      } catch(e) {
        console.log(e)
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