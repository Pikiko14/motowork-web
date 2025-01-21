<template>
  <div class="motowork-accessories-categories-vehicles__grid">
    <article
      class="motowork-accessories-categories-vehicles__grid--item"
      v-for="(cat, idx) in categories"
      :key="idx"
    >
      <figure>
        <img loading="lazy" :src="cat.icon" :alt="`Imagen de la categoría ${cat.name}`" :title="`Imagen de la categoría ${cat.name}`">
        <figcaption class="front-content">
          <h3>{{ cat.name }}</h3>
        </figcaption>
        <figcaption class="back-content">
          <h3>{{ cat.name }}</h3>
          <q-btn :to="`/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&category=${cat.name}`" no-cap square outline color="white" label="Comprar Ahora"></q-btn>
        </figcaption>
      </figure>
    </article>
  </div>
</template>

<script setup>
// import
import { defineProps } from 'vue'

// props
defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

</script>
