<template>
  <v-container>
    <v-row class="" style="">
      <v-col cols="12">
        <v-img
          :src="require('../assets/car_img.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-card
            class="elevation-0 rounded-lg"
            flat
            width="600"
            height="auto"
            style=""
          >
            <v-col
              class="text-center bg-red mb-2"
              cols="12"
              v-if="error != ''"
              >{{ error }}</v-col
            >
            <v-dialog v-model="loading" hide-overlay persistent width="300">
              <v-card color="#ffde59" dark>
                <v-card-text>
                  <!-- Login ... -->
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-container>
              <v-row>
                <v-col cols="12" class="pa-0">
                  <label for="email">{{ $t("email") }}</label>
                  <v-text-field
                    id="email"
                    v-model="form.email"
                    class="mt-1 rounded-lg"
                    type="email"
                    color="#f9af23"
                    variant="outlined"
                    autofocus
                    @input="resetErrorValue"
                    :rules="required"
                  />
                </v-col>
                <v-col cols="12" class="pa-0">
                  <label for="password">{{ $t("password") }}</label>
                  <v-text-field
                    id="password"
                    v-model="form.password"
                    class="mt-1 rounded-lg"
                    color="#f9af23"
                    variant="outlined"
                    type="password"
                    @input="resetErrorValue"
                    :rules="required"
                  />
                </v-col>

                <v-col cols="12" class="pa-0">
                  <v-btn
                    type="submit"
                    block
                    class="mt-2 mb-3"
                    size="large"
                    color="#f9af23"
                    @click="login"
                    >{{ $t("login") }}</v-btn
                  >
                </v-col>
                <!-- <v-col cols="12" class="pa-0">
                  <span class="text-h6">Don't have an account ?</span>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-btn
                    type="submit"
                    block
                    class="mt-2"
                    text="Register Now"
                    to="/signup"
                    size="large"
                    color="#f9af23"
                  ></v-btn>
                </v-col> -->
              </v-row>
            </v-container>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:action:actions>
        <v-btn color="white" text class="" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import User from "../Api/User";
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: "",
      },
      error: "",
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  methods: {
    ...mapActions(["logIn"]),
    async login() {
      if (this.form.email != "" && this.form.password != "") {
        this.loading = true;
        const params = {
          email: this.form.email,
          password: this.form.password,
        };
        User.login(params)
          .then((response) => {
            if (response != null && response.data.original.error == undefined) {
              this.loading = false;
              this.$store.dispatch("setSnackBar", {
                color: "#ffde59",
                text:
                  localStorage.getItem("lang") == "en"
                    ? "Welcome to our website!"
                    : "Bienvenu dans notre site",
                show: true,
              });
              this.$router.replace(this.$route.query.redirect || "/home");
              console.log("res", response);
              this.logIn(response);
            } else {
              this.error = response.data.original.error;
              this.loading = false;
            }
          })
          .catch((err) => {
            this.loading = false;
            let error = err.error;
            if (error) {
              this.error = error;
            }
          });
      } else {
        this.error =
          localStorage.getItem("lang") == "en"
            ? "Email and Password are required"
            : "Email et le mot de passe sont obligatoire";
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    resetErrorValue() {
      if (this.error != "") {
        this.error = "";
      }
    },
  },
};
</script>
