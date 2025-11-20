<template>
  <nav class="motowork-navbar">
    <!--left section-->
    <div class="motowork-navbar__left-section">
      <!--icon sections-->
      <section class="motowork-navbar__left-section--icon" @click="$router.push({ path: '/' })">
        <figure>
          <img class="motowork-navbar__left-section icon_motowork" src="/images/logo.webp"
            alt="Logo de la marca Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
        <figure>
          <img class="motowork-navbar__left-section--icon__first hide-on-1300" src="/images/yamaha_mobile.svg"
            alt="Logo de la marca Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
      </section>
      <!--End icon section-->

      <!--Link Section-->
      <section class="motowork-navbar__left-section--links">
        <ul>
          <li @mouseenter="handleMouseEnter('vehicle')" @mouseleave="handleMouseLeave"
            @click="openHamburguerMenu('vehicle')"><q-btn flat class="text-uppercase">Motos</q-btn></li>
          <li @mouseenter="handleMouseEnter('product')" @mouseleave="handleMouseLeave"
            @click="openHamburguerMenu('product')"><q-btn flat class="text-uppercase">Tienda</q-btn></li>
          <li><q-btn flat to="/servicio-tecnico" class="text-uppercase">Servicio técnico</q-btn></li>
          <li><q-btn flat to="/experiencias" class="text-uppercase">Experiencias</q-btn></li>
          <li><q-btn flat to="/conocenos" class="text-uppercase">Nosotros</q-btn></li>
        </ul>
      </section>
      <!--End link Section-->
    </div>
    <!--end left section-->

    <!--right section-->
    <div class="motowork-navbar__right-section">
      <section class="motowork-navbar__right-section--search-and-card">
        <!--Search section-->
        <div class="motowork-navbar__right-section--search-and-card__search">
          <q-input :loading="searching" debounce="1500" @update:model-value="handlerSearchProducts" placeholder="Buscar"
            dense v-model="search">
            <template #append>
              <q-icon name="img:/images/search.webp" size="12pt"></q-icon>
            </template>
          </q-input>
        </div>
        <!--End Search section-->

        <!--shopping car-->
        <div class="motowork-navbar__right-section--search-and-card__shopping-car"
          @click="$router.push({ name: 'shoppingCart' })">
          <figure>
            <q-icon name="shopping_bag" size="18pt"></q-icon>
          </figure>

          <div class="motowork-navbar__right-section--search-and-card__shopping-car--count-items"
            id="shoppingCartCount">
            +{{ itemsInCart }}
          </div>
        </div>
        <!--End shopping car-->
      </section>

      <!--Finalcial button-->
      <section class="motowork-navbar__right-section--financial">
        <q-btn @click="financial" square outline label="Financiar" color="secondary"></q-btn>
      </section>
      <!--End financial buttons-->

      <!--menu button-->
      <section class="motowork-navbar__right-section--menu">
        <q-btn @click="openHamburguerMenu('vehicle')" square unelevated color="primary"
          name="Boton del menu hamburguesa" icon="menu"></q-btn>
      </section>
      <!--End menu buttons-->
    </div>
    <!--end right section-->

    <!--hamburger menu-->
    <div class="motowork-navbar__hamgurger-menu" :class="{ 'motowork-navbar__hamgurger-menu--show': showMenu }"
      @mouseenter="handleMenuMouseEnter" @mouseleave="handleMenuMouseLeave">
      <div class="row full-width">
        <div class="col-12 col-sm-3 mobile-full-width">
          <div class="menu-item">
            <q-list class="items-desktop">
              <template v-if="itemToShow === 'vehicle'">
                <q-item v-for="(category, idx) in sortedCategoriesMenu" :key="idx" class="q-pa-none" clickable v-ripple
                  @click="pushRoute(category.name)">
                  <q-item-section>
                    <q-item-label>
                      {{ category.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-if="itemToShow === 'product'">
                <q-item class="q-pa-none" clickable v-ripple
                  to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva">
                  <q-item-section>
                    <q-item-label class="accessories-new-label">
                      Tienda
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>

            <ul class="items-mobile">
              <li><q-btn to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle" flat
                  class="text-uppercase">Motos</q-btn></li>
              <li><q-btn to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva" flat
                  class="text-uppercase">Tienda</q-btn></li>
              <li><q-btn flat to="/servicio-tecnico" class="text-uppercase text-left">Servicio técnico</q-btn></li>
              <li><q-btn flat to="/experiencias" class="text-uppercase">Experiencias</q-btn></li>
              <li><q-btn flat to="/conocenos" class="text-uppercase">Nosotros</q-btn></li>
              <li class="mobile-show"><q-btn color="secondary" flat @click="financial"
                  class="text-uppercase">financiar</q-btn></li>
            </ul>
            <div class="mobile-car mobile-show">
              <!--shopping car-->
              <div class="motowork-navbar__right-section--search-and-card__shopping-car"
                @click="$router.push({ name: 'shoppingCart' })">
                <div class="icon-text">
                  <figure>
                    <q-icon name="shopping_bag" size="12pt"></q-icon>
                  </figure>

                  <span>
                    Mi carrito
                  </span>
                </div>

                <div class="motowork-navbar__right-section--search-and-card__shopping-car--count-items">
                  +{{ itemsInCart }}
                </div>
              </div>
              <!--End shopping car-->
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-9 categories-section">
          <div class="categories-and-all">
            <!--vehicles list (solo para vehicle en desktop)-->
            <div v-if="itemToShow === 'vehicle'" class="categories-and-all__categories categories-vehicles-desktop">
              <div class="carousel-container">
                <q-btn class="carousel-arrow carousel-arrow-left" @click="scrollCarousel('left')" round unelevated
                  color="secondary" icon="chevron_left" size="md" />
                <div ref="vehiclesCarousel" class="categories-and-all__categories--grid full-width">
                  <figure v-for="(vehicle, idx) in vehiclesMenu" :key="idx" @click="goToVehicle(vehicle)">
                    <q-img :src="getVehicleImage(vehicle)">
                    </q-img>
                    <figcaption>{{ vehicle.name }}</figcaption>
                  </figure>
                </div>
                <q-btn class="carousel-arrow carousel-arrow-right" @click="scrollCarousel('right')" round unelevated
                  color="secondary" icon="chevron_right" size="md" />
              </div>
            </div>
            <!--End vehicles list-->

            <!--categories list (solo para vehicle en tablet 768-1200)-->
            <div v-if="itemToShow === 'vehicle'" class="categories-and-all__categories categories-vehicles-tablet">
              <div class="categories-and-all__categories--grid-categories full-width">
                <figure v-for="(cat, idx) in categoriesMenu" :key="idx" @click="pushRoute(cat.name)">
                  <q-img :src="cat.icon">
                    <div class="absolute-bottom text-subtitle1 text-center caption">
                      {{ cat.name }}
                    </div>
                  </q-img>
                </figure>
              </div>
            </div>
            <!--End categories list for vehicles tablet-->

            <!--categories list (solo para product)-->
            <div v-if="itemToShow === 'product'" class="categories-and-all__categories">
              <div class="carousel-container">
                <q-btn class="carousel-arrow carousel-arrow-left" @click="scrollCarousel('left')" round unelevated
                  color="secondary" icon="chevron_left" size="md" />
                <div ref="productsCarousel" class="categories-and-all__categories--grid full-width">
                  <figure v-for="(cat, idx) in categoriesMenu" :key="idx" @click="pushRoute(cat.name)">
                    <q-img :src="cat.icon">
                    </q-img>
                    <figcaption>{{ cat.name }}</figcaption>
                  </figure>
                </div>
                <q-btn class="carousel-arrow carousel-arrow-right" @click="scrollCarousel('right')" round unelevated
                  color="secondary" icon="chevron_right" size="md" />
              </div>
            </div>
            <!--End categories list-->

            <!--actuon link-->
            <div class="categories-and-all__action-links">
              <div class="categories-and-all__action-link" @click="openAllProducts">
                <q-icon size="12pt" name="img:/images/explore.png"></q-icon>
                <span v-if="itemToShow === 'vehicle'">
                  Explorar todas las motos yamaha
                </span>
                <span v-else>
                  Explorar toda la tienda
                </span>
              </div>
              <div v-if="itemToShow === 'vehicle'" class="categories-and-all__action-link"
                @click="router.push({ path: '/vehiculos', query: { page: 1, perPage: 9, sortBy: 'createdAt', order: '-1', type: 'vehicle', state: 'Usada' } }); showMenu = false">
                <span>Motos usadas</span>
              </div>
            </div>
            <!--end action link-->

          </div>
        </div>
      </div>
    </div>
    <!--End hamburguer menu-->

    <q-dialog v-model="searchMenu">
      <q-card>
        <q-card-section>
          <h2 class="text-h6">
            Resultados
          </h2>

          <q-btn icon="close" class="close-search-modal" flat dense rounded color="red" v-close-popup></q-btn>
        </q-card-section>
        <q-card-section>
          <q-list v-for="(item, idx) in itemsSearch" :key="idx">
            <q-item>
              <q-item-section top avatar>
                <q-avatar>
                  <img style="width: 100%" :src="getBannerUrl(idx)" :alt="`Imagen del producto ${item.name}`"
                    :title="`Imagen del producto ${item.name}`" loading="lazy">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption lines="2">
                  {{ item.description }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn :to="`/vehiculos/${item.name}?reference=${item._id}`" color="secondary" flat dense rounded
                  icon="visibility">
                  <q-tooltip class="bg-secondary">
                    Ver producto
                  </q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </nav>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router'
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useOrdersStore } from 'src/stores/ordersStore'
import { useProductsContent } from 'src/composables/useProductContent'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'
import { notification } from 'src/boot/notification'

// references
const page = ref(1)
const search = ref('')
const router = useRouter()
const itemsSearch = ref([])
const showMenu = ref(false)
const searching = ref(false)
const searchMenu = ref(false)
const itemToShow = ref('vehicle')
const ordersStore = useOrdersStore()
const { searchProducts, getProducts } = useProductsContent()
const { categoriesMenu, getMenuCategories } = useCategoriesContent()
const menuTimeout = ref(null)
const isHoveringMenu = ref(false)
const vehiclesMenu = ref([])
const selectedCategory = ref('ADVENTURE')
const vehiclesCarousel = ref(null)
const productsCarousel = ref(null)

// computed
const itemsInCart = computed(() => {
  return ordersStore.countItemsInCart()
})

const sortedCategoriesMenu = computed(() => {
  if (!categoriesMenu.value || categoriesMenu.value.length === 0) {
    return []
  }
  // Ordenar alfabéticamente por nombre
  return [...categoriesMenu.value].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase()
    const nameB = (b.name || '').toLowerCase()
    return nameA.localeCompare(nameB)
  })
})

