<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork :default-img="'/images/urfm8rjjfdonjh63f8xi.webp'" :title="'Moto work'" :banner="storeBenner || banner" :btnLabel="'Adquiere tu moto'"
      :bannerComplement="'Consigue la moto que mejor se acople a tus gustos, no esperes más y adquiere tu moto con nosotros.'" />
    <!--End banner-->

    <!--Categories accessories-->
    <section class="container-motowork">
      <div class="motowork-section-title">
        <h2>Explora Moto Work</h2>
        <span>{{ page }}/{{ totalPages }}</span>
      </div>

      <!--Categories component-->
      <div class="motowork-accessories-categories">
        <GridHome :categories="categoriesMenu" @handle-filter="doFilterByCategory" @handle-back="goBackInCategories" @handle-next="goNextInCategories" />
      </div>
      <!--End categories component-->
    </section>
    <!--End categories accessories-->

    <!--Categories vehicles-->
    <section class="container-motowork bg-white">
      <!--Categories component-->
      <div class="motowork-accessories-categories-vehicles">
        <GridVehicles :categories="categories" />
      </div>
      <!--End categories component-->
    </section>
    <!--End categories vehicles-->

    <!--lo mas vendido-->
    <section class="container-motowork bg-white">
      <div class="motowork-section-title">
        <h2>Lo mas vendido</h2>
      </div>

      <!--product component-->
      <div class="motowork-product-accesories">
        <HomeGrid :products="mostSells" @handle-filter="doAddProduct" @handle-back="goBackInProducts" @handle-next="goNextInProduct" />
      </div>
      <!--End product component-->
    </section>
    <!--End lo mas vendido-->

    <!--newsletter-->
    <section class="container-motowork bg-gray-motowork">
      <div class="motowork-newsletter" ref="newsletterSection">
        <div class="motowork-newsletter__item">
          <figure>
            <img src="/images/newsletter-img.webp" alt="Newsletter imagen, utilizada por Motowork" title="Newsletter imagen, utilizada por Moto work" />
          </figure>
        </div>
        <div class="motowork-newsletter__item">
          <div class="motowork-newsletter__item--content">
            <h2>Comunidad moto work</h2>
            <h3>QUE ESPERAS PARA RODAR CON NOSOTROS</h3>
            <p>Únete a nuestra comunidad y disfruta de las mejores rodadas y del mejor contenido para moteros aficionados.</p>

            <div class="motowork-newsletter__item--form">
              <FormFields />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--News letter-->

    <!--porque elegirnos-->
    <section class="container-motowork bg-gray-motowork wySelectus-section" ref="wySelectus">
      <!--top section-->
      <div class="motowork-por-elegirnos">
        <div class="motowork-por-elegirnos__title">
          <h2>¿PORQUE ELEGIRNOS?</h2>
        </div>
        <div class="motowork-por-elegirnos__subtitle">
          <h3>Precioes moto work</h3>
        </div>
      </div>
      <!--End top section-->

      <!--card section-->
      <div class="motowork-por-elegirnos__grid">
        <!--card one-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/personalizacion.png" alt="Icono de la carta de calidad" title="Icono de la carta de calidad">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Calidad</h4>
            <p class="ellipsis--lines">
              Nuestra prioridad es buscar siempre la excelencia en nuestros productos y servicios. Trabajamos con responsabilidad y compromiso para brindar, productos y servicios que cumplan las expectativas de nuestros clientes, garantizando durabilidad, seguridad y alto desempeño. Nuestra pasión por las motos se refleja en cada detalle, ofreciendo solo lo mejor en calidad y servicio.
            </p>
          </div>
        </article>
        <!--End card one-->
        <!--card two-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/Confianza.png" alt="Icono de la carta de confianza" title="Icono de la carta de confianza">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Confianza</h4>
            <p class="ellipsis--lines">La confianza es la base de nuestra relación con los clientes. Nos comprometemos a ofrecer motocicletas Yamaha, repuestos y servicios, garantizando transparencia en cada operación. Nuestro equipo brinda asesoramiento honesto y profesional, asegurando que cada cliente tome la mejor decisión según sus necesidades. Construimos confianza a través de la calidad, el cumplimiento de compromisos y la pasión por las motocicletas, creando una experiencia de compra segura y satisfactoria.</p>
          </div>
        </article>
        <!--End card two-->
        <!--card three-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/reconocimiento.png" alt="Icono de la carta de reconocimiento" title="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4 class="reconocimiento ellipsis">Reconocimiento</h4>
            <p class="ellipsis--lines">Con una trayectoria de más de 2 décadas en el mercado nos hemos esforzamos por ser una empresa líder y reconocida en la venta de motocicletas Yamaha, repuestos, accesorios y servicios técnico. Nuestro prestigio se basa en la calidad, la innovación y el compromiso con nuestros clientes. A través de un servicio excepcional y un equipo altamente capacitado, La satisfacción de nuestros clientes y su preferencia son el mayor reconocimiento a nuestro trabajo y dedicación.</p>
          </div>
        </article>
        <!--End card three-->
        <!--card four-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/servicio.png" alt="Icono de la carta de reconocimiento" title="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Servicio</h4>
            <p class="ellipsis--lines">
              El servicio es el pilar de nuestra empresa. Nos dedicamos a brindar una atención personalizada, eficiente y profesional en la venta de motocicletas Yamaha, repuestos, accesorios y servicio técnico. Nos enfocamos en superar las expectativas de nuestros clientes, ofreciendo asesoría experta, soluciones rápidas y un soporte postventa confiable. La satisfacción y seguridad de quienes confían en nosotros es nuestra mayor prioridad, garantizando una experiencia de compra y mantenimiento de alta calidad.
            </p>
          </div>
        </article>
        <!--End card four-->
      </div>
      <!--End card section-->
    </section>
    <!--End porque elejirnos-->

    <!--Instagram feed-->
    <section v-if="feedsHistories.length > 0 || instagramsFeeds.length > 0" class="container-motowork bg-white">
      <div class="instagram-feeds instagramFeed-section" ref="instagramFeed">
        <div class="instagram-feeds__item" v-for="(item, idx) in feeds" :key="idx">
          <figure>
            <img draggable="false" :src="item.media_url" alt="Imagen de feed de instagram" title="Imagen de feed de instagram">
            <figcaption v-if="item.caption">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#ED1C24" fill-opacity="0.8"/>
              </svg>
              <h2>
                @Motowork
              </h2>
              <p>{{ item.caption || '' }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
    <!--End instagram feed-->
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'
import { useRouter } from 'vue-router'
import { getResolutionWidth } from 'src/utils/utils'
import HomeGrid from 'src/components/products/HomeGrid.vue'
import GridHome from 'src/components/categories/GridHome.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import FormFields from 'src/components/newsletter/FormFields.vue'
import { useBannersContent } from 'src/composables/useBannerContent'
import GridVehicles from 'src/components/categories/GridVehicles.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useProductsContent } from 'src/composables/useProductContent'
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useInstangramContent } from 'src/composables/useInstagramContent'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'

