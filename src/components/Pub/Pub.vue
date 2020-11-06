<template>
  <v-container>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      type="card"
    ></v-skeleton-loader>
    <v-row no-gutters v-else>
      <v-col cols="2" width="200">
        <v-hover v-slot="{ hover }">
          <v-avatar class="avatar-outlined" tile color="grey" size="200">
            <v-img :src="paramPub.home_photo_path">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal white--text"
                  style="height: 200px; width: 200px;"
                >
                  {{ paramPub.description }}
                </div>
              </v-expand-transition>
            </v-img>
          </v-avatar>
        </v-hover>
      </v-col>
      <v-col class="ml-2">
        <v-card height="200" outlined tile class="mx-auto">
          <v-card-text class="text-body-1">
            <v-row no-gutters>
              <v-col cols="6">
                <p>{{ $t('Pub Name:') }} {{ paramPub.name }}</p>
                <p>{{ $t('Evaluation:') }}</p>
                <p>{{ $t('Address:') }}</p>
                <p>{{ $t('Business Hours:') }}</p>
                <p>{{ $t('Phone Number:') }} {{ paramPub.phone_number }}</p>
              </v-col>
              <v-col>
                <v-btn
                  v-if="current"
                  small
                  icon
                  style="position: absolute; right: 15px"
                >
                  <v-icon size="15" color="primary">mdi-pencil</v-icon>
                </v-btn>
                <p>{{ $t('Email:') }} {{ paramPub.main_email }}</p>
                <p>{{ $t('Address:') }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-5">
      <v-col cols="4">
        <v-card outlined height="250" tile>
          <v-toolbar color="elevation-0" class="text-h6" dense>
            <v-spacer />
            {{ $t('Introduce') }}
            <v-spacer />
          </v-toolbar>
          <v-divider />
        </v-card>
      </v-col>
      <v-col cols="5" class="text-center">
        <iframe
          width="414"
          height="250"
          src="https://www.youtube.com/embed/E_Bw1n0Ixf4"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="3" class="text-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6567081641556!2d105.79244411489928!3d10.045160692820222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a062afabc3362d%3A0x27461fd58612669b!2zTmjDoCBIw6BuZyBMw7phIE7hur9w!5e0!3m2!1svi!2s!4v1604634555685!5m2!1svi!2s"
          width="333"
          height="250"
          frameborder="0"
          style="border:0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
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
    ...mapGetters('pub', ['paramPub']),
    ...mapGetters('user', ['currentUser']),
    current() {
      return this.currentUser
        ? this.currentUser.id === this.paramPub.user_id
        : false
    }
  },
  methods: {
    ...mapActions('pub', ['getParamPub']),
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        await this.getParamPub(this.$route.params.id)
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData'
  }
}
</script>

<style>
.avatar-outlined {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
