<template>
  <div class="order-resume__shipping-methods" :class="{ 'full-width': $route.path === '/carro-de-compra/detalles-del-envio' }">
    <article class="order-resume__shipping-methods--item">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="shippingMethods" val="delivery"
        color="secondary">
        <template #default>
          <div class="order-resume__shipping-methods--item__complement">
            <h3>
              Entrega
            </h3>
          </div>
          <p>
            El costo del envio dependera del peso total de tu pedido y la transportadora de tu elección, sera costeado en su totalidad por el cliente.
          </p>
          <q-select @update:model-value="setConveyor" emit-value map-options class="q-mt-md" :options="conveyorsOptions"
            v-if="shippingMethods === 'delivery'" v-model="conveyor" square outlined></q-select>
        </template>
      </q-radio>
    </article>
    <article class="order-resume__shipping-methods--item">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="shippingMethods" val="pick_on_store"
        color="secondary">
        <template #default>
          <div class="order-resume__shipping-methods--item__complement">
            <h3>
              Recoger en MotoWork
            </h3>
            <span>
              Gratis
            </span>
          </div>
          <p>
            No hay gastos de envío para este pedido.
            Recibirá un correo electrónico dentro de 2 a 3 días hábiles cuando su pedido esté disponible.
          </p>
        </template>
      </q-radio>
    </article>
  </div>
</template>

<script setup>
// imports
import { ref, computed, onBeforeMount } from 'vue'
import { useOrdersStore } from 'src/stores/ordersStore'

// references
const conveyor = ref('')
const store = useOrdersStore()
const shippingMethods = ref('')
const conveyorsOptions = [
  {
    label: 'Servientrega',
    value: 'servientrega'
  },
  {
    label: 'Inter Rapidísimo',
    value: 'inter_rapidisimo'
  },
  {
    label: 'Coordinadora',
    value: 'coordinadora'
  },
  {
    label: 'Envía',
    value: 'envia'
  },
  {
    label: 'TCC',
    value: 'tcc'
  }
]

// emit
const emit = defineEmits([
  'update-shipping'
])

// computed
const shippingInStore = computed(() => {
  return store.shippingMethodSelected
})

const conveyorInStore = computed(() => {
  return store.conveyorSelected
})

// methods
const handlerShippingMethods = (e) => {
  emit('update-shipping', e)
}

const setConveyor = (e) => {
  store.setConveyor(e)
}

// hook
onBeforeMount(() => {
  if (shippingInStore.value) {
    shippingMethods.value = shippingInStore.value
  }

  if (conveyorInStore.value) {
    conveyor.value = conveyorInStore.value
  }
})
</script>

<style scoped lang="scss">
.order-resume__shipping-methods {
  display: flex;
  flex-direction: column;
  max-width: 640px;

  &--item {
    display: flex;
    gap: 12px;
    padding: 24px;

    &__complement {
      gap: 12px;
      display: flex;
      justify-content: space-between;

      h3 {
        color: #000;

        /* Desktop/Body/Description/Medium */
        font-family: Ubuntu;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 125%;
        /* 20px */
      }
    }

    p {
      color: #9F9C9C;

      /* Desktop/Body/Text/Medium */
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */
      margin-top: 12px;
    }

    border-bottom: 1px solid #E3E3E3;
    border-left: 1px solid #E3E3E3;
    border-right: 1px solid #E3E3E3;

    &:not(:last-child) {
      border-top: 1px solid #E3E3E3;
    }
  }
}

.full-width {
  max-width: 100%;
}
</style>
