<template>
  <a-button class="err-btn" @click="createJsErr">JS手动报错</a-button>
  <a-button class="err-btn" @click="createApiErr">API手动报错</a-button>
  <img src="https://www.baidu.com/image/123.png">
  <img src="https://www.baidu.com/image/test.jpg">
</template>

<script>
import { mockApiErr } from '@/api/index.js'
export default {
  setup() {
    const createJsErr = () => {
      tt()
    }
    const createApiErr = () => {
      mockApiErr()
    }
    return {
      createJsErr,
      createApiErr
    }
  }
}
</script>

<style scoped>
.err-btn {
  margin: 20px;
}
</style>