// watch
watch(
  () => itemsInCart.value,
  () => {
    const element = document.getElementById('shoppingCartCount')
    if (element) {
      element.classList.add('shake')

      setTimeout(() => {
        element.classList.remove('shake')
      }, 500)
    }
  }
)

// cleanup
onBeforeUnmount(() => {
  if (menuTimeout.value) {
    clearTimeout(menuTimeout.value)
  }
})

// methods
const openHamburguerMenu = async (e) => {
  // Solo toggle en móvil (pantallas pequeñas)
  if (window.innerWidth <= 1199) {
    if (showMenu.value && itemToShow.value === e) {
      showMenu.value = false
    } else {
      showMenu.value = true
    }
    // Cargar todas las categorías con perPage 30 tanto para vehicle como para product
    const perPage = 30
    const query = `?page=1&perPage=${perPage}&type=${e}`
    await getMenuCategories(query)
    itemToShow.value = e

    // Si es vehicle, cargar las motos de ADVENTURE por defecto
    if (e === 'vehicle') {
      await loadVehiclesByCategory('ADVENTURE')
    } else {
      // Si es product, limpiar las motos
      vehiclesMenu.value = []
    }
  }
}

const handleMouseEnter = async (type) => {
  // Solo funciona en desktop (pantallas grandes)
  if (window.innerWidth > 1199) {
    // Limpiar timeout anterior si existe
    if (menuTimeout.value) {
      clearTimeout(menuTimeout.value)
      menuTimeout.value = null
    }

    // Si el menú ya está abierto con el mismo tipo, no hacer nada
    if (showMenu.value && itemToShow.value === type) {
      return
    }

    // Cargar todas las categorías con perPage 30 tanto para vehicle como para product
    const perPage = 30
    const query = `?page=1&perPage=${perPage}&type=${type}`
    await getMenuCategories(query)
    itemToShow.value = type

    // Si es vehicle, cargar las motos de ADVENTURE por defecto
    if (type === 'vehicle') {
      await loadVehiclesByCategory('ADVENTURE')
    } else {
      // Si es product, limpiar las motos
      vehiclesMenu.value = []
    }

    showMenu.value = true
  }
}

