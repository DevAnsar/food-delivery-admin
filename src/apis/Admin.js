import { AuthAxios, getHeaders } from './Axios';

const getDashboardApi = () => AuthAxios.get(`/dashboard`, { headers: getHeaders() });

export { getDashboardApi };
