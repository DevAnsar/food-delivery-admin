import { AuthAxios, getHeaders } from './Axios';

const getUsersApi = () => AuthAxios.get(`/users`, { headers: getHeaders() });

export { getUsersApi };
