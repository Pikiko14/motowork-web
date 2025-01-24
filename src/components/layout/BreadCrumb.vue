<template>
  <div class="motowork-breadcrumb">
    <q-breadcrumbs separator="---" class="text-primary" active-color="secondary">
      <q-breadcrumbs-el
        v-for="(item, idx) in items"
        :key="idx"
        :label="item.label"
        :icon="item.icon"
        :to="item.to" />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

// references
const items = ref([])

// methods
const setItems = () => {
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const queryParams = location.search

  items.value = [
    { icon: 'img:/images/home.svg', label: 'Inicio', to: '/' },
    ...pathSegments.map((segment, idx) => ({
      label: decodeURIComponent(segment),
      to: `/${pathSegments.slice(0, idx + 1).join('/')}${queryParams}`
    }))
  ]
}

// hook
onBeforeMount(() => {
  setItems()
})
</script>

<style scoped lang="scss">
.motowork-breadcrumb {
  padding: 24px 72px;
  margin: 0px auto;
  max-width: 1920px;
}

.q-link {
  font-family: Play;
  font-size: 12pt;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 15px */
  text-transform: uppercase;
}
</style>
