import Api from "./Api";
export default {
  async login(form) {
    return await Api.post("login", form);
  },
  async updateInfo(form) {
    return await Api.post("updateinfo", form);
  },
};
