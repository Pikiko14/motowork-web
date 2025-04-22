<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Servicio técnico.'" is-experience-banner default-img="/images/services_image.webp"
      :btnLabel="''"
      :bannerComplement="'En Moto Work, nos apasiona tu seguridad y tranquilidad en la vía. Por eso, te ofrecemos un Servicio Técnico de primera clase, con expertos altamente calificados.'" />
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
            La fecha y hora que selecciones asegura la recepción de tu motocicleta en el centro de servicio de Moto Work.
          </p>

          <q-date class="shadow-0 full-width" v-model="dateModel" minimal :options="datesAvailable" />
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
                      <q-time :format24h="false" :locale="myLocale" mask="HH:mm" color="secondary"
                        v-model="serviceSchedule.hour">
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
            <div class="col-12 col-md-6 vehicle-form__input-date relative" :class="{ 'q-pl-md': $q.screen.gt.sm }">
              <label for="vehicle_type">
                Tipo de motocicleta
                <span>
                  *
                </span>
              </label>
              <q-select id="vehicle_type" outlined class="q-mt-sm" square label="Selecciona una opción"
                v-model="serviceSchedule.vehicle_type" :options="categoriesOption" :rules="[
                  vall => !!vall || 'Selecciona una opción',
                ]">
              </q-select>
              <div class="select-custom-icom mr-mobile">
                <q-icon name="img:/images/chevron-right.webp"></q-icon>
              </div>
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
            step === 3 && !serviceSchedule.complement ||
            step === 3 && !serviceSchedule.client.name ||
            step === 3 && !serviceSchedule.client.lastName ||
            step === 3 && !serviceSchedule.client.email ||
            step === 3 && !serviceSchedule.client.dni ||
            step === 3 && !serviceSchedule.client.phone
            " square unelevated label="Continuar" class="q-mt-xl" color="secondary"></q-btn>
        </div>
        <!--End detalles generales-->
      </div>
      <!--End paso 3-->
    </q-form>
    <!--End stepper content-->

    <!--Complement text-->
    <section class="container-motowork bg-white">
      <div class="motowork-complement">
        <div class="header-section">
          <h2>
            ¿Necesitas Ayuda?
          </h2>
          <p>
            Te ofrecemos múltiples vías de contacto para que puedas resolver todas tus dudas y consultas de manera ágil
            y
            personalizada. Nuestros diversos canales están aquí para brindarte el apoyo que necesitas en cualquier
            momento.
          </p>
        </div>

        <div class="contact-section">
          <div class="item">
            <div class="item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M22 0.25H0V2.68L11 9.855L22 2.68V0.25ZM22 4.471L11.41 11.378L11 11.645L10.59 11.378L0 4.471V17.25H22V4.471Z"
                  fill="#B2B2B2" />
              </svg>
            </div>

            <div class="item-content">
              <h3>
                correo
              </h3>
              <a aria-label="Enviar correo a motowork" href="mailto:info@motowork.co">
                info@motowork.co
              </a>
            </div>
          </div>

          <div class="item">
            <div class="item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.00247 0.320312H31.6801V28.9979H11.2561L0.320068 31.6803L3.00247 20.7442V0.320312ZM16.6585 15.3419V9.87951H11.1961V13.9763H13.9273V15.3419C13.9273 16.0962 13.3158 16.7075 12.5617 16.7075V19.4387C14.8242 19.4387 16.6585 17.6046 16.6585 15.3419ZM23.4865 15.3419V9.87951H18.0241V13.9763H20.7553V15.3419C20.7553 16.0962 20.1439 16.7075 19.3897 16.7075V19.4387C21.6522 19.4387 23.4865 17.6046 23.4865 15.3419Z"
                  fill="#B2B2B2" />
              </svg>
            </div>

            <div class="item-content">
              <h3>
                Whatsapp
              </h3>
              <a href="https://api.whatsapp.com/send?phone=573183996249&amp;text=Hola%20Motowork" target="_blank"
                rel="noopener noreferrer" aria-label="Soporte por WhatsApp de Motowork" title="Soporte por WhatsApp">
                +573183996249
              </a>
            </div>
          </div>

          <div class="item">
            <div class="item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.9999 2.99967C10.5816 2.99967 6.99992 6.58139 6.99992 10.9997V21.6663H0.333252V10.9997H4.33325C4.33325 5.10863 9.10888 0.333008 14.9999 0.333008C20.891 0.333008 25.6666 5.10863 25.6666 10.9997H29.6666V21.6663H25.6666C25.6666 25.3482 22.6818 28.333 18.9999 28.333V29.6663H10.9999V24.333H18.9999V25.6663C21.2091 25.6663 22.9999 23.8755 22.9999 21.6663V10.9997C22.9999 6.58139 19.4182 2.99967 14.9999 2.99967Z"
                  fill="#B2B2B2" />
              </svg>
            </div>

            <div class="item-content">
              <h3>
                Linea fija
              </h3>
              <a href="tel:3188279036" aria-label="Llamar a linea de atención">
                3188279036
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End complement text-->
  </q-page>
</template>

