<template>
  <q-layout view="lHh Lpr fff">
    <q-header class="bg-white">
      <NavBar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="container-motowork motowork-footer">
      <FooterMotowork />
    </q-footer>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/layout/NavBar.vue'
import FooterMotowork from 'src/components/layout/FooterMotowork.vue'
</script>
