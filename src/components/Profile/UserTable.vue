<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          rounded
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-card-title>
    <v-data-table
      sort-by="id"
      :loading="loadingData"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="orders"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> {{ name }} orders management </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card :loading="loading">
              <v-card-title class="headline">
                Are you sure you want to delete?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogBlock" max-width="500px">
            <v-card :loading="loading">
              <v-card-title class="headline">
                Are you sure you want to Accept this order?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAccept">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="acceptItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogUnblock" max-width="600px">
            <v-card :loading="loading">
              <v-card-title class="headline">
                Are you sure you want to cancel this order?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeCancel">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="cancelItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="red"
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete order</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogBlock: false,
      dialogUnblock: false,
      loading: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          value: 'id'
        },
        { text: 'Pub', value: 'pub.name' },
        { text: 'amount', value: 'amount' },
        { text: 'time', value: 'time' },
        { text: 'Status', value: 'status' },
        { text: 'Created at', value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  props: ['orders', 'name', 'loadingData'],
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogBlock(val) {
      val || this.closeAccept()
    },
    dialogUnblock(val) {
      val || this.closeCancel()
    }
  },
  methods: {
    showItem(item) {
      this.$router.push({ name: 'ParamUser', params: { user_id: item.id } })
    },
    editItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    cancelItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogUnblock = true
    },

    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    acceptItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogBlock = true
    },

    async deleteItemConfirm() {
      this.loading = true
      try {
        const response = await axios.post(
          `/publican/order/${this.orders[this.editedIndex].id}/delete`
        )
        Object.assign(this.orders[this.editedIndex], response.data.data)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: response.data.message
        })
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.toString()
        })
      }
      this.loading = false
      this.orders.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    async acceptItemConfirm() {
      this.loading = true
      try {
        const response = await axios.post(
          `/publican/order/${this.orders[this.editedIndex].id}/accept`
        )
        Object.assign(this.orders[this.editedIndex], response.data.data)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: response.data.message
        })
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.toString()
        })
      }
      this.loading = false
      this.closeAccept()
    },

    async cancelItemConfirm() {
      this.loading = true
      try {
        const response = await axios.post(
          `/publican/order/${this.orders[this.editedIndex].id}/cancel`
        )
        Object.assign(this.orders[this.editedIndex], response.data.data)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: response.data.message
        })
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: err.toString()
        })
      }
      this.loading = false
      this.closeCancel()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeAccept() {
      this.dialogBlock = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeCancel() {
      this.dialogUnblock = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
</style>
