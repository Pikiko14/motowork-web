<template>
  <section class="order-resume">
    <!--Shipping methods-->
    <ShippingMethodsSelectorVue
      v-if="$route.path !== '/carro-de-compra/detalles-del-envio' && $route.path !== '/carro-de-compra/detalles-de-pago' && !$route.params.status"
      @update-shipping="setShippingMethods" :shippingMethods="shippingMethods" />
    <!--End shipping methods-->

    <!--Total section-->
    <div class="order-resume__total">
      <h2>
        Total del carrito
      </h2>
      <div class="order-resume__total--items">
        <div class="order-resume__total--items__item">
          <span>Subtotal</span>
          <span class="value">
            {{ orderToPay.subtotal ? formatPrice(orderToPay.subtotal) : formatPrice(subtotal) }}
          </span>
        </div>

        <div class="order-resume__total--items__item">
          <span>Envio</span>
          <span class="value text-success">
            {{ shippingMethods === 'delivery' ? formatPrice(shipping || 0) : 'Gratis' }}
          </span>
        </div>

        <div class="order-resume__total--items__item">
          <span>Descuento</span>
          <span class="value text-success">
            -{{ discount }}
          </span>
        </div>
      </div>

      <!--total item-->
      <div class="order-resume__total--total">
        <span class="label">
          Total (IVA incluido)
        </span>
        <span class="value">
          {{ orderToPay.total ? formatPrice(orderToPay.total) : formatPrice(total) }}
        </span>
      </div>
      <!--end total item-->

      <!--button to confuirm-->
      <div class="order-resume__total--action" v-if="cartItems.length > 0 && $route.path !== '/carro-de-compra/detalles-de-pago'">
        <q-btn v-if="$route.path !== '/carro-de-compra/detalles-del-envio'" to="/carro-de-compra/detalles-del-envio"
          :disable="shippingInStore === 'delivery' && !conveyorInStore || shippingInStore" square label="confirmar pago"
          color="secondary" unelevated class="full-width"></q-btn>
        <q-btn :loading="loading" type="submit" v-else
          :disable="shippingInStore === 'delivery' && !conveyorInStore || shippingInStore" square
          label="Realizar pedido" color="secondary" unelevated class="full-width"></q-btn>
      </div>

      <div class="order-resume__total--action q-mt-lg" v-if="orderToPay._id && !orderFinished.order && !$route.params.status">
        <q-btn :loading="loading" @click="finishOrder" :disable="!paymentMethod" square label="Finalizar compra" color="secondary" unelevated class="full-width"></q-btn>
      </div>
      <!--End button to confirm-->
    </div>
    <!--End total section-->
  </section>
</template>

<script setup>
// imports
import { formatPrice } from 'src/utils/utils'
import { useOrdersStore } from 'src/stores/ordersStore'
import { ref, computed, defineProps, defineEmits } from 'vue'
import ShippingMethodsSelectorVue from './ShippingMethodsSelector.vue'

// props
defineProps({
  loading: {
    type: Boolean,
    default: () => false
  },
  orderToPay: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['finish-order'])

// references
const ordersStore = useOrdersStore()
const shippingMethods = ref('delivery')

// computed
const shippingInStore = computed(() => {
  return ordersStore.shippingMethodSelected
})

const conveyorInStore = computed(() => {
  return ordersStore.conveyorSelected
})

const cartItems = computed(() => {
  return ordersStore.shoppingCart
})

const discount = computed(() => 0)

const shipping = computed(() => 0)

const total = computed(() => {
  const total = ordersStore.shoppingCart.reduce((accumulated, item) => accumulated + parseFloat(item.total), 0)
  return (total + shipping.value) || 0
})

const subtotal = computed(() => (total.value / 1.19).toFixed(2))

const paymentMethod = computed(() => ordersStore.paymentMethod)

const orderFinished = computed(() => ordersStore.finishOrder)

// methods
const setShippingMethods = (e) => {
  shippingMethods.value = e
  ordersStore.setShippingMethod(e)
}

const finishOrder = () => {
  emit('finish-order')
}
</script>

<style scoped lang="scss">
.order-resume {
  display: flex;
  flex-direction: column;

  &__total {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    h2 {
      color: #000;

      /* Desktop/Headings/H4 */
      font-family: Play;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 30px */
      text-transform: uppercase;
    }

    &--items {
      display: flex;
      flex-direction: column;
      gap: 4px;

      &__item {
        overflow: hidden;
        color: #000;
        text-overflow: ellipsis;

        /* Desktop/Body/Title/Medium */
        font-family: Play;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 20px */
        text-transform: uppercase;

        display: flex;
        justify-content: space-between;

        .value {
          color: #9F9C9C;

          /* Desktop/Body/Title/Medium */
          font-family: Play;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 20px */
          text-transform: uppercase;
        }

        .text-success {
          color: #25D366;
        }
      }
    }

    &--total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0px;
      border-top: 1px solid #E3E3E3;
      border-bottom: 1px solid #E3E3E3;

      .label {
        color: #000;

        /* Desktop/Body/Title/Medium */
        font-family: Play;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 20px */
        text-transform: uppercase;
      }

      .value {
        color: #000;

        /* Desktop/Headings/H4 */
        font-family: Play;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 30px */
        text-transform: uppercase;
      }
    }

    &--action {
      .q-btn {
        height: 48px;
      }
    }
  }
}
</style>
