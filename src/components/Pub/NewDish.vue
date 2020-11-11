<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-chip class="ma-2" color="cyan" label v-bind="attrs" v-on="on">
        <v-icon left>
          mdi-new-box
        </v-icon>
        {{ $t('New') }}
      </v-chip>
    </template>

    <v-card :loading="loading">
      <v-card-title>
        <v-spacer />
        {{ $t('Create a new Dish') }}
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="name"
                :counter="60"
                :label="`${$t('Name')} *`"
                required
              ></v-text-field>

              <v-textarea
                v-model="description"
                :counter="255"
                auto-grow
                rows="3"
                row-height="25"
                :label="`${$t('Description')} *`"
                required
              ></v-textarea>

              <v-select
                :items="items"
                :label="$t('Category')"
                v-model="category"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                :placeholder="`${$t('Pick an photo')} *`"
                prepend-icon="mdi-camera"
                :label="`${$t('Home photo')} *`"
                @change="onFileChange"
                v-model="image"
              ></v-file-input>
              <v-img height="200" :src="imageUrl" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="text-capitalize primary"
          :disabled="!name || !description || !image"
          @click="onSaveDish"
        >
          {{ $t('Save') }}
        </v-btn>
        <v-btn class="text-capitalize error" @click="onCancel">
          {{ $t('Cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      error: null,
      name: '',
      description: '',
      image: null,
      imageUrl: null,
      items: [
        {
          text: 'Buffet',
          value: 2
        },
        {
          text: 'Sushi',
          value: 1
        },
        {
          text: 'Barbecue',
          value: 3
        }
      ],
      category: 1
    }
  },
  methods: {
    ...mapActions('pub', ['createDish']),
    onCancel() {
      this.category = 1
      this.name = this.description = ''
      this.image = this.imageUrl = null
      this.dialog = false
    },
    async onSaveDish() {
      this.loading = true
      this.error = null
      try {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('image', this.image)
        formData.append('category', this.category)
        await this.createDish(formData)
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
      this.dialog = false
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
    }
  }
}
</script>

<style></style>
