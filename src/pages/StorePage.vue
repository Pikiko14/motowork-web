<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork
      :title="''"
      :banner="banner"
      :default-img="type === 'vehicle' ? 'https://res.cloudinary.com/dg14xloef/image/upload/v1737398094/banners/boxfnfyssqzw809kxhsc.webp' : ''"
      :btnLabel="''" noOverflow :bannerComplement="''" />
    <!--End banner-->

    <!--Item component-->
    <section class="container-motowork bg-white">
      <MainVehicles v-if="type === 'vehicle'" />
    </section>
    <!--End item component-->
  </q-page>
</template>

<script setup>
// imports
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'
import { useBannersContent } from 'src/composables/useBannerContent'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import MainVehicles from 'src/components/products/vehicles/MainVehicles.vue'

// references
const route = useRoute()
const { banner, getBanner } = useBannersContent()

const { type } = route.query

// metadata
const metaData = {
  // sets document title
  title: 'MotoWork',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Listado de ${route.query.type === 'vehicle' ? 'Motocicletas' : 'Accesorios'}`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: 'Descubre nuestra amplia gama de motocicletas Yamaha: diseño innovador, alto rendimiento y confiabilidad garantizada. Encuentra modelos como NMAX, CRYPTON, XMAX300, TMAX, MT-03, y Ténéré 700. ¡La moto perfecta para cada aventura te espera!, verifica nuestro listado de motos'
    },
    keywords: {
      name: 'keywords',
      content: 'Yamaha, motocicletas Yamaha, motos Yamaha, NMAX, CRYPTON, XMAX300, TMAX, MT-03, Ténéré 700, motos deportivas, motos urbanas, motos de aventura, motocicletas confiables, venta de motos, motos nuevas Yamaha, concesionarios Yamaha, motos económicas, accesorios Yamaha'
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8'
    },
    ogTitle: {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Listado de ${route.query.type === 'vehicle' ? 'Motocicletas' : 'Accesorios'}`
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

// Hooks
if (type === 'vehicle') {
  getBanner('?page=1&perPage=1&type=vehicles')
} else {
  getBanner('?page=1&perPage=1&type=accesories')
}
</script>
