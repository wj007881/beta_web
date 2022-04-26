import { defAxios as request } from '@/utils/http'
const baseurl = import.meta.env.VITE_REQUSET_BASE_URL
import axios from 'axios'
export const login = (data) => {
  return axios({
    url: 'http://192.168.50.46:3399/get_token',
    method: 'post',
    data:JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    }
  })
}

export const refreshToken = () => {
  return request({
    url: '/auth/refreshToken',
    method: 'post',
  })
}
