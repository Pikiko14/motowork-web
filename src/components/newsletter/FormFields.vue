<template>
  <q-form @submit="doHandlerForm" class="row">
    <div class="col-12">
      <div class="cns-fields-section">
        <q-input
          v-model="newsLetter.email"
          outlined
          square
          placeholder="INGRESA TU CORREO"
        ></q-input>

        <q-btn
          type="submit"
          color="secondary"
          square
          unelevated
          label="ENVIAR"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { reactive } from 'vue'

// references
const newsLetter = reactive({
  email: ''
})

// methods
const doHandlerForm = async () => {
  alert(123)
}
</script>
