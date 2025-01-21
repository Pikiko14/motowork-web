<template>
  <div class="motowork-item-page">
    <!--Header item-->
    <HeaderItems @do-search="handleSearch" @do-open-filter="openFilter" :orderMenu="orderMenu"
      @do-order="handleOrder"
      :title="'Motos Yamaha'" />
    <!--End header item-->

    <!--pagination data-->
    <section class="motowork-item-page__paginator-label" v-if="totalPagesProduct > 0">
      <h2>MOSTRANDO {{ pageProduct }}-{{ query.perPage }} DE {{ totalPagesProduct }} RESULTADOS</h2>
    </section>
    <!--end pagination data-->

    <!--grid items-->
    <GridItems :type="query.type" :products="products" :showFilter="showFilter"
      :categories="categoriesList.length > 0 ? categoriesList : categories" :pageCategory="page"
      :totalPageCategory="totalPages" @handle-load-categories="loadMoreCategories" />
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GridItems from '../partials/GridItems.vue'
import HeaderItems from '../partials/HeaderItems.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import { useProductsContent } from 'src/composables/useProductContent'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'

// references
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
const { getProducts, products, pageProduct, totalPagesProduct } = useProductsContent()
const {
  page,
  addOnePage,
  categories,
  getCategories,
  totalPages
} = useCategoriesContent()
const store = useStoreContent()
const { categoriesList } = store

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

const handleSearch = (e) => {
  const queryParams = {
    page: 1,
    perPage: query.perPage,
    type: query.type,
    sortBy: 'createdAt',
    order: '-1',
    search: e,
    category: query.category || ''
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
      category: query.category || ''
    }
  })
}

// hooks
const queryString = getQueryString(query)
getProducts(queryString)
if (categoriesList && categoriesList.length === 0) {
  loadCategories()
}
</script>
