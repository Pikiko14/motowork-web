<template>
  <section class="payment-method">
    <!--Mercadopago-->
    <article class="payment-method__item">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="paymentMethod" val="mercadopago"
        color="secondary">
        <template #default>
          <div class="payment-method__item--complement">
            <h3>
              Mercado pago
            </h3>
            <img src="/images/mercado_pago.webp" alt="Icono de mercadopago" title="Mercadopago">
          </div>
          <p>
            Paga con tu tarjeta de crédito, débito, PSE o Efecty
          </p>
        </template>
      </q-radio>
    </article>
    <!--Mercadopago-->

    <!--Transferencia-->
    <article class="payment-method__item transfer">
      <q-radio @update:model-value="handlerShippingMethods" dense v-model="paymentMethod" val="trasnferencia"
        color="secondary">
        <template #default>
          <div class="payment-method__item--complement">
            <h3>
              Trasnferencia
            </h3>
            <img src="/images/transferencia_bancaria.webp" alt="Icono de transferencia bancaria" title="Transferencia bancaria">
          </div>
          <p>
           Paga con una trasnferencia bancaria.
          </p>
        </template>
      </q-radio>
    </article>
    <!--End trasnferencia-->
  </section>
</template>

<script setup>
// imports
import { ref, defineEmits } from 'vue'

// emits
const emit = defineEmits(['set-payment'])

// references
const paymentMethod = ref()

// methods
const handlerShippingMethods = (e) => {
  emit('set-payment', e)
}
</script>

<style scoped lang="scss">
.payment-method {
  display: flex;
  flex-direction: column;
  gap: 32px;

  article {
    padding: 24px 16px;
    border: 1px solid #E3E3E3;
  }

  &__item {
    display: flex;
    gap: 12px;
    padding: 24px;
    flex-direction: column;

    &--complement {
      gap: 12px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;

      h3 {
        overflow: hidden;
        color: #9F9C9C;
        text-overflow: ellipsis;

        /* Desktop/Body/Text/Medium */
        font-family: Ubuntu;
        font-size: 16pt;
        font-style: normal;
        font-weight: 400;
        line-height: 125%; /* 20px */
      }

      img {
        width: 40px;
        position: absolute;
        right: 0;
        top: -20px;
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

.transfer {
  img {
    top: 0px !important;
    width: 30px;
  }
}
</style>
