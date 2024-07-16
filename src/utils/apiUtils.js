import api from './api';
import { toMultipartFormData } from '../utils/util'

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/list_func');
    return response.data;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const login = async (data) => {
  try {
    const response = await api.post('/login', data);
    return response.status === 200;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post('/signup', data);
    return response.status === 201;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const excuteAnsible = async (formDataToSend) => {
  let config
  let formData
  if (!formDataToSend.options.hasOwnProperty("files")) {
    config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    formData = formDataToSend
  } else {
    config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    formData = toMultipartFormData(formDataToSend)
  }

  try {
    const response = await api.post('/run', formData, config);
    // const response = await api.post('/excuteAnsible', formDataToSend);
    return response.data;
  } catch (error) {
    console.error(error)
    return [];
  }
};