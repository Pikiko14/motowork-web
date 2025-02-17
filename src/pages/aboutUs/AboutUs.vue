<template>
  <q-page>
    <!--breadcrumb-->
    <BreadCrumb />
    <!--End breadcrumb-->

    <!--Banner-->
    <BannerMotowork :title="'Conócenos.'" default-img="/images/banner_about_us.webp" :btnLabel="''"
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
            <img src="/images/coolaborador_01.webp" alt="Colaborador 01 de motowork" title="Colaborador 01 de motowork">
          </figure>
          <!--End image-->

          <!--Complement history-->
          <div class="history-section__body--complement">
            <p>
              Hace 23 años empezamos a formar la familia motowork, un lugar donde los moteros del país encontrarán todo
              lo necesario para sus motos. Gracias a su experiencia como motocrosistas y su gran visión comercial; lo
              que le permite también realizar alianza estratégica al ser distribuidor de las mejores marcas a nivel
              mundial en productos y accesorios, principalmente con Yamaha, logrando que nuestros clientes tengan un
              servicio integral y de alta calidad. Durante los años ha logrado posicionarse como una de las marcas mejor
              dotadas en cuanto a los repuestos y accesorios para las motocicletas, mejorando la calidad de vida de sus
              usuarios, siempre dispuestos a responder a las necesidades y expectativas de sus clientes.
            </p>

            <p>
              <span class="text-bold">¿Por qué elegir MotoWork?</span> Porque entendemos que cada motero tiene una
              pasión única por las dos ruedas, y por eso ofrecemos un servicio integral que va más allá de la venta de
              motocicletas. Nos enorgullece ser su aliado en cada viaje, brindando asesoría especializada, repuestos
              originales, y un servicio técnico altamente capacitado. Con MotoWork, no solo encuentras lo mejor en
              productos, sino un compromiso firme con tu seguridad y satisfacción. Además, nuestra amplia experiencia en
              motocross y el respaldo de marcas reconocidas aseguran que cada producto o servicio que adquieras sea de
              calidad superior. ¡En MotoWork, tu pasión por las motos es nuestra prioridad!
            </p>
          </div>
          <!--End complement history-->
        </article>
        <!--End history body-->
      </div>
    </section>
    <!--End history section-->

     <!--team section-->
     <section class="container-motowork bg-white">
      <div class="our-team-section">
        <!--header team-->
        <div class="our-team-section__header">
          <h2>
            Nuestro equipo
          </h2>
          <div class="separator"></div>
          <span>
            Equipo motowork
          </span>
        </div>
        <!--End header team-->

        <!--Body team-->
        <div class="our-team-section__body">
          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/area_01.webp" alt="Imagen del area 01" title="Imagen del area 01">
              <div class="overflow"></div>
            </figure>
            <h3>Sector empresarial</h3>
          </article>

          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/area_02.webp" alt="Imagen del area 02" title="Imagen del area 02">
              <div class="overflow"></div>
            </figure>
            <h3>Sector empresarial</h3>
          </article>

          <article class="our-team-section__body--item">
            <figure>
              <img src="/images/image.webp" alt="Imagen del area 03" title="Imagen del area 03">
              <div class="overflow"></div>
            </figure>
            <h3>Sector empresarial</h3>
          </article>
        </div>
        <!--End body team-->
      </div>
    </section>
    <!--End team section-->
  </q-page>
</template>

<script setup>
// imports
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
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
    }

    @media(max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;

      padding: 0px 0px;
    }
  }

  &__body {
    display: flex;
    gap: 16px;
    margin-top: 56px;

    figure {
      width: 504px;
      height: 400px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    }

    @media(max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;

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
        position: relative;

        img {
          width: 100%;
          object-fit: cover;
        }

        .overflow {
          position: absolute;
          width: 100%;
          height: 99%;
          top: 0;
          background-color: rgba(0, 0, 0, 0.349);
        }
      }

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
    }
  }
}
</style>
