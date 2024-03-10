import Api from "./Api";
export default {
  async login(form) {
    return await Api.post("login", form);
  },
  async updateInfo(form) {
    return await Api.post("updateinfo", form);
  },
  // async signUp(form) {
  //   return await Api.post("signup", form);
  // },
  // async logOut() {
  //   return await Api.post("logout");
  // },
};
