import api from './api';

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/list_func');
    return response.data;
  } catch (error) {
    return [];
  }
};

//TODO: 멀티파일에 대해서 분기가 필요함.
export const excuteAnsible = async (formDataToSend) => {
  try {
    const response = await api.post('/getparam', formDataToSend);
    return response.data;
  } catch (error) {
    return [];
  }
};