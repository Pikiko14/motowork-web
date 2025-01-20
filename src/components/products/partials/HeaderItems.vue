<template>
  <section class="motowork-item-page__header">
    <h2>
      {{ title }}
    </h2>

    <div class="motowork-item-page__header--search-and-filter">
      <q-input v-model="search" square outlined placeholder="Buscar por nombre"></q-input>
      <q-btn color="secondary" unelevated icon="img:/images/order_icon.svg">
        <q-menu>
          <q-list class="menu-list">
            <q-item-label header>
              <span class="sort-title">Odenar</span>
            </q-item-label>
            <q-item v-for="(item, idx) in orderMenu" :key="idx">
              <q-item-section>
                <q-item-label>
                  <span class="sort-item-label">
                    {{ item.label }}
                  </span>
                  <div class="list-subitems cursor-pointer">
                    <div class="list-subitem-label" v-close-popup @click="handleDoOrder(subitem)"
                      v-for="(subitem, idx2) in item.items" :key="idx2">
                      {{ subitem.label }}
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-tooltip class="bg-secondary">
          Ordenar
        </q-tooltip>
      </q-btn>
      <q-btn @click="openFilterSection" color="primary" unelevated icon="filter_alt">
        <q-tooltip class="bg-primary">
          Filtrar
        </q-tooltip>
      </q-btn>
    </div>
  </section>
</template>

<script setup>
// imports
import { defineProps, ref } from 'vue'

// references
const search = ref('')

// emits
const emit = defineEmits(['do-order', 'do-open-filter'])

// props
defineProps({
  title: {
    type: String,
    default: () => 'Motos Yamaha'
  },
  orderMenu: {
    type: Array,
    default: () => []
  }
})

// methods
const handleDoOrder = (item) => {
  emit('do-order', item)
}

const openFilterSection = () => {
  emit('do-open-filter')
}
</script>

<style scoped lang="scss">
.sort-title {
  color: $secondary;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  /* 20px */
  text-transform: uppercase;
}

.sort-item-label {
  color: var(--Primary-Primary, #000);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  /* 15px */
  text-transform: uppercase;
}

.list-subitem-label {
  overflow: hidden;
  color: var(--Principales-950---Principal, #000);
  text-overflow: ellipsis;

  /* Desktop/Body/Text/Small */
  font-family: Ubuntu;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  /* 15px */
}

.list-subitems {
  margin-top: 8px;
}

.list-subitem-label {
  padding-top: 8px;
  padding-bottom: 8px;
}

.menu-list {
  padding: 15px 20px 20px 20px;
}
</style>
