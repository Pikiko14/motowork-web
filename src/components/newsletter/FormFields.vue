<template>
  <q-form @submit="doHandlerForm" class="row" ref="formRef">
    <div class="col-12">
      <div class="cns-fields-section">
        <q-input
          v-model="newsLetter.email"
          outlined
          name="email"
          square
          placeholder="INGRESA TU CORREO"
          :rules="[val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || 'Ingresa un correo valido.']"
        ></q-input>

        <q-input
          v-model="newsLetter.from_name"
          outlined
          name="from_name"
          class="hidden"
          square
        ></q-input>

        <q-input
          v-model="newsLetter.to_name"
          outlined
          name="to_name"
          class="hidden"
          square
        ></q-input>

        <q-input
          v-model="newsLetter.reply_to"
          outlined
          name="reply_to"
          class="hidden"
          square
        ></q-input>

        <q-input
          v-model="newsLetter.message"
          outlined
          name="message"
          class="hidden"
          square
        ></q-input>

        <q-btn
          type="submit"
          color="secondary"
          square
          unelevated
          :loading="loading"
          label="ENVIAR"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script setup>
// imports
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import { notification } from 'src/boot/notification'

// references
const formRef = ref()
const loading = ref(false)
const newsLetter = ref({
  email: '',
  to_name: 'Motowork',
  from_name: 'Pagina Web',
  reply_to: 'A quien se suscribe.',
  message: 'Se ha suscrito al newsletter'
})

// methods
const doHandlerForm = async () => {
  newsLetter.value.message = `Se ha suscrito al newsletter el correo: ${newsLetter.value.email}`
  newsLetter.value.reply_to = `${newsLetter.value.email}`
  newsLetter.value.from_name = `${newsLetter.value.email}`
  loading.value = true
  setTimeout(() => {
    emailjs
      .sendForm(
        'service_y9wdbmw',
        'template_xuccvkk',
        formRef.value.$el,
        'ZXwUWBHT3yFa6GauX'
      )
      .then(
        (response) => {
          notification('positive', '¡Gracias por suscribirte!', 'primary')
          newsLetter.value.email = ''
          formRef.value.reset()
          loading.value = false
        },
        (error) => {
          console.error('Error al enviar el correo:', error)
          notification('negative', 'Hubo un problema al suscribirte. Intenta nuevamente.', 'secondary')
        }
      )
  }, 500)
}
</script>
