<template>
  <q-form class="row shipping-form">
    <div class="col-12">
      <h2>
        Detalles de facturación
      </h2>
      <p>
        Introduce los datos de envío del destinatario.
      </p>
    </div>
    <section class="col-12 fields-section">
      <div class="row">
        <div class="col-12 col-md-6" :class="{ 'q-pr-sm': $q.screen.gt.sm }">
          <label for="name">
            Nombre
            <span>
              *
            </span>
          </label>
          <q-input id="name" outlined class="q-mt-sm" square placeholder="Jhon" v-model="shippingData.name" :rules="[
            vall => !!vall || 'Este campo es requerido',
            vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un nombre valido'
          ]">
          </q-input>
        </div>
        <div class="col-12 col-md-6" :class="{ 'q-pl-sm': $q.screen.gt.sm }">
          <label for="lastname">
            Apellido
            <span>
              *
            </span>
          </label>
          <q-input id="lastname" outlined class="q-mt-sm" square placeholder="Doe" v-model="shippingData.lastname"
            :rules="[
              vall => !!vall || 'Este campo es requerido',
              vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un apellido valido'
            ]">
          </q-input>
        </div>
        <div class="col-12 col-md-6 relative" :class="{ 'q-pr-sm': $q.screen.gt.sm }">
          <label :for="shippingData.lastname">Departamento <span class="text-secondary">*</span></label>
          <q-select @update:model-value="getCities" @filter="filterDepartament" use-input input-debounce="0"
            label="Selecciona una opción" hide-dropdown-icon class="q-mt-sm" square emit-value map-options
            :rules="[(val) => !!val || 'Selecciona una opción']" outlined v-model="shippingData.state"
            :options="departaments"></q-select>
          <div class="select-custom-icom">
            <q-icon name="img:/images/chevron-right.webp"></q-icon>
          </div>
        </div>
        <div class="col-12 col-md-6 relative" :class="{ 'q-pl-sm': $q.screen.gt.sm }">
          <label :for="shippingData.lastname">Ciudad <span class="text-secondary">*</span></label>
          <q-select @filter="filterCity" use-input input-debounce="0" label="Selecciona una opción"
            hide-dropdown-icon class="q-mt-sm" square emit-value map-options
            :rules="[(val) => !!val || 'Selecciona una opción']" outlined v-model="shippingData.city"
            :options="cities"></q-select>
          <div class="select-custom-icom" style="margin-right: -8px">
            <q-icon name="img:/images/chevron-right.webp"></q-icon>
          </div>
        </div>
      </div>
    </section>
  </q-form>
</template>

<script setup>
// imports
import { onBeforeMount, ref } from 'vue'
import Colombia from '../../utils/colombia.json'

// references
const cities = ref([])
const allCities = ref([])
const shippingData = ref({
  name: '',
  lastname: '',
  city: '',
  state: ''
})

// computed
const departaments = ref([])
const allDepartaments = ref([])

// methods
const filterDepartament = (val, update) => {
  if (val === '') {
    update(() => {
      departaments.value = allDepartaments.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    departaments.value = allDepartaments.value.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
  })
}

const filterCity = (val, update) => {
  if (val === '') {
    update(() => {
      cities.value = allCities.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    cities.value = allCities.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

const getCities = (e) => {
  shippingData.value.city = ''
  const departament = departaments.value.find((item) => item.value === e)
  cities.value = departament.cities
  allCities.value = cities.value
}

// hook
onBeforeMount(() => {
  departaments.value = Colombia.map((item) => {
    return {
      label: item.departamento,
      value: item.departamento,
      cities: item.ciudades
    }
  })
  allDepartaments.value = departaments.value
})
</script>

<style scoped lang="scss">
.shipping-form {
  margin-top: 48px;

  h2 {
    color: #000;

    /* Desktop/Headings/H4 */
    font-family: Play;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 30px */
    text-transform: uppercase;

    @media(max-width: 767px) {
      font-size: 18px;
    }
  }

  p {
    color: #9F9C9C;
    margin-top: 16px;

    /* Desktop/Body/Text/Medium */
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 20px */

    @media(max-width: 767px) {
      font-size: 12px;
    }
  }

  .fields-section {
    margin-top: 32px;
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
    line-height: 125%;
    /* 20px */

    span {
      color: $secondary;
    }

    @media(max-width: 767px) {
      font-size: 12pt;
    }
  }
}

.select-custom-icom {
  background-color: red;
  width: 56px;
  height: 56px;
  position: absolute;
  right: 8px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    right: 0px;
  }
}

.relative {
  position: relative;
}
</style>
