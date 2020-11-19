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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="name"
                :counter="60"
                :label="`${$t('Name')} *`"
                :rules="[
                  v => !!v || $t('Required'),
                  v => (!!v && v.length <= 60) || 'Name too long!'
                ]"
              ></v-text-field>

              <v-textarea
                v-model="description"
                :counter="255"
                auto-grow
                rows="3"
                row-height="25"
                :label="`${$t('Description')} *`"
                :rules="[
                  v => !!v || $t('Required'),
                  v => (!!v && v.length <= 255) || 'Too long!'
                ]"
              ></v-textarea>

              <v-select
                :items="items"
                :label="$t('Category')"
                v-model="category"
                :rules="[v => !!v || $t('Required')]"
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
                :rules="[v => !!v || $t('Required')]"
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
          :disabled="!valid"
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
      valid: true,
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
      category: null
    }
  },
  methods: {
    ...mapActions('pub', ['createDish']),
    onCancel() {
      this.dialog = false
      this.$refs.form.reset()
    },
    async onSaveDish() {
      await this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true
      this.error = null
      try {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('image', this.image)
        formData.append('category', this.category)
        await this.createDish(formData)
        this.$swal({
          icon: 'success',
          title: this.$t('Success'),
          text: this.$t('Update successfully!')
        })
      } catch (err) {
        this.error = err.toString()
        this.$swal({
          icon: 'error',
          title: this.$t('Error'),
          text: this.error
        })
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
