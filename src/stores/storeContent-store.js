import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUrlParams } from 'src/utils/utils'

export const useStoreContent = defineStore('storeContent', () => {
  const banners = ref({})
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

  return {
    banners,
    setBanner,
    filterBanner,
    setCategories,
    categoriesList,
    instagramsFeeds,
    setInstagramsFeeds
  }
})
