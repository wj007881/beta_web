import { defAxios as request } from '@/utils/http'
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
import axios from 'axios'
export const login = (data) => {
  return axios({
    url: baseURL+'/get_token',
    method: 'post',
    data:JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    }
  })
}

export const refreshToken = () => {
  return axios({
    url: baseURL+'/get_token',
    method: 'post',
    data:JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    }
  })
}
