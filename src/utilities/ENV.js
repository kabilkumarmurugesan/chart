import AxiosInstances from "./Interceptor";

const ENV = {
  async get(path, params) {
    let api = await AxiosInstances.get(path, params);
    return api;
  },

  async post(path, payload) {
    let api = await AxiosInstances.post(path, payload);
    return api;
  },
};

export default ENV;
