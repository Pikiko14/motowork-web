<template>
  <q-page>
    <!--main content-->
    <section class="container-motowork bg-white">
      <article class="confirmation-card">
        <figure class="confirmation-card__logo">
          <img
            src="/images/logo-confirmation.webp"
            alt="Logo motowork"
            title="Motowork logo"
          />
        </figure>

        <p class="confirmation-card__title">
          ¡Su agendamiento de <span>servicio técnico</span> ha sido confirmado!
        </p>

        <p class="confirmation-card__hello">
          Hola, ({{ scheduleService?.client?.name }} {{ scheduleService?.client?.lastName }})
        </p>

        <p class="confirmation-card__vehicle-type">
          Nos complace confirmar que su agendamiento para el servicio técnico de su moto ({{ scheduleService.vehicle_type }}) ha sido exitoso.
        </p>

        <div class="confirmation-card__details">
          <!--Date-->
          <div class="confirmation-card__details--item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
              <path d="M1.5238 3.14258H22.4762V21.9998H1.5238V3.14258Z" stroke="black" stroke-width="1.5"/>
              <path d="M6.76172 0V3.14282" stroke="black" stroke-width="1.5"/>
              <path d="M17.238 0V3.14282" stroke="black" stroke-width="1.5"/>
              <path d="M7.80957 14.667H16.1905M12 10.4766V18.8575" stroke="black" stroke-width="1.5"/>
              <path d="M1.5238 7.33301H22.4762" stroke="black" stroke-width="1.5"/>
            </svg>
            <span class="title">Fecha:</span>
            <span class="value">{{ scheduleService?.date?.split('T')?.shift() }}</span>
          </div>
          <!--End date-->

          <!--Hora-->
          <div class="confirmation-card__details--item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23 12C23 18.0753 18.0753 23 12 23C5.92469 23 1 18.0753 1 12C1 5.92469 5.92469 1 12 1" stroke="black" stroke-width="1.5"/>
              <path d="M22.7801 9.79975C22.5975 8.899 22.3018 8.02489 21.9001 7.19824" stroke="black" stroke-width="1.5"/>
              <path d="M20.8002 5.39922C20.1742 4.56594 19.4335 3.82526 18.6002 3.19922" stroke="black" stroke-width="1.5"/>
              <path d="M16.8005 2.09967C15.9741 1.69816 15.1004 1.40243 14.2001 1.21973" stroke="black" stroke-width="1.5"/>
              <path d="M12 6.5V12L16.4 16.4" stroke="black" stroke-width="1.5"/>
            </svg>
            <span class="title">Hora:</span>
            <span class="value">{{ scheduleService?.hour }} {{ scheduleService?.hourType }}</span>
          </div>
          <!--End hora-->

          <!--Direccion-->
          <div class="confirmation-card__details--item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.1724 17.0636H20.2154L22.6807 22.9498H1.31934L3.78464 17.0625H5.82764" stroke="black" stroke-width="1.5"/>
              <path d="M12.2323 19.5528C12.2323 19.5528 20.0222 13.7098 20.0222 8.4996C20.0233 4.4578 17.1013 1.0498 12.2323 1.0498C7.36216 1.0498 4.44116 4.4578 4.44116 8.4996C4.44116 13.7098 12.2323 19.5528 12.2323 19.5528Z" stroke="black" stroke-width="1.5"/>
              <path d="M10.3424 5.90918H14.1219V9.68858H10.3424V5.90918Z" stroke="black" stroke-width="1.5"/>
            </svg>
            <span class="title">Dirección:</span>
            <span class="value">Carrera 47 # 7 – 41 Av. Las vegas</span>
          </div>
          <!--End Direccion-->
        </div>

        <div class="confirmation-card__list">
          <p>
            Para su comodidad le recordamos que puede
          </p>

          <ul class="q-ml-md">
            <li>
              Contactar a nuestro centro de Atención al cliente
            </li>
            <li>
              Llegar a la sucursal 15 minutos antes de su cita para realizar el check-in.
            </li>
          </ul>
        </div>

        <q-btn square label="Cancelar servicio técnico" color="secondary" unelevated class="full-width"></q-btn>

        <p class="confirmation-card__terms">
          Al hacer clic en este botón, serás redirigido a nuestro número de WhatsApp, donde podrás hablar con un agente de atención al cliente para cancelar o modificar tu cita.
        </p>
      </article>
    </section>
    <!--End main content-->
  </q-page>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useScheduleServices } from 'src/composables/scheduleServices'

// references
const route = useRoute()
const scheduleService = ref({})
const { getScheduleData } = useScheduleServices()

// methods
const loadScheduleData = async (reference) => {
  try {
    const response = await getScheduleData(reference)
    if (response.success) {
      scheduleService.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
}

// hook
const { reference } = route.params
loadScheduleData(reference)
</script>
