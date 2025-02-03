<template>
  <div class="order-resume__shipping-methods">
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
            El precio del envio dependera del peso total de tu pedido y la transportadora de tu elección.
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
            Recibirá un correo electrónico cuando el pedido esté listo para ser recogido.

          </p>
        </template>
      </q-radio>
    </article>
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useOrdersStore } from 'src/stores/ordersStore'

// references
const conveyor = ref('')
const store = useOrdersStore()
const shippingMethods = ref('delivery')
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

// methods
const handlerShippingMethods = (e) => {
  emit('update-shipping', e)
}

const setConveyor = (e) => {
  store.setConveyor(e)
}

</script>

<style scoped lang="scss">
.order-resume__shipping-methods {
  display: flex;
  flex-direction: column;

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
</style>
