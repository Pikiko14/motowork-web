<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork :title="'Motowork'" :banner="banner" :btnLabel="'Adquiere tu moto'"
      :bannerComplement="'Consigue la moto que mejor se acople a tus gustos, no esperes más y adquiere tu moto con nosotros.'" />
    <!--End banner-->

    <!--Categories accessories-->
    <section class="container-motowork">
      <div class="motowork-section-title">
        <h2>Explora Motowork</h2>
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
        <span>{{ pageProduct }}/{{ totalPagesProduct }}</span>
      </div>

      <!--product component-->
      <div class="motowork-product-accesories">
        <HomeGrid :products="products" @handle-filter="doAddProduct" @handle-back="goBackInProducts" @handle-next="goNextInProduct" />
      </div>
      <!--End product component-->
    </section>
    <!--End lo mas vendido-->

    <!--newsletter-->
    <section class="container-motowork bg-gray-motowork">
      <div class="motowork-newsletter">
        <div class="motowork-newsletter__item">
          <figure>
            <img src="/images/newsletter-img.webp"/>
          </figure>
        </div>
        <div class="motowork-newsletter__item">
          <div class="motowork-newsletter__item--content">
            <h2>Comunidad motowork</h2>
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
    <section class="container-motowork bg-gray-motowork">
      <!--top section-->
      <div class="motowork-por-elegirnos">
        <div class="motowork-por-elegirnos__title">
          <h2>¿PORQUE ELEGIRNOS?</h2>
        </div>
        <div class="motowork-por-elegirnos__subtitle">
          <h3>Precioes motowork</h3>
        </div>
      </div>
      <!--End top section-->

      <!--card section-->
      <div class="motowork-por-elegirnos__grid">
        <!--card one-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/personalizacion.png" alt="Icono de la carta de calidad">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Calidad</h4>
            <p class="ellipsis-2-lines">Lorem ipsum dolor sit amet consectetur. Augue tortor amet</p>
          </div>
        </article>
        <!--End card one-->
        <!--card two-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/Confianza.png" alt="Icono de la carta de confianza">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Confianza</h4>
            <p class="ellipsis-2-lines">Lorem ipsum dolor sit amet consectetur. Augue tortor amet</p>
          </div>
        </article>
        <!--End card two-->
        <!--card three-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/reconocimiento.png" alt="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4 class="ellipsis reconocimiento">Reconocimiento</h4>
            <p class="ellipsis-2-lines">Lorem ipsum dolor sit amet consectetur. Augue tortor amet</p>
          </div>
        </article>
        <!--End card three-->
        <!--card four-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/servicio.png" alt="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Servicio</h4>
            <p class="ellipsis-2-lines">Lorem ipsum dolor sit amet consectetur. Augue tortor amet</p>
          </div>
        </article>
        <!--End card four-->
      </div>
      <!--End card section-->
    </section>
    <!--End porque elejirnos-->

    <!--Instagram feed-->
    asd
    <!--End instagram feed-->
  </q-page>
</template>

<script setup>
import { getResolutionWidth } from 'src/utils/utils'
import { onBeforeMount, onUnmounted, ref } from 'vue'
import HomeGrid from 'src/components/products/HomeGrid.vue'
import GridHome from 'src/components/categories/GridHome.vue'
import FormFields from 'src/components/newsletter/FormFields.vue'
import { useBannersContent } from 'src/composables/useBannerContent'
import GridVehicles from 'src/components/categories/GridVehicles.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useProductsContent } from 'src/composables/useProductContent'
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

const { products, getProducts, totalPagesProduct, pageProduct, addOnePageProduct, removeOnePageProduct } = useProductsContent()

// State to track current resolution range
const currentResolutionRange = ref(null)

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
  console.log(data)
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

// Hooks
getBanner('?page=1&perPage=1&type=home')
handleResize()
getCategories('?page=1&perPage=6&type=vehicle')

onBeforeMount(() => {
  // Add resize event listener
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Clean up the resize event listener
  window.removeEventListener('resize', handleResize)
})
</script>
