<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Conócenos.'" default-img="/images/motowork_banner.jpg" :btnLabel="''"
      :is-about-banner="true"
      :bannerComplement="'Somos empresa colombiana con más de 23 años de experiencia, especializada en la venta de motocicletas, repuestos, accesorios y servicios técnicos de la marca YAMAHA.'" />
    <!--End banner-->

    <!--history section-->
    <section class="container-motowork bg-white">
      <div class="history-section">
        <!--header history-->
        <div class="history-section__header">
          <h2>
            Historia
          </h2>
          <div class="separator"></div>
          <span>
            sobre nosotros
          </span>
        </div>
        <!--End header history-->

        <!--History body-->
        <article class="history-section__body">
          <!--image-->
          <figure>
            <img src="/images/main_motowork.webp" alt="Colaborador 01 de MOTOWORK" title="Colaborador 01 de MOTOWORK">
          </figure>
          <!--End image-->

          <!--Complement history-->
          <div class="history-section__body--complement">
            <p>
              Hace 23 años empezamos a formar la familia MOTOWORK, un lugar donde los moteros del país encontrarán todo
              lo necesario para sus motos. Gracias a su experiencia como motocrosistas y su gran visión comercial; lo
              que le permite también realizar alianza estratégica al ser distribuidor de las mejores marcas a nivel
              mundial en productos y accesorios, principalmente con Yamaha, logrando que nuestros clientes tengan un
              servicio integral y de alta calidad. Durante los años ha logrado posicionarse como una de las marcas mejor
              dotadas en cuanto a los repuestos y accesorios para las motocicletas, mejorando la calidad de vida de sus
              usuarios, siempre dispuestos a responder a las necesidades y expectativas de sus clientes.
            </p>

            <p>
              <span class="text-bold">¿Por qué elegir MOTOWORK?</span> Porque entendemos que cada motero tiene una
              pasión única por las dos ruedas, y por eso ofrecemos un servicio integral que va más allá de la venta de
              motocicletas. Nos enorgullece ser su aliado en cada viaje, brindando asesoría especializada, repuestos
              originales, y un servicio técnico altamente capacitado. Con MOTOWORK, no solo encuentras lo mejor en
              productos, sino un compromiso firme con tu seguridad y satisfacción. Además, nuestra amplia experiencia en
              motocross y el respaldo de marcas reconocidas aseguran que cada producto o servicio que adquieras sea de
              calidad superior. ¡En MOTOWORK, tu pasión por las motos es nuestra prioridad!
            </p>
          </div>
          <!--End complement history-->
        </article>
        <!--End history body-->
      </div>
    </section>

    <section class="container-motowork bg-white">
      <div class="history-section">
        <!--header history-->
        <div class="history-section__header">
          <h2>
            MISIóN Y VISIóN
          </h2>
          <div class="separator"></div>
          <span>
            sobre nosotros
          </span>
        </div>
        <!--End header history-->

        <!--History body-->
        <div class="row q-mt-lg history-section__vision">
          <div class="col-12 col-md-6" :class="{ 'q-pr-md': $q.screen.gt.sm }">
            <h2>Misión</h2>
            <p class="q-mt-sm">
              La razon deser nuestra empresa es darle al cleinte lo que busca, repuestos y accesorios de diferentes
              marcas para atender todos las necesidades del mercado asegurando una relación permanente y valiosa con
              nuestros clientes, colaboradores, proveedores, accionistas, comunidad y medio ambiente, obteniendo de esta
              manera una adecuada rentabilidad y garantizando calidad en nuestros servicios con permanencia y
              crecimiento continuo en el mercado bajo lineamientos de responsabilidad y compromiso.
            </p>
          </div>
          <div class="col-12 col-md-6" :class="{ 'q-pl-md': $q.screen.gt.sm, 'q-mt-lg': $q.screen.lt.md }">
            <h2>Visión</h2>
            <p class="q-mt-sm">
              Ser la empresa líder en la distribución de motocicletas Yamaha, repuestos y accesorios en nuestra de las mejores marcas, ofreciendo un servicio técnico de excelencia que garantice la satisfacción y confianza de nuestros clientes. Nos enfocamos en la innovación, la calidad y la pasión por el motociclismo, brindando soluciones integrales que potencien la movilidad y el estilo de vida de nuestros clientes.
            </p>
          </div>
        </div>
        <!--End history body-->
      </div>
    </section>
    <!--End history section-->

    <!--team section-->
    <section class="container-motowork bg-white">
      <div class="our-team-section  wySelectus-section" ref="ourTeam">
        <!--header team-->
        <div class="our-team-section__header">
          <h2>
            Nuestro equipo
          </h2>
          <div class="separator"></div>
          <span>
            Equipo MOTOWORK
          </span>
        </div>
        <!--End header team-->

        <!--Body team-->
        <div class="our-team-section__body">
          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/equipo_02.webp" alt="Imagen del area 01" title="Imagen del area 01">
              <div class="overflow"></div>
            </figure>
            <div class="our-team-section__body--item__content">
              <h3>MOTOWORK</h3>
              <p>Servicio técnico</p>
            </div>
          </article>

          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/equipo_01.webp" alt="Imagen del area 02" title="Imagen del area 02">
              <div class="overflow"></div>
            </figure>
            <div class="our-team-section__body--item__content">
              <h3>MOTOWORK</h3>
              <p>Repuestos</p>
            </div>
          </article>

          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/area_ventas.webp" alt="Imagen del area 03" title="Imagen del area 03">
              <div class="overflow"></div>
            </figure>
            <div class="our-team-section__body--item__content">
              <h3>MOTOWORK</h3>
              <p>Area de ventas</p>
            </div>
          </article>
        </div>
        <!--End body team-->
      </div>
    </section>
    <!--End team section-->

    <!--porque elegirnos-->
    <section class="container-motowork bg-gray-motowork wySelectus-section" ref="wySelectus">
      <!--top section-->
      <div class="motowork-por-elegirnos">
        <div class="motowork-por-elegirnos__title">
          <h2>¿PORQUE ELEGIRNOS?</h2>
        </div>
        <div class="motowork-por-elegirnos__subtitle">
          <h3>MOTOWORK</h3>
        </div>
      </div>
      <!--End top section-->

      <!--card section-->
      <div class="motowork-por-elegirnos__grid">
        <!--card one-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/personalizacion.png" alt="Icono de la carta de calidad"
                title="Icono de la carta de calidad">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Calidad</h4>
            <p class="ellipsis--lines">
              Nuestra prioridad es buscar siempre la excelencia en nuestros productos y servicios. Trabajamos con
              responsabilidad y compromiso para brindar, productos y servicios que cumplan las expectativas de nuestros
              clientes, garantizando durabilidad, seguridad y alto desempeño. Nuestra pasión por las motos se refleja en
              cada detalle, ofreciendo solo lo mejor en calidad y servicio.
            </p>
          </div>
        </article>
        <!--End card one-->
        <!--card two-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/Confianza.png" alt="Icono de la carta de confianza"
                title="Icono de la carta de confianza">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Confianza</h4>
            <p class="ellipsis--lines">La confianza es la base de nuestra relación con los clientes. Nos comprometemos a
              ofrecer motocicletas Yamaha, repuestos y servicios, garantizando transparencia en cada operación. Nuestro
              equipo brinda asesoramiento honesto y profesional, asegurando que cada cliente tome la mejor decisión
              según sus necesidades. Construimos confianza a través de la calidad, el cumplimiento de compromisos y la
              pasión por las motocicletas, creando una experiencia de compra segura y satisfactoria.</p>
          </div>
        </article>
        <!--End card two-->
        <!--card three-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/reconocimiento.png" alt="Icono de la carta de reconocimiento"
                title="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4 class="reconocimiento ellipsis">Reconocimiento</h4>
            <p class="ellipsis--lines">Con una trayectoria de más de 2 décadas en el mercado nos hemos esforzamos por
              ser una empresa líder y reconocida en la venta de motocicletas Yamaha, repuestos, accesorios y servicios
              técnico. Nuestro prestigio se basa en la calidad, la innovación y el compromiso con nuestros clientes. A
              través de un servicio excepcional y un equipo altamente capacitado, La satisfacción de nuestros clientes y
              su preferencia son el mayor reconocimiento a nuestro trabajo y dedicación.</p>
          </div>
        </article>
        <!--End card three-->
        <!--card four-->
        <article class="motowork-por-elegirnos__grid--item">
          <div class="motowork-por-elegirnos__grid--item__icon">
            <figure>
              <img src="/images/servicio.png" alt="Icono de la carta de reconocimiento"
                title="Icono de la carta de reconocimiento">
            </figure>
          </div>
          <div class="motowork-por-elegirnos__grid--item__text">
            <h4>Servicio</h4>
            <p class="ellipsis--lines">
              El servicio es el pilar de nuestra empresa. Nos dedicamos a brindar una atención personalizada, eficiente
              y profesional en la venta de motocicletas Yamaha, repuestos, accesorios y servicio técnico. Nos enfocamos
              en superar las expectativas de nuestros clientes, ofreciendo asesoría experta, soluciones rápidas y un
              soporte postventa confiable. La satisfacción y seguridad de quienes confían en nosotros es nuestra mayor
              prioridad, garantizando una experiencia de compra y mantenimiento de alta calidad.
            </p>
          </div>
        </article>
        <!--End card four-->
      </div>
      <!--End card section-->
    </section>
    <!--End porque elejirnos-->
  </q-page>
