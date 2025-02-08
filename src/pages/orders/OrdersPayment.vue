<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork :title="isStatus ? `Pedido Finalizado` : 'Detalles del pago'" :banner="{}"
      default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="isStatus ? (orderStatus === 'approved' ? 'Te agradecemos tu compra y esperamos poder enviarte tus productos pronto.' : 'Te agradecemos por querer comprar con nosotros, per lo sentimos, tu pago no pudo ser procesado.') : '¿Todo listo para llevar tus productos favoritos?, Paga tu orden para recibir los productos lo mas pronto posible.'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <div class="row q-mt-xl">
        <div v-if="!isStatus" class="col-12 col-sm-12 col-md-7 full-on-1199" :class="{ 'q-pr-xl': $q.screen.gt.sm }">
          <h2>
            <span v-if="!orderCreatedData.order">Método de pago</span>
            <span v-else>información de pedido</span>
          </h2>
          <p v-if="!orderCreatedData.order">
            Necesitas confirmar tus datos de pago para asegurar tu pedido.
          </p>

          <!--payment options-->
          <PaymentMethod v-if="!orderCreatedData.order" @set-payment="handlerSetPayment" />
          <!--End payment options-->

          <!--order resume-->
          <OrderFinish v-if="orderCreatedData.order" :order="orderCreatedData.order" />
          <!--End order resume-->
        </div>

        <div v-if="isStatus" class="col-12 col-sm-12 col-md-7 full-on-1199" :class="{ 'q-pr-xl': $q.screen.gt.sm }">
          <div class="details-order">
            <figure>
              <img src="/images/finish_order.webp" alt="Icono de pago de orden" title="Pago orden">
            </figure>

            <div class="details-order__content">
              <h2>
                <span v-if="orderStatus !== 'approved' && orderStatus !== 'pending'">
                  ¡Vaya! Parece que hay un problema con tu pedido.
                </span>
                <span v-else>
                  Tu pedido de ha compleado de forma correcta.
                </span>
              </h2>

              <p v-if="orderStatus !== 'approved' && orderStatus !== 'pending'" class="text-primary">
                Lamentamos informarte que tu pedido ha sido rechazado. Desafortunadamente, no podemos procesar tu pedido en este momento. Aquí una lista de posibles razones
              </p>
              <p class="text-primary" v-else>
                Tu pago a sido confirmado correctamente, procederemos a enviar tu pedido lo mas pronto posible. En caso de que tu pago quedara en estado pendiente, debemos esperar la confirmación de acreditación de los fondos para poderlo despachar.
              </p>

              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label># ORDEN:</q-item-label>
                    <q-item-label caption lines="1">
                      {{ orderToPay._id }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>REFERENCIA DE PAGO:</q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentRef }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <!--Detail from order items and total-->
        <div class="col-12 col-sm-12 col-md-5 full-on-1199" :class="{ 'q-pl-xl': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>

          <!--Product items-->
          <CheckoutListProduct :products="orderToPay.items" />
          <!--End products items-->

          <!--En cart totals-->
          <ShoppingbagOrderResume @finish-order="finishOrder" :loading="loading" :orderToPay="orderToPay" />
          <!--End cart totals-->
        </div>
        <!--End details-->
      </div>
    </section>
  </q-page>
</template>

<script setup>
// imports
import { useRoute } from 'vue-router'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { notification } from 'src/boot/notification'
import { useOrdersStore } from 'src/stores/ordersStore'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import OrderFinish from 'src/components/orders/OrderFinish.vue'
import { useOrdersContent } from 'src/composables/useOrdersContent'
import PaymentMethod from 'src/components/orders/PaymentMethod.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import CheckoutListProduct from 'src/components/orders/CheckoutListProduct.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'

// references
const route = useRoute()
const loading = ref(false)
const isStatus = ref(false)
const paymentRef = ref(null)
const orderStatus = ref(null)
const orderCreatedData = ref({})
const ordersStore = useOrdersStore()
const ordersContent = useOrdersContent()

// computed
const orderToPay = computed(() => {
  return ordersStore.orderToPay
})

const paymentMethod = computed(() => ordersStore.paymentMethod)

// methods
const handlerSetPayment = (e) => {
  ordersStore.setPaymentMethod(e)
}

const finishOrder = async () => {
  const obj = {
    order_id: orderToPay.value._id,
    payment_methods: paymentMethod.value
  }
  loading.value = true
  try {
    const response = await ordersContent.payOrder(obj)
    if (response.success) {
      notification('positive', response.message, 'primary')
      orderCreatedData.value = response.data
      if (paymentMethod.value === 'mercadopago') {
        setTimeout(() => {
          location.href = response.data.preference.init_point
        }, 3000)
      }
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const loadOrderFinished = async (order) => {
  try {
    await ordersContent.loadOrderData(order)
  } catch (error) {
  }
}

// hook
onBeforeMount(() => {
  if (route.params.order) {
    isStatus.value = true
    const { order } = route.params
    loadOrderFinished(order)
    orderStatus.value = route.query.collection_status
    paymentRef.value = route.query.payment_id
  }
})

onBeforeUnmount(() => {
  if (route.params.order) {
    ordersStore.clearOrderToPay()
  }
})
</script>

<style scoped lang="scss">
.full-on-1199 {
  @media(max-width: 1199px) {
    width: 100%;

    &:not(:first-child) {
      margin-top: 72px;
    }
  }
}

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

p {
  margin-top: 16px;
  color: #9F9C9C;
  /* Desktop/Body/Text/Medium */
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  /* 20px */
  margin-bottom: 32px;
}

.details-order {
  figure {
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    margin-top: 32px;
  }
}
</style>
