import { defAxios as request } from '@/utils/http'
import { getToken } from '@/utils/token'
import axios from 'axios'
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
export function getUsers(data = {}) {
  return axios({
    url: '/users',
    method: 'get',
    data,
  })
}

export function getUser(id) {
  // if (id) {
  //   return request({
  //     url: `/user/${id}`,
  //     method: 'get',
  //   })
  // }
  console.log('getUser')
  return axios({
    url: baseURL+"/getUserInfo",
    method: "post",
    data: {
      'user_id':1
    },
    headers: {
      "Content-type": "application/json",
      "Authorization":"JWT "+getToken()
    }
    })
}

export function saveUser(data = {}, id) {
  if (id) {
    return axios({
      url: '/user',
      method: 'put',
      data,
    })
  }

  return axios({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}
