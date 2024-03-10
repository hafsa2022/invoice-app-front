import Api from "./Api";
export default {
  async getCars() {
    return await Api.get(`getcars`);
  },
};
