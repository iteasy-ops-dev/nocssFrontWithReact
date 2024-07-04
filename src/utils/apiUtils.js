import api from './api';
import { toMultipartFormData } from '../utils/util'

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/list_func');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const excuteAnsible = async (formDataToSend) => {
  if (!formDataToSend.options.hasOwnProperty("files")) {
    try {
      const response = await api.post('/excuteAnsible', formDataToSend);
      return response.data;
    } catch (error) {
      console.error(error)
      return [];
    }
  } else {
    // 일반 Object를 formData로 변환하는 구문
    const formData = toMultipartFormData(formDataToSend)

    // formData 출력 구문
    // console.log("> > > >  formdata 출력")
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // };

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    try {
      const response = await api.post('/excuteAnsibleWithFiles', formData, config);
      return response.data;
    } catch (error) {
      console.error(error)
      return [];
    }
  }
};

//TODO: 멀티파일에 대해서 분기가 필요함.