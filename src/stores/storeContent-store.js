import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUrlParams } from 'src/utils/utils'

export const useStoreContent = defineStore('storeContent', () => {
  const product = ref({})
  const banners = ref({})
  const allBrands = ref([])
  const experience = ref({})
  const brandsList = ref([])
  const categoriesList = ref([])
  const instagramsFeeds = ref([])
  const productsMostSells = ref([])

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

  const setExperience = (payload) => {
    experience.value = payload
  }

  const setAllBrands = (payload) => {
    allBrands.value = payload
  }

  const setProductMostSell = (payload) => {
    productsMostSells.value = payload
  }

  return {
    banners,
    product,
    allBrands,
    setBrands,
    setBanner,
    setProduct,
    brandsList,
    experience,
    setAllBrands,
    filterBanner,
    setCategories,
    setExperience,
    categoriesList,
    instagramsFeeds,
    productsMostSells,
    setInstagramsFeeds,
    setProductMostSell
  }
})
