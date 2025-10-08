<template>
  <div class="motowork-item-page">
    <!--Header item-->
    <HeaderItems @do-search="handleSearch" @do-open-filter="openFilter" :orderMenu="orderMenu" @do-order="handleOrder"
      :title="`${query.type === 'vehicle' ? 'Motos' : ''} ${query.category ? query.category : 'Accesorios MOTOWORK'}`" />
    <!--End header item-->

    <!--pagination data-->
    <section class="motowork-item-page__paginator-label" v-if="totalPagesProduct > 0">
      <h2>MOSTRANDO {{ pageProduct }}-{{ query.perPage }} DE {{ totalProducts }} RESULTADOS</h2>
    </section>
    <!--end pagination data-->

    <!--grid items-->
    <GridItems :type="query.type"
      :brands="brandsList.length > 0 ? brandsList.filter((el) => el.is_active) : brands.filter((el) => el.is_active)"
      :products="products" :showFilter="showFilter"
      :categories="categoriesList.length > 0 ? categoriesList.filter((el) => el.is_active) : categories.filter((el) => el.is_active)"
      :pageCategory="page" :totalPageCategory="totalPages" :total-page-brand="totalPagesBrand" :page-brand="pageBrands"
      @handle-load-categories="loadMoreCategories" @do-filter-by-price="filterByPriceRange"
      @do-filter-by-power="filterByPowerRange" @handle-load-brands="loadMoreBrands" />
    <!--end grid items-->

    <!--Paginator-->
    <section class="motowork-item-page__paginator">
      <q-pagination :max-pages="6" boundary-links direction-links active-design="unelevated" flat
        active-color="secondary" unelevated @update:model-value="doPagination" color="secondary" v-model="pageNumber"
        :max="totalPagesProduct" />
    </section>
    <!--End paginator-->

    <!--Marcas-->
    <!--pagination data-->
    <section class="motowork-item-page__paginator-label"
      :class="{ 'q-pt-xl': $q.screen.gt.sm, 'q-pt-md': $q.screen.lt.md }">
      <h2>Conoce nuestras marcas de accesorios</h2>
    </section>
    <!--end pagination data-->

    <section class="motowork-item-page__all-brands">
      <article v-for="(brand, idx) in allBrands" :key="idx" class="motowork-item-page__all-brands--item"
        @click="handleBrand(brand.name)">
        <figure>
          <img :src="brand.icon">
        </figure>
        <div class="motowork-item-page__all-brands--item__overlay">
          <q-btn color="white" outline>Mas información</q-btn>
        </div>
      </article>
    </section>
    <!--End marcas-->
  </div>
</template>

<script setup>
// imports
import { useRoute, useRouter } from 'vue-router'
import GridItems from '../partials/GridItems.vue'
import { onBeforeMount, ref, computed } from 'vue'
import HeaderItems from '../partials/HeaderItems.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import { useBrandsContent } from 'src/composables/useBrandsContent'
import { useProductsContent } from 'src/composables/useProductContent'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'

// references
const pageNumber = ref(1)
const route = useRoute()
const router = useRouter()
const { query } = route
const orderMenu = ref([
  {
    label: 'Alfabeticamente',
    items: [
      {
        label: 'De la A - Z',
        value: '1',
        by: 'name'
      },
      {
        label: 'De la Z- A',
        value: '-1',
        by: 'name'
      }
    ]
  },
  {
    label: 'Creación',
    items: [
      {
        label: 'Recien añadidos',
        value: '-1',
        by: 'createdAt'
      },
      {
        label: 'Mas antiguos',
        value: '1',
        by: 'createdAt'
      }
    ]
  },
  {
    label: 'Precio',
    items: [
      {
        label: 'Menor precio',
        value: '1',
        by: 'price'
      },
      {
        label: 'Mayor precio',
        value: '-1',
        by: 'price'
      }
    ]
  }
])
const showFilter = ref(true)
const { getProducts, products, pageProduct, totalPagesProduct, totalProducts } = useProductsContent()
const {
  page,
  addOnePage,
  categories,
  getCategories,
  totalPages
} = useCategoriesContent()
const store = useStoreContent()
const { categoriesList, brandsList } = store
const { getBrandsList, brands, pageBrands, totalPagesBrand, addOnePageBrands, getAllBrands } = useBrandsContent()

// computed
const allBrands = computed(() => {
  return store.allBrands.filter((el) => el.is_active)
})

// methods
const openFilter = () => {
  showFilter.value = !showFilter.value
}

