<template>
  <div id="container"></div>
  <div v-if="jsDayErrList.length">
    <div v-for="dayErr in jsDayErrList" :key="dayErr.id" @click="getJsErrDetail(dayErr.id)">{{ dayErr.errorMessage }}</div>
  </div>
</template>
<script>
// import { useRouter } from 'vue-router'
import { Chart } from '@antv/g2'
import { onMounted, reactive, toRefs } from 'vue'
import * as API from '@/api/index.js'

export default {
  setup () {
    // const router = useRouter()
    // const toHome = (() => {
    //   router.push('/about')
    // })
    const state = reactive({
      jsDayErrList: [],
      jsErrDetail: {}
    })
    const initLineChart = (errList) => {
      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 300,
        padding: [20, 20, 95, 40]
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
          console.log(res)
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
<style  scoped>
</style>