<template>
  <q-layout view="lHh Lpr fff">
    <q-header class="bg-white">
      <NavBar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="container-motowork">
      .
    </q-footer>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/layout/NavBar.vue'
</script>
