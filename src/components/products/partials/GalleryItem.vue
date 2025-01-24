<template>
  <div class="motowork-product-gallery">
    <div class="motowork-product-gallery__main-image">
      <ZoomImg
        :src="imageInView || firstProductImage"
        zoom-type="drag"
        trigger="click"
        :alt="`Imagen en la galería para el producto ${product.name}, utilizada por Motowork en su Pagina Web`"
        :zoom-scale="2"
      />
    </div>

    <div class="motowork-product-gallery__gallery-items">
      <q-carousel ref="galleryCarousel" infinite v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
        control-color="secondary" padding arrows>
        <q-carousel-slide class="column no-wrap" v-for="(imgArr, idx) in galleryImages" :key="idx" :name="idx">
          <div class="gallery-grid  no-wrap">
            <figure v-for="(image, idxImg) in imgArr" :key="idxImg" @click="imageInView = image.path">
              <img :src="image.path" :alt="`Imagen ${idx + 1} del producto ${product.name}`"
                :title="`Imagen ${idx + 1} del producto ${product.name}`" />
            </figure>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup>
// imports
import { ZoomImg } from 'vue3-zoomer'
import { defineProps, ref, computed } from 'vue'

// props
const props = defineProps({
  product: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// computed
const firstProductImage = computed(() => {
  if (props.product && props.product.images) {
    return props.product.images[0]?.path || ''
  }
  return ''
})

const galleryImages = computed(() => {
  if (props.product && props.product.images) {
    return chunkArray(props.product.images, 3)
  }
  return chunkArray([], 3)
})

// references
const slide = ref(0)
const imageInView = ref('')
const galleryCarousel = ref()

// methods
const chunkArray = (arr, tamano) => {
  const result = []
  for (let i = 0; i < arr.length; i += tamano) {
    result.push(arr.slice(i, i + tamano))
  }
  return result
}
</script>

<style scoped lang="scss">
.motowork-product-gallery {
  display: flex;
  gap: 32px;
  flex-direction: column;

  &__main-image {
    display: flex;
    align-items: center;
    justify-content: center;

    .vz-zoomimg-container {
      aspect-ratio: 1/1;
      max-width: 600px;
      max-height: 600px;
    }
  }

  &__gallery-items {
    .q-carousel {
      height: auto;
      max-height: 220px;
      background: #f5f5f5;

      figure {
        aspect-ratio: 1/1;
        max-width: 33.33%;
        max-height: 192px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;

          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}

.gallery-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
