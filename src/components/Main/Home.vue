<template>
  <v-container>
    <v-card flat tile>
      <v-window v-model="onboarding" vertical>
        <v-window-item v-for="n in length" :key="`card-${n}`">
          <v-card color="grey" height="200">
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                height="200"
                width="50%"
                src="https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi12-768x585.jpg"
              />
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-btn text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="n in length"
            :key="`btn-${n}`"
            v-slot="{ active, toggle }"
          >
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-col cols="7" class="text-center">
        <p class="text-h4 mt-16">{{ $t('Enjoy your meal with Nekoringo') }}</p>
        <v-btn
          outlined
          class="black text-capitalize mt-10"
          x-large
          color="white"
        >
          {{ $t('Participle') }}
        </v-btn>
      </v-col>
      <v-col cols="5">
        <v-img
          width="100%"
          src="https://pdsohio.com/wp-content/uploads/2017/04/default-image.jpg"
        />
      </v-col>
    </v-row>
    <v-divider />
    <div class="text-center mt-3">
      {{ $t('Recomment for you') }}
    </div>
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
        <v-img height="200" :src="pub.home_photo_path" />
        {{ pub.name }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card
          tile
          outlined
          height="100"
          v-for="i in tabs"
          :key="i"
          @click="tab = `${i}-tab`"
          exact-active-class="primary"
        >
          {{ i }}
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
            <v-chip class="ma-2" color="cyan" label>
              <v-icon left>
                mdi-new-box
              </v-icon>
              {{ $t('New') }}
            </v-chip>
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              :label="$t('Search')"
              outlined
              clearable
              dense
              rounded
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in tabs" :key="i" :value="`${i}-tab`">
                <v-card flat>
                  <v-card-text v-text="i"></v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
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
      error: null,
      tab: 'buffet-tab',
      tabs: ['buffet', 'sushi', 'barbecue'],
      length: 3,
      onboarding: 0,
      search: ''
    }
  },
  computed: mapGetters('pub', ['pubs']),
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions('pub', ['getAllPub']),
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    },
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        this.getAllPub()
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    test() {
      console.log(123)
    }
  }
}
</script>

<style></style>
