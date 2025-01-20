<template>
  <section class="motowork-item-page__grid">
    <!--items grid-->
    <div class="motowork-item-page__grid--items">
      <!--item product-->
      <article class="motowork-item-page__grid--items__product" v-for="(product, idx) in products" :key="idx">
        <figure>
          <img :src="getBannerUrl(idx)" :alt="`Imagen de la motocicleta ${product.name}`" title="product.name" />
          <div class="overflow">
            <q-btn square outline color="white" label="Agendar test drive"></q-btn>
          </div>
        </figure>

        <div class="motowork-item-page__grid--items__product--content">
          <h2>{{ product.name }}</h2>
          <h3>ref: {{ product.name }}</h3>
          <div class="motowork-item-page__grid--items__product--content__price">
            <span class="motowork-item-page__grid--items__product--content__price--label">Desde</span>
            <span class="motowork-item-page__grid--items__product--content__price--amount">
              {{ formatPrice(product.discount || product.price) }}
            </span>
          </div>
        </div>
      </article>
      <!--end item product-->
    </div>
    <!--end items grid-->

    <aside class="motowork-item-page__grid--filters" v-if="showFilter">
      <h3>Categoría</h3>
      <ul>
        <li><input type="checkbox" /> Super deportivas</li>
        <li><input type="checkbox" /> Sport Touring</li>
        <li><input type="checkbox" /> Urban</li>
      </ul>
      <h3>Precio</h3>
      <input type="range" />
      <h3>Potencia / Cilindraje</h3>
      <input type="range" />
      <h3>Licencia</h3>
      <ul>
        <li><input type="checkbox" /> A</li>
        <li><input type="checkbox" /> A1</li>
        <li><input type="checkbox" /> A2</li>
      </ul>
    </aside>
  </section>
</template>

<script setup>
// imports
import { defineProps } from 'vue'
import { formatPrice } from 'src/utils/utils'

// props
const props = defineProps({
  showFilter: {
    type: Boolean,
    default: () => false
  },
  products: {
    type: Array,
    default: () => []
  }
})

// methods
const getBannerUrl = (idx) => {
  const { images } = props.products[idx]
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
