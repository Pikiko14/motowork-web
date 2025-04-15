<template>
  <q-page-sticky position="bottom-right" :offset="[38, 18]">
    <q-btn @click="goToWhatsapp" fab size="lg" color="green" icon="fab fa-whatsapp" />
  </q-page-sticky>
</template>

<script setup>
// props
const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

// methods
const goToWhatsapp = () => {
  window.open(`https://api.whatsapp.com/send?phone=573183996249&text=Hola+me+interesan+los+productos+de+tipo+*${props.category}*%2C+me+pueden+brindar+mas+informaci%C3%B3n+por+favor`)
}
</script>
