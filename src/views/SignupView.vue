<template>
  <v-container>
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
          <v-col class="text-center bg-red mb-2" cols="12" v-if="error != ''">{{
            error
          }}</v-col>
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="#ffde59" dark>
              <v-card-text>
                Create Account ...
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
                <label for="username">Name</label>
                <v-text-field
                  id="name"
                  v-model="form.name"
                  class="mt-1 rounded-lg"
                  type="text"
                  :error-messages="nameErrors"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Name"
                  autofocus
                  required
                  @input="resetErrorValue"
              /></v-col>
              <v-col cols="12" class="pa-0">
                <label for="email">Email address</label>
                <v-text-field
                  id="email"
                  v-model="form.email"
                  class="mt-1 rounded-lg"
                  type="email"
                  :error-messages="emailErrors"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Email address"
                  autofocus
                  required
                  @input="resetErrorValue"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="password">Password</label>
                <v-text-field
                  id="password"
                  v-model="form.password"
                  class="mt-1 rounded-lg"
                  placeholder="Enter password"
                  :error-messages="passwordErrors"
                  color="#f9af23"
                  variant="outlined"
                  type="password"
                  required
                  @input="resetErrorValue"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="passwordconfirmation">Password Confirmation</label>
                <v-text-field
                  id="passwordconfirmation"
                  v-model="form.passwordConfirmation"
                  class="mt-1 rounded-lg"
                  placeholder="Password confirmation"
                  :error-messages="passworConfirmationdErrors"
                  color="#f9af23"
                  variant="outlined"
                  type="password"
                  required
                  @input="resetErrorValue"
                />
              </v-col>

              <v-col cols="12" class="pa-0">
                <v-btn
                  type="submit"
                  block
                  class="mt-2 mb-3"
                  text="Register"
                  size="large"
                  color="#f9af23"
                  @click="signUp"
                ></v-btn>
              </v-col>
              <v-col cols="12" class="pa-0">
                <span class="text-h6">Already have an account ?</span>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-btn
                  type="submit"
                  block
                  class="mt-2"
                  text="Login Now"
                  to="/"
                  size="large"
                  color="#f9af23"
                ></v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-col>

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
  </v-container>
</template>

<script>
import User from "../Api/User";
import { mapState } from "vuex";
export default {
  name: "SignUpView",
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      },
      nameErrors: "",
      emailErrors: "",
      passwordErrors: "",
      passwordConfirmationErrors: "",
      error: "",
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  methods: {
    async signUp() {
      if (
        this.form.name != null &&
        this.form.email != null &&
        this.form.password != null &&
        this.form.passwordConfirmation != null
      ) {
        this.loading = true;
        const params = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.passwordConfirmation,
        };
        User.signUp(params)
          .then((response) => {
            if (response != null) {
              this.loading = false;
              this.$store.dispatch("setSnackBar", {
                color: "#ffde59",
                text: "Account was created successfully , you can login now!",
                show: true,
              });
            }
          })
          .catch((err) => {
            this.loading = false;
            let errors = err.response.data.errors;
            if (errors) {
              if (errors.email) {
                this.emailErrors = errors.email;
              } else if (errors.name) {
                this.nameErrors = errors.name;
              } else if (errors.password) {
                this.passwordErrors = errors.password;
              } else if (errors.password_confirmation) {
                this.passwordConfirmationErrors = errors.password_confirmation;
              }
            }
          });
      } else {
        this.error = " All fields are required";
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
      if (this.nameErrors != "") {
        this.nameErrors = "";
      } else if (this.emailErrors != "") {
        this.emailErrors = "";
      } else if (this.passwordConfirmationErrors != "") {
        this.passwordConfirmationErrors = "";
      } else if (this.passwordErrors != "") {
        this.passwordErrors = "";
      } else {
        this.error = "";
      }
    },
  },
};
</script>

<style></style>