<script setup>
// imports
import { date, useMeta } from 'quasar'
import { computed, ref, watch } from 'vue'
import { notification } from 'src/boot/notification'
import { datesAvailables } from 'src/utils/datesAvailables'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import DateSelected from 'src/components/schedule/DateSelected.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useScheduleServices } from 'src/composables/scheduleServices'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'

// references
const myLocale = {
  /* starting with Sunday */
  days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias'
}
const step = ref(1)
const formRef = ref()
const loading = ref(false)
const timeStamp = Date.now()
const { handlerSchedule } = useScheduleServices()
const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
const dateModel = ref(formattedString)
const serviceSchedule = ref({
  hour: '',
  date: dateModel,
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
const {
  getCategories,
  categories
} = useCategoriesContent()
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

const categoriesOption = computed(() => {
  return categories.value.map((el) => el.name)
})

const datesAvailable = computed(() => {
  return datesAvailables.map((el) => el.fecha.split('-').join('/'))
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
// const disablePastDates = (date) => {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//
//   const selectedDate = new Date(date)
//   const isSunday = selectedDate.getDay() === 0
//   return selectedDate >= today && !isSunday
// }

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
      step.value = 1
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const metaData = {
  // sets document title
  title: 'Moto Work',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Agenda de servicios`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: '¡Agenda tu servicio técnico con los mejores profesionales del mercado, no esperes mas.!'
    },
    keywords: {
      name: 'keywords',
      content: 'Yamaha, motocicletas Yamaha, motos Yamaha, NMAX, CRYPTON, XMAX300, TMAX, MT-03, Ténéré 700, motos deportivas, motos urbanas, motos de aventura, motocicletas confiables, venta de motos, motos nuevas Yamaha, concesionarios Yamaha, motos económicas, accesorios Yamaha, Blog, Experiencias, Experiencias Motowork'
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8'
    },
    ogTitle: {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Agenda de servicios`
      }
    },
    ogDescription: {
      property: 'og:description',
      content: 'Descubre nuestra amplia gama de motocicletas Yamaha. ¡La moto perfecta para cada aventura está aquí!'
    },
    ogType: {
      property: 'og:type',
      content: 'website'
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://www.motowork.co'
    },
    twitterCard: {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    twitterTitle: {
      name: 'twitter:title',
      content: 'MotoWork - Web'
    },
    twitterDescription: {
      name: 'twitter:description',
      content: 'Explora las mejores motocicletas Yamaha: diseño, innovación y aventura en cada modelo.'
    },
    robots: {
      name: 'robots',
      content: 'index, follow'
    },
    language: {
      name: 'language',
      content: 'es'
    }
  },

  // CSS tags
  link: {
    favicon: {
      rel: 'icon',
      href: '/favicon.ico'
    },
    canonical: {
      rel: 'canonical',
      href: 'https://www.motowork.co'
    }
  },

  // <noscript> tags
  noscript: {
    default: 'Este contenido es visible para navegadores sin soporte de JavaScript o con JavaScript desactivado.'
  }
}
useMeta(metaData)

const setHour = () => {
  const dateString = dateModel.value.split('/').join('-')
  const dateSelected = datesAvailables.find((el) => el.fecha === dateString)
  const hours = dateSelected.horario.split('-')
  const [start, end] = hours
  const startDate = date.formatDate(`${serviceSchedule.value.date} ${start}`, 'YYYY-MM-DD HH:mm:ss')
  const endDate = date.formatDate(`${serviceSchedule.value.date} ${end}`, 'YYYY-MM-DD H:m:s')
  const selectedDate = date.formatDate(`${serviceSchedule.value.date} ${serviceSchedule.value.hour}`, 'YYYY-MM-DD HH:mm:ss')
  if (selectedDate < startDate || selectedDate > endDate) {
    serviceSchedule.value.hour = null
    notification('negative', `La hora en la que intentas agendar no esta disponible, Diponible entre(${start} y ${end})`, 'warning')
  }
}

// hook
getCategories('?page=1&perPage=30&type=vehicle')
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

.motowork-complement {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .header-section {
    max-width: 640px;

    h2 {
      color: #ED1C24;

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
      text-align: center;
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
  }

  .contact-section {
    margin-top: 24px;
    display: flex;
    gap: 32px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-icon {
        display: flex;
        width: 48px;
        height: 48px;
        padding: 9px;
        background: #F5F5F5;
        justify-content: center;
        align-items: center;
        gap: 6px;
      }

      .item-content {
        h3 {
          color: #000;
          text-align: center;

          /* Desktop/Body/Title/Medium */
          font-family: Play;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 20px */
          text-transform: uppercase;

          @media(max-width: 767px) {
            font-size: 14px;
          }
        }
      }

      a {
        margin-top: 8px;
        color: #ED1C24;
        text-align: center;

        /* Desktop/Body/Text/Small */
        font-family: Ubuntu;
        font-size: 12px;
        font-style: normal;
        text-decoration: none;
        font-weight: 400;
        line-height: 125%;
        /* 15px */

        @media(max-width: 767px) {
          font-size: 10px;
        }
      }
    }
  }
}

.select-custom-icom {
  background-color: red;
  width: 56px;
  height: 56px;
  position: absolute;
  right: 0px;
  top: 29px;
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
