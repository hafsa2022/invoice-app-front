import Api from "./Api";
export default {
  async uploadInvoice(id) {
    return await Api.get(`upload-invoice/${id}`, { responseType: "blob" });
  },

  async getInvoices(userId) {
    return await Api.get(`getinvoices/${userId}`);
  },

  async addInvoice(form) {
    return await Api.post(`addinvoice`, form);
  },

  async deleteInvoice(id) {
    return await Api.delete(`deleteinvoice/${id}`);
  },

  async editInvoice(id) {
    return await Api.get(`editinvoice/${id}`);
  },

  async updateInvoice(form) {
    console.log("form", form);
    return await Api.post(`updateinvoice`, form);
  },
};
