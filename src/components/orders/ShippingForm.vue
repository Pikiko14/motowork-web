<template>
  <div class="row shipping-form">
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
          <label for="firstName">
            Nombre
            <span>
              *
            </span>
          </label>
          <q-input id="firstName" outlined class="q-mt-sm" square placeholder="Jhon" v-model="shippingData.firstName" :rules="[
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
          <q-input id="lastname" outlined class="q-mt-sm" square placeholder="Doe" v-model="shippingData.lastName"
            :rules="[
              vall => !!vall || 'Este campo es requerido',
              vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un apellido valido'
            ]">
          </q-input>
        </div>
        <div class="col-12 col-md-6 relative" :class="{ 'q-pr-sm': $q.screen.gt.sm }">
          <label>Departamento <span class="text-secondary">*</span></label>
          <q-select @update:model-value="getCities" @filter="filterDepartament" use-input input-debounce="0"
            label="Selecciona una opción" hide-dropdown-icon class="q-mt-sm" square emit-value map-options
            :rules="[(val) => !!val || 'Selecciona una opción']" outlined v-model="shippingData.state"
            :options="departaments"></q-select>
          <div class="select-custom-icom mr-mobile">
            <q-icon name="img:/images/chevron-right.webp"></q-icon>
          </div>
        </div>
        <div class="col-12 col-md-6 relative" :class="{ 'q-pl-sm': $q.screen.gt.sm }">
          <label>Ciudad <span class="text-secondary">*</span></label>
          <q-select @filter="filterCity" use-input input-debounce="0" label="Selecciona una opción" hide-dropdown-icon
            class="q-mt-sm" square emit-value map-options :rules="[(val) => !!val || 'Selecciona una opción']" outlined
            v-model="shippingData.city" :options="cities"></q-select>
          <div class="select-custom-icom" style="margin-right: -8px">
            <q-icon name="img:/images/chevron-right.webp"></q-icon>
          </div>
        </div>
        <div class="col-12">
          <label for="address">
            Dirección
            <span>
              *
            </span>
          </label>
          <q-input id="address" outlined class="q-mt-sm" square placeholder="Carrera 75 # 6A - 99"
            v-model="shippingData.address" :rules="[
              vall => !!vall || 'Este campo es requerido',
              vall => vall.length < 90 || 'Maximo 90 caracteres'
            ]">
          </q-input>
        </div>
        <div class="col-12">
          <label for="type_of_housing">
            Tipo de vivienda
          </label>
          <q-input id="type_of_housing" outlined class="q-mt-sm" square placeholder="Apartamento, Casa, Unidad, Otros"
            v-model="shippingData.type_of_housing" />
        </div>
        <div class="col-12 q-mt-md q-pt-xs">
          <label for="postal_code">
            Código postal
          </label>
          <q-input mask="######" id="postal_code" outlined class="q-mt-sm" square placeholder="05001"
            v-model="shippingData.postal_code" />
        </div>
        <div class="col-12 col-md-6 q-mt-md q-pt-xs" :class="{ 'q-pr-sm': $q.screen.gt.sm }">
          <label for="phone">
            Teléfono
            <span>
              *
            </span>
          </label>
          <q-input id="phone" outlined class="q-mt-sm" square placeholder="300 5253 654" v-model="shippingData.phone"
            mask="### #### ###" :rules="[
              vall => !!vall || 'Este campo es requerido',
              vall => vall.length <= 12 || 'Ingresa un teléfono valido'
            ]">
          </q-input>
        </div>
        <div class="col-12 col-md-6" :class="{ 'q-pl-sm q-mt-md q-pt-xs': $q.screen.gt.sm }">
          <label for="email">
            Correo
            <span>
              *
            </span>
          </label>
          <q-input id="email" outlined class="q-mt-sm" square placeholder="jhon@doe.com" v-model="shippingData.email"
            :rules="[
              vall => !!vall || 'Este campo es requerido',
              vall => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(vall) || 'Ingresa un correo valido',
            ]">
          </q-input>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// imports
import { computed, onBeforeMount, ref, watch } from 'vue'
import Colombia from '../../utils/colombia.json'
import { useOrdersStore } from 'src/stores/ordersStore'

// references
const cities = ref([])
const allCities = ref([])
const shippingData = ref({
  firstName: '',
  lastName: '',
  city: '',
  state: '',
  address: '',
  type_of_housing: '',
  postal_code: '',
  phone: '',
  email: ''
})
const departaments = ref([])
const store = useOrdersStore()
const allDepartaments = ref([])

// computed
const clearForm = computed(() => {
  return store.clearOrderForm
})

// watchs

// clear form
watch(
  () => clearForm.value,
  () => {
    shippingData.value = {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      address: '',
      type_of_housing: '',
      postal_code: '',
      phone: '',
      email: ''
    }
  }
)

// set name
watch(
  () => shippingData.value.firstName,
  (val) => {
    store.setShippingData({ key: 'firstName', value: val })
  }
)

// set lastname
watch(
  () => shippingData.value.lastName,
  (val) => {
    store.setShippingData({ key: 'lastName', value: val })
  }
)

// set state
watch(
  () => shippingData.value.state,
  (val) => {
    store.setShippingData({ key: 'state', value: val })
  }
)

// set city
watch(
  () => shippingData.value.city,
  (val) => {
    store.setShippingData({ key: 'city', value: val })
  }
)

// set address
watch(
  () => shippingData.value.address,
  (val) => {
    store.setShippingData({ key: 'address', value: val })
  }
)

// set type_of_housing
watch(
  () => shippingData.value.type_of_housing,
  (val) => {
    store.setShippingData({ key: 'type_of_housing', value: val })
  }
)

// set postal_code
watch(
  () => shippingData.value.postal_code,
  (val) => {
    store.setShippingData({ key: 'postal_code', value: val })
  }
)

// set phone
watch(
  () => shippingData.value.phone,
  (val) => {
    store.setShippingData({ key: 'phone', value: val })
  }
)

// set email
watch(
  () => shippingData.value.email,
  (val) => {
    store.setShippingData({ key: 'email', value: val })
  }
)

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

.mr-mobile {
  @media(max-width: 1023px) {
    margin-right: -8px;
  }
}
</style>
