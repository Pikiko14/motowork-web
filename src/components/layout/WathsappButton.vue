<template>
  <q-page-sticky position="bottom-right" :offset="[38, 18]">
    <q-btn v-if="$route.query.state !== 'Usada'" @click="goToWhatsapp" fab size="lg" color="green" icon="fab fa-whatsapp" />
    <q-fab size="lg"  v-else color="green" text-color="white" icon="fab fa-whatsapp" direction="up">
      <q-fab-action color="green" text-color="white" @click="goToWhatsapp" icon="fab fa-whatsapp">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]" class="bg-green text-white">
          Atención al cliente general
        </q-tooltip>
      </q-fab-action>
      <q-fab-action color="green" @click="gotoWhatsappJuanRestrepo" text-color="white" icon="fab fa-whatsapp">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]" class="bg-green text-white">
          Atención al cliente de Juan Restrepo
        </q-tooltip>
      </q-fab-action>
    </q-fab>
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

const gotoWhatsappJuanRestrepo = () => {
  window.open('https://api.whatsapp.com/send?phone=573104444555&text=Hola quisiera mas información sobre los vehiculos usados que tienes en tu inventario')
}
</script>
