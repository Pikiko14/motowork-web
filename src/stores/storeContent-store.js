import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUrlParams } from 'src/utils/utils'

export const useStoreContent = defineStore('storeContent', () => {
  const product = ref({})
  const banners = ref({})
  const brandsList = ref([])
  const categoriesList = ref([])
  const instagramsFeeds = ref([])

  const setBanner = (payload) => {
    banners.value[getUrlParams(payload.query, 'type')] = payload.banner
  }

  const filterBanner = (key) => {
    if (banners.value[key]) {
      return banners.value[key]
    }
  }

  const setCategories = (payload) => {
    categoriesList.value = payload
  }

  const setInstagramsFeeds = (payload) => {
    instagramsFeeds.value = payload
  }

  const setBrands = (payload) => {
    brandsList.value = payload
  }

  const setProduct = (payload) => {
    product.value = payload
  }

  return {
    banners,
    product,
    setBrands,
    setBanner,
    setProduct,
    brandsList,
    filterBanner,
    setCategories,
    categoriesList,
    instagramsFeeds,
    setInstagramsFeeds
  }
})
