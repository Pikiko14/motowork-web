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

    <!--filter section-->
    <aside class="motowork-item-page__grid--filters" v-if="showFilter">
      <div class="motowork-item-page__grid--filters__section">
        <h3>Categoría</h3>
        <ul>
          <li v-for="(category, idx) in categories" :key="idx">
            <q-btn :class="{ 'text-secondary': $route.query.category && $route.query.category === category.name }"
              unelevated dense :to="`/vehiculos?page=1&perPage=9&type=${type}&category=${category.name}`"
              :label="category.name"></q-btn>
          </li>
          <li v-if="pageCategory < totalPageCategory" class="q-mt-sm show-more cursor-pointer" @click="showMoreCategories">
            Mostar mas <q-icon name="img:/images/dropdown.svg"></q-icon>
          </li>
        </ul>
      </div>

      <div class="motowork-item-page__grid--filters__section">
        <h3>Precio</h3>
        <q-range
          v-model="priceRange"
          :min="1000000"
          :max="10000000000"
          color="secondary"
          label
          @change="doFilterByPrice"
        />
      </div>

      <div class="motowork-item-page__grid--filters__section" v-if="type === 'vehicle'">
        <h3>Potencia / Cilindraje</h3>
        <q-range
          v-model="powerRange"
          :min="75"
          :max="1500"
          color="secondary"
          label
          @change="doFilterByPower"
        />
      </div>
    </aside>
    <!--end filter section-->
  </section>
</template>

<script setup>
// imports, ref
import { formatPrice } from 'src/utils/utils'
import { defineProps, defineEmits, ref } from 'vue'

// emit
const emit = defineEmits([
  'do-filter-by-price',
  'handle-load-categories',
  'do-filter-by-power'
])

// reference
const priceRange = ref({
  min: 1000000,
  max: 10000000000
})

const powerRange = ref({
  min: 75,
  max: 1500
})

// props
const props = defineProps({
  showFilter: {
    type: Boolean,
    default: () => false
  },
  products: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: () => ''
  },
  pageCategory: {
    type: Number,
    default: 1
  },
  totalPageCategory: {
    type: Number,
    defualt: 1
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

const showMoreCategories = () => {
  emit('handle-load-categories')
}

const doFilterByPrice = (e) => {
  emit('do-filter-by-price', e)
}

const doFilterByPower = (e) => {
  emit('do-filter-by-power', e)
}
</script>

<style lang="scss" scoped>
.show-more {
  font-size: 12pt;

  &:hover {
    color: $secondary;
  }
}
</style>
