import { Axios } from './Axios';

const loginApi = ({ email, password }) => Axios.post(`/login`, { email, password });

export { loginApi };