const handleMouseLeave = () => {
  // Solo funciona en desktop (pantallas grandes)
  if (window.innerWidth > 1199) {
    // Si el mouse está sobre el menú, no cerrar
    if (isHoveringMenu.value) {
      return
    }

    // Agregar un pequeño delay para evitar que se cierre al mover el mouse
    menuTimeout.value = setTimeout(() => {
      if (!isHoveringMenu.value) {
        showMenu.value = false
      }
    }, 200)
  }
}

const handleMenuMouseEnter = () => {
  // Solo funciona en desktop (pantallas grandes)
  if (window.innerWidth > 1199) {
    isHoveringMenu.value = true
    // Limpiar timeout si existe
    if (menuTimeout.value) {
      clearTimeout(menuTimeout.value)
      menuTimeout.value = null
    }
  }
}

const handleMenuMouseLeave = () => {
  // Solo funciona en desktop (pantallas grandes)
  if (window.innerWidth > 1199) {
    isHoveringMenu.value = false
    // Cerrar el menú después de un pequeño delay
    menuTimeout.value = setTimeout(() => {
      showMenu.value = false
    }, 200)
  }
}

const pushRoute = async (name) => {
  // Si es vehicle, no cerrar el menú, solo cargar las motos de la categoría seleccionada
  if (itemToShow.value === 'vehicle') {
    selectedCategory.value = name
    await loadVehiclesByCategory(name)
  } else {
    // Si es product, cerrar el menú y navegar
    showMenu.value = false
    router.push({
      path: '/productos',
      query: {
        page: 1,
        perPage: 9,
        sortBy: 'createdAt',
        order: '-1',
        type: 'product',
        category: name
      }
    })
  }
}

