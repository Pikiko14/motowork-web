<template>
  <div class="order-resume__shipping-methods">
    <article class="order-resume__shipping-methods--item">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="shippingMethods" val="delivery" color="secondary">
        <template #default>
          <div class="order-resume__shipping-methods--item__complement">
            <h3>
              Entrega
            </h3>
            <span>
              00.000$
            </span>
          </div>
          <p>
            000 COP para pedidos inferiores a 000 COP gratis para pedidos superiores a 000 COP.
            La entrega se realizará en un plazo de 5 a 10 días hábiles.

          </p>
        </template>
      </q-radio>
    </article>
    <article class="order-resume__shipping-methods--item">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="shippingMethods" val="pick_on_store" color="secondary">
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

// references
const shippingMethods = ref('delivery')

// emit
const emit = defineEmits([
  'update-shipping'
])

// methods
const handlerShippingMethods = (e) => {
  emit('update-shipping', e)
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
