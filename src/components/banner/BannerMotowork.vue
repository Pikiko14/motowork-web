<template>
  <section class="motowor-banner"
    :class="{ 'reduce': reduceBanner, 'about-us-banner': isAboutBanner, 'experience-banner': isExperienceBanner }"
    :style="{ height: bannerHeight }">
    <figure :style="{ height: bannerHeight }">
      <img class="motowor-banner__image" v-if="!banner.path" :src="currentImageSrc" :alt="banner.name"
        :title="banner.name">

      <img class="motowor-banner__image" v-else :src="currentImageSrc" :alt="bannerAlt" :title="bannerAlt">
      <figcaption :class="{ 'no-overflow': noOverflow, 'justify-end': contentEnd }">
        <div class="container">
          <div class="row">
            <div class="col-12" v-if="title">
              <h1>{{ title }}</h1>
            </div>
            <div class="col-12" v-if="bannerComplement">
              <p :class="{ 'ellipsis-3-lines': $q.screen.lt.md, 'ellipsis-5-lines': $q.screen.gt.sm }">
                {{ bannerComplement }}
              </p>
            </div>
            <div class="col-12 q-mt-xl" v-if="banner.link && !noOverflow">
              <q-btn type="a" :href="banner.link || ''" no-cap square outline color="white" :label="btnLabel"></q-btn>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  </section>
</template>

<script setup>
// import
import { useQuasar } from 'quasar'
import { computed, defineProps, ref, onMounted, onUnmounted } from 'vue'

// references
const q = useQuasar()
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)

// props
const props = defineProps({
  banner: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: () => ''
  },
  bannerComplement: {
    type: String,
    default: () => ''
  },
  btnLabel: {
    type: String,
    default: () => ''
  },
  defaultImg: {
    type: String,
    default: () => 'https://res.cloudinary.com/dg14xloef/image/upload/v1737399147/banners/u0ouwhxrqv0v05mfyc2s.webp'
  },
  mobileImage: {
    type: String,
    default: () => ''
  },
  noOverflow: {
    type: Boolean,
    default: () => false
  },
  bannerAlt: {
    type: String,
    default: () => 'Un banner de motowork utilizado en las distintas landings'
  },
  contentEnd: {
    type: Boolean,
    default: () => false
  },
  reduceBanner: {
    type: Boolean,
    default: () => false
  },
  isAboutBanner: {
    type: Boolean,
    default: () => false
  },
  isExperienceBanner: {
    type: Boolean,
    default: () => false
  }
})

// computed
const imgBanner = computed(() => {
  if (props.banner && props.banner.images) {
    if (q.screen.lt.md) {
      return props.banner.images.find((item) => item.type === 'mobile')
    }

    if (q.screen.lt.lg) {
      return props.banner.images.find((item) => item.type === 'tablet')
    }
    return props.banner.images.find((item) => item.type === 'desktop')
  }
  return {
    path: ''
  }
})

// Computed para la imagen actual (usa mobileImage si está disponible y es mobile)
const currentImageSrc = computed(() => {
  // Si hay mobileImage y estamos en mobile (≤768px), usar mobileImage
  if (props.mobileImage && windowWidth.value <= 768) {
    return props.mobileImage
  }

  // Si hay banner.path, usar banner.path
  if (props.banner.path) {
    return props.banner.path || props.defaultImg
  }

  // Si no, usar la lógica de imgBanner
  return imgBanner.value.path || props.defaultImg
})

// Computed para la altura del banner (relativa desde 768px hacia arriba hasta 500px)
const bannerHeight = computed(() => {
  const width = windowWidth.value

  // Si es mobile (≤768px), usar altura fija
  if (width <= 768) {
    return '320px'
  }

  // Desde 768px hacia arriba: altura relativa hasta 500px
  // Fórmula: altura = 400 + (width - 768) * (100 / (1600 - 768))
  // A 768px: 400px, a 1600px: 500px
  if (width <= 1600) {
    const minHeight = 400 // altura a 768px
    const maxHeight = 500 // altura a 1600px
    const minWidth = 768
    const maxWidth = 1600
    const ratio = (maxHeight - minHeight) / (maxWidth - minWidth)
    const calculatedHeight = minHeight + (width - minWidth) * ratio
    return `${calculatedHeight}px`
  }

  // Por encima de 1600px, mantener 500px
  return '500px'
})

// Handler para resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Hooks
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.motowor-banner {
  max-width: 1600px;
  margin: 0px auto !important;

  figure {
    width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    figcaption {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 10px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* Linear gradient */
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.422) 0%, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0.121) 100%);

      h1 {
        color: #FFF;
        /* Desktop/Headings/H1 */
        font-family: Play;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 60px */
        text-transform: uppercase;

        @media(max-width: 767px) {
          font-size: 28px;
        }
      }

      p {
        color: #fff;
        /* Desktop/Body/Text/Large */
        font-family: Ubuntu;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 30px */
        margin-top: 24px;
        max-width: 70%;

        @media(max-width: 991px) {
          max-width: 90%;
        }

        @media(max-width: 767px) {
          max-width: 100%;
          margin-top: 16px;
          font-size: 20px;
        }
      }

      .q-btn {
        height: 48px;
        color: #FFF;
        /* Desktop/Body/Title/Medium */
        font-family: Play;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 20px */
        text-transform: uppercase;
      }
    }
  }
}

.motowor-banner.reduce {
  height: 270px;

  figure {
    height: 270px;
  }

  .container {
    max-width: 80% !important;
  }
}

.no-overflow {
  background: transparent !important;

  h1,
  p {
    color: $primary !important;
  }
}

.justify-end {
  justify-content: flex-end !important;
  padding-bottom: 64px !important;
}

.about-us-banner {

  figure {
    .logo {
      width: 219px;
    }

    img {
      object-position: top;
    }
  }
}

.experience-banner {
  figure {
    img {
      object-position: bottom;
    }
  }
}
</style>
