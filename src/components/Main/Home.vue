<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="text-center">
        <div v-if="currentUser && currentUser.roles[0].name === 'publican'">
          <p class="text-h4 mt-16">
            {{
              $t(
                "Thank for your paticipation! You are one of Nekoringo's Publican"
              )
            }}
          </p>
          <v-btn
            outlined
            class="black text-capitalize mt-10"
            x-large
            color="white"
            :to="{ name: 'NewPub' }"
          >
            {{ $t('Create a new Pub now!') }}
          </v-btn>
        </div>
        <div v-else>
          <p class="text-h4 mt-16">
            {{ $t('Enjoy your meal with Nekoringo') }}
          </p>
          <v-btn
            outlined
            class="black text-capitalize mt-10"
            x-large
            color="white"
            @click="onParticipate"
            :loading="requesting"
          >
            {{ $t('Participle') }}
          </v-btn>
        </div>
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
        v-for="(pub, index) in pubs.data"
        :key="`${pub.id} pub`"
        class="text-center"
      >
        <v-card
          class="grey lighten-3"
          elevation="0"
          :to="{ name: 'Pub', params: { id: pub.id } }"
          v-if="index < 3"
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
                    style="height: 200px; width: 350px"
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
    <dish-component />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewDish from '@/components/Pub/NewDish'
import DishComponent from './Dish'
import axios from 'axios'

export default {
  components: {
    NewDish,
    DishComponent
  },
  data() {
    return {
      loading: false,
      requesting: false,
      error: null,
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
      onboarding: 0
    }
  },
  computed: {
    ...mapGetters('pub', ['pubs']),
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {
    this.fetchData()
    setInterval(this.next, 3000)
  },
  methods: {
    ...mapActions('pub', ['getAllPub']),
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
        await this.getAllPub({ page: 1 })
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    async onParticipate() {
      this.requesting = true
      try {
        const response = await axios.post('/user/request/publican/create')
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: response.data
            ? response.data.message
            : this.$t('Make publican request successfully!')
        })
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.response ? err.response.data.message : err.toString()
        })
      }
      this.requesting = false
    }
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