const loadVehiclesByCategory = async (categoryName) => {
  try {
    const query = `?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&category=${encodeURIComponent(categoryName)}`
    await getProducts(query)
    // Los productos se guardan en el store, necesitamos acceder a ellos
    // Usaremos searchProducts que retorna los datos directamente
    const response = await searchProducts(query)
    if (response && response.brands) {
      vehiclesMenu.value = response.brands
    }
  } catch (error) {
    console.error('Error loading vehicles:', error)
    vehiclesMenu.value = []
  }
}

const goToVehicle = (vehicle) => {
  showMenu.value = false
  router.push({
    path: `/vehiculos/${vehicle.name}`,
    query: {
      reference: vehicle._id
    }
  })
}

const getVehicleImage = (vehicle) => {
  if (!vehicle.images || !vehicle.images.length) {
    return '';
  }
  const defaultImage = vehicle.images.find((image) => image.default_image)
  const img = defaultImage || vehicle?.images[0]
  return img?.path || ''
}

const openAllProducts = () => {
  router.push({
    path: `/${itemToShow.value === 'vehicle' ? 'vehiculos' : 'productos'}`,
    query: {
      page: 1,
      perPage: 9,
      type: itemToShow.value === 'vehicle' ? 'vehicle' : 'product',
      sortBy: 'createdAt',
      order: '-1'
    }
  })
}

