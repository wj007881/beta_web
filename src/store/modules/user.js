import { defineStore } from 'pinia'
import { getUser } from '@/api/user'
import { removeToken } from '@/utils/token'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo(id) {
      try {
        const res = await getUser(id)
        console.log(res.data)
        if (res.data.code === 200) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          console.log('get userinfo success')
          return Promise.resolve(res.data)
        } else {
          console.log('get userinfo error')
          return Promise.reject(res.message)
        }
      } catch (error) {
        console.error(error+' from get userinfo')
        return Promise.reject(error.message)
      }
    },
    logout() {
      removeToken()
      this.userInfo = {}
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
