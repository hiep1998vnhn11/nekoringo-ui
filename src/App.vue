<template>
  <v-app id="app">
    <v-col cols=3>
      <v-select v-model="$i18n.locale"
      :items="langs" menu-props="auto"
      :label="$t('common.select_lang')"
      hide-details prepend-icon="mdi-earth">
    </v-select>
    </v-col>
    {{langs}}
    <v-select
          :items="items"
          filled
          label="Filled style"
        ></v-select>
    <v-btn>hello</v-btn>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
