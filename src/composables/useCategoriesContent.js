import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useCategoriesContent = () => {
  // references
  const categoriesMenu = ref([])
  const categories = ref([])
  const path = 'categories'
  const page = ref(1)
  const totalPages = ref(0)

  // methods
  const getMenuCategories = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        categoriesMenu.value = data.data.categories
        totalPages.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const removeOnePage = () => {
    page.value--
  }

  const addOnePage = () => {
    page.value++
  }

  const resetPage = () => {
    page.value = 1
  }

  const getCategories = async (query, append = false) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        if (!append) categories.value = data.data.categories
        else categories.value.push(...data.data.categories)

        totalPages.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    page,
    resetPage,
    totalPages,
    addOnePage,
    categories,
    removeOnePage,
    getCategories,
    categoriesMenu,
    getMenuCategories
  }
}
