import axios from 'axios'
import { setupInterceptor } from './interceptors'

function createAxios() {
  const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
  const defBaseURL = window.__APP__GLOB__CONF__?.VITE_APP_GLOB_BASE_API || import.meta.env.VITE_APP_GLOB_BASE_API
  const service = axios.create()
  setupInterceptor(service)
  return service
}

export const defAxios = createAxios()

export const testAxios = createAxios({
  baseURL: window.__APP__GLOB__CONF__?.VITE_APP_GLOB_BASE_API_TEST || import.meta.env.VITE_APP_GLOB_BASE_API_TEST,
})
