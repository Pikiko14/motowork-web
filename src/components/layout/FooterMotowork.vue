<template>
  <section class="footer-section">
    <div class="footer-grid">
      <!-- First section -->
      <div class="footer-grid__item rrss-item middle">
        <div class="rrss-and-logo">
          <figure class="logo">
            <img src="/images/motowork-footer-logo.png" alt="Logo de Motowork, utilizado en el footer de la página" />
          </figure>

          <div class="rrss" aria-label="Redes sociales de Motowork">
            <a href="https://www.facebook.com/motowork" target="_blank" rel="noopener noreferrer"
              title="Visita nuestro Facebook de Motowork" aria-label="Ir a la página de Facebook de Motowork">
              <img src="/images/facebook.png" alt="Ícono de Facebook de Motowork" />
            </a>
            <a href="https://www.instagram.com/motowork" target="_blank" rel="noopener noreferrer"
              title="Visita nuestro Instagram de Motowork" aria-label="Ir a la página de Instagram de Motowork">
              <img src="/images/instagrams.png" alt="Ícono de Instagram de Motowork" />
            </a>
            <a href="https://www.tiktok.com/@motoworkoficial" target="_blank" rel="noopener noreferrer"
              title="Visita nuestro TikTok de Motowork" aria-label="Ir a la página de TikTok de Motowork">
              <img src="/images/tiktok.png" alt="Ícono de TikTok de Motowork" />
            </a>
            <!--<a href="https://youtube.com/motowork" target="_blank" rel="noopener noreferrer"
              title="Visita nuestro canal de YouTube de Motowork" aria-label="Ir al canal de YouTube de Motowork">
              <img src="/images/youtube.png" alt="Ícono de YouTube de Motowork" />
            </a>-->
          </div>
        </div>
      </div>
      <!-- End first section -->

      <!-- Second section -->
      <div class="footer-grid__item middle flex-one">
        <div class="coorporativo">
          <h2>
            Corporativo
          </h2>
          <div class="links-section">
            <a href="/terminos-y-condiciones" aria-label="Términos y condiciones" title="Términos y condiciones">
              Términos y condiciones
            </a>
            <a href="/politicas-de-privacidad"
              aria-label="Política de uso y privacidad" title="Política de uso y privacidad">
              Políticas de uso y privacidad
            </a>
            <a href="/politicas-de-datos"
              aria-label="Política de tratamiento de datos" title="Política de tratamiento de datos">
              Política de datos
            </a>
            <a href="/conocenos"
              aria-label="Sobre nosotros" title="Sobre nosotros">
              Sobre nosotros
            </a>
          </div>
        </div>
      </div>
      <!-- End second section -->

      <!-- Third section -->
      <div class="footer-grid__item middle">
        <div class="coorporativo">
          <h2>
            Soporte
          </h2>
          <div class="links-section">
            <a href="https://api.whatsapp.com/send?phone=573183996249&text=Hola%20Motowork" target="_blank"
              rel="noopener noreferrer" aria-label="Soporte por WhatsApp de Motowork" title="Soporte por WhatsApp">
              Soporte WhatsApp
            </a>
            <a @click="openPbxModal" aria-label="Llamar a PBX (604) 444 97 27" title="Llamar a PBX" class="cursor-pointer">
              PBX (604)444 97 27
            </a>
            <a href="mailto:info@motowork.co" target="_blank" rel="noopener noreferrer"
              aria-label="Enviar correo electrónico a Motowork" title="Enviar correo electrónico a Motowork">
              info@motowork.co
            </a>
            <a target="_blank"
              href="https://www.google.com/maps/place/Cra.+47+%237-41,+El+Poblado,+Medell%C3%ADn,+El+Poblado,+Medell%C3%ADn,+Antioquia/data=!4m2!3m1!1s0x8e4429d51ae9586d:0x6b7a6254c333a834?sa=X&ved=1t:242&ictx=111"
              rel="noopener noreferrer" aria-label="Sobre nosotros" title="Sobre nosotros">
              Carrera 47 # 7 – 41 Av. Las vegas
            </a>
          </div>
        </div>
      </div>
      <!-- End third section -->
    </div>

    <!--Rrss mobile-->
    <div class="rrss-mobile" aria-label="Redes sociales de Motowork">
      <a href="https://facebook.com/motowork" target="_blank" rel="noopener noreferrer"
        title="Visita nuestro Facebook de Motowork" aria-label="Ir a la página de Facebook de Motowork">
        <img src="/images/facebook.png" alt="Ícono de Facebook de Motowork" />
      </a>
      <a href="https://instagram.com/motowork" target="_blank" rel="noopener noreferrer"
        title="Visita nuestro Instagram de Motowork" aria-label="Ir a la página de Instagram de Motowork">
        <img src="/images/instagrams.png" alt="Ícono de Instagram de Motowork" />
      </a>
      <a href="https://tiktok.com/motowork" target="_blank" rel="noopener noreferrer"
        title="Visita nuestro TikTok de Motowork" aria-label="Ir a la página de TikTok de Motowork">
        <img src="/images/tiktok.png" alt="Ícono de TikTok de Motowork" />
      </a>
    </div>
    <!--End rrss mobile-->

    <!--Separator-->
    <hr class="footer-separator" />
    <!--End separator-->

    <!--Copy-->
    <div class="footer-copy">
      <p>
        © Copyright - {{ currentYear }} Moto Work - Todos los derechos reservados.
      </p>
    </div>
    <!--End Copy-->

    <!--Pbx modal-->
    <q-dialog v-model="pbxModal">
      <q-card class="pbx">
        <q-card-section>
          <h2 class="modal-title">Asesores de venta</h2>
          <q-btn color="secondary" v-close-popup class="absolute-top-right" style="right: 10px; top: 10px" rounded flat
            dense icon="close"></q-btn>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="(asesor, index) in asesores" :key="index">
              <q-item-section>
                <q-item-label class="text-bold">{{ asesor.nombre }}</q-item-label>
                <q-item-label caption>{{ asesor.area }}</q-item-label>
              </q-item-section>
              <q-item-section side class="d-flex">
                <a :href="`tel:${asesor.celular}`" aria-label="Contactar con asesor">
                  <q-icon color="green" name="phone_in_talk" title="Llanada teléfonica" size="22px" />
                  <q-tooltip class="bg-green">
                    Llamar asesor
                  </q-tooltip>
                </a>
                <a :href="`tel:${asesor.celular}`" aria-label="Contactar con asesor">
                  <q-icon color="green" name="mail" title="Llanada teléfonica" size="22px" />
                  <q-tooltip class="bg-green">
                    Enviar correo
                  </q-tooltip>
                </a>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--End pbx modal-->
  </section>
