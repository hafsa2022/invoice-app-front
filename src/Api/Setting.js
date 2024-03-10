import Api from "./Api";
export default {
  async getSettings(id) {
    return await Api.get(`getsetting/${id}`);
  },

  async updateSetting(form) {
    return await Api.post(`updatesetting`, form);
  },
};
