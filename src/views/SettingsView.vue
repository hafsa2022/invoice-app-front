<template>
  <v-container class="mt-4">
    <h1>{{ $t("settings") }}</h1>
    <v-card class="rounded-lg mt-5 pt-5">
      <v-card-text>
        <v-dialog v-model="loading" hide-overlay persistent width="300">
          <v-card color="#ffde59" dark>
            <v-card-text>
              <!-- Updating User Info ... -->
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
            <v-col cols="12" class="pa-0 mb-4"
              ><h3>{{ $t("profildetails") }}</h3>
              <span>{{ $t("profildetails2") }}</span></v-col
            >
            <!-- <v-col cols="12" class="pa-0">
              <label for="profile_img">Profile Image</label>
              <v-file-input
                v-model="form.img"
                label="Change Profile Picture"
                accept="image/*"
                variant="outlined"
                id="profile_img"
                class="mt-2 rounded-lg"
              ></v-file-input>
            </v-col> -->
            <v-col cols="6" class="pa-0 pr-4">
              <label for="name">{{ $t("name") }}</label>
              <v-text-field
                id="name"
                v-model="form.name"
                class="mt-1 rounded-lg"
                type="text"
                color="#f9af23"
                variant="outlined"
                :error-messages="nameError"
                @input="resetErrorValue"
              />
            </v-col>
            <!-- <v-col cols="6" class="pa-0 pl-4">
              <label for="lastname">Last Name</label>
              <v-text-field
                id="lastname"
                v-model="form.lastname"
                class="mt-1 rounded-lg"
                type="text"
                color="#f9af23"
                variant="outlined"
              />
            </v-col> -->
            <v-col cols="6" class="pa-0 pl-4">
              <label for="email">{{ $t("email") }}</label>
              <v-text-field
                id="email"
                v-model="form.email"
                class="mt-1 rounded-lg"
                type="email"
                color="#f9af23"
                variant="outlined"
                placeholder="Email"
                :error-messages="emailError"
                @input="resetErrorValue"
              />
            </v-col>
            <v-col cols="6" class="pa-0 pr-4">
              <label for="phone_number">{{ $t("numberPhon") }}</label>
              <v-text-field
                id="phone_number"
                v-model="form.phoneNumber"
                class="mt-1 rounded-lg"
                type="text"
                color="#f9af23"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="12" class="pa-0 mb-4"
              ><h3>{{ $t("paraReg") }}</h3>
              <span>{{ $t("paraReg2") }}</span></v-col
            ><v-col cols="6" class="pa-0 pr-4">
              <label for="language">{{ $t("lang") }}</label>
              <v-select
                :items="languages"
                v-model="form.language"
                variant="outlined"
                class="mt-1 rounded-lg"
              ></v-select>
            </v-col>
            <!-- <v-col cols="6" class="pa-0 pl-4">
              <label for="timezone">Timezone</label>
              <v-select
                :items="timezones"
                v-model="form.timezone"
                variant="outlined"
                class="mt-1 rounded-lg"
              ></v-select> </v-col> -->
          </v-row></v-container
        >
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="#f9af23 darken-1"
          text
          @click="editUserInfo"
          style="background: #f9af23"
          class="mr-3"
        >
          {{ $t("update") }}
        </v-btn>
      </v-card-actions>
    </v-card>
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
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import User from "../Api/User";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        img: [],
        name: null,
        email: null,
        phoneNumber: null,
        language: null,
        // timezone: "GMT +2:00",
      },
      languages: ["en", "fr"],
      loading: false,
      nameError: null,
      emailError: null,
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.form.name = user.name;
    this.form.email = user.email;
    this.form.language =
      localStorage.getItem("lang") != null
        ? localStorage.getItem("lang")
        : localStorage.setItem("lang", "en");
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },

    resetErrorValue() {
      if (this.nameError != "") {
        this.nameError = "";
      }
      if (this.emailError != "") {
        this.emailError = "";
      }
    },
    editUserInfo() {
      this.loading = true;
      let user = JSON.parse(localStorage.getItem("user"));
      let formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("phone_number", this.form.phoneNumber);
      formData.append("language", this.form.language);

      User.updateInfo(formData)
        .then((response) => {
          if (response != null) {
            localStorage.setItem("lang", this.form.language);
            this.loading = false;
            this.$store.dispatch("setUserInfo", response.data);
            this.$store.dispatch("setSnackBar", {
              color: "#ffde59",
              text:
                localStorage.getItem("lang") == "en"
                  ? "User Info was updated successfully!"
                  : "Les informations utilisateur ont été mises à jour avec succès",
              show: true,
            });
            location.reload();
          }
        })
        .catch((err) => {
          this.loading = false;
          let errors = err.response.data.errors;
          if (errors) {
            if (errors.name) {
              this.nameError = errors.name;
            } else if (errors.email) {
              this.emailError = errors.email;
            }
          }
        });
    },
  },
};
</script>
