<template>
  <div class="et-container" :style="{height: height}">
    <img src="@/assets/images/empty-table.png">
    <span class="msg">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '暂无数据'
    },
    height: {
      type: String,
      default: '400px'
    }
  }
}
</script>

<style lang="less" scoped>
.et-container {
  width: 100%;
  background: #F3F3F3;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .msg {
    font-size: 12px;
    font-weight: 400;
    color: #6C6C72;
    margin-top: 12px;  }
}
</style>
