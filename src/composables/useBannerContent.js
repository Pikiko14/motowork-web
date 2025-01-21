import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useBannersContent = () => {
  // references
  const banner = ref({})
  const path = 'banners'
  const store = useStoreContent()

  // methods
  const getBanner = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success && data.data) {
        banner.value = data.data
        store.setBanner({ banner: banner.value, query })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    banner,
    getBanner
  }
}
