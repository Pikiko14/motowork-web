<template>
  <table>
    <thead>
      <th>
        Productos
      </th>
      <th>
        Precio
      </th>
      <th>
        Cantidad
      </th>
      <th>
        Subtotal
      </th>
    </thead>

    <tbody>
      <tr v-for="(item, idx) in shoppingCart" :key="idx">
        <td>
          <article class="product-card">
            <figure>
              <img :src="item.image" :alt="item.name">
            </figure>

            <div class="product-card__information">
              <span>SKU {{ item.sku }}</span>
              <h3>
                {{ item.name }}
              </h3>
              <p>
                {{ item.variant.attribute || '' }}
              </p>
            </div>
          </article>
        </td>
        <td>
          <span class="price">
            {{ formatPrice(item.purchasePrice || 0) }}
          </span>
        </td>
        <td>
          <div class="quantity">
            <q-btn square @click="removeQuantity(idx)" icon="img:/images/back_arrow.png" unelevated dense></q-btn>
            <span>{{ item.quantity }}</span>
            <q-btn square @click="addQuantity(idx)" unelevated dense icon="img:/images/arrow_next.png"></q-btn>
          </div>
        </td>
        <td>
          <span class="total">
            {{ formatPrice(item.total || 0) }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { formatPrice } from 'src/utils/utils'
import { useOrdersStore } from 'src/stores/ordersStore'

// references
const store = useOrdersStore()

// computed
const shoppingCart = computed(() => {
  return store.shoppingCart
})

// methods
const removeQuantity = (idx) => {
  return store.removeQuantity(idx)
}

const addQuantity = (idx) => {
  return store.addQuantity(idx)
}
</script>

<style scoped lang="scss">
table {
  margin-top: 32px;
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 24px 16px;
    text-align: left;
    color: #000;

    /* Desktop/Body/Title/Medium */
    font-family: Play;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 20px */
    text-transform: uppercase;
    border-bottom: 1px solid #E3E3E3;
  }

  td {
    padding: 24px 16px;
  }

  .product-card {
    display: flex;
    gap: 16px;
    height: 72px;

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

    &__information {
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
      }
    }
  }

  .price {
    width: 120px;
    display: inline-block;
    color: #000;
    text-align: left;

    /* Desktop/Body/Title/Medium */
    font-family: Play;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 20px */
    text-transform: uppercase;
  }

  .quantity {
    background: #F5F5F5;
    width: 120px;
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
      display: inline-block;
      /* 20px */
      text-transform: uppercase;
    }

    .q-btn {
      width: 32px;
      height: 32px;
      color: white;
      background-color: #9F9C9C;
    }
  }

  .total {
    width: 120px;
    color: #000;
    text-align: left;

    /* Desktop/Body/Title/Medium */
    font-family: Play;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 20px */
    text-transform: uppercase;
  }
}
</style>
