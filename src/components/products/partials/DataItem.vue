<template>
  <article class="motowork-item-data">
    <header class="motowork-item-data__title">
      <figure>
        <img src="https://res.cloudinary.com/dg14xloef/image/upload/v1734447573/brands/rgihluw0qtl0ettkujt2.svg"
          alt="Logo Yamaha utilizado por Motowork en su página web" loading="lazy" role="img"
          aria-label="Logo de Yamaha" />
      </figure>

      <h1>{{ product.name }} {{ product.model }}</h1>
    </header>

    <section class="motowork-item-data__price">
      <span class="motowork-item-data__price--label">Desde</span>
      <span class="motowork-item-data__price--amount">{{ formatPrice(product.discount || product.price) }}</span>
    </section>

    <section class="motowork-item-data__rating" v-if="product.type === 'product'">
      <span>1/5</span>
      <q-rating :no-reset="true" v-model="productRating" size="24pt" color="grey-5" icon="star_border"
        icon-selected="star" disable />
    </section>

    <p class="motowork-item-data__description" v-if="product.description">
      {{ product.description }}
    </p>

    <section class="motowork-item-data__variants" v-if="product.type === 'product'">
      <article
        class="motowork-item-data__variants--item"
        v-for="(variant, idx) in product.variants"
        :key="idx"
        @click="selectedVariant = variant"
        :class="{ 'active': selectedVariant._id === variant._id }"
      >
        <span>
          {{ variant.attribute }}
        </span>
        <p>
          {{ variant.description || 'Sin descripción.' }}
        </p>
      </article>
    </section>

    <section class="motowork-item-data__colors" v-if="product.type === 'vehicle'">
      <div class="motowork-item-data__colors--color" v-for="(color, idx) in product.details.colors" :key="idx"
        :style="`background-color: ${color.hex}`" @click="setImageFromColor(color)" role="presentation"
        aria-label="Color disponible" tabindex="0">
      </div>
    </section>

    <section class="motowork-item-data__action">
      <q-btn v-if="product.type === 'vehicle'" square unelevated color="secondary" label="Agendar test drive"
        aria-label="Agendar test drive"></q-btn>

      <div class="motowork-item-data__action--product" v-if="product.type === 'product'">
        <q-btn :disable="product.variants.length > 0 && !selectedVariant._id" square unelevated color="secondary" label="Agregar al carrito"
        aria-label="Agregar al carrito"></q-btn>

        <div class="motowork-item-data__action--product__quantity">
          <q-btn @click="removeQuantity" icon="arrow_back_ios" unelevated dense></q-btn>
          <span>{{ quantity }}</span>
          <q-btn @click="addQuantity" unelevated dense icon="arrow_forward_ios"></q-btn>
        </div>
      </div>
    </section>

    <section class="motowork-item-data__tabs">
      <span v-if="product.type === 'vehicle'" :class="{ 'active': activeTab === 1 }" @click="activateTab(1)" role="tab"
        :aria-selected="activeTab === 1 ? 'true' : 'false'" :aria-controls="'tab1'">
        Detalles
      </span>
      <span :class="{ 'active': activeTab === 2 }" @click="activateTab(2)" role="tab"
        :aria-selected="activeTab === 2 ? 'true' : 'false'" :aria-controls="'tab2'">
        Información adicional
      </span>
      <span v-if="product.type !== 'vehicle'" :class="{ 'active': activeTab === 3 }" @click="activateTab(3)" role="tab"
        :aria-selected="activeTab === 3 ? 'true' : 'false'" :aria-controls="'tab2'">
        Calificaciones
      </span>
    </section>

    <section class="motowork-item-data__tabs-content">
      <q-scroll-area style="width: 100%; height: 190px; padding-right: 20px">
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
          <div class="motowork-item-data__tabs-content--item__container-tab" v-if="product.type === 'vehicle'">
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
      </q-scroll-area>
    </section>
  </article>
</template>

<script setup>
// Importar
import { formatPrice } from 'src/utils/utils'
import { defineProps, ref, defineEmits } from 'vue'

// Props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
})

// emits
const emit = defineEmits(['set-image-color', 'add-review'])

// references
const quantity = ref(1)
const productRating = ref(2)
const selectedVariant = ref({})
const activeTab = ref(props.product.type === 'vehicle' ? 1 : 2)

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
  quantity.value++
}

const removeQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
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

    h1 {
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
          line-height: 125%; /* 20px */
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
        line-height: 125%; /* 20px */
      }

      p {
        color: #000;

        /* Desktop/Body/Text/Small */
        font-family: Ubuntu;
        font-size: 12pt;
        font-style: normal;
        font-weight: 400;
        line-height: 125%; /* 15px */
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

.active {
  color: $secondary !important;
}

</style>
