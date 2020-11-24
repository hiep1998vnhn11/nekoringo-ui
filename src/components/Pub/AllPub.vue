<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="4" v-for="n in 6" :key="n">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          max-height="240"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        cols="4"
        v-for="pub in pubs.data"
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
              class="avatar-outlined mb-2"
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
          <span class="text-body-1 mt-1">
            {{ pub.name }}
          </span>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="pubs.last_page"
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
        await this.getAllPub({ page: this.page })
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    changePage() {
      this.fetchData()
    }
  },
  async mounted() {
    await this.fetchData()
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
