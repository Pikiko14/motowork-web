<template>
  <q-form ref="formRef" @submit="habdlerForm" class="vehicle-form" :class="{ 'full-height': $q.screen.gt.xs }">
    <div class="row">
      <div class="col-12 mt-mobile">
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
        <q-input id="date" outlined class="q-mt-sm" square placeholder="dd/mm/aaaa" mask="##/##/####"
          v-model="form.date" :rules="[
            vall => !!vall || 'Debes ingresar la fecha'
          ]">
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
        <q-input id="hour" outlined class="q-mt-sm" square placeholder="--:--" mask="##:##" v-model="form.hour" :rules="[
          vall => !!vall || 'Debes seleccionar la hora'
        ]">
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
        <q-input id="date" outlined class="q-mt-sm" square placeholder="Jhon" v-model="form.name" :rules="[
          vall => !!vall || 'Ingresa este campo',
          vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un nombre valido'
        ]">
        </q-input>
      </div>

      <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pl-md': $q.screen.gt.sm }">
        <label for="hour">
          Apellidos
          <span>
            *
          </span>
        </label>
        <q-input id="hour" outlined class="q-mt-sm" square placeholder="Doe" v-model="form.lastname" :rules="[
          vall => !!vall || 'Ingresa este campo',
          vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un apellido valido'
        ]">
        </q-input>
      </div>
      <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pr-md': $q.screen.gt.sm }">
        <label for="date">
          Teléfono
          <span>
            *
          </span>
        </label>
        <q-input id="date" outlined class="q-mt-sm" square placeholder="123456789" v-model="form.phone"
          mask="### #### ###" :rules="[
            vall => !!vall || 'Ingresa este campo',
            vall => vall.length <= 12 || 'Ingresa un teléfono valido'
          ]">
        </q-input>
      </div>

      <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pl-md': $q.screen.gt.sm }">
        <label for="hour">
          Correo
          <span>
            *
          </span>
        </label>
        <q-input id="hour" outlined class="q-mt-sm" square placeholder="jhon@doe.com" v-model="form.email" :rules="[
          vall => !!vall || 'Ingresa este campo',
          vall => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(vall) || 'Ingresa un correo valido',
        ]">
        </q-input>
      </div>
      <div class="col-12">
        <label>
          Método de contacto preferido
          <span>
            *
          </span>
        </label>
        <q-option-group v-model="form.contact_type" :options="optionsContact" type="radio" color="secondary" inline />
      </div>
      <div class="col-12">
        <div class="motowork-form-grid__legals">
          <h2>
            CONSENTIMIENTO DE PRIVACIDAD
          </h2>
          <div class="motowork-form-grid__legals--politics">
            <span>
              Puede obtener más información sobre el consentimiento de privacidad
              <a href="http://motowork.co/tratamiento-de-datos/">Políticas de privacidad</a>
            </span>

            <div class="accept-section">
              <q-checkbox color="secondary" dense v-model="creationProfile"></q-checkbox>
              <div class="accept-section__content">
                <h3>
                  Suscríbete a la creación de perfiles <span>(opcional)</span>
                </h3>
                <p>
                  Acepto que Motowork utilice mis datos personales para perfilar mis hábitos de consumo y analizar
                  mis preferencias e intereses para personalizar los contenidos del sitio web de Motowork y las
                  comunicaciones por correo electrónico.
                </p>
              </div>
            </div>

            <div class="accept-section">
              <q-checkbox color="secondary" dense v-model="acceptMarketing"></q-checkbox>
              <div class="accept-section__content">
                <h3>
                  Suscríbete al marketing <span>(opcional)</span>
                </h3>
                <p>
                  Acepto que mis datos se procesarán con fines de marketing directo, incluido el envío de información
                  sobre productos y servicios, para crear el perfil del cliente (por ejemplo, a través de análisis de
                  datos) y para atención personalizada al cliente, como boletines informativos, encuestas de
                  satisfacción del cliente, promociones especiales. , invitaciones a eventos (pruebas de conducción y
                  ferias comerciales)
                </p>
              </div>
            </div>

            <div class="motowork-form-grid__complement">
              <span>
                Si ha proporcionado previamente consentimientos de marketing y desea retirarlos, puede ponerse en
                <a href="https://api.whatsapp.com/send?phone=573183996249&text=Hola%20Motowork" target="__blank"
                  rel="noopener noreferrer">
                  contacto con nosotros
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-btn :loading="loading" label="Agendar test drive" type="submit" :class="{ 'absolute-bottom': $q.screen.gt.xs }" class="full-width"
      color="secondary" unelevated=""></q-btn>
  </q-form>
