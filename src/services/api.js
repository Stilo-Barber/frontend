import axios from "axios";

const api = axios.create({
  //baseURL: "http://back.stilobarber.com.br/",
  baseURL: "http://localhost:4000",
});

export default api;
