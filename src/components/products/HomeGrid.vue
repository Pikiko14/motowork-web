<template>
  <div
    class="motowork-product-accesories__grid"
    ref="gridContainer"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @dragstart="handleDragStart"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <article
      class="motowork-product-accesories__grid--item"
      v-for="(product, idx) in products"
      :key="idx"
      @dragstart="handleDragStart"
      @click="filterByCategory(product.name)"
    >
      <figure>
        <img :src="getBannerUrl(idx)" :alt="`Imagen del producto ${product.name}`" :title="`Imagen del producto ${product.name}`" loading="lazy">
        <figcaption>
          <h3>{{ product.name }}</h3>
          <p class="reference">{{ product.sku }}</p>
          <div class="price">
            <span class="amount">
              {{ formatPrice(product.price) }}
            </span>

            <span class="rate">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8117 4.86327L8.99853 0.0324707L6.18534 4.86329L0.721191 6.04698L4.44632 10.216L3.8823 15.7778L8.99853 13.5235L14.1145 15.7777L13.5522 10.2161L17.2774 6.04693L11.8117 4.86327ZM8.99984 2.02188V12.4313L12.9469 14.1705L12.513 9.8783L15.3878 6.66089L11.1693 5.74734L8.99984 2.02188Z" fill="#FF8000"/>
              </svg>

              <span>
                0.0
              </span>
            </span>
          </div>
        </figcaption>
      </figure>
    </article>
  </div>
</template>

<script setup>
// import
import { defineProps, ref, defineEmits } from 'vue'
import { formatPrice } from 'src/utils/utils'

// props
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

// emits
const emit = defineEmits([
  'handle-back',
  'handle-next',
  'handle-filter'
])

// references
const gridContainer = ref(null)
let touchStartX = 0
let touchEndX = 0
let mouseStartX = 0
let mouseEndX = 0

// methods
const changePage = (direction) => {
  if (direction === 'left') {
    emit('handle-next')
  } else if (direction === 'right') {
    emit('handle-back')
  }
}

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe()
}

const handleMouseDown = (e) => {
  mouseStartX = e.clientX
}

const handleMouseUp = (e) => {
  mouseEndX = e.clientX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchStartX - touchEndX > 50 || mouseStartX - mouseEndX > 50) {
    changePage('left')
  } else if (touchEndX - touchStartX > 50 || mouseEndX - mouseStartX > 50) {
    changePage('right')
  }
}

const handleDragStart = (e) => {
  e.preventDefault()
}

const filterByCategory = (category) => {
  emit('handle-filter', { category, type: 'product' })
}

const getBannerUrl = (idx) => {
  const { banner } = props.products[idx]
  let url = ''
  const mobileBanner = banner.find((banner) => banner.type_banner === 'mobile')
  if (mobileBanner) {
    url = mobileBanner.path
  } else {
    const desktopBanner = banner.find((banner) => banner.type_banner === 'desktop')
    if (desktopBanner) {
      url = desktopBanner.path
    }
  }
  return url
}

// watch
</script>