const financial = () => {
  window.open('https://api.whatsapp.com/send?phone=573183996249&text=Hola%20Moto%20Work', '__blank')
}

const handlerSearchProducts = async (e) => {
  const query = {
    page: page.value,
    perPage: 9,
    sortBy: 'createdAt',
    order: '-1',
    search: e
  }
  const queryString = new URLSearchParams(query).toString()
  searching.value = true
  try {
    const response = await searchProducts(`?${queryString}`)
    if (response.brands && response.brands.length > 0) {
      itemsSearch.value = response.brands
      searchMenu.value = true
    } else {
      notification('negative', 'No se han encontrado resultados en la busqueda', 'red')
    }
  } finally {
    searching.value = false
  }
}

const getBannerUrl = (idx) => {
  const { banner } = itemsSearch.value[idx]
  let url = ''
  console.log(banner)
  const mobileBanner = banner.find((banner) => banner.type_banner === 'mobile')
  if (mobileBanner) {
    url = mobileBanner.path
  } else {
    const desktopBanner = banner.find((banner) => banner.type_banner === 'desktop')
    if (desktopBanner) {
      url = desktopBanner.path
    }
  }
  return url
}

const scrollCarousel = (direction) => {
  const carousel = itemToShow.value === 'vehicle' ? vehiclesCarousel.value : productsCarousel.value
  if (!carousel) return
  const scrollAmount = 300
  const currentScroll = carousel.scrollLeft
  const newScroll = direction === 'left'
    ? currentScroll - scrollAmount
    : currentScroll + scrollAmount
  carousel.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  })
}
</script>

<style scoped lang="scss">
.icon-text {
  display: flex;
  gap: 16px;
  align-items: center;

  span {
    color: #000;
    /* Desktop/Body/Title/Medium */
    font-family: Play;
    font-size: 16pt;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 20px */
    text-transform: uppercase;
  }
}

