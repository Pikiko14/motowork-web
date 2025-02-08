<template>
  <section class="full-width">
    <div class="order-resume-finish">
      <p>
        <span>
          Número de pedido
        </span>
        <span class="text-primary text-semibold q-pl-md">
          {{ order._id }}
        </span>
      </p>
      <p>
        <span>
          Fecha de compra
        </span>
        <span class="text-primary text-semibold q-pl-md">
          {{ formatDate(order.createdAt) }}
        </span>
      </p>
    </div>

    <h2>
      dirección DE ENVIO
    </h2>

    <div class="address">
      <p>
        {{ order.client.firstName }} {{ order.client.lastName }}
      </p>
      <p>
        {{ order.client.address }}, {{ order.client.city }} - {{ order.client.state }}
      </p>
      <p>
        <span v-if="order?.client?.type_of_housing">
          {{ order.client.type_of_housing }},
        </span>
        <span class="q-pl-sm" v-if="order.client.postal_code">{{ order.client.postal_code }}</span>
      </p>
      <p>
        {{ order.client.phone }}
      </p>
      <p>
        {{ order.client.email }}
      </p>
    </div>

    <h2>
      Método de pago
    </h2>
    <img v-if="order.payment_method === 'mercadopago'" src="/images/mercado_pago.webp" alt="Icono de mercadopago"
      title="Mercadopago" />
    <img v-else src="/images/transferencia_bancaria.webp" alt="Icono de transferencia bancaria" title="Transferencia bancaria">
  </section>
</template>

<script setup>
// imports
import { date } from 'quasar'

// props
defineProps({
  order: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// methods
const formatDate = (dateString) => {
  const formattedString = date.formatDate(dateString, 'DD-MM-YYYY HH:mm:ss')
  return formattedString
}
</script>

<style scoped lang="scss">
.order-resume-finish {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
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
  margin-top: 48px;
}

.address {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    color: #000;

    /* Desktop/Headings/H4 */
    font-family: Play;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 30px */
    text-transform: capitalize;

    span {
      overflow: hidden;
      color: #9F9C9C;
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
}

img {
  width: 120px;
}
</style>
