<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    NavBar,
  },
  mounted() {
    this.$store.dispatch("setUser", JSON.parse(localStorage.getItem("user")));

    this.$store.dispatch("updateToken", localStorage.getItem("token"));
  },
};
</script>
