import axios from 'axios';
import baseUrl from '../settings/apiUrl';
import authToken from './authToken';

const defaultOptions = {
  baseURL: `${baseUrl.apiUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
};
let authAxios = axios.create(defaultOptions);
authAxios.interceptors.request.use(async function (config) {
  let userToken = `${await authToken.getToken()}`;
  config.headers.Authorization = userToken ? `Bearer ${userToken}` : '';
  return config;
});
export default authAxios;