// References
const { banner, getBanner } = useBannersContent()
const {
  categoriesMenu,
  getMenuCategories,
  resetPage,
  page,
  totalPages,
  removeOnePage,
  addOnePage,
  getCategories,
  categories
} = useCategoriesContent()

const { getProducts, totalPagesProduct, pageProduct, addOnePageProduct, removeOnePageProduct, getMostSells } = useProductsContent()

const { getfeed, feedsHistories } = useInstangramContent()

const store = useStoreContent()
const newsletterSection = ref(null)

const storeBenner = store.filterBanner('home')
const instagramsFeeds = store.instagramsFeeds

// State to track current resolution range
const wySelectus = ref(null)
const instagramFeed = ref(null)
const currentResolutionRange = ref(null)
const router = useRouter()

// computed
const feeds = computed(() => {
  return instagramsFeeds.length > 0 ? instagramsFeeds : feedsHistories.value
})

const mostSells = computed(() => {
  return store.productsMostSells.length > 0 ? store.productsMostSells : []
})

// Methods
const loadCategoriesAccesories = () => {
  const resolution = getResolutionWidth()
  let query = ''

  if (resolution > 991) {
    query = `?page=${page.value}&perPage=4&type=product`
    getMenuCategories(query)
  } else if (resolution > 767) {
    query = `?page=${page.value}&perPage=3&type=product`
    getMenuCategories(query)
  } else {
    query = `?page=${page.value}&perPage=2&type=product`
    getMenuCategories(query)
  }
}

