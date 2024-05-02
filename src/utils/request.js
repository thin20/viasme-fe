import axios from 'axios'
import { store } from '@/store/store.js'
import { notification } from 'antd'

const request = axios.create({
  // baseURL: process.env.VUE_APP_API_SERVER_URL,
  baseURL: 'http://localhost:8090',
  timeout: -1
})

const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = store.getters.token
    const token = null
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        console.log('runAPI Logout')
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  const token = store?.getState()?.user?.token || ''
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request
export {
  request as axios
}
