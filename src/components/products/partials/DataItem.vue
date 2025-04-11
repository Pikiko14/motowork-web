<template>
  <article class="motowork-item-data">
    <header class="motowork-item-data__title">
      <figure>
        <img src="https://res.cloudinary.com/dg14xloef/image/upload/v1734447573/brands/rgihluw0qtl0ettkujt2.svg"
          alt="Logo Yamaha utilizado por Motowork en su página web" loading="lazy" role="img"
          aria-label="Logo de Yamaha" />
      </figure>
      <h2>{{ product.name }} {{ product.model }}</h2>
    </header>

    <section class="motowork-item-data__price">
      <span class="motowork-item-data__price--label">Desde</span>
      <span class="motowork-item-data__price--amount">{{ formatPrice(product.discount || product.price) }}</span>
    </section>

    <section class="motowork-item-data__rating" v-if="product.type === 'product'"
      aria-label="Calificación del producto">
      <span>{{ productRating }}/5</span>
      <q-rating no-dimming v-model="productRating" size="24pt" color="grey-5" icon="star_border" icon-selected="star"
        disable aria-hidden="true" />
    </section>

    <p class="motowork-item-data__description" v-if="product.description">
      {{ product.description }}
    </p>

    <section class="motowork-item-data__variants" v-if="product.type === 'product'">
      <article class="motowork-item-data__variants--item" v-for="(variant, idx) in product.variants" :key="idx"
        @click="selectedVariantForShopping(variant)" :class="{ active: selectedVariant._id === variant._id }" role="button"
        :aria-label="'Seleccionar variante: ' + variant.attribute" tabindex="0">
        <span>{{ variant.attribute }}</span>
        <p>{{ variant.description || 'Sin descripción.' }}</p>
      </article>
    </section>

    <section class="motowork-item-data__colors" v-if="product.type === 'vehicle'">
      <div class="motowork-item-data__colors--color" v-for="(color, idx) in product.details.colors" :key="idx"
        :style="`background-color: ${color.hex}`" @click="setImageFromColor(color)" role="button"
        :aria-label="'Seleccionar color: ' + color.name" tabindex="0"></div>
    </section>

    <section class="motowork-item-data__action">
      <q-btn :to="`/vehiculos/${product.name}/formulario?reference=${product._id}`" v-if="product.type === 'vehicle' && product.dive_test" square unelevated color="secondary" label="Prueba de manejo"
        aria-label="Agendar prueba de manejo para el vehículo"></q-btn>

      <div class="motowork-item-data__action--product" v-if="product.type === 'product'">
        <q-btn :disable="product.variants.length > 0 && !selectedVariant._id || totalItemsLimit === 0" square unelevated color="secondary"
          :label="$q.screen.gt.xs ? 'Agregar al carrito' : 'Agregar'" @click="handlerAddToCar" aria-label="Agregar este producto al carrito"></q-btn>

        <div class="motowork-item-data__action--product__quantity">
          <q-btn :disable="product.variants.length > 0 && !selectedVariant._id || totalItemsLimit === 0" @click="removeQuantity" icon="img:/images/back_arrow.png" unelevated dense square></q-btn>
          <span>{{ quantity }}</span>
          <q-btn :disable="product.variants.length > 0 && !selectedVariant._id || totalItemsLimit === 0" @click="addQuantity" unelevated dense icon="img:/images/arrow_next.png" square></q-btn>
        </div>
      </div>
    </section>

    <section class="motowork-item-data__tabs">
      <span v-if="product.type === 'vehicle'" :class="{ active: activeTab === 1 }" @click="activateTab(1)" role="tab"
        :aria-selected="activeTab === 1 ? 'true' : 'false'" :aria-controls="'tab1'">
        Detalles
      </span>
      <span  v-if="product.type === 'vehicle' && product.additionalInfo.length > 0 || product.type === 'product' && product.additionalInfo.length > 0" :class="{ active: activeTab === 2 }" @click="activateTab(2)" role="tab"
        :aria-selected="activeTab === 2 ? 'true' : 'false'" :aria-controls="'tab2'">
        Información adicional
      </span>
      <span v-if="product.type !== 'vehicle'" :class="{ active: activeTab === 3 }" @click="activateTab(3)" role="tab"
        :aria-selected="activeTab === 3 ? 'true' : 'false'" :aria-controls="'tab3'">
        Calificaciones
      </span>
    </section>

    <section class="motowork-item-data__tabs-content">
      <q-scroll-area style="width: 100%; height: 200px; padding-right: 20px">
        <div id="tab1" class="motowork-item-data__tabs-content--item" v-show="activeTab === 1"
          :class="{ 'slide-in': activeTab === 1, 'slide-out': activeTab !== 1 }" role="tabpanel" aria-labelledby="tab1">
          <!--detail information-->
          <div class="motowork-item-data__tabs-content--item__container-tab" v-if="product.type === 'vehicle'">
            <div class="motowork-item-data__tabs-content--item__container-tab--content">
              <span class="label">Potencia / Cilindraje</span>
              <span class="value">{{ product.details.power || '' }} CC</span>
            </div>
            <div class="motowork-item-data__tabs-content--item__container-tab--content">
              <span class="label">Peso (Con aceite y gasolina)</span>
              <span class="value">{{ product.details.weight || '' }}</span>
            </div>
            <div class="motowork-item-data__tabs-content--item__container-tab--content">
              <span class="label">Potencia maxima</span>
              <span class="value">{{ product.details.max_power || '' }}</span>
            </div>
            <div class="motowork-item-data__tabs-content--item__container-tab--content">
              <span class="label">Torque maximo</span>
              <span class="value">{{ product.details.torque || '' }}</span>
            </div>
            <div class="motowork-item-data__tabs-content--item__container-tab--content">
              <span class="label">Tipo de motor</span>
              <span class="value">{{ product.details.type_engine || '' }}</span>
            </div>
          </div>
          <!--End detail information-->
        </div>

        <div id="tab2" class="motowork-item-data__tabs-content--item" v-show="activeTab === 2"
          :class="{ 'slide-in': activeTab === 2, 'slide-out': activeTab !== 2 }" role="tabpanel" aria-labelledby="tab2">
          <div class="motowork-item-data__tabs-content--item__container-tab"
            v-if="product.type === 'vehicle' && product.additionalInfo.length > 0 || product.type === 'product' && product.additionalInfo.length > 0">
            <!--Vehicles aditional information-->
            <div class="full-width" v-for="(content, idx) in product.additionalInfo" :key="idx">
              <div class="motowork-item-data__tabs-content--item__container-tab--content"
                v-for="(subsection, idxSubsection) in content.subsections" :key="idxSubsection">
                <span class="label">{{ subsection.name || '' }}</span>
                <span class="value">{{ subsection.value || '' }}</span>
              </div>
            </div>
            <!--End vehicles aditional information-->
          </div>
        </div>

        <div id="tab3" class="motowork-item-data__tabs-content--item" v-show="activeTab === 3"
          :class="{ 'slide-in': activeTab === 3, 'slide-out': activeTab !== 3 }" role="tabpanel" aria-labelledby="tab3">
          <div class="motowork-item-data__tabs-content--item__container-tab" v-if="product.type === 'product'">
            <!--Vehicles aditional information-->
            <div class="motowork-review">
              <div class="motowork-review__list">
                <q-list>
                  <q-item-label header>
                    Calificaciones

                    <q-btn icon="add" flat dense rounded @click="modalReview = true" unelevated color="secondary"
                      square>
                      <q-tooltip class="bg-secondary">
                        Calificar
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>

                  <q-item v-for="(review, idx) in productStore.reviews" :key="idx">
                    <q-item-section top avatar>
                      <q-avatar color="secondary" text-color="white">
                        {{ review.name ? review.name.substring(0, 1) : '' }}
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ review.name }}</q-item-label>
                      <q-item-label caption lines="2">
                        {{ review.description }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{ review.date }}</q-item-label>
                      <q-rating :no-reset="true" v-model="review.amount" size="24pt" color="grey-5" icon="star_border"
                        icon-selected="star" disable aria-hidden="true" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <!--End vehicles aditional information-->
          </div>
        </div>
      </q-scroll-area>
    </section>

    <!--Modal review-->
    <q-dialog v-model="modalReview">
      <q-card>
        <q-card-section>
          <h2 class="modal-title">Agregar calificación</h2>
          <q-btn color="secondary" v-close-popup class="absolute-top-right" style="right: 10px; top: 20px" rounded flat
            dense icon="close"></q-btn>
        </q-card-section>
        <q-card-section>
          <q-form class="row">
            <div class="col-12 col-md-6" :class="{ 'q-pr-md': $q.screen.gt.sm }">
              <q-input :rules="[(val) => val && val.length > 0 || 'Ingresa tu nombre']" outlined v-model="review.name"
                label="Ingresa tu nombre"></q-input>
            </div>
            <div class="col-12 col-md-6" :class="{ 'q-pl-md': $q.screen.gt.sm }">
              <q-rating :no-reset="true" v-model="review.quantity" size="3rem" color="grey-5" icon="star_border"
                icon-selected="star" aria-hidden="true" />
            </div>
            <div class="col-12 q-mt-md">
              <q-input type="textarea" label="Comentario" v-model="review.description" square outlined></q-input>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="row">
          <div class="col-12 text-center">
            <q-btn :loading="loading" @click="sendReview" :disable="!review.name || review.quantity === 0" type="submit"
              label="Calificar producto" unelevated color="secondary" square></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--End modal review-->
  </article>
