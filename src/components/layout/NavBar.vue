<template>
  <nav class="motowork-navbar">
    <!--left section-->
    <div class="motowork-navbar__left-section">
      <!--icon sections-->
      <section class="motowork-navbar__left-section--icon" @click="$router.push({ path: '/' })">
        <figure>
          <img class="motowork-navbar__left-section--icon__first" src="/images/yamaha_mobile.svg"
            alt="Logo de la marca Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
        <figure>
          <img class="motowork-navbar__left-section--icon__second" src="/images/motowork_logo.webp"
            alt="Logo de la marca Yamaha, utilizado en la landing de Motowork" loading="lazy" />
        </figure>
      </section>
      <!--End icon section-->

      <!--Link Section-->
      <section class="motowork-navbar__left-section--links">
        <ul>
          <li @click="openHamburguerMenu('vehicle')"><q-btn flat
              class="text-uppercase">Motos</q-btn></li>
          <li @click="openHamburguerMenu('product')"><q-btn flat
              class="text-uppercase">Accesorios</q-btn></li>
          <li><q-btn flat to="/services" class="text-uppercase">Servicio técnico</q-btn></li>
          <li><q-btn flat to="/experiences" class="text-uppercase">Experiencias</q-btn></li>
          <li><q-btn flat to="/about-us" class="text-uppercase">Nosotros</q-btn></li>
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
          <q-input placeholder="Buscar" dense v-model="search">
            <template #append>
              <q-icon name="img:/images/search.webp" size="12pt"></q-icon>
            </template>
          </q-input>
        </div>
        <!--End Search section-->

        <!--shopping car-->
        <div class="motowork-navbar__right-section--search-and-card__shopping-car">
          <figure>
            <img class="motowork-navbar__right-section--search-and-card__shopping-car--icon"
              src="/images/shopping_bag.webp" alt="Icono de la bolsa de compra, utilizado por motowork"
              loading="lazy" />
          </figure>

          <div class="motowork-navbar__right-section--search-and-card__shopping-car--count-items">
            +{{ itemsInCar }}
          </div>
        </div>
        <!--End shopping car-->
      </section>

      <!--Finalcial button-->
      <section class="motowork-navbar__right-section--financial">
        <q-btn to="/finance" square outline label="Financiar" color="secondary"></q-btn>
      </section>
      <!--End financial buttons-->

      <!--menu button-->
      <section class="motowork-navbar__right-section--menu">
        <q-btn @click="openHamburguerMenu('vehicle')" square unelevated color="primary" name="Boton del menu hamburguesa" icon="menu"></q-btn>
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
              <q-item v-if="itemToShow === 'vehicle'" class="q-pa-none" clickable v-ripple to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&state=Nueva">
                <q-item-section>
                  <q-item-label>
                    Motos nuevas
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="itemToShow === 'vehicle'" class="q-pa-none" clickable v-ripple to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle&state=Usada">
                <q-item-section>
                  <q-item-label>
                    Motos usadas
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="itemToShow === 'product'" class="q-pa-none" clickable v-ripple to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva">
                <q-item-section>
                  <q-item-label>
                    Accesorios nuevos
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="itemToShow === 'product'" class="q-pa-none" clickable v-ripple to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Usada">
                <q-item-section>
                  <q-item-label>
                    Accesorios usados
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <ul class="items-mobile">
              <li><q-btn to="/vehiculos?page=1&perPage=9&sortBy=createdAt&order=-1&type=vehicle" flat
                  class="text-uppercase">Motos</q-btn></li>
              <li><q-btn to="/productos?page=1&perPage=9&sortBy=createdAt&order=-1&type=product&state=Nueva" flat
                  class="text-uppercase">Accesorios</q-btn></li>
              <li><q-btn flat to="/services" class="text-uppercase text-left">Servicio técnico</q-btn></li>
              <li><q-btn flat to="/experiences" class="text-uppercase">Experiencias</q-btn></li>
              <li><q-btn flat to="/about-us" class="text-uppercase">Nosotros</q-btn></li>
              <li class="mobile-show"><q-btn color="secondary" flat to="/about-us" class="text-uppercase">financiar</q-btn></li>
            </ul>
            <div class="mobile-car mobile-show">
              <!--shopping car-->
                <div class="motowork-navbar__right-section--search-and-card__shopping-car">
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
                    +{{ itemsInCar }}
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
                <figure v-for="(cat, idx) in categoriesMenu" :key="idx" @click="pushRoute(cat.name)">
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
  </nav>
</template>

<script setup>
// imports
import { ref } from 'vue'
import { useCategoriesContent } from 'src/composables/useCategoriesContent'
import { useRouter } from 'vue-router'

// references
const router = useRouter()
const itemsInCar = ref('0')
const search = ref('')
const showMenu = ref(false)
const itemToShow = ref('vehicle')
const { categoriesMenu, getMenuCategories } = useCategoriesContent()

// methods
const openHamburguerMenu = async (e) => {
  if (showMenu.value && itemToShow.value === e) {
    showMenu.value = false
  } else {
    showMenu.value = true
  }
  const query = `?page=1&perPage=3&type=${e}`
  await getMenuCategories(query)
  itemToShow.value = e
}

const pushRoute = (name) => {
  showMenu.value = false
  router.push({
    path: itemToShow.value === 'vehicle' ? 'vehiculos' : 'productos',
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
    path: itemToShow.value === 'vehicle' ? 'vehiculos' : 'productos',
    query: {
      page: 1,
      perPage: 9,
      type: itemToShow.value === 'vehicle' ? 'vehicle' : 'product',
      sortBy: 'createdAt',
      order: '-1'
    }
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
    line-height: 125%; /* 20px */
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

          a, .q-btn {
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
    border-bottom: 0.7px solid #ccc;
  }

  @media(max-width: 767px) {
    padding: 9px 24px;
    padding-right: 0px;
  }

  &__hamgurger-menu {
    display: none;
    height: 335px;
    position: absolute;
    background: #fff;
    max-width: 1920px;
    width: 100%;
    left: 50%;
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
      line-height: 125%; /* 20px */

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
          display: flex;
          flex-direction: row;
          gap: 16px;

          figure {
            cursor: pointer;
            height: 250px;
            width: 299px;
            width: 100%;

            .q-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @media(max-width: 991px) {
              height: 200px;
            }
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
          line-height: 125%; /* 15px */
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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 30px */
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
      line-height: 125%; /* 15px */
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
</style>
