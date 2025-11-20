<template>
  <div class="motowork-accesories-categories__carousel">
    <!-- Flecha izquierda -->
    <q-btn icon="chevron_left" round unelevated color="secondary"
      class="left motowork-accesories-categories__arrow left motowork-accesories-categories__arrow--left"
      @click="goToPrevious" aria-label="Categoría anterior">
    </q-btn>

    <div class="owl-carousel owl-theme categories-carousel" ref="categoriesCarousel">
      <div v-for="(cat, idx) in categories" :key="idx" class="item">
        <article class="motowork-accesories-categories__grid--item" @click="filterByCategory(cat.name)">
          <figure>
            <img :src="cat.icon" :alt="`Imagen de la categoría ${cat.name}`"
              :title="`Imagen de la categoría ${cat.name}`" @load="handleImageLoad" @error="handleImageError($event)">
            <figcaption>
              <h3>{{ cat.name }}</h3>
            </figcaption>
          </figure>
        </article>
      </div>
    </div>

    <!-- Flecha derecha -->
    <q-btn icon="chevron_right" round unelevated color="secondary"
      class="motowork-accesories-categories__arrow right motowork-accesories-categories__arrow--right" @click="goToNext"
      aria-label="Categoría siguiente">
    </q-btn>
  </div>
</template>

<script setup>
// import
import { defineProps, ref, defineEmits, onMounted, onUnmounted, nextTick, watch } from 'vue'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

// props
const props = defineProps({
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
const categoriesCarousel = ref(null)
let owlInstance = null
let isInitialized = false
let isMounted = false
let loadedImagesCount = 0
let totalImagesCount = 0
let imagesLoaded = false

// methods
const handleImageLoad = () => {
  loadedImagesCount++
  // Si todas las imágenes están cargadas, inicializar el carousel
  if (loadedImagesCount >= totalImagesCount && !isInitialized && isMounted) {
    imagesLoaded = true
    initCarousel()
  }
}

const handleImageError = (event) => {
  // Si la imagen falla al cargar, contarla como cargada para no bloquear la inicialización
  loadedImagesCount++
  event.target.style.display = 'none'

  // Si todas las imágenes están procesadas (cargadas o con error), inicializar
  if (loadedImagesCount >= totalImagesCount && !isInitialized && isMounted) {
    imagesLoaded = true
    initCarousel()
  }
}

const filterByCategory = (category) => {
  emit('handle-filter', { type: 'product', category, page: 1, perPage: 9, sortBy: 'createdAt', order: '-1' })
}

const goToPrevious = () => {
  if (owlInstance && categoriesCarousel.value && window.$) {
    window.$(categoriesCarousel.value).trigger('prev.owl.carousel')
    emit('handle-back')
  }
}

const goToNext = () => {
  if (owlInstance && categoriesCarousel.value && window.$) {
    window.$(categoriesCarousel.value).trigger('next.owl.carousel')
    emit('handle-next')
  }
}

const initCarousel = async () => {
  try {
    // Verificar que haya categorías
    if (!props.categories || props.categories.length === 0) {
      return
    }

    // Import jQuery and owl.carousel dynamically
    const $ = (await import('jquery')).default

    // Make jQuery available globally
    if (typeof window !== 'undefined') {
      window.$ = window.jQuery = $
    }

    // Import owl.carousel after jQuery is available
    await import('owl.carousel')

    // Esperar un tick para asegurar que el DOM esté completamente renderizado
    await nextTick()

    if (categoriesCarousel.value && window.$ && window.$(categoriesCarousel.value).length > 0) {
      // Destruir instancia anterior si existe
      if (owlInstance) {
        try {
          window.$(categoriesCarousel.value).trigger('destroy.owl.carousel')
        } catch (e) {
          console.warn('Error destroying carousel:', e)
        }
        owlInstance = null
      }

      // Inicializar carousel
      owlInstance = window.$(categoriesCarousel.value).owlCarousel({
        items: 4,
        loop: props.categories.length > 4,
        margin: 20,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        responsive: {
          0: {
            items: 2,
            margin: 10
          },
          768: {
            items: 3,
            margin: 20
          },
          1200: {
            items: 4,
            margin: 20
          }
        },
        onChanged: (event) => {
          // Emitir eventos cuando cambia el carousel
          const currentIndex = event.item.index
          if (currentIndex !== undefined) {
            // Determinar dirección basada en el índice anterior
            emit('handle-next')
          }
        }
      })

      isInitialized = true
    }
  } catch (error) {
    console.error('Error initializing carousel:', error)
    isInitialized = false
  }
}

const updateCarousel = async () => {
  if (!categoriesCarousel.value || !window.$) {
    return
  }

  // Resetear contadores
  loadedImagesCount = 0
  imagesLoaded = false
  isInitialized = false

  await nextTick()
  await nextTick()

  // Si hay instancia, destruir
  if (owlInstance) {
    window.$(categoriesCarousel.value).trigger('destroy.owl.carousel')
    owlInstance = null
  }

  // Contar las nuevas imágenes
  if (props.categories && props.categories.length > 0) {
    totalImagesCount = props.categories.length

    // Esperar un poco para que las imágenes comiencen a cargar
    await new Promise(resolve => setTimeout(resolve, 100))

    // Verificar si las imágenes ya están cargadas
    const images = categoriesCarousel.value.querySelectorAll('img')
    let alreadyLoaded = 0
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        alreadyLoaded++
      }
    })

    if (alreadyLoaded === totalImagesCount) {
      // Todas las imágenes ya están cargadas
      imagesLoaded = true
      loadedImagesCount = totalImagesCount
      await initCarousel()
    } else {
      // Esperar a que las imágenes se carguen
      loadedImagesCount = alreadyLoaded
    }
  }
}

