<template>
  <v-row>
    <v-col cols="3">
      <v-card v-if="loading" tile outlined>
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-card>
      <v-card
        v-else
        tile
        outlined
        height="100"
        class="mt-1"
        v-for="i in categories"
        :key="`category-${i.name}`"
        @click="
          tab = i.id
          fetchDish(i.id, true)
        "
        exact
        active-class="red"
      >
        <v-img height="100" :src="i.src">
          <v-container class="text-center text-h6 font-weight-black red--text">
            {{ i.name }}
          </v-container>
        </v-img>
      </v-card>
    </v-col>
    <v-col cols="9">
      <v-card tile outlined>
        <v-toolbar dense color="elevation-0">
          <v-chip class="ma-2" color="pink" label text-color="white">
            <v-icon left>
              mdi-format-color-highlight
            </v-icon>
            {{ $t('Highlight') }}
          </v-chip>
          <v-chip class="ma-2" color="primary" label>
            <v-icon left>
              mdi-map-marker
            </v-icon>
            {{ $t('Neighborhood') }}
          </v-chip>
          <new-dish />
          <v-spacer />
          <v-col cols="3">
            <v-select
              class="mt-6"
              :items="items"
              :label="$t('Place')"
              dense
              solo
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              :label="$t('Search')"
              outlined
              dense
              rounded
              single-line
              hide-details
              @input="fetchDish(tab, true, search)"
            ></v-text-field>
          </v-col>
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <v-row v-if="loading">
            <v-col cols="3" v-for="n in 8" :key="n">
              <v-skeleton-loader
                class="mx-auto"
                max-width="200"
                max-height="170"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-tabs-items v-model="tab" v-else>
            <v-tab-item
              v-for="i in categories"
              :key="`categori-${i.id}`"
              :value="i.id"
            >
              <v-card flat v-if="loadingDish">
                <v-row>
                  <v-col cols="3" v-for="n in 8" :key="n">
                    <v-skeleton-loader
                      class="mx-auto"
                      max-width="200"
                      max-height="170"
                      type="card"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-card>
              <v-card flat v-else>
                <v-row>
                  <v-col
                    cols="3"
                    v-for="(dish, index) in dishes.data"
                    :key="`dish-${dish.id}`"
                  >
                    <v-hover v-slot="{ hover }">
                      <v-avatar
                        class="avatar-outlined"
                        tile
                        color="grey"
                        height="150"
                        width="200"
                        @click="onSelectDish(dish.id, index)"
                      >
                        <v-img
                          :src="dish.photo_path"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                          <v-expand-transition>
                            <div
                              v-if="hover"
                              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal black--text text-h6"
                              style="height: 150px; width: 200px;"
                            >
                              <span>{{ dish.description }}</span>
                            </div>
                          </v-expand-transition>
                        </v-img>
                      </v-avatar>
                    </v-hover>
                    <div class="text-center">
                      {{ dish.name }}
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-container class="text-center" v-show="!loading">
            <v-pagination
              v-model="page"
              :length="dishes.last_page"
              circle
              :total-visible="7"
            ></v-pagination>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" width="1200">
      <v-card :loading="loadingPub">
        <v-card-title>
          {{ $t('Some pubs have') }}
          <span v-if="!!selectedDish" class="ml-1">
            {{ selectedDish.name }}
          </span>
          <v-spacer />
          <v-btn icon @click="onCloseDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row v-if="loadingPub">
            <v-col cols="4" v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else-if="pubs.data.length">
            <v-col
              cols="4"
              v-for="pub in pubs.data"
              :key="`${pub.pub_id}-pub`"
              class="text-center"
            >
              <v-card
                class="grey lighten-3"
                elevation="0"
                :to="{ name: 'Pub', params: { id: pub.pub_id } }"
              >
                <v-hover v-slot="{ hover }">
                  <v-avatar
                    class="avatar-outlined"
                    tile
                    color="grey"
                    height="200"
                    width="350"
                  >
                    <v-img :src="pub.pub.home_photo_path">
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out blue lighten-4 v-card--reveal black--text text-h6"
                          style="height: 200px; width: 350px;"
                        >
                          <v-container>{{ pub.pub.description }}</v-container>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-avatar>
                </v-hover>
                {{ pub.pub.name }}
              </v-card>
            </v-col>
          </v-row>
          <v-container v-else class="text-body-1 text-center">
            {{ $t('Not any pub has') }}
            <span class="ml-1" v-if="!!selectedDish">
              {{ selectedDish.name }}
            </span>
          </v-container>
          <v-container class="text-center" v-show="pubs.data.length">
            <v-pagination
              v-model="pagePub"
              :length="pubs.last_page"
              circle
              :total-visible="7"
            ></v-pagination>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="text-capitalize" outlined text @click="onCloseDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewDish from '@/components/Pub/NewDish'
import axios from 'axios'

export default {
  components: { NewDish },
  data() {
    return {
      loading: false,
      error: null,
      tab: 1,
      onboarding: 0,
      search: '',
      loadingDish: false,
      items: ['Bách Khoa', 'Hai Bà Trưng', 'Trần Duy Hưng'],
      pubs: { data: [] },
      loadingPub: false,
      dialog: false,
      selectedDish: null,
      page: 1,
      pagePub: 1
    }
  },
  computed: mapGetters('pub', ['dishes', 'categories']),
  mounted() {
    this.fetchCategories()
    this.fetchDish(1)
  },
  methods: {
    ...mapActions('pub', ['getDishes', 'getCategories']),
    async fetchCategories() {
      this.loading = true
      try {
        await this.getCategories()
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    async fetchDish(category, renew = false, searchKey = null) {
      this.loadingDish = true
      this.error = null
      if (renew) this.page = 1
      try {
        await this.getDishes({
          category: category,
          searchKey: searchKey,
          page: this.page
        })
      } catch (err) {
        this.error = err.toString()
      }
      this.loadingDish = false
    },
    async fetchPub(dishId) {
      this.loadingPub = true
      try {
        let url = `user/dish/${dishId}/pub/store?page=${this.pagePub}`
        const response = await axios.get(url)
        this.pubs = response.data.data
      } catch (err) {
        this.error = err.toString()
      }
      this.loadingPub = false
    },
    async onSelectDish(dishId, i) {
      this.selectedDish = this.dishes.data[i]
      this.fetchPub(dishId)
      this.dialog = true
    },
    onCloseDialog() {
      this.dialog = false
      this.selectedDish = null
      this.pubs = { data: [] }
      this.pagePub = 1
    }
  },
  watch: {
    page: function() {
      this.fetchDish(this.tab, this.searchKey)
    },
    pagePub: function() {
      this.fetchPub(this.selectedDish.id)
    }
  }
}
</script>

<style></style>
