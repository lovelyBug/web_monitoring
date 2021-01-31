<template>
  <a-input-search
    v-model:value="userId"
    placeholder="请输入需要查询的用户ID"
    :loading="loading"
    enter-button
    class="search-input mt16"
    @search="onSearch"
  />
  <a-spin v-if="!logData.length" :spinning="loading" tip="Loading..." >
    <empty-table  msg="当前暂无用户日志数据~" height="80vh" class="mt16" />
  </a-spin>
  <a-list
    v-else
    bordered
    :data-source="logData"
    :loading="loading"
    :pagination="pagination"
    rowKey="id"
    class="mt16"
  >
    <template #renderItem="{ item }">
      <a-list-item v-if="item.uploadType === 'traceLog'">
        <span>{{ item.uploadType }}</span>
        <span>{{ item.uploadType }}</span>
        <span>{{ item.behaviorType }}</span>
        <span>{{ item.tagName }}</span>
        <span>{{ item.className }}</span>
        <span>{{ item.innerText }}</span>
        <span>{{ item.happenDate }}</span>
        <span>{{ item.completeUrl }}</span>
      </a-list-item>
      <a-list-item v-if="item.uploadType === 'http_log'">
        <span>{{ item.uploadType }}</span>
        <span>{{ item.httpUrl }}</span>
        <span>{{ item.status }}</span>
        <span>{{ item.statusText }}</span>
        <span>{{ item.statusResult }}</span>
        <span>{{ item.loadTime }}</span>
        <span>{{ item.completeUrl }}</span>
        <span>{{ item.happenDate }}</span>
      </a-list-item>
      <a-list-item v-if="item.uploadType === 'jsError'">
        <span>{{ item.uploadType }}</span>
        <span>{{ item.errorMessage }}</span>
        <span>{{ item.deviceName }}</span>
        <span>{{ item.os }}</span>
        <span>{{ item.browserName }}</span>
        <span>{{ item.completeUrl }}</span>
        <span>{{ item.happenDate }}</span>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
import { reactive, toRefs } from 'vue'
import EmptyTable from '@/components/empty-table.vue'
import { getUserLog } from '@/api/index.js'

export default {
  components: { EmptyTable },
  setup() {
    const state = reactive({
      loading: false,
      userId: '',
      logData: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10
      },
    })
    const onSearch = async (userId) => {
      if(!userId) return
      try {
        state.loading = true
        const res = await getUserLog({ userId })
        console.log(res)
        const { code, data } = res.data
        if (code === 200) {
          state.logData = data
        }
      } catch(e) {
        console.log(e)
      } finally {
        state.loading = false
      }
    }
    return {
      ...toRefs(state),
      onSearch
    }
  }
}
</script>

<style lang="less" scoped>
.search-input {
  width: 40%;
  min-width: 260px;
}
</style>