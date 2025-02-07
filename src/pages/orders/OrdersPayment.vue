<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork title="Detalles del pago" :banner="{}" default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Todo listo para llevar tus productos favoritos? Revisa tu selección, asegura que no te falte nada y finaliza tu compra.'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />
    <!--End banner-->
  </q-page>
</template>

<script setup>
// imports
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'

// hook
</script>
