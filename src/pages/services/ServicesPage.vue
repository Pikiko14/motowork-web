<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Servicio técnico.'" is-experience-banner default-img="/images/services_image.webp"
      :btnLabel="''"
      :bannerComplement="'En MotoWork, nos apasiona tu seguridad y tranquilidad en la vía. Por eso, te ofrecemos un Servicio Técnico de primera clase, con expertos altamente calificados.'" />
    <!--End banner-->

    <!--Stepper-->
    <section class="container-motowork bg-white">
      <div class="motowork-stepper">
        <div class="motowork-stepper__step cursor-pointer" @click="step = 1"
          :class="{ active: step === 1, complete: step > 1 }">
          <span class="number">
            1
          </span>
          <span class="label">Fecha y hora</span>
        </div>

        <div class="motowork-stepper__step cursor-pointer" @click="step = 2"
          :class="{ active: step === 2, complete: step > 2 }">
          <span class="number">2</span>
          <span class="label">Datos personales</span>
        </div>

        <div class="motowork-stepper__step cursor-pointer" @click="step = 3"
          :class="{ active: step === 3, complete: step > 3 }">
          <span class="number">3</span>
          <span class="label">Datos del vehículo</span>
        </div>
      </div>
    </section>
    <!--End stepper-->

    <!--Stepper content-->
    <q-form ref="formRef" class="container-motowork bg-white" @submit="handlerScheduleServices">
      <!--Paso 1 content-->
      <div class="motowork-stepper-content one" v-if="step === 1">
        <!--Date picker section-->
        <div class="one__date">
          <h2>
            FECHA Y HORA
          </h2>
          <p>
            La fecha y hora que selecciones asegura la recepción de tu motocicleta en el centro de servicio de MotoWork.
          </p>

          <q-date class="shadow-0 full-width" v-model="dateModel" minimal :options="disablePastDates" />
        </div>
        <!--End date picker section-->

        <!--End general data-->
        <div class="one__general">
          <h2>
            Detalles generales
          </h2>

          <DateSelected :selected-date="selectedDate" />

          <div class="one__general--hour-picker">
            <label for="hour">
              Hora preferida
              <span>
                *
              </span>
            </label>
            <q-input id="hour" outlined class="q-mt-sm" square placeholder="--:--" v-model="serviceSchedule.hour"
              mask="##:##">
              <template #append>
                <div class="append">
                  <span class="cursor-pointer hour-type">
                    {{ serviceSchedule.hourType }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                      <path d="M2 3.5L7 8.5L12 3.5" stroke="#9F9C9C" stroke-width="1.5" stroke-linecap="square" />
                    </svg>
                    <q-menu auto-close>
                      <q-list dense>
                        <q-item clickable @click="serviceSchedule.hourType = 'A.m.'">
                          <q-item-section>
                            A.m.
                          </q-item-section>
                        </q-item>
                        <q-item clickable @click="serviceSchedule.hourType = 'P.m.'">
                          <q-item-section>
                            P.m.
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </span>
                  <span class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M19.1668 9.99967C19.1668 15.0624 15.0629 19.1663 10.0002 19.1663C4.9374 19.1663 0.833496 15.0624 0.833496 9.99967C0.833496 4.93691 4.9374 0.833008 10.0002 0.833008"
                        stroke="#9F9C9C" stroke-width="1.5" />
                      <path d="M18.9838 8.16597C18.8316 7.41534 18.5852 6.68692 18.2505 5.99805" stroke="#9F9C9C"
                        stroke-width="1.5" />
                      <path d="M17.3338 4.49837C16.8121 3.80397 16.1949 3.18674 15.5005 2.66504" stroke="#9F9C9C"
                        stroke-width="1.5" />
                      <path d="M14.0005 1.74988C13.3119 1.41529 12.5838 1.16886 11.8335 1.0166" stroke="#9F9C9C"
                        stroke-width="1.5" />
                      <path d="M10 5.41602V9.99939L13.6667 13.6661" stroke="#9F9C9C" stroke-width="1.5" />
                    </svg>
                    <q-popup-proxy ref="hourProxy" transition-show="scale" transition-hide="scale">
                      <q-time color="secondary" v-model="serviceSchedule.hour" format24h>
                        <div class="row text-center">
                          <div class="col">
                            <q-btn v-close-popup label="Confirmar" color="primary" flat @click="setHour" />
                          </div>
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </span>
                </div>
              </template>
            </q-input>
          </div>

          <q-btn v-if="step < 3" @click="step++" :disable="step === 1 && !serviceSchedule.hour" square unelevated
            label="Continuar" class="q-mt-xl" color="secondary"></q-btn>
        </div>
        <!--End detalles generales-->
      </div>
      <!--End paso 1 content-->

      <!--Paso 2-->
      <div class="motowork-stepper-content two" v-if="step === 2">
        <div class="two__form">
          <h2>
            DATOS PERSONALES
          </h2>
          <p>
            Llena el formulario con tus datos personales y de contacto, recuerda aceptar nuestras
            <a href="/politicas">
              Políticas de uso y tratamiento de datos personales
            </a>
          </p>

          <div class="one__form--fields row">
            <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pr-md': $q.screen.gt.sm }">
              <label for="name">
                Nombre
                <span>
                  *
                </span>
              </label>
              <q-input id="name" outlined class="q-mt-sm" square placeholder="Jhon"
                v-model="serviceSchedule.client.name" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un nombre valido'
                ]">
              </q-input>
            </div>
            <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pl-md': $q.screen.gt.sm }">
              <label for="lastname">
                Apellidos
                <span>
                  *
                </span>
              </label>
              <q-input id="lastName" outlined class="q-mt-sm" square placeholder="Doe"
                v-model="serviceSchedule.client.lastName" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/.test(vall) || 'Ingresa un apellido valido'
                ]">
              </q-input>
            </div>
            <div class="col-12 vehicle-form__input">
              <label for="hour">
                Correo
                <span>
                  *
                </span>
              </label>
              <q-input id="hour" outlined class="q-mt-sm" square placeholder="jhon@doe.com"
                v-model="serviceSchedule.client.email" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(vall) || 'Ingresa un correo valido',
                ]">
              </q-input>
            </div>
            <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pr-md': $q.screen.gt.sm }">
              <label for="date">
                Documento
                <span>
                  *
                </span>
              </label>
              <q-input id="date" outlined class="q-mt-sm" square placeholder="123456789"
                v-model="serviceSchedule.client.dni" mask="############" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => vall.length <= 12 || 'Ingresa un teléfono valido'
                ]">
              </q-input>
            </div>
            <div class="col-12 col-md-6 vehicle-form__input" :class="{ 'q-pl-md': $q.screen.gt.sm }">
              <label for="date">
                Teléfono
                <span>
                  *
                </span>
              </label>
              <q-input id="date" outlined class="q-mt-sm" square placeholder="123 4567 890"
                v-model="serviceSchedule.client.phone" mask="### #### ###" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => vall.length <= 12 || 'Ingresa un teléfono valido'
                ]">
              </q-input>
            </div>
          </div>
        </div>

        <!--End general data-->
        <div class="one__general">
          <h2>
            Detalles generales
          </h2>

          <DateSelected :hour="serviceSchedule.hour" :selected-date="selectedDate" />

          <q-btn v-if="step < 3" @click="step++" :disable="step === 2 && !serviceSchedule.client.name ||
            step === 2 && !serviceSchedule.client.lastName ||
            step === 2 && !serviceSchedule.client.email ||
            step === 2 && !serviceSchedule.client.dni ||
            step === 2 && !serviceSchedule.client.phone
            " square unelevated label="Continuar" class="q-mt-xl" color="secondary"></q-btn>
        </div>
        <!--End detalles generales-->
      </div>
      <!--End paso 2-->

      <!--Paso 3-->
      <div class="motowork-stepper-content three" v-if="step === 3">
        <div class="two__form">
          <h2>
            Datos del vehiculo
          </h2>
          <p>
            Llena el formulario con tus datos del vehiculo, recuerda aceptar nuestras
            <a href="/politicas">
              Políticas de uso y tratamiento de datos personales
            </a>
          </p>

          <div class="one__form--fields row">
            <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pr-md': $q.screen.gt.sm }">
              <label for="vehicle_dni">
                Placa
                <span>
                  *
                </span>
              </label>
              <q-input id="vehicle_dni" outlined class="q-mt-sm" square placeholder="123-456"
                v-model="serviceSchedule.vehicle_dni" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                ]" mask="XXX-XXX">
              </q-input>
            </div>
            <div class="col-12 col-md-6 vehicle-form__input-date" :class="{ 'q-pl-md': $q.screen.gt.sm }">
              <label for="vehicle_type">
                Tipo de motocicleta
                <span>
                  *
                </span>
              </label>
              <q-input id="vehicle_type" outlined class="q-mt-sm" square placeholder="Adventure"
                v-model="serviceSchedule.vehicle_type" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                ]">
              </q-input>
            </div>
            <div class="col-12 vehicle-form__input">
              <label for="vehicle_km">
                Kilometraje
                <span>
                  *
                </span>
              </label>
              <q-input id="vehicle_km" outlined class="q-mt-sm" square placeholder="1500 KM"
                v-model="serviceSchedule.vehicle_km" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                ]">
              </q-input>
            </div>
            <div class="col-12 vehicle-form__input">
              <label for="complement">
                Comentario
                <span>
                  *
                </span>
              </label>
              <q-input type="textarea" id="complement" outlined class="q-mt-sm" square
                placeholder="Descripción del problema del vehiculo" v-model="serviceSchedule.complement" :rules="[
                  vall => !!vall || 'Ingresa este campo',
                  vall => vall.length <= 1000 || 'Debe tener maximo 1000 caracteres'
                ]">
              </q-input>
            </div>
          </div>
        </div>

        <!--End general data-->
        <div class="one__general">
          <h2>
            Detalles generales
          </h2>

          <DateSelected :hour="serviceSchedule.hour" :selected-date="selectedDate" />

          <div class="que-tan">
            <h2>
              Califícanos
            </h2>
            <p>
              ¿Que tan fácil fue agendar esta cita?
            </p>
          </div>

          <q-option-group v-model="serviceSchedule.level_to_schedule" :options="options" color="secondary" />

          <q-btn :loading="loading" v-if="step === 3" type="submit" :disable="step === 3 && !serviceSchedule.vehicle_dni ||
            step === 3 && !serviceSchedule.vehicle_type ||
            step === 3 && !serviceSchedule.vehicle_km ||
            step === 3 && !serviceSchedule.complement
            " square unelevated label="Continuar" class="q-mt-xl" color="secondary"></q-btn>
        </div>
        <!--End detalles generales-->
      </div>
      <!--End paso 3-->
    </q-form>
    <!--End stepper content-->
  </q-page>
