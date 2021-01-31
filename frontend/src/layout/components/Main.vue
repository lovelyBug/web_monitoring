<template>
  <div class="main-view">
    <slot/>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
.main-view {
  flex: 1 auto;
  max-height: 100vh;
  overflow: auto;
  padding: 0 12px;
  // background-color: rgb(243, 243, 243);
}
</style>