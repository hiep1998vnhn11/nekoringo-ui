<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="text-center">
        <p class="text-h4 mt-16">{{ $t('Enjoy your meal with Nekoringo') }}</p>
        <v-btn
          outlined
          class="black text-capitalize mt-10"
          x-large
          color="white"
          :to="{ name: 'NewPub' }"
        >
          {{ $t('Participle') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-card flat tile>
          <v-window v-model="onboarding" reverse>
            <v-window-item v-for="n in length" :key="`card-${n.value}`">
              <v-card height="400" tile outlined>
                <v-img height="400" :src="n.src">
                  <v-row class="fill-height" align="center" justify="center">
                    <v-btn text @click="prev">
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn text @click="next">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
              </v-card>
            </v-window-item>
          </v-window>
          <v-card-actions>
            <v-spacer />

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider />
    <div class="text-center mt-3">
      {{ $t('Recommend for you') }}
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
    <v-row>
      <v-col cols="3">
        <v-card
          tile
          outlined
          height="100"
          v-for="i in tabs"
          :key="i.text"
          @click="
            tab = i.text
            fetchDish(i.text)
          "
          exact-active-class="primary"
        >
          <v-img height="100" :src="i.src">
            <v-container
              class="text-center text-h6 font-weight-black red--text"
            >
              {{ i.text }}
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
                prepend-inner-icon="mdi-magnify"
                :label="$t('Search')"
                outlined
                clearable
                dense
                rounded
                single-line
                hide-details
                @input="fetchDish(tab, search)"
              ></v-text-field>
            </v-col>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in tabs" :key="i.text" :value="i.text">
                <v-card flat v-if="loadingDish">
                  <v-row>
                    <v-col v-for="n in 4" :key="n">
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="200"
                        max-height="150"
                        type="card"
                      ></v-skeleton-loader>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card flat v-else>
                  <v-row>
                    <v-col
                      cols="3"
                      v-for="dish in dishes"
                      :key="`dish-${dish.id}`"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-avatar
                          class="avatar-outlined"
                          tile
                          color="grey"
                          height="150"
                          width="200"
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
                      {{ dish.name }}
                    </v-col>
                  </v-row>
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
import NewDish from '@/components/Pub/NewDish'

export default {
  components: { NewDish },
  data() {
    return {
      loading: false,
      error: null,
      tab: 'buffet',
      tabs: [
        {
          text: 'buffet',
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyBCykvDB0y4AliS4QHkODIziiBXTB4niLJA&usqp=CAU'
        },
        {
          text: 'sushi',
          src:
            'https://vinmec-prod.s3.amazonaws.com/images/20200410_153038_287034_sushi-la-gi.max-1800x1800.jpg'
        },
        {
          text: 'barbecue',
          src:
            'https://nghebep.com/wp-content/uploads/2019/02/cac-mon-nuong-duoc-yeu-thich.jpg'
        }
      ],
      length: [
        {
          value: 1,
          src:
            'https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi-6-1-745x420.jpg'
        },
        {
          value: 2,
          src:
            'https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi-6-2.jpg'
        },
        {
          value: 3,
          src:
            'https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi-5-768x576.jpg'
        },
        {
          value: 4,
          src:
            'https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi-2-2-768x576.jpg'
        },
        {
          value: 5,
          src:
            'https://toplisthanoi.com/wp-content/uploads/2019/10/quan-pub-o-ha-noi-1-768x576.jpeg'
        },
        {
          value: 6,
          src:
            'https://cdn.huongnghiepaau.com/wp-content/uploads/2017/10/quan-club-rong-rai-hon-1.jpg'
        },
        {
          value: 7,
          src:
            'https://cdn.huongnghiepaau.com/wp-content/uploads/2017/10/bar-la-noi-phuc-vu-do-uong-co-con.jpg'
        }
      ],
      onboarding: 0,
      search: '',
      loadingDish: false,
      slides: [
        {
          title: 'Slide #1',
          content: 'Slide content.'
        }
      ],
      items: ['Bách Khoa', 'Hai Bà Trưng', 'Trần Duy Hưng']
    }
  },
  computed: mapGetters('pub', ['pubs', 'dishes']),
  mounted() {
    this.fetchData()
    this.fetchDish('buffet')
    setInterval(this.next, 3000)
  },
  methods: {
    ...mapActions('pub', ['getAllPub', 'getDishes']),
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length.length ? 0 : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length.length - 1 : this.onboarding - 1
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
    async fetchDish(category, searchKey = null) {
      this.loadingDish = true
      this.error = null
      try {
        await this.getDishes({ category: category, searchKey: searchKey })
      } catch (err) {
        this.error = err.toString()
      }
      this.loadingDish = false
    },
    test() {
      console.log(123)
    }
  }
}
</script>

<style></style>