</template>

<script setup>
// imports
import { date } from 'quasar'
import { computed, ref, watch } from 'vue'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import DateSelected from 'src/components/schedule/DateSelected.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useScheduleServices } from 'src/composables/scheduleServices'
import { notification } from 'src/boot/notification'

// references
const step = ref(1)
const formRef = ref()
const loading = ref(false)
const timeStamp = Date.now()
const { handlerSchedule } = useScheduleServices()
const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
const dateModel = ref(formattedString)
const serviceSchedule = ref({
  hour: '',
  date: '',
  hourType: 'A.m.',
  client: {
    name: '',
    lastName: '',
    email: '',
    dni: '',
    phone: ''
  },
  vehicle_dni: '',
  vehicle_type: '',
  vehicle_km: '',
  complement: '',
  level_to_schedule: 'Muy fácil'
})

const options = [
  {
    label: 'Muy fácil',
    value: 'Muy fácil'
  },
  {
    label: 'Fácil',
    value: 'Fácil'
  },
  {
    label: 'Normal',
    value: 'Normal'
  },
  {
    label: 'Dificil',
    value: 'Dificil'
  },
  {
    label: 'Muy dificil',
    value: 'Muy dificil'
  }
]

// computed
const selectedDate = computed(() => {
  const [year, month, day] = dateModel.value.split('/')
  return {
    year,
    day,
    month
  }
})

