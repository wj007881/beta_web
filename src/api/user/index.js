import { defAxios as request } from '@/utils/http'
import { getToken,getUserID } from '@/utils/token'
import axios from 'axios'
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
// import { useUserStore } from '@/store/modules/user'
// const userStore=useUserStore()
// const name=userStore.name
// const role=userStore.role
// const username = userStore.username
// const userID = userStore.userId
// console.log(name,role,username,userID)

export function getUsers(data = {}) {
  return axios({
    url: '/users',
    method: 'get',
    data,
  })
}

export function addUsers(username, userID) {
  return axios({
    url: baseURL+"/add_user",
    method: 'post',
    data:{
      'username':username,
      'userID':userID
    },
    headers: {
      "Content-type": "application/json",
      "Authorization":"JWT "+getToken()
    }
  })
}

export function getUser() {
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
      'user_id':getUserID()
    },
    headers: {
      "Content-type": "application/json",
      "Authorization":"JWT "+getToken()
    }
    })
}

// export function saveUser(data = {}, id) {
//   if (id) {
//     return axios({
//       url: '/user',
//       method: 'put',
//       data,
//     })
//   }

//   return false
// }
