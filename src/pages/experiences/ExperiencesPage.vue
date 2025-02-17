<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Experiencias.'" is-experience-banner default-img="/images/banner_experencies.webp"
      :btnLabel="''" :bannerComplement="'Descubre los mejores eventos de dos ruedas en nuestro blog.'" />
    <!--End banner-->

    <!--Title section-->
    <section class="container-motowork bg-white">
      <div class="experiences-section">
        <!--header history-->
        <div class="experiences-section__header">
          <h2>
            Experiencias
          </h2>
          <div class="separator"></div>
          <span>
            Blog motowork
          </span>
        </div>
        <!--End header history-->
        <!--History body-->
        <div class="experiences-section__body">
          <article class="experiences-section__body--item" v-for="(item, idx) in experiences" :key="idx">
            <figure>
              <img :src="item.images[0].path" :alt="item.title" :title="item.title">
              <div class="overflow"></div>
            </figure>
            <div class="experiences-section__body--item__content">
              <h3>{{ formatDateIso(item.createdAt) }}</h3>
              <p class="ellipsis-2-lines">{{ item.title }}</p>
              <q-btn :to="`/experiencias/${item._id}/ver`" flat dense color="primary" label="saber mas"></q-btn>
            </div>
          </article>
        </div>
        <!--End history body-->
      </div>
    </section>
    <!--End title section-->

    <!--newsletter-->
    <section class="container-motowork bg-gray-motowork">
      <div class="motowork-newsletter" ref="newsletterSection">
        <div class="motowork-newsletter__item">
          <figure>
            <img src="/images/newsletter-img.webp" alt="Newsletter imagen, utilizada por Motowork" title="Newsletter imagen, utilizada por Motowork" />
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
// imports
import { ref, onMounted, computed } from 'vue'
import { formatDateIso } from 'src/utils/utils'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import FormFields from 'src/components/newsletter/FormFields.vue'
import { useBlogsContent } from 'src/composables/useBlogsContent'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
import { useInstangramContent } from 'src/composables/useInstagramContent'

// references
const store = useStoreContent()
const instagramFeed = ref(null)
const newsletterSection = ref(null)
const instagramsFeeds = store.instagramsFeeds
const { getExperiences, experiences } = useBlogsContent()
const { getfeed, feedsHistories } = useInstangramContent()

// computed
const feeds = computed(() => {
  return instagramsFeeds.length > 0 ? instagramsFeeds : feedsHistories.value
})

// hook
const query = '?page=1&perPage=9&sortBy=createdAt&order=-1'
getExperiences(query)

onMounted(async () => {
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
    observer.observe(newsletterSection.value)
    observer.observe(instagramFeed.value)
  }
})
</script>

<style lang="scss" scoped>
.experiences-section {
  &__header {
    gap: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 12px 32px;
    align-items: center;

    h2 {
      color: #000;
      text-align: right;

      /* Desktop/Headings/H3 */
      font-family: Play;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 40px */
      text-transform: uppercase;

      @media(max-width: 767px) {
        font-size: 22px;
      }
    }

    .separator {
      background: #CCCBCB;
      width: 1px;
      height: 60px;

      @media(max-width: 767px) {
        display: none;
      }
    }

    span {
      color: #ED1C24;

      /* Desktop/Body/Section/Medium */
      font-family: Play;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 20px */
      letter-spacing: 3.84px;
      text-transform: uppercase;

      @media(max-width: 767px) {
        font-size: 12px;
      }
    }

    @media(max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      padding: 0px 0px;
    }
  }

  &__body {
    display: grid;
    gap: 16px;
    align-items: center;
    margin-top: 56px;
    grid-template-columns: repeat(3, 1fr);

    &--item {
      width: 100%;
      gap: 24px;
      display: flex;
      flex-direction: column;

      figure {
        width: 100%;
        height: 300px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__content {
        display: flex;
        min-height: 130px;
        flex-direction: column;

        h3 {
          overflow: hidden;
          color: #ED1C24;
          text-overflow: ellipsis;

          /* Desktop/Body/Text/Medium */
          font-family: Ubuntu;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 125%; /* 20px */
        }

        p {
          margin-top: 4px;
          color: #000;

          /* Desktop/Headings/H4 */
          font-family: Play;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 125%; /* 30px */
          text-transform: uppercase;

          @media(max-width: 991px) {
            font-size: 18px;
          }

          @media(max-width: 767px) {
          }
        }

        .q-btn {
          margin-top: 16px;
          width: 120px;
        }
      }

      @media(max-width: 767px) {
        gap: 16px;
      }
    }

    @media(max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
