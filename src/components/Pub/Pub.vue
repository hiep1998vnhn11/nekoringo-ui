<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="4" v-for="n in 3" :key="n">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader
          height="100"
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="10">
        <v-skeleton-loader
          height="500"
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row no-gutters v-else-if="!!paramPub">
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
              <v-col cols="10">
                <p>{{ $t('Name') }} : {{ paramPub.name }}</p>
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
                  @click="onChangeInfo"
                >
                  <v-icon size="15" color="primary">mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                  v-if="current"
                  small
                  icon
                  style="position: absolute; right: 40px"
                  @click="confirmDeletePubDialog = true"
                >
                  <v-icon size="15" color="error">mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-5" v-if="!!paramPub">
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
                text = paramPub.description
              "
            >
              <v-icon color="primary" size="15">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            {{ paramPub.description }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-card tile elevation="0" outlined v-if="current">
          <v-toolbar color="elevation-0" dense>
            <v-spacer />
            <v-btn
              icon
              small
              @click="
                changeStatus = 'Video'
                text = paramPub.video_path
                change = true
              "
            >
              <v-icon size="15" color="primary">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider />
          <iframe
            width="350"
            height="250"
            :src="paramPub.video_path"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-card>
        <iframe
          v-else
          width="414"
          height="250"
          :src="paramPub.video_path"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-card tile outlined elevation="0" v-if="current">
          <v-toolbar color="elevation-0" dense>
            <v-spacer />
            <v-btn
              small
              icon
              @click="
                changeStatus = 'Map'
                text = paramPub.map_path
                change = true
              "
            >
              <v-icon size="15" color="primary">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider />
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
        </v-card>
        <iframe
          v-else
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
    <v-divider class="mt-2" />
    <dish class="mt-2" />
    <v-divider />
    <v-row v-if="!!paramPub">
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
            <v-btn class="text-capitalize" @click="tab = 'rating'" text>
              Rating
            </v-btn>
            <v-btn class="text-capitalize" @click="tab = 'comment'" text>
              Comment
            </v-btn>
            <v-spacer />
            {{ $t('Review') }}
            <v-spacer />
            <v-btn
              v-if="!!currentUser && tab === 'rating'"
              text
              outlined
              class="text-capitalize"
              @click="dialog = true"
            >
              {{ $t('Write an review') }}
            </v-btn>
            <v-btn
              v-else-if="!!currentUser && tab === 'comment'"
              text
              outlined
              class="text-capitalize"
              @click="dialogComment = true"
            >
              {{ $t('Write an Comment') }}
            </v-btn>
            <span v-else class="text-caption">
              {{ $t('Please login to write Review!') }}
            </span>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item value="rating">
                <v-card v-if="!paramPub.ratings.length">
                  <v-container class="text-center">
                    {{ $t('This pub does not have any Rating.') }}
                    <br />
                    <router-link
                      v-if="!isLoggedIn"
                      style="text-decoration: none;"
                      :to="{ name: 'Login' }"
                    >
                      {{ $t('Please login to rating ...') }}
                    </router-link>
                    <v-btn
                      v-else-if="!!currentUser"
                      text
                      outlined
                      class="text-capitalize"
                      @click="dialog = true"
                    >
                      {{ $t('Write an review') }}
                    </v-btn>
                  </v-container>
                </v-card>
                <v-card
                  v-else
                  tile
                  elevation="0"
                  outlined
                  v-for="rating in paramPub.ratings"
                  :key="rating.id"
                  class="mt-3"
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
                    <v-btn
                      icon
                      small
                      v-if="!!currentUser && currentUser.id === rating.user.id"
                      @click="deleteRating(rating.id)"
                    >
                      <v-icon size="15" color="error">mdi-trash-can</v-icon>
                    </v-btn>
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
              </v-tab-item>
              <v-tab-item value="comment">
                <v-card v-if="!paramPub.comments.length">
                  <v-container class="text-center">
                    {{ $t('This pub does not have any Comment.') }}
                    <br />
                    <router-link
                      v-if="!isLoggedIn"
                      style="text-decoration: none;"
                      :to="{ name: 'Login' }"
                    >
                      {{ $t('Please login to comment ...') }}
                    </router-link>
                    <v-btn
                      v-else-if="!!currentUser"
                      text
                      outlined
                      class="text-capitalize"
                      @click="dialogComment = true"
                    >
                      {{ $t('Write an Comment') }}
                    </v-btn>
                  </v-container>
                </v-card>
                <v-card
                  v-else
                  tile
                  outlined
                  elevation="0"
                  v-for="comment in paramPub.comments"
                  :key="`comment-${comment.id}`"
                  class="mt-3"
                >
                  <v-toolbar dense color="elevation-0" class="text-body-1">
                    <v-avatar size="30" class="mr-2 avatar-outlined">
                      <v-img :src="comment.user.profile_photo_path" />
                    </v-avatar>
                    {{ comment.user.name }}
                    <v-spacer />
                    <v-btn
                      icon
                      small
                      v-if="!!currentUser && currentUser.id === comment.user.id"
                      @click="deleteComment(comment.id)"
                    >
                      <v-icon size="15" color="error">mdi-trash-can</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    {{ comment.content }}
                    <v-img
                      v-if="!!comment.image_path"
                      class="ml-5"
                      height="200"
                      width="300"
                      :src="comment.image_path"
                    />
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      {{ error }}
    </v-row>

    <v-dialog width="800" v-model="dialog">
      <v-card :loading="loadingRating" v-if="!!paramPub">
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

    <v-dialog width="800" v-model="dialogComment">
      <v-card :loading="loadingComment" v-if="!!paramPub">
        <v-card-title>
          {{ $t('Write comment for') }} {{ paramPub.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
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
            :disabled="!content && !image"
            class="primary text-capitalize"
            @click="onSaveComment"
          >
            {{ $t('Write') }}
          </v-btn>
          <v-btn class="error text-capitalize" @click="onCancel">
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="600" v-model="change">
      <v-card :loading="loadingChange">
        <v-card-title>
          {{ $t(`Change ${changeStatus}`) }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-textarea
            class="mt-3"
            :label="$t(changeStatus)"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            v-model="text"
          ></v-textarea>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            outlined
            class="text-capitalize primary"
            @click="onSaveChange"
            :disabled="saveDisable"
          >
            {{ $t('Save') }}
          </v-btn>
          <v-btn outlined class="error text-capitalize" @click="change = ''">
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="800" v-model="changeInfo">
      <v-card :loading="loadingChange">
        <v-card-title>
          {{ $t(`Change pub information`) }}
        </v-card-title>
        <v-divider />
        <v-row class="mx-auto">
          <v-col cols="7">
            <v-text-field
              v-model="name"
              :counter="60"
              :label="`${$t('Name')} *`"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              :counter="120"
              :label="`${$t('Address')} *`"
              required
            ></v-text-field>
            <v-text-field
              v-model="phone_number"
              :counter="12"
              :label="`${$t('Phone number')} *`"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :counter="55"
              :label="`${$t('Main email')} *`"
              required
            ></v-text-field>
            <v-text-field
              v-model="business_time"
              :counter="55"
              :label="`${$t('Business time')} *`"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              :placeholder="$t('Pick an photo')"
              prepend-icon="mdi-camera"
              :label="`${$t('Home photo')} *`"
              @change="onFileChange"
              v-model="image"
            ></v-file-input>
            <v-img height="200" width="200" :src="imageUrl" />
          </v-col>
        </v-row>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn outlined class="text-capitalize primary" @click="onSaveChange">
            {{ $t('Save') }}
          </v-btn>
          <v-btn
            outlined
            class="error text-capitalize"
            @click="changeInfo = false"
          >
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeletePubDialog" max-width="500">
      <v-card :loading="loadingDeletePub">
        <v-card-title>
          {{ $t('Are you sure?') }}
          <v-spacer />
          <v-btn
            icon
            primary="grey lighten-3"
            @click="confirmDeletePubDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-body-1">
          {{
            $t(
              'Are you sure about DELETE this pub? This pub will never be able to Recreate again!'
            )
          }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="error text-capitalize" @click="onDeletePub">
            {{ $t('Save') }}
          </v-btn>
          <v-btn
            class="primary text-capitalize"
            @click="confirmDeletePubDialog = false"
          >
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
import Dish from './Dish'
export default {
  components: {
    Dish
  },
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
      change: false,
      changeStatus: null,
      text: '',
      loadingChange: false,
      tab: 'rating',
      name: '',
      email: '',
      address: '',
      business_time: '',
      phone_number: '',
      changeInfo: false,
      dialogComment: false,
      loadingComment: false,
      show: false,
      loadingDeletePub: false,
      confirmDeletePubDialog: false
    }
  },
  computed: {
    ...mapGetters('pub', ['paramPub', 'paramDishes']),
    ...mapGetters('user', ['currentUser', 'isLoggedIn']),
    current() {
      return this.currentUser && this.paramPub
        ? this.currentUser.id === this.paramPub.user_id
        : false
    },
    disable() {
      return !this.content || !this.rating
    },
    saveDisable() {
      return this.paramPub
        ? this.text === this.paramPub.description ||
            this.text === '' ||
            this.text === this.paramPub.map_path ||
            this.text === this.paramPub.video_path
        : true
    }
  },
  methods: {
    ...mapActions('pub', ['getParamPub', 'deletePub']),
    async onSaveChange() {
      this.loadingChange = true
      try {
        let url = `/user/pub/${this.paramPub.id}/update`
        let formData = new FormData()
        if (this.changeStatus === 'Introduce' && this.text) {
          formData.append('description', this.text)
        } else if (this.changeStatus === 'Video' && this.text) {
          formData.append('video_path', this.text)
        } else if (this.changeStatus === 'Map' && this.text) {
          formData.append('map_path', this.text)
        } else if (this.changeInfo) {
          if (this.name !== this.paramPub.name && this.name) {
            formData.append('name', this.name)
          }
          if (this.email !== this.paramPub.main_email && this.email) {
            formData.append('main_email', this.email)
          }
          if (this.address !== this.paramPub.address && this.address) {
            formData.append('address', this.address)
          }
          if (
            this.phone_number !== this.paramPub.phone_number &&
            this.phone_number
          ) {
            formData.append('phone_number', this.phone_number)
          }
          if (this.image) {
            formData.append('image', this.image)
          }
        }
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$swal({
          icon: 'success',
          title: this.$t('Success'),
          text: this.$t('Update Pub successfully!')
        })
        await this.fetchData()
      } catch (err) {
        this.error = err.toString()
      }
      this.loadingChange = false
      this.onCancel()
    },
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
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
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
      this.onCancel()
    },
    async onSaveComment() {
      this.loadingComment = true
      try {
        let url = `/user/pub/${this.paramPub.id}/comment/create`
        var formData = new FormData()
        formData.append('content', this.content)
        if (this.image) formData.append('image', this.image)
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: 'Create comment successfully!'
        })
        this.fetchData()
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.toString()
        })
      }
      this.loadingComment = false
      this.onCancel()
    },
    onCancel() {
      this.content = this.email = this.phone_number = this.name = this.address = this.business_time =
        ''
      this.rating = 0
      this.image = this.imageUrl = this.changeStatus = null
      this.changeInfo = this.change = this.dialog = this.dialogComment = false
    },
    onChangeInfo() {
      this.email = this.paramPub.main_email
      this.phone_number = this.paramPub.phone_number
      this.name = this.paramPub.name
      this.address = this.paramPub.address
      this.imageUrl = this.paramPub.home_photo_path
      this.business_time = this.paramPub.business_time
      this.changeInfo = true
    },
    async deleteComment(commentId) {
      try {
        await axios.post(`/user/comment/${commentId}/delete`)
        this.$swal({
          icon: 'success',
          title: this.$t('Success'),
          text: this.$t('Delete comment successfully!')
        })
        await this.fetchData()
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: this.$t('Error'),
          text: err.toString()
        })
      }
    },
    async deleteRating(ratingId) {
      try {
        await axios.post(`/user/rating/${ratingId}/delete`)
        this.$swal({
          icon: 'success',
          title: this.$t('Success'),
          text: this.$t('Delete rating successfully!')
        })
        await this.fetchData()
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: this.$t('Error'),
          text: err.toString()
        })
      }
    },
    async onDeletePub() {
      this.loadingDeletePub = true
      try {
        await this.deletePub(this.paramPub.id)
        this.$swal({
          icon: 'error',
          title: this.$t('Error'),
          text: this.$t('Delete Pub successfully!')
        })
        this.loadingDeletePub = false
        this.$router.push({ name: 'Profile' })
      } catch (err) {
        this.loadingDeletePub = false
        this.$swal({
          icon: 'error',
          title: this.$t('Error'),
          text: err.toString()
        })
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
    change() {
      if (!this.change) this.text = ''
    },
    changeInfo() {
      if (!this.changeInfo) {
        this.email = this.phone_number = this.name = this.address = this.business_time =
          ''
        this.image = this.imageUrl = null
      }
    }
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
