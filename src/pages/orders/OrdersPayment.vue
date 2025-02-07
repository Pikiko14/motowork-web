<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork title="Detalles del pago" :banner="{}" default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Todo listo para llevar tus productos favoritos?, Paga tu orden para recibir los productos lo mas pronto posible.'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <div class="row q-mt-xl">
        <div class="col-12 col-sm-12 col-md-7 full-on-1199" :class="{ 'q-pr-xl': $q.screen.gt.sm }">
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
import { computed, ref } from 'vue'
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
const loading = ref(false)
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
          window.open(response.data.preference.init_point, '__blank')
        }, 3000)
      }
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// hook
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
</style>
