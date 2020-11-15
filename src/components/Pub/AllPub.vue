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
    <v-row v-else>
      <v-col
        cols="4"
        v-for="pub in pubs"
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      error: null
    }
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
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style></style>
