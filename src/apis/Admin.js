import { AuthAxios, getHeaders } from './Axios';

const getDashboardApi = () => AuthAxios.get(`/dashboard`, { headers: getHeaders() });
const getCitiesApi = () => AuthAxios.get(`/cities`, { headers: getHeaders() });

export { getDashboardApi, getCitiesApi };
