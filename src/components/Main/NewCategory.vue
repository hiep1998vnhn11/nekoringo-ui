<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mt-2 text-capitalize"
        color="cyan"
        block
        v-on="on"
        v-bind="attrs"
      >
        <v-icon left>
          mdi-new-box
        </v-icon>
        New category (Private Feature)
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title>
        <v-spacer />
        Add a new category
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
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
            auto-grow
            rows="3"
            row-height="25"
            label="Image url (image will display in home) *"
            :rules="[v => !!v || $t('Required')]"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="text-capitalize primary"
          :disabled="!valid"
          :loading="loading"
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
import axios from 'axios'

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      loading: false,
      error: null,
      name: '',
      description: ''
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
        const params = {
          name: this.name,
          image_url: this.description
        }
        const url = '/user/category/create'
        await axios.post(url, params)
        this.$emit('refetch-category')
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: 'Add category successfully!'
        })
      } catch (err) {
        this.error = err.toString()
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: this.error
        })
      }
      this.loading = false
      this.dialog = false
    }
  }
}
</script>

<style></style>
