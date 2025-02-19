<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Content section-->
    <section class="container-motowork bg-white">
      <div class="experience-content-top">
        <div class="experience-content-top__gallery">
          <div class="blog-gallery">
            <!--Banner image-->
            <q-img style="object-fit: contain" v-if="getBannerImage" class="blog-gallery__banner"
              :src="imageToShow.path ? imageToShow.path : (getBannerImage ? getBannerImage.path : '')">
            </q-img>
            <!--End banner image-->

            <div class="blog-gallery__carousel q-mt-lg" v-if="restImages.length > 0">
              <q-scroll-area style="width: 100%; height: 180px">
                <div class="row no-wrap">
                  <div class="grid-scroll">
                    <q-img class="grid-scroll__item" v-for="(img, idx) in restImages" :key="idx" :src="img.path"
                      @click="setImageOnGallery(img)"></q-img>
                  </div>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </div>

        <div class="experience-content-top__description">
          <span v-if="experience._id">{{ formatDateIso(experience.createdAt) }}</span>
          <h1>{{ experience.title }}</h1>
          <p v-html="experience.description"></p>
        </div>
      </div>
    </section>
    <!--End content section-->

    <!--Mas detalles section-->
    <section class="container-motowork bg-white" v-if="experience.more_details">
      <div class="more-detail">
        <h2>Mas detalles</h2>
        <p>
          {{ experience.more_details }}
        </p>
      </div>
    </section>
    <!--End mas detalles section-->

    <!--Mas detalles section-->
    <section class="container-motowork bg-white" v-if="similarPost.length > 0">
      <div class="more-detail">
        <h2>Posts relacionados</h2>
      </div>

      <div class="experiences-section__body">
        <article class="experiences-section__body--item" v-for="(item, idx) in similarPost" :key="idx" @click="showNewArticle(item)">
          <figure>
            <img :src="item.images[0].path" :alt="item.title" :title="item.title">
            <div class="overflow"></div>
          </figure>
          <div class="experiences-section__body--item__content">
            <h3>{{ formatDateIso(item.createdAt) }}</h3>
            <p class="ellipsis-2-lines">{{ item.title }}</p>
          </div>
        </article>
      </div>
    </section>
    <!--End mas detalles section-->
  </q-page>
</template>

<script setup>
// imports
import { useRoute, useRouter } from 'vue-router'
import { formatDateIso } from 'src/utils/utils'
import { computed, ref, onBeforeMount } from 'vue'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import { useStoreContent } from 'src/stores/storeContent-store'
import { useBlogsContent } from 'src/composables/useBlogsContent'

// references
const route = useRoute()
const router = useRouter()
const imageToShow = ref({})
const similarPost = ref([])
const store = useStoreContent()
const { getExperience, loadSimilarsEntries } = useBlogsContent()

// computed
const experience = computed(() => store.experience)

const restImages = computed(() => {
  if (experience.value.images) {
    const images = JSON.parse(JSON.stringify(experience.value.images))
    images.splice(0, 1)
    return images
  }
  return []
})

// methods
const loadExperience = async (id) => {
  try {
    const response = await getExperience(id)
    if (response.success) {
      store.setExperience(response.data.blog)
    }
  } catch (error) {
    console.error(error)
  }
}

const getBannerImage = computed(() => {
  if (experience.value.images) {
    return experience.value.images[0]
  }
  return {}
})

const setImageOnGallery = (img) => {
  imageToShow.value = img
}

const loadSimilarData = async () => {
  try {
    const response = await loadSimilarsEntries(route.query.reference)
    if (response.success) {
      similarPost.value = response.data.similars
    }
  } catch (error) {
    console.error(error)
  }
}

const showNewArticle = (experience) => {
  router.push({
    name: 'showExperience',
    params: {
      name: experience.title
    },
    query: {
      reference: experience._id
    }
  })
}

// hook
onBeforeMount(async () => {
  if (experience.value && !experience.value._id) {
    await loadExperience(route.query.reference)
  }
  await loadSimilarData()
})
</script>

<style scoped lang="scss">
.experience-content-top {
  display: flex;
  justify-content: space-around;
  width: 100%;

  &__gallery {
    width: 40%;

    .blog-gallery {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;

      &__banner {
        width: 100%;
        min-height: 388px;
        object-fit: cover;
      }

      &__carousel {
        .q-carousel {
          height: 280px;
        }

        &--image {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
      }
    }

    @media(max-width: 991px) {
      width: 100%;
    }
  }

  &__description {
    width: 55%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    span {
      color: $secondary;

      /* Desktop/Body/Text/Medium */
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */

      @media(max-width: 991px) {
        font-size: 12px;
      }
    }

    h1 {
      color: #000;

      /* Desktop/Headings/H3 */
      font-family: Play;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      /* 40px */
      text-transform: uppercase;

      @media(max-width: 991px) {
        font-size: 20px;
      }
    }

    p {
      color: #9F9C9C;

      /* Desktop/Body/Text/Large */
      font-family: Ubuntu;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 30px */
      margin-top: 16px;

      @media(max-width: 991px) {
        font-size: 18px;
      }
    }

    @media(max-width: 991px) {
      width: 100%;
      padding: 0px;
      margin-top: 36px;
    }
  }

  @media(max-width: 991px) {
    flex-direction: column;
  }
}

.grid-scroll {
  display: flex;
  flex-direction: row;
  gap: 16px;

  &__item {
    height: 150px;
    width: 200px;
    cursor: pointer;
  }
}

.more-detail {
  h2 {
    color: #000;

    /* Desktop/Headings/H3 */
    font-family: Play;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    /* 40px */
    text-transform: uppercase;
  }

  p {
    color: #9F9C9C;

    /* Desktop/Body/Text/Medium */
    font-family: Ubuntu;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    /* 20px */
    margin-top: 32px;
  }
}

.experiences-section {
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
      cursor: pointer;
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

        @media(max-width: 767px) {
          height: auto;
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
      }

      @media(max-width: 767px) {
        gap: 16px;
      }
    }

    @media(max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
