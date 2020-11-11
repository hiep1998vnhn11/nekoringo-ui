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
                <p>{{ $t('Name:') }} {{ paramPub.name }}</p>
                <p>{{ $t('Email:') }} {{ paramPub.main_email }}</p>
                <p>{{ $t('Address:') }} {{ paramPub.address }}</p>
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
          <v-card-text>
            {{ paramPub.description }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5" class="text-center">
        <iframe
          width="414"
          height="250"
          :src="paramPub.video_path"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="3" class="text-center">
        <iframe
          :src="paramPub.map_path"
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
    <v-divider />
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-card-text class="text-center">
            <v-rating
              v-model="paramPub.rate_avrg"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              small
              class="ml-n3"
              readonly
            ></v-rating>
            {{ paramPub.rate_avrg }} / 5
          </v-card-text>
          <v-divider />
          <v-card-actions>
            {{ paramPub.ratings_count }} {{ $t('Ratings') }}
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card tile outlined elevation="0">
          <v-toolbar color="elevation-0" class="text-h6" dense>
            <v-spacer />
            {{ $t('Review') }}
            <v-spacer />
            <v-btn text outlined class="text-capitalize" @click="dialog = true">
              Write an review
            </v-btn>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-card
              tile
              elevation="0"
              outlined
              v-for="rating in paramPub.ratings"
              :key="rating.id"
            >
              <v-toolbar dense color="elevation-0" class="text-body-1">
                <v-avatar size="30" class="mr-2 avatar-outlined">
                  <v-img :src="rating.user.profile_photo_path" />
                </v-avatar>
                {{ rating.user.name }}
                <v-spacer />
                <v-rating
                  v-model="rating.rate"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  small
                  readonly
                ></v-rating>
              </v-toolbar>
              <v-card-text>
                {{ rating.content }}
                <v-img
                  v-if="!!rating.image_path"
                  class="ml-5"
                  height="200"
                  width="300"
                  :src="rating.image_path"
                />
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog width="800" v-model="dialog">
      <v-card :loading="loadingRating">
        <v-card-title>
          {{ $t('Write review for') }} {{ paramPub.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              {{ $t('Evaluation:') }}
              <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                small
              ></v-rating>
              <v-textarea
                class="mt-2 mb-n5"
                :label="$t('Content')"
                auto-grow
                rows="3"
                row-height="15"
                v-model="content"
              ></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                :placeholder="$t('Choose your image')"
                prepend-icon="mdi-camera"
                :label="$t('Upload')"
                v-model="image"
                @change="onFileChange"
              ></v-file-input>
              <v-img height="200" :src="imageUrl" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="disable"
            class="primary text-capitalize"
            @click="onSave"
          >
            {{ $t('Write') }}
          </v-btn>
          <v-btn class="error text-capitalize" @click="onCancel">
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      loadingRating: false,
      error: null,
      dialog: false,
      content: '',
      image: null,
      imageUrl: null,
      rating: 0,
      review: {
        user_name: 'Hiep',
        user_url:
          'https://cdn.tgdd.vn/Files/2019/01/01/1142002/s8ori_800x600.jpg',
        content: 'Ngon',
        image_url: 'https://www.hoteljob.vn/files/Anh-HTJ-Hong/pub-la-gi-1.png',
        evaluation: 5
      }
    }
  },
  computed: {
    ...mapGetters('pub', ['paramPub']),
    ...mapGetters('user', ['currentUser']),
    current() {
      return this.currentUser
        ? this.currentUser.id === this.paramPub.user_id
        : false
    },
    disable() {
      return !this.content || !this.rating
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
    },
    onFileChange: function() {
      // Reference to the DOM input element
      // Ensure that you have a file before attempting to read it
      if (this.image) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageUrl = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(this.image)
      }
    },
    async onSave() {
      this.loadingRating = true
      this.error = null
      try {
        let url = `/user/pub/${this.paramPub.id}/rating/create`
        var formData = new FormData()
        formData.append('rate', this.rating)
        formData.append('content', this.content)
        if (this.image) formData.append('image', this.image)
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: 'Create rating successfully!'
        })
        this.fetchData()
      } catch (err) {
        this.error = err.toString()
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: this.error
        })
      }
      this.loadingRating = false
      this.dialog = false
    },
    onCancel() {
      this.content = ''
      this.rating = 0
      this.image = this.imageUrl = null
      this.dialog = false
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
