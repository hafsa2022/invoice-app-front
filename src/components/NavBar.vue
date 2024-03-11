<template>
  <v-app-bar
    style="background-color: #fff"
    class="px-auto"
    app
    flat
    height="100"
    v-if="auth"
  >
    <v-toolbar-title class=""
      ><span style="">
        <v-img
          src="../assets/car_img.png"
          controls
          width="300"
          height="100"
          v-if="auth"
        />
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-row justify="end" class="my-2 mx-6 pr-10 flex align-center">
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon color="" v-bind="props">
            <i
              class="v-icon notranslate v-theme--light"
              aria-hidden="true"
              style="font-size: 24px; height: 24px; width: 24px"
              ><svg
                class="v-icon__svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"
                ></path></svg></i
          ></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item @click="selectItem(item.title)">{{
              item.title
            }}</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
      <MenuComponent v-if="user && auth" />
      <div v-if="user && auth" class="mx-2 mt-4">
        <h5 class="bold" style="font-size: 14px; color: #192a3e">
          {{ user.name }}
        </h5>
        <p style="font-size: 12px; color: #90a0b7">{{ user.email }}</p>
      </div>
    </v-row>
  </v-app-bar>
</template>

<script>
import MenuComponent from "../components/MenuComponent.vue";
import { mapState } from "vuex";
export default {
  name: "NavBar",
  data: () => ({
    value: "",
    items: [{ title: "en" }, { title: "fr" }],
  }),
  components: {
    MenuComponent,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    selectItem(item) {
      localStorage.setItem("lang", item);
      location.reload();
    },
  },
};
</script>

<style>
.v-icon__svg {
  fill: currentColor;
  width: 100%;
  height: 100%;
}
.v-btn--icon .v-icon {
  --v-icon-size-multiplier: 1;
}
</style>