</template>

<script setup>
// imports
import { useMeta } from 'quasar'
import { onMounted, ref } from 'vue'
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'

// references
const ourTeam = ref()
const wySelectus = ref()

const metaData = {
  // sets document title
  title: 'MOTOWORK',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Sobre nosotros`,

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: '¡Conoce mas sobre nuestra empresa y el compomiso que tenemos con nuestros clientes.!'
    },
    keywords: {
      name: 'keywords',
      content: 'Yamaha, motocicletas Yamaha, motos Yamaha, NMAX, CRYPTON, XMAX300, TMAX, MT-03, Ténéré 700, motos deportivas, motos urbanas, motos de aventura, motocicletas confiables, venta de motos, motos nuevas Yamaha, concesionarios Yamaha, motos económicas, accesorios Yamaha, sobre nosotros, informacion corporativa'
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8'
    },
    ogTitle: {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Sobre nosotros`
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

// hooks
onMounted(async () => {
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

  if (wySelectus.value) {
    observer.observe(wySelectus.value)
    observer.observe(ourTeam.value)
  }
})
</script>

<style scoped lang="scss">
.history-section {
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
    display: flex;
    gap: 16px;
    align-items: center;
    margin-top: 56px;

    figure {
      width: 504px;
      height: 400px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }

      @media(max-width: 767px) {
        width: 100%;
      }
    }

    &--complement {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-self: center;

      p {
        color: #9F9C9C;

        /* Desktop/Body/Text/Medium */
        font-family: Ubuntu;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        /* 20px */

        @media(max-width: 767px) {
          margin-top: 30px;
          font-size: 14px;
        }
      }

      @media(max-width: 767px) {
        padding: 0;
      }
    }

    @media(max-width: 991px) {
      flex-direction: column;
      margin-top: 36px;
    }
  }

  &__vision {
    h2 {
      color: #000;
      text-align: left;

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

    p {
      color: #9F9C9C;

      /* Desktop/Body/Text/Medium */
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */

      @media(max-width: 767px) {
        margin-top: 30px;
        font-size: 14px;
      }
    }
  }
}

.our-team-section {
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
    margin-top: 56px;
    gap: 16px;
    width: 100%;
    display: flex;

    &--item {
      flex: 1;
      gap: 24px;
      display: flex;
      flex-direction: column;

      figure {
        width: 100%;
        height: 360px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__content {
        h3 {
          overflow: hidden;
          color: #ED1C24;
          text-overflow: ellipsis;

          /* Desktop/Body/Text/Medium */
          font-family: Ubuntu;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 125%;
          /* 20px */
        }

        p {
          margin-top: 4px;
          color: #000;

          /* Desktop/Headings/H4 */
          font-family: Play;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 125%;
          /* 30px */
          text-transform: uppercase;

          @media(max-width: 991px) {
            font-size: 18px;
          }

          @media(max-width: 767px) {}
        }
      }

      @media(max-width: 767px) {
        gap: 16px;
      }
    }

    @media(max-width: 991px) {
      margin-top: 36px;
    }

    @media(max-width: 767px) {
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