const handleResize = () => {
  const resolution = getResolutionWidth()
  let query = ''

  if (resolution > 991) {
    if (currentResolutionRange.value !== 'desktop') {
      resetPage()
      currentResolutionRange.value = 'desktop'
      query = `?page=${page.value}&perPage=4&type=product`
      getMenuCategories(query)
      loadProduct()
    }
  } else if (resolution > 767) {
    if (currentResolutionRange.value !== 'tablet') {
      resetPage()
      currentResolutionRange.value = 'tablet'
      query = `?page=${page.value}&perPage=3&type=product`
      getMenuCategories(query)
      loadProduct()
    }
  } else {
    if (currentResolutionRange.value !== 'mobile') {
      resetPage()
      currentResolutionRange.value = 'mobile'
      query = `?page=${page.value}&perPage=2&type=product`
      getMenuCategories(query)
      loadProduct()
    }
  }
}

const goBackInCategories = async () => {
  if (page.value > 1) {
    removeOnePage()
  }

  await loadCategoriesAccesories()
}

const goNextInCategories = async () => {
  if (page.value < totalPages.value) {
    addOnePage()
  }
  await loadCategoriesAccesories()
}

const doFilterByCategory = (data) => {
  router.push({
    path: '/productos',
    query: data
  })
}

const loadProduct = () => {
  const resolution = getResolutionWidth()
  let query = ''

  if (resolution > 991) {
    query = `?page=${pageProduct.value}&perPage=4&type=product`
    getProducts(query)
  } else if (resolution > 767) {
    query = `?page=${pageProduct.value}&perPage=4&type=product`
    getProducts(query)
  } else {
    query = `?page=${pageProduct.value}&perPage=4&type=product`
    getProducts(query)
  }
}

const goNextInProduct = async () => {
  if (pageProduct.value < totalPagesProduct.value) {
    addOnePageProduct()
  }
  await loadProduct()
}

const goBackInProducts = async () => {
  if (pageProduct.value > 1) {
    removeOnePageProduct()
  }

  await loadProduct()
}

const doAddProduct = () => {
  alert(123)
}

const metaData = {
  // sets document title
  title: 'Moto Work',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Web`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: 'Descubre nuestra amplia gama de motocicletas Yamaha: diseño innovador, alto rendimiento y confiabilidad garantizada. Encuentra modelos como NMAX, CRYPTON, XMAX300, TMAX, MT-03, y Ténéré 700. ¡La moto perfecta para cada aventura te espera!'
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
        return `${ogTitle} - Página principal`
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
      content: 'Moto Work - Web'
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
  getBanner('?page=1&perPage=1&type=home')
}
handleResize()
getCategories('?page=1&perPage=6&type=vehicle')

onBeforeMount(() => {
  // Add resize event listener
  window.addEventListener('resize', handleResize)
})

onMounted(async () => {
  if (mostSells.value.length === 0) {
    await getMostSells()
  }
  if (instagramsFeeds.length === 0) {
    await getfeed()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )

  if (newsletterSection.value) {
    observer.observe(wySelectus.value)
    observer.observe(newsletterSection.value)
    observer.observe(instagramFeed.value)
  }
})

onUnmounted(() => {
  // Clean up the resize event listener
  window.removeEventListener('resize', handleResize)
})
</script>
