<template>
  <div class="motowork-item-page">
    <!--Header item-->
    <HeaderItems @do-open-filter="openFilter" :orderMenu="orderMenu" :title="'Motos Yamaha'" />
    <!--End header item-->
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue'
import HeaderItems from '../partials/HeaderItems.vue'

// references
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

// methods
const openFilter = () => {
  alert('opening filters')
}
</script>
