import axios from 'axios'
import { boot } from 'quasar/wrappers'
import { notification } from './notification'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const URL_API = 'http://localhost:3080'
const api = axios.create({ baseURL: `${process.env.API_URL || URL_API}/api/v1` })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$urlApi = process.env.MEDIA_URL

  // prepare interceptor axios
  api.interceptors.response.use(undefined, async (error) => {
    if (error.response) {
      if (error.response.status === 422) {
        if (error) {
          const { data } = error.response.data
          const { msg } = data.shift()
          notification('red', msg, 'red')
        }
      } else if (error.response.status === 400) {
        const { data } = error.response
        if (data.message && typeof data.message === 'object') {
          const msg = data.message.shift()
          notification('red', msg, 'red')
        }
      }
    } else {
      // notification(
      //   'negative',
      //   error.message
      //     ? error.message
      //     : 'Algo ha ocurrio al intentar procesar esta solicitud',
      //   'red'
      // )
    }

    // return promise
    return Promise.reject(error)
  })
})

export { api }
