import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useInstangramContent = () => {
  // references
  const path = 'instagrams'
  const feedsHistories = ref([])
  const store = useStoreContent()

  // methods
  const getfeed = async () => {
    try {
      const { data } = await api.get(`${path}/get-feeds`, { headers: { instagram_token: process.env.INSTAGRAM_TOKEN } })

      if (data.success) {
        feedsHistories.value = data.data
        store.setInstagramsFeeds(feedsHistories.value)
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