</template>

<script setup>
// imports
import { useOrdersStore } from 'src/stores/ordersStore'
import { ref, defineEmits, defineProps, watch, computed } from 'vue'

const store = useOrdersStore()

// props
defineProps({
  loading: {
    type: Boolean,
    default: () => false
  }
})

// computed
const clearForm = computed(() => {
  return store.clearOrderForm
})

// watch
watch(
  () => clearForm.value,
  () => {
    form.value = {
      date: '',
      hour: '',
      name: '',
      lastname: '',
      contact_type: false,
      type: 'Test Drive Request'
    }
    formRef.value.reset()
  }
)

// emits
const emit = defineEmits(['handler-form'])

// references
const form = ref({
  date: '',
  hour: '',
  name: '',
  lastname: '',
  contact_type: false,
  type: 'Test Drive Request'
})
const formRef = ref()
const dateProxy = ref()
const hourProxy = ref()
const optionsContact = [
  {
    label: 'WhatsApp',
    value: 'WhatsApp'
  },
  {
    label: 'Teléfono',
    value: 'Teléfono'
  }
]
const creationProfile = ref(false)
const acceptMarketing = ref(false)

// methods
const habdlerForm = () => {
  if (creationProfile.value) {
    form.value.creationProfile = true
  } else {
    if (form.value.creationProfile) delete form.value.creationProfile
  }

  if (acceptMarketing.value) {
    form.value.acceptMarketing = true
  } else {
    if (form.value.acceptMarketing) delete form.value.acceptMarketing
  }
  emit('handler-form', form.value)
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
    line-height: 125%;
    /* 30px */
    text-transform: uppercase;

    @media(max-width: 767px) {
      font-size: 20px;
    }
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
    line-height: 125%;
    /* 20px */

    margin-top: 16px;

    @media(max-width: 767px) {
      margin-bottom: 24px;
    }
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

  &__input-date {
    margin-top: 32px;

    @media(max-width: 767px) {
      margin-top: 0px;
    }
  }

  .info-general {
    margin-top: 96px;
  }

  @media(max-width: 767px) {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.q-btn {
  max-width: 680px;
  left: (50%);
  transform: translateX(-50%);

  @media(max-width: 767px) {
    margin-top: 36px;
  }
}

.mt-mobile {
  @media(max-width: 767px) {
    margin-top: 68px;
  }
}

.motowork-form-grid {
  &__legals {
    margin-top: 96px;
    display: none;

    h2 {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;

      /* Desktop/Headings/H4 */
      font-family: Play;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 30px */
      text-transform: uppercase;

      @media(min-width: 768px) and (max-width: 991px) {
        font-size: 20px;
      }

      @media(max-width: 767px){
        font-size: 20px;
      }
    }

    &--politics {
      margin-top: 16px;
      color: #9F9C9C;
      /* Desktop/Body/Text/Medium */
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */
      display: flex;
      flex-direction: column;
      gap: 32px;

      a {
        color: #ED1C24;
      }

      .accept-section {
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: flex-start;

        .accept-section__content {
          display: flex;
          flex-direction: column;
          gap: 12px;

          h3 {
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            font-family: Ubuntu;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            /* 20px */

            span {
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              color: #9F9C9C;
              text-overflow: ellipsis;

              /* Desktop/Body/Text/Medium */
              font-family: Ubuntu;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 125%;
            }
          }

          p {
            color: var(--Neutrals-Neutrals400, #9F9C9C);

            /* Desktop/Body/Text/Medium */
            font-family: Ubuntu;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            /* 20px */
          }
        }
      }
    }

    @media(max-width: 767px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
