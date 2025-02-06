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

      <q-form class="row q-mt-xl" @submit="handlerSaveOrder">
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
          <ShoppingbagOrderResume />
          <!--End cart totals-->
        </div>
      </q-form>
    </section>
  </q-page>
</template>

<script setup>
// import
import { ref, computed } from 'vue'
import { useOrdersStore } from 'src/stores/ordersStore'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import ShippingForm from 'src/components/orders/ShippingForm.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import CheckoutListProduct from 'src/components/orders/CheckoutListProduct.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'
import ShippingMethodsSelectorVue from 'src/components/orders/ShippingMethodsSelector.vue'

// references
const ordersStore = useOrdersStore()
const shippingMethods = ref('delivery')

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

// methods
const setShippingMethods = (e) => {
  shippingMethods.value = e
  ordersStore.setShippingMethod(e)
}

const handlerSaveOrder = () => {
  const order = {
    conveyor: conveyor.value || null,
    shippingMethod: shippingMethod.value || 'pick_on_store',
    client: {
      ...shippingData.value
    },
    items: shoppingCart.value || []
  }
  console.log(order)
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
