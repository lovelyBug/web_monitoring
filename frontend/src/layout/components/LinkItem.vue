<template>
  <div @click="linkTo" class="link-item-wrapper">
    {{ menu.label }}
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const router = useRouter()
    const linkTo = () => {
      router.push(props.menu.link)
    }
    return { linkTo }
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