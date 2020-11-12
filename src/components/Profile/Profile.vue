<template>
  <v-container>
    <v-card :loading="loading" tile elevation="0" outlined>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $t('Your Profile') }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('Manage your profile information for account security') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-card-text v-if="!!currentUser">
        <v-row>
          <v-col cols="9">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-right">{{ $t('Email') }}</td>
                    <td>{{ currentUser.email }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="text-right">{{ $t('Name') }}</td>
                    <td v-if="!changeName">{{ currentUser.name }}</td>
                    <td v-else>
                      <v-text-field class="mt-2 mb-n5" label="Name" solo />
                    </td>

                    <td>
                      <v-btn
                        icon
                        small
                        @click="changeName = true"
                        v-if="!changeName"
                      >
                        <v-icon size="15" color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon small @click="changeName = false" v-else>
                        <v-icon size="15" color="primary">mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right">{{ $t('Phone number') }}</td>
                    <td v-if="!changePhone">{{ currentUser.phone_number }}</td>
                    <td v-else>
                      <v-text-field class="mt-2 mb-n5" label="Phone" solo />
                    </td>
                    <td>
                      <v-btn
                        icon
                        small
                        @click="changePhone = true"
                        v-if="!changePhone"
                      >
                        <v-icon size="15" color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon small @click="changePhone = false" v-else>
                        <v-icon size="15" color="primary">mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-btn
              class="text-capitalize primary ml-16 mt-3"
              text
              @click="onSave"
            >
              {{ $t('Save') }}
            </v-btn>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-avatar v-if="!url" size="100" class="avatar-outlined">
              <v-img :src="currentUser.profile_photo_path" />
            </v-avatar>
            <v-avatar v-else size="100" class="avatar-outlined">
              <v-img :src="url" />
            </v-avatar>
            <br />
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              :placeholder="$t('Pick an avatar')"
              prepend-icon="mdi-camera"
              :label="$t('Avatar')"
              @change="onFileChange"
              v-model="image"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card :loading="loadingPub" tile elevation="0" outlined>
      <v-card-title>
        {{ $t('My Pubs') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="pub in myPubs" :key="pub.name">
            <v-card
              tile
              width="200"
              :to="{ name: 'Pub', params: { id: pub.id } }"
            >
              <v-img height="200" :src="pub.home_photo_path" />
              <v-card-actions>
                {{ pub.name }}
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('pub', ['myPubs'])
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      image: null,
      url: null,
      loading: false,
      error: null,
      loadingPub: false,
      name: '',
      phone: '',
      changeName: false,
      changePhone: false
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('pub', ['getMyPub']),
    async fetchData() {
      this.loadingPub = true
      this.error = null
      try {
        await this.getMyPub()
      } catch (err) {
        this.error = err.toString()
      }
      this.loadingPub = false
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
          this.url = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(this.image)
      }
    },
    async onSave() {
      this.loading = true
      this.error = null
      try {
        let url = '/user/update'
        var formData = new FormData()
        if (this.image) {
          formData.append('image', this.image)
        }
        if (
          this.name &&
          this.name !== this.currentUser.name &&
          this.changeName
        ) {
          formData.append('name', this.name)
        }
        if (
          this.phone &&
          this.phone !== this.currentUser.phone_number &&
          this.changePhone
        ) {
          formData.append('phone_number', this.phone)
        }
        await axios.post(url, formData)
        await this.getUser()
      } catch (err) {
        this.error = err.toString()
      }
      this.name = this.phone = ''
      this.changeName = this.changePhone = false
      this.loading = false
    }
  }
}
</script>

<style>
.avatar-outlined {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}
</style>
