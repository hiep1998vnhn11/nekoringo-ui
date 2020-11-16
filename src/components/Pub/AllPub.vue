<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="4" v-for="n in 3" :key="n">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else-if="pubs_paginate.length">
      <v-col
        cols="4"
        v-for="pub in pubs_paginate"
        :key="`${pub.id} pub`"
        class="text-center"
      >
        <v-card
          class="grey lighten-3"
          elevation="0"
          :to="{ name: 'Pub', params: { id: pub.id } }"
        >
          <v-hover v-slot="{ hover }">
            <v-avatar
              class="avatar-outlined"
              tile
              color="grey"
              height="200"
              width="350"
            >
              <v-img :src="pub.home_photo_path">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue lighten-4 v-card--reveal black--text text-h6"
                    style="height: 200px; width: 350px;"
                  >
                    <v-container>{{ pub.description }}</v-container>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-avatar>
          </v-hover>
          {{ pub.name }}
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="Math.floor(pubs.length / 6) + 1"
            :total-visible="7"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      error: null,
      page: 1,
      pubs_paginate: []
    }
  },
  watch: {
    page: 'changePage'
  },
  computed: {
    ...mapGetters('pub', ['pubs'])
  },
  methods: {
    ...mapActions('pub', ['getAllPub']),
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        await this.getAllPub()
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    changePage() {
      var i
      this.pubs_paginate = []
      for (i = (this.page - 1) * 6; i < this.page * 6; i++) {
        if (this.pubs[i]) this.pubs_paginate.push(this.pubs[i])
      }
    }
  },
  async mounted() {
    await this.fetchData()
    this.changePage()
  }
}
</script>

<style></style>