</template>

<script setup>
// imports
import { ref } from 'vue'

// references
const pbxModal = ref(false)
const currentYear = ref(new Date().getFullYear())
const asesores = [
  { nombre: 'Juan Jose', area: 'Asesor venta de repuestos y accesorios', correo: 'comercial-repuestos1@motowork.com.co', celular: '3175052541' },
  { nombre: 'Alejandro Osorio', area: 'Asesor venta de repuestos y accesorios', correo: 'auxiliar-repuestos@motowork.com.co', celular: '3188279037' },
  { nombre: 'Daniel Ruiz', area: 'Asesor venta de repuestos y accesorios', correo: 'comercial-repuestos4@motowork.com.co', celular: '3173117333' },
  { nombre: 'Euvaldo Camacho', area: 'Asesor venta de repuestos y accesorios', correo: 'e.camacho@motowork.com.co', celular: '3173711290' },
  { nombre: 'David Mesa', area: 'Asesor venta de repuestos y accesorios', correo: 'comercial-repuestos3@motowork.com.co', celular: '3173642461' },
  { nombre: 'Jose Cossio', area: 'Asesor venta de repuestos y accesorios', correo: 'comercial-repuestos2@motowork.com.co', celular: '3106133770' },
  { nombre: 'Carlos Vasquez', area: 'Asesor de ventas motos', correo: 'ventasmotos3@motowork.com.co', celular: '3176432070' },
  { nombre: 'Flor Velasquez', area: 'Asesora de ventas motos', correo: 'ventasmotos1@motowork.com.co', celular: '3016610615' },
  { nombre: 'Katherine Montoya', area: 'Asesora de ventas motos', correo: 'ventasmotos2@motowork.com.co', celular: '3164743748' },
  { nombre: 'Santiago Cardona', area: 'Asesor de ventas motos', correo: 'ventasmotos@motowork.com.co', celular: '3173712794' },
  { nombre: 'Adriana Perez', area: 'Asesora de ventas redes', correo: 'marketing@motowork.com.co', celular: '3157240417' },
  { nombre: 'Anderon Jimenez', area: 'Coordinadora de Servicio tecnico', correo: 'taller@motowork.co', celular: '3188279036' },
  { nombre: 'Otros', area: 'Administracion', correo: 'administrador@motowork.co', celular: '3182576333' }
]

