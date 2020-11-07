<template>
  <v-app id="app">
    <v-app-bar color="elevation-1" app>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer />
      <v-btn text x-large class="text-capitalize">
        {{ $t('home') }}
      </v-btn>
      <v-btn text x-large class="text-capitalize">
        {{ $t('category') }}
      </v-btn>
      <v-btn text x-large class="text-capitalize">
        {{ $t('category') }}
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
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
      <v-btn v-else text x-large class="text-capitalize">
        {{ $t('signin') }}
      </v-btn>
      <div class="show-noti-app-bar">
        <v-expand-transition right>
          <v-card
            v-click-outside="{
              handler: onClickOutsideWithConditional,
              closeConditional
            }"
            v-show="expand"
            width="250"
            class="mx-auto"
          >
            <v-container>
              <v-btn text block class="text-capitalize">
                {{ $t('Profile') }}
              </v-btn>
              <v-btn text block class="text-capitalize" @click="signOut">
                {{ $t('signout') }}
              </v-btn>
            </v-container>
          </v-card>
        </v-expand-transition>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: mapGetters('user', ['currentUser', 'isLoggedIn']),
  created() {
    if (!this.currentUser && this.isLoggedIn) this.getUser()
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
    }
  },
  data() {
    return {
      expand: false
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
