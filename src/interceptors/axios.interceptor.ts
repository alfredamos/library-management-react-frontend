import axios from "axios";
import { authService } from "../services/auth.service";

const baseURL = "http://localhost:3100/api/";
const Axios = axios.create({
  baseURL,
});

Axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken()

    console.log("At interceptor : ", token);
    

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
