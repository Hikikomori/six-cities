import axios from 'axios';

const TIMEOUT = 5000;
const FORBIDDEN_CODE = 403;
const BASE_URL = `https://es31-server.appspot.com/six-cities`;

const createAPI = (onLoginRequired) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === FORBIDDEN_CODE && err.response.config.url !== `${BASE_URL}/login`) {
      onLoginRequired();
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
