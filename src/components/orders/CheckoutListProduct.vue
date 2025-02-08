<template>
  <section class="product-checkout-cart">
    <article v-for="(item, idx) in products" :key="idx">
      <div class="data">
        <figure>
          <img :src="item.image" :alt="item.name" :title="item.name">
        </figure>
        <div class="information">
          <span>SKU {{ item.sku }}</span>
          <h3 class="ellipsis-2-lines">
            {{ item.name }}
          </h3>
          <p>
            {{ item.variant.attribute || '' }}
          </p>
        </div>
      </div>

      <span class="total">
        {{ formatPrice(item.total || 0) }}
      </span>
    </article>
  </section>
</template>

<script setup>
// imports
import { defineProps } from 'vue'
import { formatPrice } from 'src/utils/utils'

// props
defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.product-checkout-cart {
  margin-top: 32px;

  article {
    flex-direction: row;
    gap: 16px;
    width: 100%;
    padding: 24px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E3E3E3;
    border-right: 1px solid #E3E3E3;
    border-left: 1px solid #E3E3E3;

    .data {
      display: flex;
      gap: 16px;
    }

    figure {
      aspect-ratio: 1/1;
      width: 72px;
      height: 72px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 2px solid #E3E3E3;
      }
    }

    .information {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;

      span {
        color: #9F9C9C;

        /* Desktop/Body/Title/Small */
        font-family: Play;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 15px */
        text-transform: uppercase;

        @media(max-width: 991px) {
          font-size: 10px;
        }

        @media(max-width: 767px) {
          font-size: 12px;
        }
      }

      h3 {
        color: #000;

        /* Desktop/Body/Title/Medium */
        font-family: Play;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
        /* 20px */
        text-transform: uppercase;

        @media(max-width: 991px) {
          font-size: 12px;
        }
      }

      p {
        color: #9F9C9C;
        /* Desktop/Body/Title/Medium */
        font-family: Play;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 20px */
        text-transform: uppercase;

        @media(max-width: 991px) {
          font-size: 10px;
        }

        @media(max-width: 767px) {
          font-size: 12px;
        }
      }
    }

    @media(max-width: 767px) {
      min-height: 90px;
    }

    &:is(:last-child) {
      border-bottom: 1px solid #E3E3E3;
    }
  }
}

.total {
  color: #000;
  font-family: Play;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 15px */
  text-transform: uppercase;
  min-width: 80px;
}
</style>