// Watch para detectar cambios en las categorías
watch(
  () => props.categories,
  async (newCategories) => {
    // Solo procesar si el componente está montado
    if (!isMounted) {
      return
    }

    // Resetear contadores cuando cambian las categorías
    loadedImagesCount = 0
    imagesLoaded = false
    isInitialized = false

    // Esperar a que el DOM se actualice
    await nextTick()
    await nextTick()

    // Contar las imágenes que necesitan cargarse
    if (newCategories && newCategories.length > 0 && categoriesCarousel.value) {
      totalImagesCount = newCategories.length

      // Si no hay imágenes que cargar (todas ya están en caché), inicializar inmediatamente
      await new Promise(resolve => setTimeout(resolve, 100))

      // Verificar si las imágenes ya están cargadas
      const images = categoriesCarousel.value.querySelectorAll('img')
      let alreadyLoaded = 0
      images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
          alreadyLoaded++
        }
      })

      if (alreadyLoaded === totalImagesCount) {
        // Todas las imágenes ya están cargadas
        imagesLoaded = true
        loadedImagesCount = totalImagesCount
        await initCarousel()
      } else {
        // Esperar a que las imágenes se carguen
        loadedImagesCount = alreadyLoaded
      }
    }
  },
  { deep: true, immediate: false }
)

// Hooks
onMounted(async () => {
  isMounted = true

  // Esperar múltiples ticks para asegurar que el DOM esté completamente renderizado
  await nextTick()
  await nextTick()

  // Si hay categorías, configurar el contador de imágenes
  if (props.categories && props.categories.length > 0 && categoriesCarousel.value) {
    totalImagesCount = props.categories.length

    // Esperar un poco para que las imágenes comiencen a cargar
    await new Promise(resolve => setTimeout(resolve, 100))

    // Verificar si las imágenes ya están cargadas (caché del navegador)
    const images = categoriesCarousel.value.querySelectorAll('img')
    let alreadyLoaded = 0
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        alreadyLoaded++
      }
    })

    if (alreadyLoaded === totalImagesCount) {
      // Todas las imágenes ya están cargadas, inicializar inmediatamente
      imagesLoaded = true
      loadedImagesCount = totalImagesCount
      await initCarousel()
    } else {
      // Esperar a que las imágenes se carguen (se inicializará en handleImageLoad)
      loadedImagesCount = alreadyLoaded
    }
  }
})

onUnmounted(() => {
  isMounted = false
  if (owlInstance && categoriesCarousel.value && window.$) {
    window.$(categoriesCarousel.value).trigger('destroy.owl.carousel')
    owlInstance = null
    isInitialized = false
  }
})
</script>

<style scoped lang="scss">
.motowork-accesories-categories__carousel {
  width: 100%;
  position: relative;
  padding: 48px 60px;

  @media (max-width: 767px) {
    padding: 48px 50px;
  }

  .categories-carousel {
    width: 100%;
    position: relative;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
  }

  &__grid--item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    figure {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 20px;

      img {
        width: 100%;
        max-width: 200px;
        height: auto;
        object-fit: contain;
        margin-bottom: 16px;

        @media (max-width: 767px) {
          max-width: 150px;
        }
      }

      figcaption {
        text-align: center;

        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #000;

          @media (max-width: 767px) {
            font-size: 16px;
          }
        }
      }
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background-color: #dc3545;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    z-index: 100;

    @media (max-width: 767px) {
      width: 44px;
      height: 44px;
    }

    &:hover {
      background-color: #c82333;
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &--left {
      left: 10px;

      @media (max-width: 767px) {
        left: 5px;
      }
    }

    &--right {
      right: 10px;

      @media (max-width: 767px) {
        right: 5px;
      }
    }

    .material-icons {
      font-size: 32px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 767px) {
        font-size: 28px;
      }
    }
  }
}

.right {
  right: 0;
  position: absolute;
  top: 50%;
}

.left {
  left: 0;
  position: absolute;
  top: 50%;
}
</style>
