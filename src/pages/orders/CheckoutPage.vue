<template>
  <q-page class="checkout-page">
    <!--Banner-->
    <BannerMotowork
      title="Detalles del envió"
      :banner="{}"
      default-img="/images/cart_background.webp"
      :btnLabel="''"
      :bannerComplement="'¿Todo listo para llevar tus productos favoritos? Revisa tu selección, asegura que no te falte nada y finaliza tu compra.'"
      :contentEnd="true"
      :noOverflow="true"
      :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <q-form ref="formRef" class="row q-mt-xl" @submit="handlerSaveOrder">
        <div class="col-12 col-sm-12 col-md-7 full-on-1199" :class="{ 'q-pr-xl': $q.screen.gt.sm }">
          <h2>
            Método de envió
          </h2>
          <p>
            Los artículos de su carrito de compras se reservan por 30 minutos.
          </p>
          <!--Shipping methods-->
          <ShippingMethodsSelectorVue @update-shipping="setShippingMethods" :shippingMethods="shippingMethods" />
          <!--End shipping methods-->

          <!--Shipping formulario-->
          <ShippingForm />
          <!--formulario de shipping-->
        </div>

        <div class="col-12 col-sm-12 col-md-5 full-on-1199" :class="{ 'q-pl-xl': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>

          <!--Product items-->
          <CheckoutListProduct :products="shoppingCart" />
          <!--End products items-->

          <!--En cart totals-->
          <ShoppingbagOrderResume :loading="loading" />
          <!--End cart totals-->
        </div>
      </q-form>
    </section>
  </q-page>
</template>

<script setup>
// import
import { useRouter } from 'vue-router'
import { ref, computed, toRaw } from 'vue'
import { notification } from 'src/boot/notification'
import { useOrdersStore } from 'src/stores/ordersStore'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import ShippingForm from 'src/components/orders/ShippingForm.vue'
import { useOrdersContent } from 'src/composables/useOrdersContent'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import CheckoutListProduct from 'src/components/orders/CheckoutListProduct.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'
import ShippingMethodsSelectorVue from 'src/components/orders/ShippingMethodsSelector.vue'

// references
const formRef = ref()
const loading = ref(false)
const router = useRouter()
const ordersStore = useOrdersStore()
const shippingMethods = ref('delivery')
const orderContent = useOrdersContent()

// computed
const shoppingCart = computed(() => {
  return ordersStore.shoppingCart
})

const shippingData = computed(() => {
  return ordersStore.shippingData
})

const conveyor = computed(() => {
  return ordersStore.conveyorSelected
})

const shippingMethod = computed(() => {
  return ordersStore.shippingMethodSelected
})

const shipping = computed(() => 0)

const total = computed(() => {
  const total = ordersStore.shoppingCart.reduce((accumulated, item) => accumulated + parseFloat(item.total), 0)
  return (total + shipping.value) || 0
})

const subtotal = computed(() => (total.value / 1.19).toFixed(2))

// methods
const setShippingMethods = (e) => {
  shippingMethods.value = e
  ordersStore.setShippingMethod(e)
}

const handlerSaveOrder = async () => {
  loading.value = true
  const order = {
    conveyor: conveyor.value || null,
    shippingMethod: shippingMethod.value || 'pick_on_store',
    client: {
      ...shippingData.value
    },
    items: toRaw(shoppingCart.value) || [],
    subtotal: parseFloat(subtotal.value),
    total: parseFloat(total.value),
    type: 'Sales Order'
  }
  try {
    const response = await orderContent.saveOrders(order)
    if (response.success) {
      ordersStore.clearStore()
      notification('positive', response.message, 'primary')
      formRef.value.reset()
      ordersStore.setOrderCreated(response.order)
      router.push({
        name: 'payment'
      })
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
h2 {
  color: #000;

  /* Desktop/Headings/H4 */
  font-family: Play;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%; /* 30px */
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
  line-height: 125%; /* 20px */
  margin-bottom: 32px;
}

.full-on-1199 {
  @media(max-width: 1199px) {
    width: 100%;

    &:not(:first-child) {
      margin-top: 72px;
    }
  }
}
</style>
