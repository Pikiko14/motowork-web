import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useBlogsContent = () => {
  // references
  const path = 'blogs'
  const experiences = ref([])

  // methods
  const getExperiences = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success && data.data) {
        experiences.value = data.data.brands
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    experiences,
    getExperiences
  }
}
