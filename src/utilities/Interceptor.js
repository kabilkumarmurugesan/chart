import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001/api/v1/general";

const AxiosInstances = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstances.interceptors.request.use(async (config) => {
  return config;
});

export default AxiosInstances;
