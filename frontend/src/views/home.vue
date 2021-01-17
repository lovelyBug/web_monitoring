<template>
  <a-button class="err-btn" @click="createErr">手动报错</a-button>
</template>

<script>
export default {
  setup() {
    const createErr = () => {
      tt()
    }
    return {
      createErr
    }
  }
}
</script>

<style scoped>
.err-btn {
  margin: 20px;
}
</style>