<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :contentEnd="true" title="Viaje de prueba" :banner="formularioBanner || {}"
      default-img="https://res.cloudinary.com/dg14xloef/image/upload/v1737398094/banners/boxfnfyssqzw809kxhsc.webp"
      btnLabel=""
      bannerComplement="Deje sus datos a continuación y nos comunicaremos con usted dentro de un día hábil para programar su viaje de prueba."
      bannerAlt="Deje sus datos a continuación y nos comunicaremos con usted dentro de un día hábil para programar su viaje de prueba." />
    <!--End banner-->

    <!--page container-->
    <section class="container-motowork bg-white" v-if="product._id">
      <div class="motowork-form-grid">
        <div class="motowork-form-grid__selected">
          <article>
            <h2>
              {{ product.name }}
            </h2>

            <section class="card">
              <figure>
                <img :src="firstProductImage"
                  :alt="`Imagen de la motocicleta ${product.name}, utilizado por Motowork en su Pagina Web`"
                  :title="`Imagen de la motocicleta ${product.name}, utilizado por Motowork en su Pagina Web`" />
              </figure>
              <div class="card__content">
                <div class="card__content--item">
                  <span class="label">
                    Modelo
                  </span>
                  <span class="value">
                    {{ product?.model }}
                  </span>
                </div>
                <div class="card__content--item">
                  <span class="label">
                    Cilindraje
                  </span>
                  <span class="value">
                    {{ product?.details?.power }} CC
                  </span>
                </div>
                <div class="card__content--item">
                  <span class="label">
                    Peso total
                  </span>
                  <span class="value">
                    {{ product?.details?.weight }}
                  </span>
                </div>
              </div>
            </section>

            <q-btn square @click="$router.back()" label="Cambiar modelo" color="primary" outline unelevated=""></q-btn>
          </article>

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
        <div class="motowork-form-grid__form">
          <VehicleForm />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
// imports
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useProductsContent } from 'src/composables/useProductContent'
import VehicleForm from 'src/components/products/partials/VehicleForm.vue'

// references
const route = useRoute()
const store = useStoreContent()
const creationProfile = ref(false)
const acceptMarketing = ref(false)
const { showProduct } = useProductsContent()
const formularioBanner = ref({
  path: '/images/banner_formulario_motowork.webp'
})

// computed
const product = computed(() => store.product)

const firstProductImage = computed(() => {
  if (product?.value?.images) {
    return product.value?.images[0]?.path || ''
  }
  return ''
})

// methods
const getProductData = async () => {
  const { reference } = route.query
  await showProduct(reference)
}

if (!product.value._id) {
  getProductData()
}

// hook
</script>

<style scoped lang="scss">
.motowork-form-grid {
  display: flex;
  flex-direction: row;
  gap: 32px;

  &__form {
    flex: 1;
  }

  &__selected {
    max-width: 530px;
    display: flex;
    flex-direction: column;

    article {
      display: flex;
      flex-direction: column;
      gap: 32px;

      h2 {
        color: #000;
        align-self: stretch;
        /* Desktop/Headings/H4 */
        font-family: Play;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 30px */
        text-transform: uppercase;
      }

      .card {
        figure {
          width: 100%;
          max-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E3E3E3;
          overflow: hidden;

          img {
            width: 75%;
            height: 100%;
            object-fit: cover;
          }
        }

        &__content {
          border: 1px solid #E3E3E3;

          &--item {
            padding: 16px 24px;
            display: flex;
            align-items: center;

            .label {
              width: 150px;
              display: inline-block;
              overflow: hidden;
              color: #000;
              text-overflow: ellipsis;

              /* Desktop/Body/Description/Medium */
              font-family: Ubuntu;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 125%;
              /* 20px */
            }

            .value {
              overflow: hidden;
              color: #9F9C9C;
              text-overflow: ellipsis;

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

      .q-btn {
        height: 48px;
      }
    }

    @media(min-width: 992px) and (max-width: 1199px) {
      max-width: 400px;
    }

    @media(min-width: 768px) and (max-width: 991px) {
      max-width: 360px;
    }
  }

  &__legals {
    margin-top: 96px;

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
  }

  &__complement {
    a {
      color: $secondary;
      text-decoration: none;
    }
  }
}
</style>
