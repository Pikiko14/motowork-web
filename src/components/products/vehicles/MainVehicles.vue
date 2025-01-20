<template>
  <div class="motowork-item-page">
    <!--Header item-->
    <HeaderItems @do-open-filter="openFilter" :orderMenu="orderMenu" :title="'Motos Yamaha'" />
    <!--End header item-->

    <!--grid items-->
    <GridItems
      :products="products"
    />
    <!--End grid items-->
    {{ pageProduct }} {{ totalPagesProduct }} {{ products.length }}
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GridItems from '../partials/GridItems.vue'
import HeaderItems from '../partials/HeaderItems.vue'
import { useProductsContent } from 'src/composables/useProductContent'

// references
const route = useRoute()
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
const showFilter = ref(false)
const { getProducts, products, pageProduct, totalPagesProduct } = useProductsContent()

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

// hooks
const queryString = getQueryString(query)
console.log(queryString)
getProducts(queryString)
</script>
