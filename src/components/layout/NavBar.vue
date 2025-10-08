<template>
  <nav class="motowork-navbar">
    <!--left section-->
    <div class="motowork-navbar__left-section">
      <!--icon sections-->
      <section class="motowork-navbar__left-section--icon" @click="$router.push({ path: '/' })">
        <figure>
          <img class="motowork-navbar__left-section--icon__second" src="/images/motowork_logo.webp"
            alt="Logo de la Motowork Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
        <figure>
          <img class="motowork-navbar__left-section--icon__first" src="/images/yamaha_mobile.svg"
            alt="Logo de la marca Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
      </section>
      <!--End icon section-->

      <!--Link Section-->
      <section class="motowork-navbar__left-section--links">
        <ul>
          <li @click="openHamburguerMenu('vehicle')"><q-btn flat class="text-uppercase">Motos</q-btn></li>
          <li @click="openHamburguerMenu('product')"><q-btn flat class="text-uppercase">Accesorios</q-btn></li>
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
            <img class="motowork-navbar__right-section--search-and-card__shopping-car--icon"
              src="/images/shopping_bag.webp" alt="Icono de la bolsa de compra, utilizado por motowork"
              loading="lazy" />
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
    <div class="motowork-navbar__hamgurger-menu" :class="{ 'motowork-navbar__hamgurger-menu--show': showMenu }">
      <div class="row full-width">
        <div class="col-12 col-sm-3 mobile-full-width">
          <div class="menu-item">
            <q-list class="items-desktop">
              <q-item v-if="itemToShow === 'vehicle'" class="q-pa-none" clickable v-ripple
                to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&state=Nueva">
                <q-item-section>
                  <q-item-label>
                    Motos nuevas
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="itemToShow === 'vehicle'" class="q-pa-none" clickable v-ripple
                to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&state=Usada">
                <q-item-section>
                  <q-item-label>
                    Motos usadas
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="itemToShow === 'product'" class="q-pa-none" clickable v-ripple
                to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva">
                <q-item-section>
                  <q-item-label>
                    Accesorios nuevos
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <ul class="items-mobile">
              <li><q-btn to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle" flat
                  class="text-uppercase">Motos</q-btn></li>
              <li><q-btn to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva" flat
                  class="text-uppercase">Accesorios</q-btn></li>
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
                    <img class="motowork-navbar__right-section--search-and-card__shopping-car--icon"
                      src="/images/shopping_bag.webp" alt="Icono de la bolsa de compra, utilizado por motowork"
                      loading="lazy" />
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

        <div class="col-12 col-sm-9">
          <div class="categories-and-all">
            <!--categories list-->
            <div class="categories-and-all__categories">
              <div class="categories-and-all__categories--grid full-width">
                <figure v-for="(cat, idx) in catMenu" :key="idx" @click="pushRoute(cat.name)">
                  <q-img :src="cat.icon">
                    <div class="absolute-bottom text-subtitle1 text-center caption">
                      {{ cat.name }}
                    </div>
                  </q-img>
                </figure>
              </div>
            </div>
            <!--End categories list-->

            <!--actuon link-->
            <div class="categories-and-all__action-link" @click="openAllProducts">
              <q-icon size="12pt" name="img:/images/explore.png"></q-icon>
              <span v-if="itemToShow === 'vehicle'">
                Explorar todas las motos yamaha
              </span>
              <span v-else>
                Explorar todos las accesorios
              </span>
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
import { computed, ref, watch } from 'vue'
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
const { searchProducts } = useProductsContent()
const { categoriesMenu, getMenuCategories } = useCategoriesContent()

// computed
const itemsInCart = computed(() => {
  return ordersStore.countItemsInCart()
})

const catMenu = computed(() => {
  return categoriesMenu.value.filter((el) => el.is_active);
});

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

