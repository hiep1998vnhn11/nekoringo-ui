<template>
  <v-app id="app">
    <v-app-bar color="elevation-1" app>
      <v-toolbar-title>
        <router-link :to="{ name: 'Home' }">
          <img width="50" height="50" src="./assets/logo.png" class="mt-3" />
        </router-link>
      </v-toolbar-title>
      <v-col cols="2">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          menu-props="auto"
          :label="$t('common.select_lang')"
          hide-details
          prepend-icon="mdi-earth"
        >
        </v-select>
      </v-col>
      <v-spacer />
      <v-btn
        text
        x-large
        class="text-capitalize"
        exact
        active-class="primary--text"
        :to="{ name: 'Home' }"
      >
        {{ $t('home') }}
      </v-btn>
      <v-btn
        text
        x-large
        class="text-capitalize"
        active-class="primary--text"
        :to="{ name: 'AllPub' }"
      >
        {{ $t('category') }}
      </v-btn>
      <v-btn text x-large class="text-capitalize">
        {{ $t('About') }}
      </v-btn>
      <v-btn
        v-if="isLoggedIn && !!currentUser"
        @click="expand = true"
        text
        x-large
        class="text-capitalize"
      >
        <v-avatar size="30" class="avatar-outlined mr-3">
          <img :src="currentUser.profile_photo_path" />
        </v-avatar>
        {{ currentUser.name }}
      </v-btn>
      <v-btn
        v-else
        text
        x-large
        class="text-capitalize"
        :to="{ name: 'Login' }"
        active-class="primary--text"
      >
        {{ $t('signin') }}
      </v-btn>
      <div class="show-noti-app-bar" v-if="currentUser">
        <v-expand-transition right>
          <v-card
            v-click-outside="{
              handler: onClickOutsideWithConditional,
              closeConditional,
            }"
            v-show="expand"
            width="250"
            class="mx-auto"
          >
            <v-container v-if="currentUser">
              <v-btn
                text
                block
                class="text-capitalize"
                :to="{ name: 'Notification' }"
                v-if="currentUser.roles[0].name === 'viewer'"
                @click="numberUnread = 0"
              >
                <v-badge
                  bordered
                  color="success"
                  :content="numberUnread"
                  v-if="numberUnread"
                >
                  {{ $t('Notifications') }}
                </v-badge>
                <span v-else>
                  {{ $t('Notifications') }}
                </span>
              </v-btn>
              <v-btn
                text
                block
                class="text-capitalize"
                :to="{ name: 'Profile' }"
              >
                {{ $t('Profile') }}
              </v-btn>
              <v-btn
                text
                block
                class="text-capitalize"
                v-if="currentUser.roles[0].name === 'publican'"
                :to="{ name: 'NewPub' }"
              >
                {{ $t('create a new pub') }}
              </v-btn>
              <v-btn
                text
                block
                class="text-capitalize"
                v-if="currentUser.roles[0].name === 'publican'"
                :to="{ name: 'Order' }"
              >
                {{ $t('pub orders') }}
              </v-btn>
              <v-btn
                text
                block
                class="text-capitalize"
                v-else
                :to="{ name: 'OrderList' }"
              >
                {{ $t('orders list') }}
              </v-btn>
              <v-btn text block class="text-capitalize" @click="signOut">
                {{ $t('signout') }}
              </v-btn>
            </v-container>
          </v-card>
        </v-expand-transition>
      </div>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
    <v-divider />
    <v-footer class="grey lighten-3">
      <v-row>
        <v-col cols="3" class="text-center">
          <div>{{ $t('Discovery') }}</div>
          <div>{{ $t('Comment') }}</div>
          <div>{{ $t('Collection') }}</div>
          <div>{{ $t('Rule') }}</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <div>{{ $t('Introduction') }}</div>
          <div>{{ $t('Support') }}</div>
          <div>{{ $t('Feedback') }}</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <div>{{ $t('Login') }}</div>
          <div>FaceBook</div>
          <div>Intagram</div>
        </v-col>
        <v-col cols="3" class="text-center"> </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  computed: mapGetters('user', ['currentUser', 'isLoggedIn']),
  created() {
    if (!this.currentUser && this.isLoggedIn) this.getUser()
    if (!this.numberUnread) this.fetNumberUnread()
  },
  methods: {
    ...mapActions('user', ['logout', 'getUser']),
    async signOut() {
      await this.logout()
      this.$router.push({ name: 'Login' })
    },
    onClickOutsideWithConditional() {
      this.expand = false
    },
    closeConditional(e) {
      return this.expand
    },
    async fetNumberUnread() {
      let response = await axios.post('/user/notification/get_number_unread')
      this.numberUnread = response.data.data
    }
  },
  data() {
    return {
      expand: false,
      langs: [
        {
          text: 'Tiếng Việt',
          value: 'vi'
        },
        {
          text: 'English',
          value: 'en'
        },
        {
          text: '日本語',
          value: 'ja'
        }
      ],
      numberUnread: 0
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.show-noti-app-bar {
  position: absolute;
  z-index: 100;
  top: 60px;
  right: 17px;
}
</style>
