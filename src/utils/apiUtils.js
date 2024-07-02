import api from './api';

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/list_func');
    return response.data;
  } catch (error) {
    return [];
  }
};