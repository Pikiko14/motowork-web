import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useInstangramContent = () => {
  // references
  const path = 'instagrams'
  const feedsHistories = ref([])

  // methods
  const getfeed = async () => {
    try {
      const { data } = await api.get(`${path}/get-feeds`, { headers: { instagram_token: process.env.INSTAGRAM_TOKEN } })

      if (data.success) {
        feedsHistories.value = data.data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    getfeed,
    feedsHistories
  }
}
