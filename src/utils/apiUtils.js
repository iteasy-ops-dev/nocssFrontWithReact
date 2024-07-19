import api from './api';
import { toMultipartFormData } from '../utils/util'

export const fetchProcessData = async (param) => {
  try {
    const response = await api.get('/get', param);
    return response.data;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/functions');
    return response.data;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const login = async (data) => {
  try {
    const response = await api.post('/login', data);
    console.log(response)
    return true;
  } catch (error) {
    console.error(error)
    return false
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error(error)
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post('/signup', data);
    return {
      code: response.status,
      message: "회원가입이 완료되었습니다. 이제 로그인해 주세요."
    };
  } catch (error) {
    console.error(error)
    return {
      code: error.response.status,
      message: error.response.data
    };
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