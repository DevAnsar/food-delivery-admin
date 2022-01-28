import { AuthAxios, getHeaders } from './Axios';

const getUsersApi = () => AuthAxios.get(`/users`, { headers: getHeaders() });
const getDeliveriesApi = () => AuthAxios.get(`/deliveries`, { headers: getHeaders() });

export { getUsersApi, getDeliveriesApi };
