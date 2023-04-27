
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})

axiosInstance.interceptors.request.use((req) => {
  if(localStorage.getItem('token')){
      req.headers.Authorization = `Bearer ${localStorage && localStorage.getItem('token')}`;
  }
  return req;
})

