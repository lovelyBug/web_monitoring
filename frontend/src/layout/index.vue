<template>
  <div class="layout-container">
    <SideBar />
    <Main>
      <slot/>
    </Main>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Main from './components/Main.vue'
export default {
  components: { SideBar, Main }
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
</style>