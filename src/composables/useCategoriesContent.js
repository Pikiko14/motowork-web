import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useCategoriesContent = () => {
  // references
  const page = ref(1)
  const totalPages = ref(0)
  const path = 'categories'
  const categories = ref([])
  const categoriesMenu = ref([])
  const store = useStoreContent()

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
        if (!append) {
          categories.value = data.data.categories
        } else {
          categories.value.push(...data.data.categories)
          if (page.value === totalPages.value) store.setCategories(categories.value)
        }

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