</template>

<script setup>
// Importar
import { formatPrice } from 'src/utils/utils'
import { notification } from 'src/boot/notification'
import { useOrdersStore } from 'src/stores/ordersStore'
import { useStoreContent } from 'src/stores/storeContent-store'
import { useProductsContent } from 'src/composables/useProductContent'
import { defineProps, ref, defineEmits, onBeforeMount, computed } from 'vue'

// Props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  },
  totalInContacpime: {
    type: Number,
    default: () => 0
  },
  variantsWherehouse: {
    type: Array,
    return: () => []
  }
})

// emits
const emit = defineEmits(['set-image-color', 'add-review'])

// references
const review = ref({
  name: '',
  description: '',
  quantity: 0
})
const quantity = ref(1)
const activeTab = ref(1)
const loading = ref(false)
const modalReview = ref(false)
const selectedVariant = ref({})
const store = useStoreContent()
const ordersStore = useOrdersStore()
const { addReview, pushProductReviews } = useProductsContent()

// computed
const productRating = computed(() => {
  const total = props.product.reviews.reduce((accumulated, item) => accumulated + item.amount, 0)
  return total > 0 ? parseFloat((total / props.product.reviews.length).toFixed(2)) : 0
})

const productStore = computed(() => store.product)

const totalItemsLimit = computed(() => {
  return props.totalInContacpime || 0
})

