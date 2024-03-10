import Api from "./Api";
export default {
  async getClients() {
    return await Api.get(`getclients`);
  },
};
