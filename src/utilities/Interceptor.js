import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AxiosInstances = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstances.interceptors.request.use(async (config) => {
  return config;
});

export default AxiosInstances;
