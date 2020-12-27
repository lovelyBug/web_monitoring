<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from '@/layout/index.vue'
import axios from 'axios'

export default {
  components: { Layout },
  name: 'App',
  methods: {
    errorTest() {
      this.tt()
    },
    async fetchData() {
      // new Promise(() => {
      //   this.abcxxx()
      // })
      try {
        await axios.post('http://127.0.0.1:7001/tt', { data: 2 })
        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     this.tt()
        //     resolve()
        //   }, 1000)
        // })
        // this.tt()
      } finally {
        //
      }
    }
  },
}
</script>

<style>
</style>