.motowork-navbar {
  display: flex;
  height: 72px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 12px 24px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: black;

  &__left-section {
    display: flex;
    gap: 32px;
    align-items: center;

    &--icon {
      display: flex;
      cursor: pointer;
      align-items: center;

      figure {
        padding-left: 16px;
        padding-right: 16px;

        @media(max-width: 767px) {
          padding-left: 12px;
          padding-right: 12px;
        }
      }

      &__first {
        width: 110px;
        height: 32px;

        @media(max-width: 1199px) {
          width: 82px;
          height: 24px;
        }

        @media(max-width: 767px) {
          width: 70px;
        }
      }

      &__second {
        width: 33.34px;
        height: 28px;

        @media(max-width: 1199px) {
          width: 23.34px;
          height: 20px;
        }

        @media(max-width: 767px) {
          width: 28px;
          height: 25px;
        }
      }
    }

    &--links {
      ul {
        display: flex;
        gap: 16px;
        align-items: center;
        list-style: none;

        li {
          .q-btn {
            padding: 0px !important;
            min-height: auto;
            transition: all .3s ease;
          }

          a,
          .q-btn {
            color: #fff;
            font-family: Play;
            font-size: 12pt;
            font-style: normal;
            font-weight: 700 !important;
            line-height: 125%;
            /* 15px */
            text-transform: uppercase;

            @media(max-width: 1399px) {
              font-size: 10pt;
            }
          }

          &:hover {
            .q-btn {
              color: $secondary;
              background: transparent !important;
              transform: translateY(-4px);
            }
          }
        }
      }

      @media(max-width: 1199px) {
        display: none;
      }
    }

    @media(max-width: 1299px) {
      gap: 10px;
    }
  }

  &__right-section {
    display: flex;
    align-items: center;
    gap: 16px;

    &--financial {
      @media(max-width: 767px) {
        display: none;
      }
    }

    .q-btn {
      padding: 12px 16px;
      font-family: Play;
      font-size: 12pt;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 15px */
      text-transform: uppercase;

      @media(max-width: 1199px) {
        min-height: 28px;
        padding: 7.5px 9px;
      }
    }

    .q-btn--outline::before {
      border: 2px solid $secondary;
    }

    &--search-and-card {
      display: flex;
      align-items: center;
      gap: 32px;

      &__shopping-car {
        display: flex;
        cursor: pointer;
        gap: 12px;
        align-items: center;
        padding: 4px;

        &--icon {
          width: 24px;
          height: 24px;

          @media(max-width: 1199px) {
            width: 18px;
            height: 18px;
          }

          @media(max-width: 767px) {
            width: 24px;
            height: 24px;
          }
        }

        &--count-items {
          min-width: 40px;
          height: 23px;
          display: flex;
          padding: 4px 6px;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #FFF;
          text-align: center;
          font-family: Play;
          font-size: 12pt;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          text-transform: uppercase;
          border: 1px solid #ED1C24;
          background: #ED1C24;

          @media(max-width: 1399px) {
            font-size: 10pt;
          }

          @media(max-width: 1199px) {
            min-width: 40px;
          }

          @media(max-width: 767px) {
            width: 40px;
            height: 24px;
            float: right;
          }
        }

        @media(max-width: 767px) {
          border-top: 0.75px solid rgba(255, 255, 255, 0.2);
          padding-left: 16px;
          padding-right: 16px;
          padding-top: 16px;
          width: 100%;
          justify-content: space-between;
        }

        &:hover {
          background: #ed1c233a;
        }
      }

      &__search {
        width: 260px;

        :deep(.q-field__control) {
          color: #fff;
        }

        :deep(.q-field__native) {
          color: #fff;
        }

        :deep(.q-field__inner) {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        :deep(input) {
          color: #fff;
        }

        :deep(input::placeholder) {
          color: rgba(255, 255, 255, 0.7);
        }

        :deep(.q-field__bottom) {
          color: rgba(255, 255, 255, 0.7);
        }

        @media(max-width: 1399px) {
          width: 180px;
        }

        @media(max-width: 1299px) {
          width: 180px;
        }
      }

      @media(max-width: 767px) {
        display: none;
      }
    }

    &--menu {
      display: none;
      width: 54px;
      height: 54px;

      button {
        width: 54px;
        height: 54px;
      }

      @media(max-width: 1199px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @media(max-width: 1199px) {
    height: 54px;
    padding-right: 0px;
    border-bottom: 0.7px solid rgba(255, 255, 255, 0.2);
  }

  @media(max-width: 767px) {
    padding: 9px 24px;
    padding-right: 0px;
  }

  &__hamgurger-menu {
    display: none;
    height: 385px;
    max-height: calc(100vh - 72px);
    position: absolute;
    background: #fff;
    max-width: 1600px;
    width: 100%;
    left: 50%;
    z-index: 99999 !important;
    transform: translate(-50%);
    top: 72px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .2);
    overflow: hidden;

    &--show {
      display: flex;
    }

    .menu-item {
      height: 100%;
      padding-top: 16px;
      padding-bottom: 24px;
      padding-left: 24px;
      padding-right: 24px;
      border-right: 1px solid #CCCBCB;
      overflow-y: auto;
      max-height: 100%;

      color: #000 !important;
      /* Desktop/Body/Description/Medium */
      font-family: Ubuntu;
      font-size: 16pt;
      font-style: normal;
      font-weight: 500;
      line-height: 125%;
      /* 20px */

      .q-list {
        .q-item {
          min-height: 32px;
          padding: 6px 12px;

          .q-item__label {
            font-size: 12px !important;
            font-weight: bold !important;
            line-height: 1.4;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          }

          .accessories-new-label {
            font-size: 18px !important;
            font-weight: bold !important;
            line-height: 1.4;
          }

          @media(max-width: 1399px) {
            min-height: 30px;
            padding: 5px 10px;

            .q-item__label {
              font-size: 12px !important;
            }

            .accessories-new-label {
              font-size: 16px !important;
            }
          }

          @media(max-width: 1199px) {
            min-height: 28px;
            padding: 4px 8px;

            .q-item__label {
              font-size: 12px !important;
            }

            .accessories-new-label {
              font-size: 14px !important;
            }
          }
        }
      }

      @media(max-width: 991px) {
        padding-left: 12px;
        padding-right: 12px;
      }

      @media(max-width: 767px) {
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        border-right: none;
        border-bottom: 1px solid #CCCBCB;
      }
    }

    .categories-and-all {
      height: 100%;
      overflow-y: auto;

      &__categories {
        padding: 16px 16px 16px 8px;
        background: #F5F5F5;

        @media(max-width: 1199px) {
          padding: 12px 12px 12px 6px;
        }

        @media(max-width: 767px) {
          padding: 12px;
        }

        .carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;

          .carousel-arrow {
            position: absolute;
            z-index: 10;
            background-color: #ED1C24;
            color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;

            &:hover {
              background-color: #c4161d;
              transform: scale(1.1);
            }

            &.carousel-arrow-left {
              left: 8px;
            }

            &.carousel-arrow-right {
              right: 8px;
            }

            @media(max-width: 768px) {
              display: none;
            }
          }
        }

        &--grid {
          display: flex;
          flex-direction: row;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: #ccc #f5f5f5;
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            height: 8px;
          }

          &::-webkit-scrollbar-track {
            background: #f5f5f5;
          }

          &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #999;
          }

          @media(max-width: 1399px) {
            gap: 12px;
          }

          @media(max-width: 1199px) {
            gap: 10px;
          }

          @media(max-width: 991px) {
            gap: 8px;
          }

          @media(max-width: 768px) {
            gap: 8px;
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
              display: none;
            }
          }

          figure {
            cursor: pointer;
            width: 250px;
            min-width: 250px;
            flex-shrink: 0;
            margin: 0;
            display: flex;
            flex-direction: column;

            .q-img {
              width: 100%;
              height: 250px;
              background-color: #fff;

              :deep(img) {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }

            figcaption {
              margin-top: 8px;
              text-align: center;
              color: #000;
              font-family: Play;
              font-size: 14pt;
              font-weight: 700;
              text-transform: uppercase;
              line-height: 1.2;
            }

            @media(max-width: 1399px) {
              width: 220px;
              min-width: 220px;

              .q-img {
                height: 220px;
              }

              figcaption {
                font-size: 12pt;
              }
            }

            @media(max-width: 1199px) {
              width: 200px;
              min-width: 200px;

              .q-img {
                height: 200px;
              }

              figcaption {
                font-size: 11pt;
              }
            }

            @media(max-width: 991px) {
              width: 180px;
              min-width: 180px;

              .q-img {
                height: 180px;
              }

              figcaption {
                font-size: 10pt;
              }
            }

            @media(max-width: 767px) {
              width: 160px;
              min-width: 160px;

              .q-img {
                height: 160px;
              }

              figcaption {
                font-size: 9pt;
              }
            }
          }
        }

        &--grid-categories {
          display: flex;
          flex-direction: row;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: #ccc #f5f5f5;
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            height: 8px;
          }

          &::-webkit-scrollbar-track {
            background: #f5f5f5;
          }

          &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #999;
          }

          @media(max-width: 768px) {
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
              display: none;
            }
          }

          figure {
            cursor: pointer;
            height: 250px;
            width: 299px;
            min-width: 299px;
            flex-shrink: 0;
            margin: 0;
            overflow: hidden;
            border-radius: 4px;

            .q-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            @media(max-width: 1399px) {
              height: 220px;
              width: 260px;
              min-width: 260px;
            }

            @media(max-width: 1199px) {
              height: 200px;
              width: 240px;
              min-width: 240px;
            }

            @media(max-width: 991px) {
              height: 180px;
              width: 220px;
              min-width: 220px;
            }

            @media(max-width: 767px) {
              height: 160px;
              width: 200px;
              min-width: 200px;
            }
          }
        }
      }

      &__action-links {
        border-top: 1px solid #CCCBCB;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;

        @media(max-width: 1199px) {
          padding: 12px 16px;
        }

        @media(max-width: 767px) {
          display: none;
        }
      }

      &__action-link {
        display: flex;
        gap: 12px;
        align-items: center;
        cursor: pointer;

        span {
          color: #000;
          /* Desktop/Body/Title/Small */
          font-family: Play;
          font-size: 12pt;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 15px */
          text-transform: uppercase;
        }

        @media(max-width: 1199px) {
          span {
            font-size: 10pt;
          }
        }
      }
    }

    @media(max-width: 1199px) {
      top: 54px;
      max-height: calc(100vh - 54px);
      height: auto;
      min-height: 200px;
    }

    @media(max-width: 991px) {
      height: auto;
      max-height: calc(100vh - 54px);
      min-height: 250px;
    }

    @media(max-width: 767px) {
      height: auto;
      max-height: calc(100vh - 54px);
      min-height: 200px;
      left: 0;
      transform: none;
      width: 100%;
      max-width: 100%;
    }
  }

  .caption {
    height: 100%;
    background: linear-gradient(to bottom, #00000000, #000000CC);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    padding: 8px;

    /* Desktop/Headings/H4 */
    font-family: Play;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 30px */
    text-transform: uppercase;

    @media(max-width: 1399px) {
      font-size: 18px;
      padding: 6px;
    }

    @media(max-width: 1199px) {
      font-size: 14pt;
      padding: 5px;
    }

    @media(max-width: 991px) {
      font-size: 12pt;
      padding: 4px;
    }

    @media(max-width: 767px) {
      font-size: 10pt;
      padding: 4px;
    }
  }
}

