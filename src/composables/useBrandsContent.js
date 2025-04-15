import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useBrandsContent = () => {
  // references
  const pageBrands = ref(1)
  const totalPagesBrand = ref(0)
  const path = 'brands'
  const brands = ref([])
  const store = useStoreContent()

  // methods
  const getBrandsList = async (query, append = false) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        if (!append) {
          brands.value = data.data.brands
        } else {
          brands.value.push(...data.data.brands)
          if (pageBrands.value === totalPagesBrand.value) store.setBrands(brands.value)
        }
        totalPagesBrand.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getAllBrands = async (query, append = false) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success) {
        return data.data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const addOnePageBrands = () => {
    pageBrands.value++
  }

  return {
    brands,
    pageBrands,
    getAllBrands,
    getBrandsList,
    totalPagesBrand,
    addOnePageBrands
  }
}
