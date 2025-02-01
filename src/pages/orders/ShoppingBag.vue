<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork
      title="Carro de compras"
      :banner="{}"
      default-img="/images/cart_background.webp"
      :btnLabel="''"
      :bannerComplement="'¿Todo listo para llevar tus productos favoritos? Revisa tu selección, asegura que no te falte nada y finaliza tu compra.'"
      :contentEnd="true"
      :noOverflow="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <section class="row q-mt-xl">
        <div class="col-12 col-md-8" :class="{ 'q-pr-md': $q.screen.gt.sm }">
          <h2>
            Tu carrito
          </h2>
          <ShoppingbagTableVue />
        </div>

        <div class="col-12 col-md-4" :class="{ 'q-pl-md': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>
        </div>
      </section>
    </section>
    <!--End main content-->
    <br>
  </q-page>
</template>

<script setup>
// import
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import ShoppingbagTableVue from '../../components/orders/ShoppingbagTable.vue'
</script>

<style lang="scss" scoped>
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
</style>
