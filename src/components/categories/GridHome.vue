<template>
  <div
    class="motowork-accesories-categories__grid"
    ref="gridContainer"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @dragstart="handleDragStart"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <article
      class="motowork-accesories-categories__grid--item"
      v-for="(cat, idx) in categories"
      :key="idx"
      @dragstart="handleDragStart"
      @click="filterByCategory(cat.name)"
    >
      <figure>
        <img :src="cat.icon" :alt="`Imagen de la categoría ${cat.name}`" :title="`Imagen de la categoría ${cat.name}`" loading="lazy">
        <figcaption>
          <h3>{{ cat.name }}</h3>
        </figcaption>
      </figure>
    </article>
  </div>
</template>

<script setup>
// import
import { defineProps, ref, defineEmits } from 'vue'

// props
defineProps({
  categories: {
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

// watch
</script>
