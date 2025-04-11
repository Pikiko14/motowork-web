<template>
  <section class="motowork-item-page__grid">
    <!--items grid-->
    <div class="motowork-item-page__grid--items">
      <!--item product-->
      <article class="motowork-item-page__grid--items__product" v-for="(product, idx) in products" :key="idx" @click="handlerRouterPush(product)">
        <figure>
          <img :src="getBannerUrl(idx)" :alt="`Imagen de la motocicleta ${product.name}`" title="product.name" />
          <div class="overflow">
            <q-btn :to="`/vehiculos/${urlString(product.name)}?reference=${product._id}`" v-if="route.query.type !== 'product'"
              square outline color="white" label="Ver vehículo"></q-btn>
            <q-btn :to="`/productos/${urlString(product.name)}?reference=${product._id}`" v-else square outline color="white"
            :label="$q.screen.gt.xs ? 'Agregar al carrito' : 'Agregar'"></q-btn>
          </div>
        </figure>

        <div class="motowork-item-page__grid--items__product--content">
          <h2>{{ product.name }}</h2>
          <h3>ref: {{ product.model }}</h3>
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
      <div class="motowork-item-page__grid--filters__section" v-if="type !== 'vehicle'">
        <h3>Marcas</h3>
        <ul>
          <li v-for="(brand, idx) in brands" :key="idx">
            <q-btn :class="{ 'text-secondary': $route.query.brand && $route.query.brand === brand.name }" unelevated
              dense
              :to="`/vehiculos?page=1&perPage=9&type=${type}&brand=${brand.name}&category=${route.query.category || ''}`"
              :label="brand.name"></q-btn>
          </li>
          <li v-if="pageBrand < totalPageBrand" class="q-mt-sm show-more cursor-pointer" @click="showMoreBrands">
            Mostar mas <q-icon name="img:/images/dropdown.svg"></q-icon>
          </li>
        </ul>
      </div>

      <div class="motowork-item-page__grid--filters__section">
        <h3>Categoría</h3>
        <ul>
          <li v-for="(category, idx) in categories" :key="idx">
            <q-btn :class="{ 'text-secondary': $route.query.category && $route.query.category === category.name }"
              unelevated dense
              :to="`/vehiculos?page=1&perPage=9&type=${type}&category=${category.name}&brand=${route.query.brand || ''}`"
              :label="category.name"></q-btn>
          </li>
          <li v-if="pageCategory < totalPageCategory" class="q-mt-sm show-more cursor-pointer"
            @click="showMoreCategories">
            Mostar mas <q-icon name="img:/images/dropdown.svg"></q-icon>
          </li>
        </ul>
      </div>

      <div class="motowork-item-page__grid--filters__section">
        <h3>Precio</h3>
        <q-range v-model="priceRange" :min="minPrice" :max="maxPrice" color="secondary" label style="width: 90%"
          @change="doFilterByPrice" />
      </div>

      <div class="motowork-item-page__grid--filters__section" v-if="type === 'vehicle'">
        <h3>Potencia / Cilindraje</h3>
        <q-range v-model="powerRange" :min="75" :max="1500" style="width: 90%" color="secondary" label
          @change="doFilterByPower" />
      </div>

      <div class="motowork-item-page__grid--filters__section text-center"
        v-if="route.query.category || route.query.filter">
        <q-btn @click="resetFilter" color="secondary" unelevated square label="Reiniciar"></q-btn>
      </div>
    </aside>
    <!--end filter section-->
  </section>
</template>

<script setup>
// imports, ref
import { useQuasar } from 'quasar'
import { formatPrice } from 'src/utils/utils'
import { useRoute, useRouter } from 'vue-router'
import { defineProps, defineEmits, ref, onBeforeMount } from 'vue'

// emit
const emit = defineEmits([
  'do-filter-by-price',
  'handle-load-categories',
  'do-filter-by-power',
  'handle-load-brands'
])

// reference
const q = useQuasar()
const minPrice = ref(1)
const route = useRoute()
const router = useRouter()
const maxPrice = ref(100000000)
const priceRange = ref({
  min: 10000,
  max: 100000000
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
  },
  brands: {
    type: Array,
    default: () => []
  },
  pageBrand: {
    type: Number,
    default: 1
  },
  totalPageBrand: {
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

const resetFilter = () => {
  router.push({
    path: route.path,
    query: {
      page: 1,
      perPage: 9,
      sortBy: 'createdAt',
      order: '-1',
      type: route.query.type
    }
  })
}

const showMoreBrands = () => {
  emit('handle-load-brands')
}

const urlString = (value) => {
  if (!value) return ''
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

const handlerRouterPush = (product) => {
  if (q.screen.gt.sm) {
    return
  }
  let path = ''
  if (route.query.type !== 'product') {
    path = `/vehiculos/${urlString(product.name)}`
  } else {
    path = `/productos/${urlString(product.name)}`
  }
  router.push({
    path,
    query: {
      reference: product._id
    }
  })
}

// hook
onBeforeMount(() => {
  if (route.query.filter) {
    const filter = JSON.parse(route.query.filter)
    if (filter.price) {
      const { min, max } = filter.price
      priceRange.value.min = min || priceRange.value.min
      priceRange.value.max = max || priceRange.value.max
    }
    if (filter.power) {
      const { min, max } = filter.power
      powerRange.value.min = min || powerRange.value.min
      powerRange.value.max = max || powerRange.value.max
    }
  }
})
</script>

<style lang="scss" scoped>
.show-more {
  font-size: 12pt;

  &:hover {
    color: $secondary;
  }
}
</style>
