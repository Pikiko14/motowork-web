import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useProductsContent = () => {
  // references
  const products = ref({})
  const path = 'products'
  const pageProduct = ref(1)
  const totalPagesProduct = ref(0)

  // methods
  const getProducts = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success && data.data) {
        products.value = data.data.brands
        totalPagesProduct.value = data.data.totalPages
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const addOnePageProduct = () => {
    pageProduct.value++
  }

  const removeOnePageProduct = () => {
    pageProduct.value--
  }

  return {
    products,
    getProducts,
    pageProduct,
    totalPagesProduct,
    addOnePageProduct,
    removeOnePageProduct
  }
}
