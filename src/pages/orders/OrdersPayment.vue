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
            Método de pago
          </h2>
          <p>
            Necesitas confirmar tus datos de pago para asegurar tu pedido.
          </p>
          <!--Shipping methods-->
        </div>

        <div class="col-12 col-sm-12 col-md-5 full-on-1199" :class="{ 'q-pl-xl': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>

          <!--Product items-->
          <CheckoutListProduct :products="shoppingCart" />
          <!--End products items-->

          <!--En cart totals-->
          <ShoppingbagOrderResume :loading="false" />
          <!--End cart totals-->
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useOrdersStore } from 'src/stores/ordersStore'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import CheckoutListProduct from 'src/components/orders/CheckoutListProduct.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'

// references
const ordersStore = useOrdersStore()

// computed
const shoppingCart = computed(() => {
  return ordersStore.shoppingCart
})

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
