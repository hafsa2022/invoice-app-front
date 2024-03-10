<template>
  <div class="container mt-5 pt-5">
    <AddInvoice />
    <v-row justify="center">
      <v-col lg="6" md="6" sm="10">
        <v-card elevation="0">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by name"
              single-line
              hide-details
              variant="outlined"
              color="#f9af23"
            ></v-text-field>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-8 px-6">
      <v-col lg="3" md="3" sm="4"
        ><v-btn v-if="auth" block color="#f9af23" @click="addInvoice"
          >Add Invoice</v-btn
        ></v-col
      >
    </v-row>
    <v-container>
      <v-row justify="center" v-if="invoices.length > 0">
        <InvoiceCard
          v-for="invoice in filteredCards"
          :key="invoice.id"
          :invoice="invoice"
      /></v-row>
      <div v-else>
        <h2 class="text-center">Invoices not found</h2>
      </div>
    </v-container>
  </div>

  <!-- <v-btn type="button" @click="uploadInvoice">télécharger facutre</v-btn> -->
</template>

<script>
import { mapState } from "vuex";
import InvoiceCard from "../components/InvoiceCard.vue";
import AddInvoice from "../components/AddInvoice.vue";
export default {
  data() {
    return {
      selectedLanguage: "en",
      search: "",
      searchedCards: [],
    };
  },
  components: {
    InvoiceCard,
    AddInvoice,
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.$store.dispatch("getInvoices", user.id);
    this.$store.dispatch("getClients");
    this.$store.dispatch("getCars");
    this.$store.dispatch("getSettings", user.compagny_id);
  },
  computed: {
    ...mapState({
      invoices: (state) => state.invoices,
    }),
    auth() {
      return this.$store.getters.isAuthenticated;
    },

    filteredCards() {
      return this.invoices.filter((invoice) => {
        return invoice.date.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    // filteredCards() {
    //   this.searchedCards = this.invoices.filter((invoice) => {
    //     return invoice.date.toLowerCase().includes(this.search.toLowerCase());
    //   });
    //   return this.searchedCards;
    // },
    addInvoice() {
      this.$store.dispatch("setDisplayingDialog", true);
    },
  },
};
</script>
