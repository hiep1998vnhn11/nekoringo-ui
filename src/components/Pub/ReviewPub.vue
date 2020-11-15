<template>
  <container>
    <v-row no-gutters>
      <v-col cols="2" width="200">
        <v-hover v-slot="{ hover }">
          <v-avatar class="avatar-outlined" tile color="grey" size="200">
            <v-img :src="pub.home_photo_path">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal white--text"
                  style="height: 200px; width: 200px;"
                >
                  {{ pub.description }}
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
                <p>{{ $t('Name') }} : {{ pub.name }}</p>
                <p>{{ $t('Email:') }} {{ pub.main_email }}</p>
                <p>{{ $t('Address:') }} {{ pub.address }}</p>
                <p>{{ $t('Phone Number:') }} {{ pub.phone_number }}</p>
              </v-col>
              <v-col> </v-col>
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
            <v-btn
              icon
              small
              v-if="current"
              @click="
                changeStatus = 'Introduce'
                change = true
                text = pub.description
              "
            >
              <v-icon color="primary" size="15">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            {{ pub.description }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="text-center">
        <iframe
          width="414"
          height="250"
          :src="pub.video_path"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="4" class="text-center">
        <iframe
          :src="pub.map_path"
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
  </container>
</template>

<script>
export default {
  props: ['pub']
}
</script>

<style></style>
