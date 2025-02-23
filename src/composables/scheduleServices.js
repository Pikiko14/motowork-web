import { api } from 'src/boot/axios'

export const useScheduleServices = () => {
  // references
  const path = 'services'

  // methods
  const handlerSchedule = async (params) => {
    try {
      const { data } = await api.post(`${path}`, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.success && data.data) {
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handlerSchedule
  }
}
