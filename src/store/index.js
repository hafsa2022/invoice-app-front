import { createStore } from "vuex";
import Invoice from "../Api/Invoice.js";
import Client from "../Api/Client.js";
import Car from "../Api/Car.js";
import Setting from "../Api/Setting.js";

export default createStore({
  state: {
    loadingLogOut: false,
    token: null,
    snackbar: {
      color: "",
      text: "",
      show: false,
    },
    user: null,
    displayingDialog: false,
    invoices: [],
    clients: [],
    cars: [],
    settings: {},
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getLoadingLogOut(state) {
      return state.loadingLogOut;
    },
    getAllInvoices(state) {
      return state.invoices;
    },
  },
  mutations: {
    SET_SNACKBAR(state, payload) {
      state.snackbar.color = payload.color;
      state.snackbar.text = payload.text;
      state.snackbar.show = payload.show;
    },
    LOGIN(state, data) {
      let token = data.data.original.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.data.original.user));
      // localStorage.setItem("lang", data.data.original.lang);
      state.token = token;
      state.user = data.data.original.user;
    },
    SET_TOKEN(state, value) {
      state.token = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_LOGOUT(state, value) {
      state.loadingLogOut = value;
    },
    SET_DISPLAYING_DIALOG(state, value) {
      state.displayingDialog = value;
    },
    GET_INVOICES(state, invoices) {
      state.invoices = invoices;
    },

    GET_CLIENTS(state, clients) {
      state.clients = clients;
    },

    GET_CARS(state, cars) {
      state.cars = cars;
    },

    GET_SETTING(state, settings) {
      state.settings = settings[0];
      // localStorage.removeItem("settings");
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },

    SET_USER_INFO(state, data) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.name = data.name;
      user.email = data.email;
      localStorage.setItem("user", JSON.stringify(user));
      let userUpdated = JSON.parse(localStorage.getItem("user"));
      if (userUpdated) {
        state.user = userUpdated;
      }
    },
  },
  actions: {
    setSnackBar({ commit }, payload) {
      commit("SET_SNACKBAR", payload);
    },
    logIn({ commit }, payload) {
      commit("LOGIN", payload);
    },
    updateToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setLogOut({ commit }) {
      commit("SET_LOGOUT", true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("settings");
      commit("SET_LOGOUT", false);
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    },
    setDisplayingDialog({ commit }, payload) {
      commit("SET_DISPLAYING_DIALOG", payload);
    },
    async getInvoices({ commit }, payload) {
      Invoice.getInvoices(payload).then((response) => {
        commit("GET_INVOICES", response.data);
      });
    },
    async getClients({ commit }) {
      Client.getClients().then((response) => {
        commit("GET_CLIENTS", response.data);
      });
    },
    async getCars({ commit }) {
      Car.getCars().then((response) => {
        commit("GET_CARS", response.data);
      });
    },
    async getSettings({ commit }, payload) {
      Setting.getSettings(payload).then((response) => {
        commit("GET_SETTING", response.data);
      });
    },

    async setUserInfo({ commit }, payload) {
      console.log("pay", payload);
      commit("SET_USER_INFO", payload);
    },
  },
  modules: {},
});