// methods
const openPbxModal = () => {
  pbxModal.value = !pbxModal.value
}
</script>

<style scoped lang="scss">
.footer-section {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.footer-grid {
  display: flex;
  flex-direction: row;
  gap: 16px;

  &__item {
    max-height: 397px;
    flex: 1;

    .rrss-and-logo {
      min-height: 188px;
      display: flex;
      flex-direction: column;
      gap: 56px;
      width: 100%;
      justify-content: center;
      align-items: center;

      .logo {
        aspect-ratio: 2/1;
        max-width: 220px;

        img {
          width: 100%;
          height: 100%;
          max-width: 220px;
        }

        @media(max-width: 991px) {
          max-width: 160px;
        }
      }

      .rrss {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        width: 70%;
        height: 50px;

        a {
          width: 32px;
          height: 32px;
          transition: all .1s ease-out;

          @media(max-width: 991px) {
            width: 18px;
            height: 18px;
          }

          &:hover {
            transform: translateY(-10px);
          }
        }

        @media(max-width: 767px) {
          display: none;
        }
      }

      @media(max-width: 767px) {
        min-height: auto;
        gap: 12px;
      }
    }

    .coorporativo {
      display: flex;
      flex-direction: column;
      gap: 18px;

      h2 {
        overflow: hidden;
        color: #FFF;
        text-overflow: ellipsis;
        font-family: Play;
        font-size: 24pt;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        text-transform: uppercase;

        @media(max-width: 991px) {
          font-size: 18pt;
        }
      }

      .links-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;

        a {
          overflow: hidden;
          color: #FFF;
          text-overflow: ellipsis;
          font-family: Ubuntu;
          font-size: 16pt;
          font-style: normal;
          font-weight: 400;
          line-height: 125%;
          /* 15px */
          text-decoration: none;
          transition: all .1s ease-out;

          @media(max-width: 991px) {
            font-size: 12pt;
          }

          &:hover {
            transform: translateX(10px);
          }
        }
      }

      @media(max-width: 767px) {
        text-align: center;
      }
    }

    @media(max-width: 767px) {
      max-height: none;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 24px;
  }
}

.footer-separator {
  height: 1px;
  width: 100%;
  background: #FFF;
  margin-top: 72px;
}

.footer-copy {
  margin-top: 32px;

  p {
    overflow: hidden;
    color: #FFF;
    text-align: center;
    text-overflow: ellipsis;

    /* Desktop/Body/Text/Small */
    font-family: Ubuntu;
    font-size: 12pt;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 15px */
  }
}

.rrss-mobile {
  margin-top: 24px;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
  height: 50px;

  a {
    width: 32px;
    height: 32px;

    @media(max-width: 767px) {
      width: 24px;
      height: 24px;
    }

    img {
      width: 32px;
      height: 32px;

      @media(max-width: 767px) {
        width: 24px;
        height: 24px;
      }
    }

    @media(max-width: 991px) {
      width: 18px;
      height: 18px;
    }
  }

  @media(max-width: 767px) {
    display: flex;
  }
}

.pbx {
  width: 420px;

  h2 {
    font-size: 16px;
    color: $primary;
    font-weight: 600;
    line-height: 120%;
  }

  @media(max-width: 767px) {
    width: 320px;
  }
}

.d-flex {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
