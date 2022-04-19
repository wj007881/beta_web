import { defAxios as request } from '@/utils/http'
import axios from 'axios'
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
export function getUsers(data = {}) {
  return request({
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
  return axios({
    url: baseURL+"/getUserInfo",
    method: "post",
    data: {
      'user_id':id
    },
    headers: {
      "Content-type": "application/json",
    }
    })
}

export function saveUser(data = {}, id) {
  if (id) {
    return request({
      url: '/user',
      method: 'put',
      data,
    })
  }

  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}
