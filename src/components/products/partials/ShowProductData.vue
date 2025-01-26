<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <GalleryItem :colorImage="colorImage" :product="product" />
    </div>

    <div class="col-12 col-md-6">
      <DataItem @set-image-color="setImageColor" :product="product" />
    </div>
  </div>
</template>

<script setup>
// imports
import DataItem from './DataItem.vue'
import { defineProps, ref } from 'vue'
import GalleryItem from './GalleryItem.vue'

// props
defineProps({
  product: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// references
const colorImage = ref()

// methods
const setImageColor = (colorImg) => {
  colorImage.value = colorImg
}
</script>
