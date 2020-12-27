<template>
  <div class="link-item-wrapper">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.link-item-wrapper {
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: #817fa6;
  cursor: pointer;
  &:hover {
    color: #6130f5;
  }
}
</style>