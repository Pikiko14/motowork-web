<template>
  <div class="motowork-accessories-categories-vehicles__carousel">
    <div class="owl-carousel owl-theme vehicles-carousel" ref="vehiclesCarousel">
      <div v-for="(cat, idx) in categories" :key="idx" class="item">
        <figure class="vehicles-carousel__image" :class="{ 'has-background': !cat.icon || cat.icon === '' }">
          <img v-if="cat.icon && cat.icon !== ''" loading="lazy" :src="cat.icon"
            :alt="`Imagen de la categoría ${cat.name}`" :title="`Imagen de la categoría ${cat.name}`"
            @error="handleImageError($event)" />
        </figure>
        <div class="vehicles-carousel__text-box q-mt-lg">
          <p class="vehicles-carousel__description text-bold">
            {{ cat.name }}
          </p>
          <q-btn :to="`/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&category=${cat.name}`" no-cap
            square unelevated color="secondary" class="vehicles-carousel__button" label="CONOCELA AQUÍ" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import
import { defineProps, ref, onMounted, onUnmounted, nextTick } from 'vue'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

// props
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

// carousel ref
const vehiclesCarousel = ref(null)
let owlInstance = null

// methods
onMounted(async () => {
  // Import jQuery and owl.carousel dynamically
  const $ = (await import('jquery')).default

  // Make jQuery available globally
  if (typeof window !== 'undefined') {
    window.$ = window.jQuery = $
  }

  // Import owl.carousel after jQuery is available
  await import('owl.carousel')

  nextTick(() => {
    if (vehiclesCarousel.value && window.$) {
      owlInstance = window.$(vehiclesCarousel.value).owlCarousel({
        center: true,
        items: 3,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        stagePadding: 100,
        responsive: {
          0: {
            items: 1,
            stagePadding: 0
          },
          768: {
            items: 1.7,
            stagePadding: 80
          },
          1200: {
            items: 1.9,
            stagePadding: 100
          }
        },
        onChanged: (event) => {
          // Asegurar que el texto y botón se muestren solo en el item central
          const items = event.target.querySelectorAll('.item')
          items.forEach((item, index) => {
            const textBox = item.querySelector('.vehicles-carousel__text-box')
            if (textBox) {
              if (item.classList.contains('center')) {
                textBox.style.display = 'flex'
              } else {
                textBox.style.display = 'none'
              }
            }
          })
        },
        onInitialized: (event) => {
          // Mostrar texto solo en el item central al inicializar
          const items = event.target.querySelectorAll('.item')
          items.forEach((item) => {
            const textBox = item.querySelector('.vehicles-carousel__text-box')
            if (textBox) {
              if (item.classList.contains('center')) {
                textBox.style.display = 'flex'
              } else {
                textBox.style.display = 'none'
              }
            }
          })
        }
      })
    }
  })
})

const handleImageError = (event) => {
  // Si la imagen falla al cargar, ocultarla para mostrar el fondo
  event.target.style.display = 'none'
  if (event.target.parentElement) {
    event.target.parentElement.classList.add('has-background')
  }
}

onUnmounted(() => {
  if (owlInstance && vehiclesCarousel.value && window.$) {
    window.$(vehiclesCarousel.value).trigger('destroy.owl.carousel')
    owlInstance = null
  }
})
</script>

<style scoped lang="scss">
.motowork-accessories-categories-vehicles__carousel {
  width: 100%;
  position: relative;
  padding: 48px 0;

  .vehicles-carousel {
    width: 100%;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      padding: 0;
      overflow: hidden;
    }

    &__image {
      width: 100%;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      margin-bottom: 24px;
      transition: transform 0.3s ease;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        transition: transform 0.3s ease;
      }

      &.has-background {
        background-image: url('/images/main_motowork.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      @media (max-width: 1199px) {
        height: 350px;
      }

      @media (max-width: 767px) {
        height: 300px;
        margin-bottom: 16px;
      }
    }

    // Estilos para el item central - imagen más grande
    :deep(.owl-item.center) {
      .vehicles-carousel__image {
        transform: scale(1.2);
        height: 480px;

        @media (max-width: 1199px) {
          height: 420px;
        }

        @media (max-width: 767px) {
          height: 360px;
        }
      }

      .vehicles-carousel__text-box {
        display: flex !important;
      }
    }

    // Estilos para items laterales - imagen más pequeña
    :deep(.owl-item:not(.center)) {
      .vehicles-carousel__image {
        transform: scale(0.85);
        opacity: 0.7;
      }
    }

    &__text-box {
      width: 100%;
      display: none; // Oculto por defecto, se mostrará solo en el item central
      flex-direction: column;
      gap: 20px;
      align-items: center;
      text-align: center;
      padding: 0 16px;
    }

    &__description {
      color: #000;
      font-family: Ubuntu;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
      margin: 0;
      text-align: center;

      @media (max-width: 991px) {
        font-size: 14px;
      }

      @media (max-width: 767px) {
        font-size: 13px;
      }
    }

    &__highlight {
      color: #37abff;
      font-weight: 700;
    }

    &__button {
      padding: 12px 32px;
      font-family: Play;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 200px;

      @media (max-width: 767px) {
        padding: 10px 24px;
        font-size: 14px;
        min-width: 180px;
      }
    }

  }
}
</style>
