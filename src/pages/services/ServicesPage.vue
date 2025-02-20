<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Servicio técnico.'" is-experience-banner default-img="/images/services_image.webp"
      :btnLabel="''" :bannerComplement="'En MotoWork, nos apasiona tu seguridad y tranquilidad en la vía. Por eso, te ofrecemos un Servicio Técnico de primera clase, con expertos altamente calificados.'" />
    <!--End banner-->

    <br><br>
  </q-page>
</template>

<script setup>
// imports
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
</script>
