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
      :noOverflow="true"
      :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <section class="row q-mt-xl">
        <div class="col-12 col-sm-12 col-md-9 full-on-1199" :class="{ 'q-pr-md': $q.screen.gt.sm }">
          <h2>
            Tu carrito
          </h2>
          <ShoppingbagTableVue />
        </div>

        <div class="col-12 col-sm-12 col-md-3 full-on-1199" :class="{ 'q-pl-md': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>
          <p>
            Los artículos de su carrito de compras se reservan por 30 minutos.
          </p>
          <ShoppingbagOrderResume />
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
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'
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
