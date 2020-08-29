import axios from "axios";

const api = axios.create({
  baseURL: "http://back.stilobarber.com.br/",
});

export default api;
