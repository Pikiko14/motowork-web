<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork
      :title="''"
      :banner="storeBenner && storeBenner._id ? storeBenner : banner"
      :default-img="type === 'vehicle' ? '/images/xcsudrnoqdnhmmo48hqi.webp' : '/images/nyul4gipytza14oemvwg.webp'"
      :btnLabel="''" noOverflow :bannerComplement="''" />
    <!--End banner-->

    <!--Item component-->
    <section class="container-motowork bg-white">
      <MainVehicles v-if="type === 'vehicle'" />
      <MainAccesories v-if="type === 'product'" />
    </section>
    <!--End item component-->

    <!--Wathsapp Button-->
    <WathsappButton :category="type === 'vehicle' ? 'motocicletas' : 'accesorios'" />
    <!--End Wathsapp Button-->
  </q-page>
</template>

<script setup>
// imports
import { useMeta } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import { useBannersContent } from 'src/composables/useBannerContent'
import WathsappButton from 'src/components/layout/WathsappButton.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import MainVehicles from 'src/components/products/vehicles/MainVehicles.vue'
import MainAccesories from 'src/components/products/accesories/MainAccesories.vue'

// references
const route = useRoute()
const router = useRouter()
const store = useStoreContent()
const { banner, getBanner } = useBannersContent()

const { type } = route.query
const storeBenner = store.filterBanner(type === 'vehicle' ? 'vehicles' : 'accesories')

// metadata
const metaData = {
  // sets document title
  title: 'MOTOWORK',
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
      content: 'MOTOWORK - Web'
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
if (!storeBenner) {
  if (type === 'vehicle') {
    getBanner('?page=1&perPage=1&type=vehicles')
  } else {
    getBanner('?page=1&perPage=1&type=accesories')
  }
}

if (!type && route.path === '/vehiculos') {
  router.push({
    path: route.path,
    query: {
      page: 1,
      perPage: 9,
      type: 'vehicle',
      sortBy: 'createdAt',
      order: -1
    }
  })
}
</script>
