import Api from "./Api";
export default {
  async deleteInvoiceItem(id) {
    return await Api.delete(`deleteinvoiceitem/${id}`);
  },
};
