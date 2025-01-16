<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <NavBar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/layout/NavBar.vue'
</script>
