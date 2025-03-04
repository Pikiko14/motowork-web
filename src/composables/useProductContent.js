import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useStoreContent } from 'src/stores/storeContent-store'

export const useProductsContent = () => {
  // references
  const product = ref({})
  const products = ref([])
  const path = 'products'
  const pageProduct = ref(1)
  const totalProducts = ref(1)
  const store = useStoreContent()
  const similarProducts = ref([])
  const totalPagesProduct = ref(0)
  const totalInContacpime = ref(0)
  const pathContacpime = 'contacpime'

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
        store.setProduct(product.value)
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

  const pushProductReviews = (reviews) => {
    product.value.reviews = reviews
    store.setProduct(product.value)
  }

  const loadProductDataWherehouse = async (productCode) => {
    try {
      const { data } = await api.get(`${pathContacpime}?productCode=${productCode}`)
      if (data.success && data.data) {
        totalInContacpime.value = data?.data?.qproducto ? parseInt(data?.data?.qproducto) : 0
      }
    } catch (error) {
      console.error(error.message)
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
    totalInContacpime,
    pushProductReviews,
    removeOnePageProduct,
    loadProductDataWherehouse
  }
}
