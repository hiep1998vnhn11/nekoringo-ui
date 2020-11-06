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
        {{ $t('signin') }}
      </v-btn>
      <v-btn text x-large class="text-capitalize">
        {{ $t('category') }}
      </v-btn>
      <v-btn v-if="isLoggedIn" text x-large class="text-capitalize">
        {{ currentUser.name }}
      </v-btn>
      <v-btn v-else text x-large class="text-capitalize">
        {{ $t('signin') }}
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        text
        x-large
        class="text-capitalize"
        @click="logout"
      >
        {{ $t('signout') }}
      </v-btn>
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
</style>