// methods
const activateTab = (index) => {
  activeTab.value = index
}

const setImageFromColor = (color) => {
  if (!color.image) {
    return false
  }
  emit('set-image-color', color.image)
}

const addQuantity = () => {
  if (quantity.value === totalItemsLimit.value) {
    return
  }
  quantity.value++
}

const removeQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const sendReview = async () => {
  loading.value = true
  try {
    const response = await addReview(props.product._id, review.value)
    if (response.success) {
      notification('positive', 'Calificación enviada', 'secondary')
      modalReview.value = false
      review.value = {
        name: '',
        description: '',
        quantity: 0
      }
      pushProductReviews(response.data.product.reviews)
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handlerAddToCar = () => {
  const { product } = props
  const carItemObj = {
    _id: product._id,
    name: product.name,
    reference: product.model,
    sku: product.sku,
    purchasePrice: product.price,
    total: quantity.value * product.price,
    quantity: quantity.value,
    variant: selectedVariant.value || null,
    image: product.images.length > 0 ? product.images[0].path : '',
    productLimit: props.totalInContacpime
  }
  ordersStore.addNewItemToCar(carItemObj)
}

const selectedVariantForShopping = (variant) => {
  const issetInContacpime = props.variantsWherehouse.find((el) => el?.irecurso === variant?.sku)
  if (!issetInContacpime) {
    notification('red', 'La variación no existe en contacpime, no puede ser comprada', 'red')
    return false
  }

  selectedVariant.value = variant
}

// hook
onBeforeMount(() => {
  if (props.product.type === 'product') {
    activeTab.value = props.product.additionalInfo.length > 0 ? 2 : 3
  }
})
</script>

<style scoped lang="scss">
.motowork-item-data {
  padding: 40px;
  display: flex;
  gap: 32px;
  flex-direction: column;

  &__title {
    display: flex;
    gap: 16px;
    align-items: center;

    figure {
      aspect-ratio: 1;
      height: 32px;
      width: 32px;

      img {
        width: 100%;
        height: 100%;
      }

      @media(max-width: 767px) {
        height: 22px;
        width: 22px;
      }
    }

    h2 {
      color: #000;
      font-family: Play;
      font-size: 32px;
      font-weight: 700;
      line-height: 125%;
      text-transform: uppercase;

      @media(max-width: 767px) {
        font-size: 22px;
      }
    }
  }

  &__price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--label {
      color: #000;
      font-family: Play;
      font-size: 16pt;
      font-weight: 400;
      line-height: 125%;
      text-transform: uppercase;

      @media(max-width: 767px) {
        font-size: 12pt;
      }
    }

    &--amount {
      color: #000;
      text-align: right;
      font-family: Play;
      font-size: 24px;
      font-weight: 700;
      line-height: 125%;
      text-transform: uppercase;

      @media(max-width: 767px) {
        font-size: 16pt;
      }
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      color: #000;

      /* Desktop/Body/Text/Medium */
      font-family: Ubuntu;
      font-size: 16pt;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */
    }
  }

  &__description {
    color: #9F9C9C;
    font-family: Ubuntu;
    font-size: 16pt;
    font-weight: 400;
    line-height: 125%;

    @media(max-width: 767px) {
      font-size: 12pt;
    }
  }

  &__colors {
    display: flex;
    gap: 16px;

    &--color {
      width: 32px;
      height: 32px;

      cursor: pointer;
      transition: all .1s ease-out;

      &:hover {
        transform: scale(1.05);
      }

      @media(max-width: 767px) {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__action {
    .q-btn {
      height: 39px;
      width: 218px;

      @media(max-width: 991px) {
        width: 100%;
      }
    }

    &--product {
      display: flex;
      gap: 16px;

      .q-btn {
        @media(max-width: 500px) {
          width: 200px;
        }
      }

      &__quantity {
        background: #F5F5F5;
        width: 163px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          color: #9F9C9C;

          /* Desktop/Body/Title/Medium */
          font-family: Play;
          font-size: 14pt;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 20px */
          text-transform: uppercase;
        }

        .q-btn {
          width: 44px;
          height: 100%;
          background-color: #9F9C9C;
        }
      }
    }
  }

  &__tabs {
    display: flex;
    gap: 16px;

    span {
      color: #000;
      font-family: Play;
      font-size: 16pt;
      font-weight: 700;
      line-height: 125%;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .1s ease-out;

      &:hover {
        transform: scale(1.05);
      }

      @media(max-width: 767px) {
        font-size: 12pt;
      }
    }
  }

  &__tabs-content {
    width: 100%;
    display: flex;
    flex-direction: column;

    &--item {
      display: none;
      overflow: hidden;
      position: relative;
      opacity: 0;
      transition: transform 5.3s ease, opacity 0.3s ease;

      &__container-tab,
      .full-width {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &--content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          span {
            color: #000;
            font-family: Play;
            font-size: 12pt;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            text-transform: uppercase;

            @media(max-width: 767px) {
              font-size: 10pt;
            }
          }

          span.label {
            width: 60%;
          }

          span.value {
            color: #898384;
            float: right;
            width: 40%;
            text-align: right;
          }
        }
      }
    }

    &--item.slide-in {
      display: block;
      opacity: 1;
      transform: translateX(0);
    }

    &--item.slide-out {
      display: block;
      opacity: 0;
      transform: translateX(100%);
    }
  }

  &__variants {
    display: grid;
    row-gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 16px;

    &--item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid #E3E3E3;
      padding: 16px;
      cursor: pointer;
      transition: all .1s ease-out;

      span {
        color: #ED1C24;

        /* Desktop/Body/Description/Medium */
        font-family: Ubuntu;
        font-size: 14pt;
        font-style: normal;
        font-weight: 500;
        line-height: 125%;
        /* 20px */
      }

      p {
        color: #000;

        /* Desktop/Body/Text/Small */
        font-family: Ubuntu;
        font-size: 12pt;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 15px */
      }

      &:hover {
        transform: translateY(-10px);
      }
    }

    &--item.active {
      border: 1px solid #ED1C24;
    }

    @media(max-width: 1399px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media(max-width: 767px) {
    padding: 0px;
    margin-top: 46px;
    gap: 24px;
  }
}

.motowork-review {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__form {
    display: flex;
    justify-content: center;
  }
}

.modal-title {
  color: #000;
  /* Desktop/Headings/H3 */
  font-family: Play;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  /* 40px */
  text-transform: uppercase;

  @media(max-width: 767px) {
    font-size: 24px;
  }
}

.active {
  color: $secondary !important;
}
</style>
