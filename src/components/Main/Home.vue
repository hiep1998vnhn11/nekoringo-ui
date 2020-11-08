<template>
  <v-container>
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
    <div class="text-center">
      {{ $t('Recomment for you') }}
    </div>
  </v-container>
</template>

<script>
export default {}
</script>

<style></style>