.items-desktop {
  @media(max-width: 1199px) {
    display: none;
  }
}

.items-mobile {
  display: none;
  list-style: none;

  li {
    .q-btn {
      color: #000;
      /* Desktop/Body/Title/Small */
      font-family: Play;
      font-size: 12pt;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 15px */
      text-transform: uppercase;
      text-align: left !important;

      @media(max-width: 991px) {
        font-size: 10pt;
      }

      @media(max-width: 767px) {
        font-size: 12pt;
      }
    }
  }

  @media(max-width: 1199px) {
    display: flex !important;
    flex-direction: column;
  }
}

.mobile-full-width {
  @media(max-width: 767px) {
    width: 100%;
  }
}

.mobile-show {
  display: none;

  @media(max-width: 767px) {
    display: flex;
  }
}

.icon_motowork {
  max-width: 140px;
  margin-top: -10px;
}

.hide-on-1300 {
  @media(max-width: 1300px) {
    display: none;
  }
}

.categories-section {
  @media(max-width: 767px) {
    display: none;
  }
}

.categories-vehicles-desktop {
  @media(max-width: 1199px) {
    display: none;
  }
}

.categories-vehicles-tablet {
  display: none;

  @media(min-width: 768px) and (max-width: 1199px) {
    display: block;
  }
}
</style>
