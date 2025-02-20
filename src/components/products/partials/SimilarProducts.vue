<template>
  <div class="motowork-similars">
    <h2>Productos similares</h2>

    <section class="motowork-similars__grid">
      <article class="motowork-similars__grid--item" v-for="(product, idx) in similarsProducts" :key="idx">
        <figure>
          <img :src="getBannerUrl(idx)" :alt="`Imagen de la motocicleta ${product.name}`" title="product.name" />
          <div class="overflow">
            <q-btn :to="`/vehiculos/${product.name}?reference=${product._id}`" v-if="route.query.type !== 'product'"
              square outline color="white" label="Prueba de manejo"></q-btn>
            <q-btn :to="`/productos/${product.name}?reference=${product._id}`" v-else square outline color="white"
              label="Agendar al carrito"></q-btn>
          </div>
        </figure>

        <div class="motowork-similars__grid--item--content">
          <h3>{{ product.name }}</h3>
          <h4>ref: {{ product.model }}</h4>
          <div class="motowork-similars__grid--item--content__price">
            <span class="motowork-similars__grid--item--content__price--label">Desde</span>
            <span class="motowork-similars__grid--item--content__price--amount">
              {{ formatPrice(product.discount || product.price) }}
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
// imports
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { formatPrice } from 'src/utils/utils'

// props
const props = defineProps({
  similarsProducts: {
    type: Array,
    default: () => []
  }
})

// references
const route = useRoute()

// methods
const getBannerUrl = (idx) => {
  const { images } = props.similarsProducts[idx]
  let url = ''
  const mobileImage = images.find((image) => image.type === 'mobile')
  if (mobileImage) {
    url = mobileImage.path
  } else {
    const desktopImage = images.find((image) => image.type === 'desktop')
    if (desktopImage) {
      url = desktopImage.path
    }
  }
  return url
}
</script>

<style scoped lang="scss">
.motowork-similars {
  display: flex;
  flex-direction: column;
  gap: 32px;

  h2 {
    color: #000;

    /* Desktop/Headings/H3 */
    font-family: Play;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 40px */
    text-transform: uppercase;

    @media(max-width: 767px) {
      font-size: 20px;
    }
  }

  &__grid {
    display: flex;
    width: 100%;
    gap: 16px;
    flex: 4;
    display: flex;
    flex-wrap: wrap;

    &--item {
      flex: 1 1 calc(25% - 20px);
      max-width: calc(25% - 20px);
      transition: all .1s ease-out;

      figure {
        aspect-ratio: 1/1;
        width: 100%;
        height: 296px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overflow {
          display: none;
          background: rgba(237, 28, 36, 0.80);
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;

          .q-btn {
            height: 39px;
          }
        }

        @media(max-width: 1260px) {
          height: 220px;
        }

        @media(max-width: 1090px) {
          height: 180px;
        }

        @media (max-width: 991px) {
          height: 260px;
        }

        @media (max-width: 850px) {
          height: 210px;
        }

        @media (max-width: 850PX) {
          height: 210px;
        }

        @media(min-width: 1601px) {
          height: 340px;
        }

        @media(max-width: 550px) {
          height: 128px;
        }
      }

      &--content {
        padding: 12px;
        display: flex;
        flex-direction: column;

        h3 {
          color: #ed1c24 !important;

          /* Desktop/Body/Text/Small */
          font-family: Ubuntu;
          font-size: 12pt;
          font-style: normal;
          font-weight: 400;
          line-height: 125%;
          /* 15px */

          @media(max-width: 767px) {
            font-size: 9pt;
          }
        }

        h4 {
          margin-top: 4px;
          color: #000;

          /* Desktop/Body/Title/Medium */
          font-family: Play;
          font-size: 14pt;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 20px */
          text-transform: uppercase;

          @media(max-width: 767px) {
            font-size: 12pt;
          }
        }

        &__price {
          display: flex;
          margin-top: 20px;
          justify-content: space-between;
          align-items: center;

          &--label {
            color: #000;

            /* Desktop/Body/Title/Small */
            font-family: Play;
            font-size: 12pt;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            /* 15px */
            text-transform: uppercase;

            @media(max-width: 767px) {
              font-size: 9pt;
            }
          }

          &--amount {
            color: #000;
            text-align: right;

            /* Desktop/Body/Title/Medium */
            font-family: Play;
            font-size: 16pt;
            font-style: normal;
            font-weight: 700;
            line-height: 125%;
            /* 20px */
            text-transform: uppercase;

            @media(max-width: 767px) {
              font-size: 12pt;
            }
          }

          @media(max-width: 767px) {
            margin-top: 15px;
          }
        }
      }

      &:hover {
        figure {
          .overflow {
            display: flex;

            @media(max-width: 767px) {
              display: none;
            }
          }
        }
      }

      @media (max-width: 991px) {
        flex: 1 1 calc(50% - 20px);
        max-width: calc(50% - 20px);
      }

      &:hover {
        transform: scale(1.03);
      }
    }
  }
}
</style>