// methods
const openHamburguerMenu = async (e) => {
  if (showMenu.value && itemToShow.value === e) {
    showMenu.value = false
  } else {
    showMenu.value = true
  }
  const query = `?page=1&perPage=20&type=${e}`
  await getMenuCategories(query)
  itemToShow.value = e
}

const pushRoute = (name) => {
  showMenu.value = false
  router.push({
    path: `/${itemToShow.value === 'vehicle' ? 'vehiculos' : 'productos'}`,
    query: {
      page: 1,
      perPage: 9,
      sortBy: 'createdAt',
      order: '-1',
      type: itemToShow.value,
      category: name
    }
  })
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
  border-bottom: 1px solid #ccc;
  background-color: #fff;

  &__left-section {
    display: flex;
    gap: 32px;
    align-items: center;

    &--icon {
      display: flex;
      cursor: pointer;
      align-items: center;

      figure {
        @media(max-width: 767px) {
          padding-left: 12px;
          padding-right: 12px;
        }
      }

      &__first {
        width: 110px;
        height: auto;

        @media(max-width: 1199px) {
          width: 90px;
          height: 35px;
        }

        @media(max-width: 767px) {
          width: 70px;
        }
      }

      &__second {
        width: 70px;
        height: auto;
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
            color: #000;
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
          border-top: 0.75px solid #CCCBCB;
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

        @media(max-width: 1199px) {
          width: 60px;
          height: 60px;
        }
      }

      @media(max-width: 1199px) {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 60px;
        height: 60px;
      }
    }
  }

  @media(max-width: 1199px) {
    height: 60px;
    padding-right: 0px;
    border-bottom: 0.7px solid #ccc;
  }

  @media(max-width: 767px) {
    padding: 9px 24px;
    padding-right: 0px;
  }

  &__hamgurger-menu {
    display: none;
    height: auto;
    position: absolute;
    background: #fff;
    max-width: 1600px;
    width: 100%;
    left: 50%;
    z-index: 99999 !important;
    transform: translate(-50%);
    top: 72px;
    box-shadow: #000;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .2);

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

      color: #000 !important;
      /* Desktop/Body/Description/Medium */
      font-family: Ubuntu;
      font-size: 16pt;
      font-style: normal;
      font-weight: 500;
      line-height: 125%;
      /* 20px */

      @media(max-width: 991px) {
        padding-left: 12px;
        padding-right: 12px;
      }

      @media(max-width: 767px) {
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    .categories-and-all {
      height: 100%;

      &__categories {
        padding: 16px;
        background: #F5F5F5;

        &--grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;

          figure {
            cursor: pointer;
            max-height: 180px;
            width: 100%;

            .q-img {
              width: 100%;
              height: 100%;
              object-fit: contain !important;
            }

            @media (max-width: 991px) {
              max-height: 90px;
            }
          }

          @media (max-width: 991px) {
            grid-template-columns: repeat(5, 1fr);
          }

          @media (max-width: 600px) {
            grid-template-columns: 1fr;
          }
        }
      }

      &__action-link {
        border-top: 1px solid #CCCBCB;
        display: flex;
        gap: 12px;
        align-items: center;
        cursor: pointer;
        padding: 16px 24px;

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
      }

      @media(max-width: 767px) {
        display: none;
      }
    }

    @media(max-width: 1199px) {
      top: 54px;
    }

    @media(max-width: 991px) {
      height: 290px;
    }

    @media(max-width: 767px) {
      height: auto;
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

    /* Desktop/Headings/H4 */
    font-family: Play;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 30px */
    text-transform: uppercase;

    @media(max-width: 1199px) {
      font-size: 14pt;
    }

    @media(max-width: 991px) {
      font-size: 12pt;
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

.text-subtitle1 {
  font-size: 14px;

  @media(max-width: 1400px) {
    font-size: 14px !important;
  }

  @media(max-width: 1100px) {
    font-size: 12px !important;
  }

  @media(max-width: 1000px) {
    font-size: 10px !important;
  }
}
</style>
