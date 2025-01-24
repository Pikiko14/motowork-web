<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork
      :title="''"
      :banner="productBanner || {}"
      default-img=""
      :btnLabel="''"
      noOverflow
      :bannerComplement="''"
      :bannerAlt="`Banner de la pagina de la motocicleta ${product.name}, utilizado por Motowork en su Pagina Web`"
    />
    <!--End banner-->

    <!--Item data-->

    <!--End items data-->
  </q-page>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { notification } from 'src/boot/notification'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useProductsContent } from 'src/composables/useProductContent'

// references
const route = useRoute()
const router = useRouter()
const q = useQuasar()
const { showProduct, product } = useProductsContent()

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
