import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.74.10:8080', // 실제 백엔드 API URL로 변경해야 합니다.
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;