const getQueryString = (filters) => {
  const filteredFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value != null && value !== '')
  )
  return `?${new URLSearchParams(filteredFilters).toString()}`
}

const loadCategories = (append = false) => {
  const queryString = `?page=${page.value}&perPage=5&type=${query.type}`
  getCategories(queryString, append)
}

const loadMoreCategories = () => {
  addOnePage()
  loadCategories(true)
}

const loadMoreBrands = () => {
  addOnePageBrands()
  loadBrands(true)
}

const handleSearch = (e) => {
  const queryParams = {
    page: 1,
    perPage: query.perPage,
    type: query.type,
    sortBy: 'createdAt',
    order: '-1',
    search: e,
    category: query.category || '',
    state: query.state || ''
  }
  router.push({
    path: query.type ? 'vehiculos' : 'productos',
    query: queryParams
  })
}

const handleOrder = (item) => {
  const page = 1
  const perPage = route.query.perPage || 9
  const search = route.query.search || ''
  const type = route.query.type || 'vehicle'
  const sortBy = item.by
  const order = item.value
  const filter = route.query.filter || ''
  router.push({
    path: query.type ? 'vehiculos' : 'productos',
    query: {
      page,
      perPage,
      search,
      type,
      sortBy,
      order,
      filter,
      category: query.category || '',
      state: query.state || ''
    }
  })
}

const doPagination = (page) => {
  const perPage = route.query.perPage || 9
  const search = route.query.search || ''
  const type = route.query.type || 'vehicle'
  const sortBy = route.query.sortBy || 'createdAt'
  const order = route.query.order || '-1'
  const filter = route.query.filter || ''
  router.push({
    path: query.type ? 'vehiculos' : 'productos',
    query: {
      page,
      perPage,
      search,
      type,
      sortBy,
      order,
      filter,
      category: query.category || '',
      state: query.state || ''
    }
  })
}

const filterByPriceRange = (e) => {
  const priceFilter = { price: e }

  const existingFilter = route.query.filter ? JSON.parse(route.query.filter) : {}

  const filter = JSON.stringify({
    ...existingFilter,
    ...priceFilter
  })

  const perPage = route.query.perPage || 9
  const search = route.query.search || ''
  const type = route.query.type || 'vehicle'
  const sortBy = route.query.sortBy || 'createdAt'
  const order = route.query.order || '-1'

  router.push({
    path: query.type ? 'vehiculos' : 'productos',
    query: {
      page: 1,
      perPage,
      search,
      type,
      sortBy,
      order,
      category: query.category || '',
      filter,
      state: query.state || ''
    }
  })
}

const filterByPowerRange = (e) => {
  const powerFilter = { power: e }

  const existingFilter = route.query.filter ? JSON.parse(route.query.filter) : {}

  const filter = JSON.stringify({
    ...existingFilter,
    ...powerFilter
  })

  const perPage = route.query.perPage || 9
  const search = route.query.search || ''
  const type = route.query.type || 'vehicle'
  const sortBy = route.query.sortBy || 'createdAt'
  const order = route.query.order || '-1'

  router.push({
    path: query.type ? 'vehiculos' : 'productos',
    query: {
      page: 1,
      perPage,
      search,
      type,
      sortBy,
      order,
      category: query.category || '',
      filter,
      state: query.state || ''
    }
  })
}

const loadBrands = (append = false) => {
  const queryString = `?page=${pageBrands.value}&perPage=5&type=${query.type}`
  getBrandsList(queryString, append)
}

const loadAllBrands = async () => {
  try {
    const queryString = `?page=${pageBrands.value}&perPage=50&type=${query.type}`
    const response = await getAllBrands(queryString)
    store.setAllBrands(response.brands)
  } catch (error) {
    console.log(error)
  }
}

const handleBrand = (brand) => {
  window.open(`https://api.whatsapp.com/send?phone=573183996249&text=Hola%2C+me+gustar%C3%ADa+saber+mas+informaci%C3%B3n+acerca+de+los+accesorios+y+productos+de+la+categor%C3%ADa+%2A${brand}%2A%2C+Muchas+gracias`, '_blank')
}

// hooks
const queryString = getQueryString(query)
getProducts(queryString)
if (categoriesList && categoriesList.length === 0) {
  loadCategories()
}

if (query.type === 'product' && brandsList && brandsList.length === 0) {
  loadBrands()
}

onBeforeMount(async () => {
  pageNumber.value = parseInt(route.query.page)
  if (allBrands.value.length === 0) {
    await loadAllBrands()
  }
})
</script>
