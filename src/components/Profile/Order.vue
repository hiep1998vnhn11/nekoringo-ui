<template>
  <v-container>
    <order-table :orders="orders" :loading="loading" name="Nekoringo" />
  </v-container>
</template>
<script>
import axios from 'axios'
import OrderTable from './OrderTable'
export default {
  components: {
    OrderTable
  },
  data() {
    return {
      orders: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        const response = await axios.get('/publican/order/store')
        this.orders = response.data.data
      } catch (error) {
        this.error = error
      }
      this.loading = false
    }
  },
  created() {},
  mounted() {
    this.fetchData()
  },
  computed: {}
}
</script>
<style scoped>
</style>
