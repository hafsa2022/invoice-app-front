<template>
  <div>
    <v-dialog
      v-model="displayingDialog"
      persistent
      hide-overlay
      class="v-overlay"
      max-width="600px"
    >
      <v-card class="rounded-lg">
        <v-card-text>
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="#ffde59" dark>
              <v-card-text>
                <!-- Adding Invoice ... -->
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-container>
            <v-row class="text-center"
              ><v-col cols="12"
                ><h3>{{ $t("addInvoice") }}</h3></v-col
              ></v-row
            >
            <v-row>
              <v-col cols="12" class="pa-0">
                <label for="name">Client</label>
                <v-select
                  :items="clients"
                  v-model="form.client_id"
                  item-value="id"
                  item-title="firstname"
                  variant="outlined"
                  required
                  :error-messages="client_idError"
                  @input="resetErrorValue"
                ></v-select>
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="name">{{ $t("car") }}</label>
                <v-select
                  :items="cars"
                  v-model="form.car_id"
                  item-value="id"
                  item-title="chassisNumber"
                  variant="outlined"
                  required
                  :error-messages="car_idError"
                  @input="resetErrorValue"
                ></v-select>
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="name">Date</label>
                <v-text-field
                  id="name"
                  v-model="form.date"
                  class="mt-1 rounded-lg"
                  type="date"
                  color="#f9af23"
                  variant="outlined"
                  required
                  :error-messages="dateError"
                  @input="resetErrorValue"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="name">{{ $t("dueDate") }}</label>
                <v-text-field
                  id="name"
                  v-model="form.dueDate"
                  class="mt-1 rounded-lg"
                  type="date"
                  color="#f9af23"
                  variant="outlined"
                  required
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="advance">{{ $t("advance") }}</label>
                <v-text-field
                  id="advance"
                  v-model="form.advance"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  :error-messages="advanceError"
                  @input="resetErrorValue"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="amount">{{ $t("amount") }}</label>
                <v-text-field
                  id="amount"
                  v-model="form.amount"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Amount"
                  required
                  :error-messages="amountError"
                  @input="resetErrorValue"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="name">{{ $t("payMeth") }}</label>
                <v-select
                  :items="paymentMethods"
                  v-model="form.paymentMethod"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  required
                  :error-messages="paymentMethodError"
                  @input="resetErrorValue"
                ></v-select>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-checkbox
                  v-model="form.paidStatus"
                  :label="label"
                  :error-messages="paidStatusError"
                  @input="resetErrorValue"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="">{{ $t("memo") }}</label>
                <v-text-field
                  v-model="form.memo"
                  variant="outlined"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="pa-0">
                <h3>{{ $t("invItems") }}</h3>
                <v-table v-if="invoiceItems.length > 0">
                  <thead>
                    <tr>
                      <th class="text-left">{{ $t("des") }}</th>

                      <th class="text-left">{{ $t("price") }}</th>
                      <th class="text-left">{{ $t("qt") }}</th>
                      <th class="text-left">Total</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in invoiceItems" :key="index">
                      <td>{{ item.description }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.quantity }}</td>

                      <td v-if="item.quantity">
                        {{ item.quantity * item.price }}
                      </td>
                      <td v-else></td>
                      <td>
                        <v-btn
                          icon
                          class="mt-2 mb-2"
                          size="small"
                          color="#f9af23"
                          @click="deleteItem(index)"
                          ><v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <v-col cols="3">
                  <v-dialog
                    persistent
                    hide-overlay
                    class="v-overlay"
                    max-width="600px"
                    v-model="displayingItemDialog"
                  >
                    <template v-slot:activator="{ props }">
                      <v-row justify="center">
                        <v-col cols="auto">
                          <v-btn
                            v-bind="props"
                            class="mt-2"
                            color="#f9af23"
                            @click="displayingItemDialog = true"
                            min-width="164"
                            >{{ $t("addItem") }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                    <v-card class="rounded-lg">
                      <v-card-text>
                        <v-container>
                          <v-row
                            ><v-col cols="12" sm="6">
                              <label for="">{{ $t("des") }}</label>
                              <v-text-field
                                v-model="invoiceItem.description"
                                variant="outlined"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                              <label for="">{{ $t("price") }}</label>
                              <v-text-field
                                v-model="invoiceItem.price"
                                variant="outlined"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                              <label for="">{{ $t("qt") }}</label>
                              <v-text-field
                                v-model="invoiceItem.quantity"
                                variant="outlined"
                                required
                              ></v-text-field>
                            </v-col> </v-row
                        ></v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="" @click="displayingItemDialog = false">
                          {{ $t("close") }}
                        </v-btn>
                        <v-btn
                          color="#f9af23 darken-1"
                          style="background: #f9af23"
                          @click="addInvoiceItem(invoiceItem)"
                        >
                          {{ $t("addItem") }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-col>
            </v-row></v-container
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f9af23 darken-1" text @click="hideDialog">
            {{ $t("close") }}
          </v-btn>
          <v-btn
            color="#f9af23 darken-1"
            text
            @click="addInvoice"
            style="background: #f9af23"
          >
            {{ $t("add") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            class=""
            v-bind="attrs"
            @click="closeSnackbar"
          >
            {{ $t("close") }}
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import Invoice from "../Api/Invoice";
import { mapState } from "vuex";
export default {
  name: "addInvoice",
  data() {
    return {
      label: "",
      loading: false,
      form: {
        client_id: null,
        car_id: null,
        date: null,
        dueDate: null,
        advance: null,
        amount: 0,
        paymentMethod: null,
        paidStatus: false,
        memo: null,
      },
      client_idError: null,
      car_idError: null,
      dateError: null,
      advanceError: null,
      amountError: 0,
      paymentMethodError: null,
      paidStatusError: false,
      paymentMethods: ["Cash", "Credit Card", "Bank Transfer"],
      invoiceItems: [],
      displayingUpdateDialog: false,
      displayingItemDialog: false,
      invoiceItem: {
        description: null,
        price: null,
        quantity: null,
      },
    };
  },
  mounted() {
    this.label =
      localStorage.getItem("lang") == "en" ? "Paid Status" : "Statut de payant";
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      user: (state) => state.user,
      displayingDialog: (state) => state.displayingDialog,
      clients: (state) => state.clients,
      cars: (state) => state.cars,
    }),
  },
  methods: {
    deleteItem(i) {
      this.invoiceItems.splice(i, 1);
      this.amountChanged();
    },
    addInvoiceItem(item) {
      if (
        item.description != null &&
        item.price != null &&
        item.quantity != null
      ) {
        const itemCart = {
          description: item.description,
          price: item.price,
          quantity: item.quantity,
        };
        this.invoiceItems.push(itemCart);
        this.amountChanged();
        this.invoiceItem.description = null;
        this.invoiceItem.price = null;
        this.invoiceItem.quantity = null;
      }
    },
    amountChanged() {
      let t = 0;
      this.invoiceItems.map((i) => {
        t = t + i.quantity * i.price;
      });
      this.form.amount = t;
    },
    async addInvoice() {
      if (this.invoiceItems.length >= 1) {
        this.loading = true;
        let user = JSON.parse(localStorage.getItem("user"));
        let data = {
          invoice_items: this.invoiceItems,
          client_id: this.form.client_id,
          car_id: this.form.car_id,
          date: this.form.date,
          dueDate: this.form.dueDate,
          advance: this.form.advance,
          amount: this.form.amount,
          paymentMethod: this.form.paymentMethod,
          paidStatus: this.form.paidStatus,
          memo: this.form.memo,
          compagny_id: user.compagny_id,
        };

        Invoice.addInvoice(data)
          .then((response) => {
            if (response != null) {
              this.loading = false;
              this.$store.dispatch("getInvoices");
              this.$store.dispatch("setDisplayingDialog", false);
              this.$store.dispatch("setSnackBar", {
                color: "#ffde59",
                text:
                  localStorage.getItem("lang") == "en"
                    ? "Invoice was added successfully!"
                    : "La facture à été ajoutée avec succès",
                show: true,
              });
            }
          })
          .catch((err) => {
            this.loading = false;
            let errors = err.response.data.errors;
            if (errors) {
              if (errors.date) {
                this.dateError = errors.date;
              }
              if (errors.advance) {
                this.advanceError = errors.advance;
              }
              if (errors.amount) {
                this.amountError = errors.amount;
              }
              if (errors.paymentMethod) {
                this.paymentMethodError = errors.paymentMethod;
              }
              if (errors.paidStatus) {
                this.paidStatusError = errors.paidStatus;
              }
              if (errors.client_id) {
                this.client_idError = errors.client_id;
              }
              if (errors.car_id) {
                this.car_idError = errors.car_id;
              }
            }
          });
      }
    },
    resetErrorValue() {
      if (this.dateError != "") {
        this.dateError = "";
      }
      if (this.advanceError != "") {
        this.advanceError = "";
      }
      if (this.amountError != "") {
        this.amountError = "";
      }
      if (this.paymentMethodError != "") {
        this.paymentMethodError = "";
      }
      if (this.paidStatusError != "") {
        this.paidStatusError = "";
      }
      if (this.client_idError != "") {
        this.client_idError = "";
      }
      if (this.car_idError != "") {
        this.car_idError = "";
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    hideDialog() {
      this.$store.dispatch("setDisplayingDialog", false);
    },
  },
};
</script>