// watch
watch(
  () => {
    return dateModel.value
  },
  (val) => {
    serviceSchedule.value.date = val
  }
)

// methods
const disablePastDates = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selectedDate = new Date(date)
  const isSunday = selectedDate.getDay() === 0
  return selectedDate >= today && !isSunday
}

const handlerScheduleServices = async () => {
  loading.value = true
  try {
    const response = await handlerSchedule(serviceSchedule.value)
    if (response?.success) {
      notification('positive', response?.message, 'primary')
      serviceSchedule.value = {
        hour: '',
        date: '',
        hourType: 'A.m.',
        client: {
          name: '',
          lastName: '',
          email: '',
          dni: '',
          phone: ''
        },
        vehicle_dni: '',
        vehicle_type: '',
        vehicle_km: '',
        complement: '',
        level_to_schedule: 'Muy fácil'
      }
      formRef.value.reset()
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.motowork-stepper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  &__step {
    gap: 12px;
    min-width: 250px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #B5B3B3;

      color: #B5B3B3;
      text-align: center;

      /* Desktop/Body/Text/Large */
      font-family: Ubuntu;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 30px */
    }

    .label {
      color: #B5B3B3;
      text-align: center;
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */

      @media(max-width: 767px) {
        display: none;
      }
    }

    &.active {
      .number {
        color: #ED1C24;
        border: 1px solid #ED1C24;
      }

      .label {
        color: #ED1C24;
      }
    }

    &.complete {
      &:not(:last-child) {
        &::after {
          content: '';
          min-width: 60%;
          border: 1px solid #ED1C24;
          height: 1px;
          position: absolute;
          top: 30%;
          left: 70%;
        }
      }

      .number {
        background-color: $secondary;
        color: white;
        border-color: $secondary;
      }

      ;
    }

    &:not(:last-child) {
      &::after {
        content: '';
        min-width: 60%;
        border: 1px solid #B5B3B3;
        height: 1px;
        position: absolute;
        top: 30%;
        left: 70%;
      }
    }

    @media(max-width: 767px) {
      min-width: 120px;

      &:not(:last-child) {
        &::after {
          top: 50%;
          left: 75%;
          min-width: 50%;
        }
      }
    }
  }
}

.motowork-stepper-content {
  width: 100%;
  display: flex;

  // paso 1
  .one {
    display: flex;
    gap: 16px;
    justify-content: space-between;

    // date section
    &__date {
      gap: 16px;
      width: 60%;
      display: flex;
      flex-direction: column;

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
      }

      p {
        color: #9F9C9C;

        /* Desktop/Body/Text/Medium */
        font-family: Ubuntu;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 20px */
      }

      .q-date {
        height: 400px;

        .q-date__view {
          height: 400px;
        }
      }

      @media(max-width: 767px) {
        width: 100%;
      }
    }

    // general section
    &__general {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding-left: 48px;
      padding-right: 48px;

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
      }

      //hour picker
      &--hour-picker {
        .append {
          display: flex;
          gap: 16px;
          align-items: center;

          .hour-type {
            display: inline-block;
            width: 60px;
          }

          span {
            color: #9F9C9C;

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

      .q-btn {
        height: 48px;
      }

      @media(max-width: 767px) {
        padding-left: 0px;
        padding-right: 0px;
        width: 100%;
      }
    }
  }

  // paso 2
  .two {
    display: flex;

    &__form {
      gap: 16px;
      max-width: 730px;
      display: flex;
      flex-direction: column;

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
      }

      p {
        color: #9F9C9C;

        /* Desktop/Body/Text/Medium */
        font-family: Ubuntu;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 20px */

        a {
          color: $secondary;
        }
      }

      &--fields {
        margin-top: 16px;
      }

      @media(max-width: 767px) {
        width: 100%;
        max-width: 100%;
      }
    }
  }

  @media(max-width: 1135px) {
    display: flex;
    flex-direction: column !important;
  }
}

.que-tan {
  p {
    color: #9F9C9C;

    /* Desktop/Body/Text/Medium */
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 20px */
    margin-top: 16px;
  }
}
</style>
