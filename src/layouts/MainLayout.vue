<template>
  <q-layout view="lHh Lpr fff">
    <q-header class="bg-white">
      <NavBar />
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>

    <q-footer class="container-motowork motowork-footer">
      <FooterMotowork />
    </q-footer>

    <!--Wathsapp Button-->
    <WathsappButton :category="type === 'vehicle' ? 'motocicletas' : 'accesorios'" />
    <!--End Wathsapp Button-->
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/layout/NavBar.vue'
import WathsappButton from 'src/components/layout/WathsappButton.vue'

import FooterMotowork from 'src/components/layout/FooterMotowork.vue'
</script>
