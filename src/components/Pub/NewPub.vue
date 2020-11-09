<template>
  <v-container>
    {{ error }}
    <v-card elevation="0" outlined tile>
      <v-card-title>
        <v-spacer />
        {{ $t('Form create pub') }}
        <v-spacer />
      </v-card-title>
      <v-card-text>
        (Hint: (*) is required!)
        <v-form ref="form" lazy-validation>
          <v-row>
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
                v-model="phone"
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
            </v-col>
            <v-col cols="2">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                :placeholder="$t('Pick an photo')"
                prepend-icon="mdi-camera"
                :label="`${$t('Home photo')} *`"
                @change="onFileChange"
                v-model="image"
              ></v-file-input>
            </v-col>
            <v-col cols="3">
              <v-img height="200" width="200" :src="src" />
            </v-col>
          </v-row>
          <v-text-field
            v-model="mapPath"
            :label="$t('Google map path')"
          ></v-text-field>
          <v-text-field
            v-model="videoPath"
            :label="$t('Youtube video path')"
          ></v-text-field>
          <v-textarea
            auto-grow
            :label="$t('Description')"
            rows="3"
            row-height="20"
            v-model="description"
          ></v-textarea>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            :label="$t('Accept our Terms')"
            required
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          :disabled="disable"
          color="primary"
          class="text-capitalize"
          @click="onSubmit"
        >
          {{ $t('Submit') }}
        </v-btn>
        <v-btn
          :disabled="disable"
          color="success"
          class="text-capitalize"
          @click="preview = true"
        >
          {{ $t('Preview') }}
        </v-btn>
        <v-btn color="error" class="text-capitalize" @click="onCancel">
          {{ $t('Cancel') }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-dialog v-model="preview">
      <v-card>
        Preview
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    name: '',
    address: '',
    phone: '',
    image: null,
    imageUrl: null,
    videoPath: '',
    mapPath: '',
    description: '',
    checkbox: false,
    preview: false,
    loading: false,
    error: null,
    email: ''
  }),
  computed: {
    src() {
      return this.imageUrl
        ? this.imageUrl
        : 'https://pdsohio.com/wp-content/uploads/2017/04/default-image.jpg'
    },
    disable() {
      if (
        !this.name ||
        this.name.length > 60 ||
        !this.address ||
        this.address.length > 120 ||
        !this.phone ||
        this.phone.length > 12 ||
        !this.email ||
        this.email.length > 55 ||
        !this.image ||
        !this.checkbox
      ) {
        return true
      } else return false
    }
  },

  methods: {
    ...mapActions('pub', ['createPub']),
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
    onCancel() {
      this.name = this.address = this.phone = ''
      this.image = this.imageUrl = null
      this.checkbox = false
      this.$router.push({ name: 'Home' })
    },
    async onSubmit() {
      this.loading = true
      this.error = null
      try {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('phone_number', this.phone)
        formData.append('image', this.image)
        formData.append('address', this.address)
        formData.append('description', this.description)
        formData.append('main_email', this.email)
        formData.append('video_path', this.videoPath)
        formData.append('map_path', this.mapPath)
        await this.createPub(formData)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: `Create ${this.name} successfully!`
        })
        this.name = this.phone = this.address = this.description = ''
        this.email = this.videoPath = this.mapPath = ''
        this.image = this.imageUrl = null
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.toString()
        })
        this.error = err.toString()
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
