import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useBannersContent = () => {
  // references
  const banner = ref({})
  const path = 'banners'

  // methods
  const getBanner = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success && data.data) {
        banner.value = data.data
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
