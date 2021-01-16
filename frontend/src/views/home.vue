<template>
  <div>
    主页
  </div>
  <a-button @click="linkTo">跳转</a-button>
</template>

<script>
// import { useRouter } from 'vue-router'
export default {
  setup() {
    // const router = useRouter()
    const linkTo = () => {
      // router.push('/js_err')
      tt()
    }
    return {
      linkTo
    }
  }
}
</script>

<style lang="scss" scoped>

</style>