<template>
  <router-link :to="menu.link" class="link-item-wrapper">
    {{ menu.label }}
  </router-link>
</template>

<script>

export default {
  props: {
    menu: {
      type: Object,
      default: () => {}
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