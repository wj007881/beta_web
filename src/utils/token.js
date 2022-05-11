import { createLocalStorage } from './cache'
import { refreshToken } from '@/api/auth'

const TOKEN_CODE = 'access_token'
const userID = 'userID'
const DURATION = 6 * 60 * 60
const userName ='userNAME'
export const lsToken = createLocalStorage()

export function getToken() {
  return lsToken.get(TOKEN_CODE)
}

export function setToken(token) {
  // console.log('set token')
  lsToken.set(TOKEN_CODE, token, DURATION)
  // console.log(lsToken.get(TOKEN_CODE))
}

export function getUserID() {
  return lsToken.get(userID)
}

export function setUserID(id) {
  // console.log('set token')
  lsToken.set(userID, id)
  // console.log(lsToken.get(TOKEN_CODE))
}

export function getUserName() {
  // console.log('set token')
  lsToken.get(userName)
  // console.log(lsToken.get(TOKEN_CODE))
}

export function setUserName(name) {
  // console.log('set token')
  lsToken.set(userName, name)
  // console.log(lsToken.get(TOKEN_CODE))
}

export function removeToken() {
  lsToken.remove(TOKEN_CODE)
}

export async function refreshAccessToken() {
  const tokenItem = lsToken.getItem(TOKEN_CODE)
  if (!tokenItem) {
    return
  }
  const { time } = tokenItem
  if (new Date().getTime() - time > 1000 * 60 * 30) {
    try {
      const res = await refreshToken()
      if (res.code === 0) {
        setToken(res.data.token)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
