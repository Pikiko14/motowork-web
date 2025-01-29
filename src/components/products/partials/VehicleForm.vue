<template>
  <q-form @submit="habdlerForm" class="row vehicle-form">
    <div class="col-12">
      <h2>
        fecha y hora preferida
      </h2>
    </div>
    <div class="col-12">
      <p>
        Disponibilidad para el Test drive
      </p>
    </div>
    <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pr-md': $q.screen.gt.sm }">
      <label for="date">
        Fecha preferida
        <span>
          *
        </span>
      </label>
      <q-input
        id="date"
        outlined
        class="q-mt-sm"
        square
        placeholder="dd/mm/aaaa"
        mask="##/##/####"
        v-model="form.date"
        :rules="[
          vall => !!vall || 'Debes ingresar la fecha'
        ]"
      >
        <template #append>
          <q-icon size="16pt" class="cursor-pointer" name="img:/images/calendar.png">
            <q-popup-proxy ref="dateProxy" autoclose cover transition-show="scale" transition-hide="scale">
              <q-date @update:model-value="setDate" mask="MM-DD-YYYY" v-model="form.date" color="secondary">
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pl-md': $q.screen.gt.sm }">
      <label for="hour">
        Hora preferida
        <span>
          *
        </span>
      </label>
      <q-input
        id="hour"
        outlined
        class="q-mt-sm"
        square
        placeholder="--:--"
        mask="##:##"
        v-model="form.hour"
        :rules="[
          vall => !!vall || 'Debes seleccionar la hora'
        ]"
      >
        <template #append>
          <q-icon size="16pt" class="cursor-pointer" name="img:/images/time.png">
            <q-popup-proxy ref="hourProxy" cover transition-show="scale" transition-hide="scale">
              <q-time @update:model-value="setHour" v-model="form.hour" mask="HH:mm" format24h>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-12 info-general">
      <h2>
        Información personal
      </h2>
    </div>
    <div class="col-12">
      <p>
        Datos personales para agendar Test drive
      </p>
    </div>
    <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pr-md': $q.screen.gt.sm }">
      <label for="date">
        Nombre
        <span>
          *
        </span>
      </label>
      <q-input
        id="date"
        outlined
        class="q-mt-sm"
        square
        placeholder="Jhon"
        v-model="form.name"
        :rules="[
          vall => !!vall || 'Ingresa este campo'
        ]"
      >
      </q-input>
    </div>

    <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pl-md': $q.screen.gt.sm }">
      <label for="hour">
        Apellidos
        <span>
          *
        </span>
      </label>
      <q-input
        id="hour"
        outlined
        class="q-mt-sm"
        square
        placeholder="Doe"
        v-model="form.lastname"
        :rules="[
          vall => !!vall || 'Ingresa este campo'
        ]"
      >
      </q-input>
    </div>
    <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pr-md': $q.screen.gt.sm }">
      <label for="date">
        Teléfono
        <span>
          *
        </span>
      </label>
      <q-input
        id="date"
        outlined
        class="q-mt-sm"
        square
        placeholder="123456789"
        v-model="form.phone"
        mask="### #### ###"
        :rules="[
          vall => !!vall || 'Ingresa este campo',
          vall => vall.length <= 12 || 'Ingresa un teléfono valido'
        ]"
      >
      </q-input>
    </div>

    <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pl-md': $q.screen.gt.sm }">
      <label for="hour">
        Correo
        <span>
          *
        </span>
      </label>
      <q-input
        id="hour"
        outlined
        class="q-mt-sm"
        square
        placeholder="jhon@doe.com"
        v-model="form.email"
        :rules="[
          vall => !!vall || 'Ingresa este campo'
        ]"
      >
      </q-input>
    </div>
    <div class="col-12 col-md-6 vehicle-form__input-date">
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

// imports

// references
const form = ref({
  date: '',
  hour: ''
})
const dateProxy = ref()
const hourProxy = ref()

// methods
const habdlerForm = () => {
  alert(123)
}

const setDate = () => {
  dateProxy.value.hide()
}

const setHour = () => {
  hourProxy.value.hide()
}
</script>

<style scoped lang="scss">
.vehicle-form {
  padding-left: 24px;
  padding-right: 24px;

  h2 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;

    /* Desktop/Headings/H4 */
    font-family: Play;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 30px */
    text-transform: uppercase;
  }

  p {
    overflow: hidden;
    color: var(--Neutrals-Neutrals400, #9F9C9C);
    text-overflow: ellipsis;

    /* Desktop/Body/Text/Medium */
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 20px */

    margin-top: 16px;
  }

  label {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;

    /* Desktop/Body/Text/Medium */
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 20px */

    span {
      color: $secondary;
    }
  }

  &__input-date {
    margin-top: 32px;
  }

  .info-general {
    margin-top: 96px;
  }
}
</style>
