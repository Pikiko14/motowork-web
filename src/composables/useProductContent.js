import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useProductsContent = () => {
  // references
  const product = ref({})
  const products = ref([])
  const path = 'products'
  const pageProduct = ref(1)
  const totalProducts = ref(1)
  const similarProducts = ref([])
  const totalPagesProduct = ref(0)

  // methods
  const getProducts = async (query) => {
    try {
      const { data } = await api.get(`${path}/list/from-web${query}`)
      if (data.success && data.data) {
        products.value = data.data.brands
        totalPagesProduct.value = data.data.totalPages
        totalProducts.value = data.data.totalItems
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

  const setPage = (page) => {
    pageProduct.value = page
  }

  const showProduct = async (id) => {
    try {
      const { data } = await api.get(`${path}/show/from-web/${id}`)
      if (data.success && data.data) {
        product.value = data.data.product
        similarProducts.value = data.data.similarProduct
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const addReview = async (id, review) => {
    try {
      const { data } = await api.post(
        `${path}/${id}/review`,
        review,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (data.success && data.data) {
        return data
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    setPage,
    product,
    products,
    addReview,
    getProducts,
    pageProduct,
    showProduct,
    totalProducts,
    similarProducts,
    totalPagesProduct,
    addOnePageProduct,
    removeOnePageProduct
  }
}
