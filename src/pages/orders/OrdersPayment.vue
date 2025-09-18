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
        <!--Lo que se muestra luego de seleccionar el emdio de paog-->
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
          <q-btn target="_blank" v-if="orderCreatedData && orderCreatedData.order && orderCreatedData.order.payment_method === 'link_pago'" class="q-mt-md" unelevated outline color="secondary" no-caps size="md" type="a" :href="orderCreatedData?.preference">Ir a pagar la orden</q-btn>
          <!--End order resume-->

          <div class="account-to-transfer q-mt-xl" v-if="orderCreatedData.order && orderCreatedData.order.payment_method === 'trasnferencia'">
            <p>
              <span class="text-bold text-primary">
                Nota:
              </span>
              <span class="text-primary">
                Una vez realizada la transferencia deberas enviar el comprobante a nuestras lineas de atención.
              </span>
            </p>
            <div class="box-account">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Número de cuenta:
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.account_number ? paymentData.account_number : account.account_number }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn @click="openWhatsapp" flat dense rounded icon="img:/images/whatsapp.webp">
                      <q-tooltip class="bg-primary">
                        Enviar comprobante de pago
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Documento:
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.account_document || account.account_document }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Nombre de la cuenta:
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.doc ? paymentData.account_holder : account.account_holder }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <!--End lo que se muestra media pago-->

        <!--Cuando se carga desde los valores del storage-->
        <div v-if="isStatus" class="col-12 col-sm-12 col-md-7 full-on-1199" :class="{ 'q-pr-xl': $q.screen.gt.sm }">
          <div class="details-order" v-if="orderToPay.payment_method === 'mercadopago'">
            <figure>
              <img src="/images/finish_order.webp" alt="Icono de pago de orden" title="Pago orden">
            </figure>

            <div class="details-order__content">
              <h2>
                <span v-if="orderStatus !== 'approved' && orderStatus !== 'pending' && orderStatus !== 'in_process'">
                  ¡Vaya! Parece que hay un problema con tu pedido.
                </span>
                <span v-else>
                  Tu pedido de ha compleado de forma correcta.
                </span>
              </h2>

              <p v-if="orderStatus !== 'approved' && orderStatus !== 'pending' && orderStatus !== 'in_process'" class="text-primary">
                Lamentamos informarte que tu pedido ha sido rechazado. Desafortunadamente, no podemos procesar tu pedido en este momento. Aquí una lista de posibles razones
              </p>
              <p class="text-primary" v-else>
                Tu pago a sido confirmado correctamente, procederemos a enviar tu pedido lo mas pronto posible. En caso de que tu pago quedara en estado pendiente, debemos esperar la confirmación de acreditación de los fondos para poderlo despachar.
              </p>

              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label># Orden:</q-item-label>
                    <q-item-label caption lines="1">
                      {{ orderToPay._id }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Referencia de pago:</q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentRef }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Estado de la orden:</q-item-label>
                    <q-item-label caption lines="1">
                      <q-chip class="bg-primary text-white">
                        {{ orderToPay.status }}
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="orderToPay.payment_data?.date_approved">
                  <q-item-section>
                    <q-item-label>Fecha de aprobación:</q-item-label>
                    <q-item-label caption lines="1">
                      {{ formatDate(orderToPay?.payment_data?.date_approved) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="orderToPay.payment_data?.card">
                  <q-item-section>
                    <q-item-label>Orden pagada con la tarjeta:</q-item-label>
                    <q-item-label caption lines="1">
                      **** **** **** {{ orderToPay?.payment_data?.card.last_four_digits }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <!--order resume-->
          <OrderFinish v-if="orderToPay.payment_method === 'trasnferencia' || orderToPay.payment_method === 'link_pago'" :order="orderToPay" />
          <q-btn target="_blank" v-if="orderCreatedData && orderCreatedData.order && orderCreatedData.order.payment_method === 'link_pago'" class="q-mt-md" unelevated outline color="secondary" no-caps size="md" type="a" :href="linkPayment">Ir a pagar la orden</q-btn>
          <!--End order resume-->

          <div class="account-to-transfer q-mt-xl" v-if="orderToPay._id && orderToPay.payment_method === 'trasnferencia'">
            <p>
              <span class="text-bold text-primary">
                Nota:
              </span>
              <span class="text-primary">
                Una vez realizada la transferencia deberas enviar el comprobante a nuestras lineas de atención.
              </span>
            </p>
            <div class="box-account">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Numero de cuenta:
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.account_number || account.account_number }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn @click="openWhatsapp" flat dense rounded icon="img:/images/whatsapp.webp">
                      <q-tooltip class="bg-primary">
                        Enviar comprobante de pago
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Documento:
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.account_document || account.account_document }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      Nombre de la cuenta
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ paymentData.account_holder || account.account_holder }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <!--End cuando se carga-->

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
import { notification } from 'src/boot/notification'
import { useOrdersStore } from 'src/stores/ordersStore'
import { date, LocalStorage, SessionStorage } from 'quasar'
import MotoworkAccount from 'src/utils/motoworkAccount.json'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import OrderFinish from 'src/components/orders/OrderFinish.vue'
import { useOrdersContent } from 'src/composables/useOrdersContent'
import PaymentMethod from 'src/components/orders/PaymentMethod.vue'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import CheckoutListProduct from 'src/components/orders/CheckoutListProduct.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'

// references
const route = useRoute()
const loading = ref(false)
const paymentData = ref({})
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

const linkPayment = computed(() => {
  return SessionStorage.getItem('link_payment')
})

const account = computed(() => MotoworkAccount)

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
          LocalStorage.removeItem('order_to_transfer')
          location.href = response.data.preference.init_point
        }, 5000)
      } else {
        paymentData.value = response.data.preference
        SessionStorage.setItem('order_to_transfer', orderToPay.value._id)
        if (response.data.preference) {
          SessionStorage.setItem('link_payment', response.data.preference)
        }
      }
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const loadOrderFinished = async (order) => {
  try {
    const response = await ordersContent.loadOrderData(order)
    if (response) {
      orderCreatedData.value = {
        order: response.data
      }
    }
  } catch (error) {
  }
}

const formatDate = (dateString) => {
  const formattedString = date.formatDate(dateString, 'YYYY-MM-DD HH:mm:ss')
  return formattedString
}

const openWhatsapp = () => {
  const phoneNumber = '573183996249'
  const textMessage = `Hola MOTOWORK, la presente es para adjuntar el soporte de pago de la orden: ${paymentData.value._id || orderToPay.value._id} por un monto de: ${paymentData.value.total || orderToPay.value.total}`

  const encodedMessage = encodeURIComponent(textMessage)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  window.open(whatsappUrl, '__blank')
}

// hook
onBeforeMount(() => {
  if (route.params.order) {
    isStatus.value = true
    const { order } = route.params
    loadOrderFinished(order)
    orderStatus.value = route.query.collection_status
    paymentRef.value = route.query.payment_id
    return false
  }

  if (SessionStorage.getItem('order_to_transfer')) {
    isStatus.value = true
    const order = SessionStorage.getItem('order_to_transfer')
    loadOrderFinished(order)
    return false
  }
})

onBeforeUnmount(() => {
  if (isStatus.value || orderStatus.value) {
    ordersStore.clearOrderToPay()
  }
  SessionStorage.removeItem('order_to_transfer')
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

.q-item__label {
  font-size: 16px;
}

.box-account {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #9F9C9C;
  max-width: 520px;
}
</style>
