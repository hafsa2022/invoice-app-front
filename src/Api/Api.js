import axios from "axios";
const Api = axios.create({
  baseURL: "http://localhost:8000/api/",
});
Api.interceptors.request.use((config) => {
  const TOKEN = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});
export default Api;
