<template>
  <div class="motowork-product-gallery">
    <div class="motowork-product-gallery__main-image">
      <ZoomImg
        :src="imageInView || firstProductImage"
        zoom-type="drag"
        trigger="click"
        :alt="`Imagen principal del producto ${product.name}, utilizada por Motowork en su página web`"
        :zoom-scale="2"
        loading="lazy"
      />
    </div>

    <div class="motowork-product-gallery__gallery-items">
      <q-carousel ref="galleryCarousel" infinite v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
        control-color="secondary" padding arrows>
        <q-carousel-slide class="column no-wrap" v-for="(imgArr, idx) in galleryImages" :key="idx" :name="idx">
          <div class="gallery-grid no-wrap">
            <figure v-for="(image, idxImg) in imgArr" :key="idxImg" @click="imageInView = image.path">
              <img
                :src="image.path"
                :alt="`Imagen ${idx + 1} del producto ${product.name}`"
                :title="`Imagen ${idx + 1} del producto ${product.name}`"
                loading="lazy"
              />
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
import { defineProps, ref, computed, watch } from 'vue'

// props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  },
  colorImage: {
    type: String,
    default: () => ''
  }
})

// Watchers
watch(
  () => props.colorImage,
  (newVal) => {
    imageInView.value = newVal
  }
)

// computed
const firstProductImage = computed(() => {
  if (props.product?.images) {
    return props.product.images[0]?.path || ''
  }
  return ''
})

const galleryImages = computed(() => {
  if (props.product?.images) {
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
  justify-content: flex-start;
  height: 100%;

  &__main-image {
    display: flex;
    align-items: center;
    justify-content: center;

    .vz-zoomimg-container {
      aspect-ratio: 1;
      max-width: 600px;
      max-height: 600px;

      img {
        object-fit: cover !important;
      }
    }
  }

  &__gallery-items {
    .q-carousel {
      height: auto;
      max-height: 220px;
      background: #f5f5f5;

      figure {
        aspect-ratio: 1;
        max-width: 33.33%;
        max-height: 192px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          transition: transform 0.3s ease;
          object-fit: contain;

          &:hover {
            transform: scale(1.05);
          }
        }

        figcaption {
          text-align: center;
          font-size: 12px;
          color: #777;
          margin-top: 8px;
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
