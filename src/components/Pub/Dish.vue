<template>
  <v-card tile outlined v-if="!!paramPub">
    <v-card-title class="text-h6">
      {{ $t('Dishes in this Pub') }}
      <v-spacer />
      <v-btn
        icon
        small
        v-if="!!currentUser && currentUser.id === paramPub.user_id"
        @click="onChangeDishes"
      >
        <v-icon color="primary" size="15">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-container class="mt-n3">
      <v-row v-if="paramDishes.length">
        <v-col
          cols="3"
          v-for="dish in paramDishes"
          :key="`dish-${dish.dish.id}`"
        >
          <v-hover v-slot="{ hover }">
            <v-avatar
              class="avatar-outlined"
              tile
              color="grey"
              height="180"
              width="266"
            >
              <v-img
                :src="dish.dish.photo_path"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal black--text text-h6"
                    style="height: 180px; width: 266px;"
                  >
                    <span>{{ dish.dish.description }}</span>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-avatar>
          </v-hover>
          <div class="text-center">
            {{ dish.dish.name }}
          </div>
        </v-col>
      </v-row>
      <div
        class="text-center text-body-1 mt-3"
        v-else-if="!!currentUser && currentUser.id === paramPub.user_id"
      >
        {{ $t('Your pub does not have any Dish!') }} <br />
        <v-btn
          ourlined
          class="text-capitalize primary mt-2"
          @click="onChangeDishes"
        >
          {{ $t('Add dish to your pub now!') }}
        </v-btn>
      </div>
      <div v-else class="text-body-1 mt-3">
        {{ $t('This pub does not have any Dish!') }}
      </div>
    </v-container>

    <v-dialog v-model="dialog" scrollable width="1000">
      <v-card :loading="loading || loadingSave">
        <v-card-title>
          {{ $t('Change your pub dishes') }}
          <v-spacer />
          <v-btn icon @click="onCancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="text-body-1">
          <v-card tile outlined>
            <v-card-title>
              Your dishes
            </v-card-title>
            <v-container>
              <v-row v-if="tmpDishes.length">
                <v-col
                  cols="3"
                  v-for="dish in tmpDishes"
                  :key="`dish-${dish.dish.id}`"
                >
                  <v-hover v-slot="{ hover }">
                    <v-avatar
                      class="avatar-outlined"
                      tile
                      color="grey"
                      height="150"
                      width="220"
                    >
                      <v-img
                        :src="dish.dish.photo_path"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                        <v-expand-transition>
                          <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal black--text text-h6"
                            style="height: 150px; width: 220px;"
                          >
                            <span>{{ dish.dish.description }}</span>
                          </div>
                        </v-expand-transition>
                      </v-img>
                    </v-avatar>
                  </v-hover>
                  <div class="text-center">
                    {{ dish.dish.name }}
                    <br />
                    <v-btn
                      class="text-capitalize error"
                      @click="onPreviewDelete(dish.dish.id)"
                    >
                      {{ $t('Delete') }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card tile outlined class="mt-3">
            <v-card-title>
              All dishes
            </v-card-title>
            <v-card-text class="text-body-1">
              <v-row v-if="loading">
                <v-col v-for="n in 4" :key="n">
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="200"
                    max-height="150"
                    type="card"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
              <v-row v-else-if="dishes.length">
                <v-col
                  cols="3"
                  v-for="dish in dishes"
                  :key="`dish-have-${dish.id}`"
                >
                  <v-hover v-slot="{ hover }">
                    <v-avatar
                      class="avatar-outlined"
                      tile
                      color="grey"
                      height="150"
                      width="220"
                    >
                      <v-img
                        :src="dish.photo_path"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                        <v-expand-transition>
                          <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal black--text text-h6"
                            style="height: 150px; width: 220px;"
                          >
                            <span>{{ dish.description }}</span>
                          </div>
                        </v-expand-transition>
                      </v-img>
                    </v-avatar>
                  </v-hover>
                  <div class="text-center">
                    {{ dish.name }}
                    <br />
                    <v-btn
                      class="text-capitalize primary"
                      @click="onPreviewAdd(dish)"
                    >
                      {{ $t('Add') }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="primary text-capitalize" @click="onSave">
            {{ $t('Save') }}
          </v-btn>
          <v-btn class="error text-capitalize" @click="onCancel">
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="popup" width="500">
      <v-card>
        <v-card-title>
          {{ $t('Are you sure?') }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          {{ $t('Your changed will be removed. Continue to close?') }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn class="primary text-capitalize" @click="onCloseWithoutSave">
            {{ $t('Close without save') }}
          </v-btn>
          <v-btn class="error text-capitalize" @click="popup = false">
            {{ $t('Cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Dish from '@/components/Main/Dish'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Dish
  },
  computed: {
    ...mapGetters('pub', ['paramPub', 'dishes', 'paramDishes']),
    ...mapGetters('user', ['currentUser'])
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error: null,
      popup: false,
      tmpDishes: [],
      loadingSave: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions('pub', ['getDishes', 'getParamDishes', 'changeDish']),
    async fetchData() {
      this.loading = true
      try {
        await this.getParamDishes(this.$route.params.id)
      } catch (err) {
        this.error = err.toString()
      }
    },
    async onChangeDishes() {
      this.dialog = this.loading = true
      try {
        await this.getDishes({ category: 0 })
        this.tmpDishes = this.paramDishes
      } catch (err) {
        this.error = err.toString()
      }
      this.loading = false
    },
    onCancel() {
      this.isEqual(this.tmpDishes, this.paramDishes)
        ? (this.dialog = false)
        : (this.popup = true)
    },
    onPreviewAdd(dish) {
      let valid = true
      this.tmpDishes.forEach(function(i) {
        if (i.dish.id === dish.id) valid = false
      })
      if (valid) {
        this.tmpDishes = [{ dish: dish }, ...this.tmpDishes]
      } else {
        this.$swal({
          icon: 'warning',
          title: this.$t('Warning'),
          text: this.$t('Your pub had had this dish!')
        })
      }
    },
    onPreviewDelete(dishId) {
      this.tmpDishes = this.tmpDishes.filter(dish => dish.dish.id !== dishId)
    },
    isEqual(array1, array2) {
      if (array1.length !== array2.length) return false
      return array1.every(function(value, index) {
        return value === array2[index]
      })
    },
    onCloseWithoutSave() {
      this.tmpDishes = []
      this.popup = this.dialog = false
    },
    async onSave() {
      if (!this.isEqual(this.tmpDishes, this.paramDishes)) {
        this.loadingSave = true
        let dishArr = []
        this.tmpDishes.forEach(dish => dishArr.push(dish.dish.id))
        try {
          await this.changeDish({
            pub_id: this.$route.params.id,
            formData: {
              dishes: dishArr
            }
          })
          this.$swal({
            icon: 'success',
            title: this.$t('Success'),
            text: this.$t('Save dishes success!')
          })
        } catch (err) {
          this.$swal({
            icon: 'error',
            title: this.$t('Error!'),
            text: err.toString()
          })
        }
      }
      this.dialog = this.loadingSave = false
      this.tmpDishes = []
    }
  }
}
</script>

<style></style>
