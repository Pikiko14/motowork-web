<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork v-if="product.type === 'vehicle'" :title="`${product.type === 'vehicle' ? 'Yamaha' : ''} ${product.name}`"
      :banner="productBanner || {}"
      :default-img="product.type === 'vehicle' ? 'https://res.cloudinary.com/dg14xloef/image/upload/v1737398094/banners/boxfnfyssqzw809kxhsc.webp' : ''"
      :btnLabel="''"
      :bannerComplement="product.type === 'vehicle' ? 'Conquista cada camino con Yamaha: potencia, estilo y tecnología en una moto hecha para ti. Siente la libertad sobre dos ruedas con la fiabilidad y el rendimiento que solo Yamaha te puede ofrecer.' : product.description"
      :bannerAlt="`Banner de la pagina de la motocicleta ${product.name}, utilizado por Motowork en su Pagina Web`" />
    <!--End banner-->

    <!--Item data-->
    <section class="container-motowork bg-white">
      <ShowProductData :product="product" />
    </section>
    <!--End items data-->

    <!--Similar products-->
    <section class="container-motowork bg-white">
      <SimilarProducts :similarsProducts="similarProducts" />
    </section>
    <!--End similar products-->
  </q-page>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useQuasar, useMeta } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { notification } from 'src/boot/notification'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useProductsContent } from 'src/composables/useProductContent'
import SimilarProducts from 'src/components/products/partials/SimilarProducts.vue'
import ShowProductData from 'src/components/products/partials/ShowProductData.vue'

// references
const route = useRoute()
const router = useRouter()
const q = useQuasar()
const { showProduct, product, similarProducts } = useProductsContent()

// computed
const productBanner = computed(() => {
  if (product.value.banner) {
    if (q.screen.width <= 767) {
      return product.value.banner.find((item) => item.type_banner === 'mobile')
    }

    if (q.screen.width >= 768 && q.screen.width <= 991) {
      return product.value.banner.find((item) => item.type_banner === 'mobile')
    }
    return product.value.banner.find((item) => item.type_banner === 'desktop')
  }
  return {}
})

// methods
const getProductData = async () => {
  const { reference } = route.query
  await showProduct(reference)
}

// set metadada
const metaData = {
  // sets document title
  title: 'MotoWork',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - ${route.params.product_name}`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: 'Descrubre la información detallada de cada uno de nuestros productos y vive la mejor experiencia YAMAHA'
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

// hook
if (!route.query.reference) {
  notification('pos', 'Debes especificar una referencia', 'secondary')
  setTimeout(() => {
    router.back()
  }, 2000)
} else {
  getProductData()
}
</script>
