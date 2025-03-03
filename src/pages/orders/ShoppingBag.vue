<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork
      title="Carro de compras"
      :banner="{}"
      default-img="/images/cart_background.webp"
      :btnLabel="''"
      :bannerComplement="'¿Todo listo para llevar tus productos favoritos? Revisa tu selección, asegura que no te falte nada y finaliza tu compra.'"
      :contentEnd="true"
      :noOverflow="true"
      :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <section class="row q-mt-xl">
        <div class="col-12 col-sm-12 col-md-9 full-on-1199" :class="{ 'q-pr-md': $q.screen.gt.sm }">
          <h2>
            Tu carrito
          </h2>
          <ShoppingbagTableVue />
        </div>

        <div class="col-12 col-sm-12 col-md-3 full-on-1199" :class="{ 'q-pl-md': $q.screen.gt.sm }">
          <h2>
            Detalles de tu pedido
          </h2>
          <p>
            Los artículos de su carrito de compras se reservan por 30 minutos.
          </p>
          <ShoppingbagOrderResume />
        </div>
      </section>
    </section>
    <!--End main content-->
    <br>
  </q-page>
</template>

<script setup>
// import
import { useMeta } from 'quasar'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import ShoppingbagTableVue from '../../components/orders/ShoppingbagTable.vue'
import ShoppingbagOrderResume from '../../components/orders/ShoppingbagOrderResume.vue'

const metaData = {
  // sets document title
  title: 'MotoWork',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Carrito de compra, Envios y medios de pago`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: '¡Valida tu bolsa de compras, procede a pagar y lleva los mejores accesorios y respuesto que podras encontrar en el mercado!'
    },
    keywords: {
      name: 'keywords',
      content: 'Yamaha, motocicletas Yamaha, motos Yamaha, NMAX, CRYPTON, XMAX300, TMAX, MT-03, Ténéré 700, motos deportivas, motos urbanas, motos de aventura, motocicletas confiables, venta de motos, motos nuevas Yamaha, concesionarios Yamaha, motos económicas, accesorios Yamaha, Carro de compra, Pago carrito'
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8'
    },
    ogTitle: {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Web Checkout`
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
</script>

<style lang="scss" scoped>
h2 {
  color: #000;

  /* Desktop/Headings/H4 */
  font-family: Play;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%; /* 30px */
  text-transform: uppercase;
}

p {
  margin-top: 16px;
  color: #9F9C9C;
  /* Desktop/Body/Text/Medium */
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 20px */
  margin-bottom: 32px;
}

.full-on-1199 {
  @media(max-width: 1199px) {
    width: 100%;

    &:not(:first-child) {
      margin-top: 72px;
    }
  }
}
</style>
