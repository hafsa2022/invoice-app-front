import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import store from "../store";
import SettingsView from "../views/SettingsView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  // {
  //   path: "/signup",
  //   name: "signup",
  //   component: SignupView,
  // },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      return "/";
    } else {
      if (!store.state.token) {
        return "/";
      } else if (to.name === "/") {
        return "/home";
      } else {
        next;
      }
    }
  } else {
    next;
  }
});

export default router;
