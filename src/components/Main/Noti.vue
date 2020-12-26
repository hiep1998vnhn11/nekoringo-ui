<template>
  <v-container>
    <v-list three-line>
      <template v-for="(item, index) in notifications">
        <v-divider
          v-if="index && index <= notifications.length"
          :key="index"
          :inset="item.inset"
        ></v-divider>
        <v-list-item
          :key="item.id"
          :class="!item.read_at ? 'pink lighten-5' : ''"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              About Your order in {{ item.data.pub.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              The publican was {{ item.data.status }} your order at
              {{ item.data.time }}, a meal at {{ item.data.pub.name }} for
              {{ item.data.amount }} people
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      notifications: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        let response = await axios.get('user/notification/get')
        this.notifications = response.data.data
      } catch (err) {
        this.error = err
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {}
}
</script>
<style scoped>
</style>
