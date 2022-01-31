import { AuthAxios, getHeaders } from './Axios';

const getDeliveriesApi = () => AuthAxios.get(`/deliveries`, { headers: getHeaders() });
const getDeliveryApi = (id) => AuthAxios.get(`/deliveries/${id}`, { headers: getHeaders() });
const updateDeliveryApi = (id, data) =>
  AuthAxios.put(`/deliveries/${id}`, data, { headers: getHeaders() });

const deleteDeliveryApi = (id) => AuthAxios.delete(`/deliveries/${id}`);
const createDeliveryApi = (data) => AuthAxios.post(`/deliveries`, data, { headers: getHeaders() });

export {
  getDeliveriesApi,
  getDeliveryApi,
  updateDeliveryApi,
  deleteDeliveryApi,
  createDeliveryApi
};
