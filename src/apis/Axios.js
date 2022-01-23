import axios from 'axios';

function getHeaders() {
  return {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  };
}

const BASE_URL = 'http://localhost:8000/api/admin';
// const BASE_URL="http://detalserver.ansarmirzayi.ir/api/admin";

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const AuthAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: getHeaders()
});
export { Axios, AuthAxios, getHeaders };
