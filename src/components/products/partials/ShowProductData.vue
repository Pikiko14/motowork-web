<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <GalleryItem :product="product" />
    </div>
    <div class="col-12 col-md-6">
      e
    </div>
  </div>
</template>

<script setup>
// imports
import { defineProps } from 'vue'
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

</script>
