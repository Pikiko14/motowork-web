<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork v-if="$route.path === '/terminos-y-condiciones'" title="Terminos y condiciones" :banner="{}"
      default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Tienes alguna duda sobre nuestros terminos y condiciones?, no te preocupes, aca te las aclaramos?'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />

    <BannerMotowork v-if="$route.path === '/politicas-de-privacidad'" title="Políticas de privacidad" :banner="{}"
      default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Tienes alguna duda sobre nuestras políticas de privacidad?, no te preocupes, aca te las aclaramos?'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />

    <BannerMotowork v-if="$route.path === '/politicas-de-datos'" title="Políticas de datos" :banner="{}"
      default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Tienes alguna duda sobre nuestras políticas de datos?, no te preocupes, aca te las aclaramos?'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <div class="content terms" v-if="$route.path === '/terminos-y-condiciones'">
        <p>Gracias por visitar la página web de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1 y revisar los términos y condiciones de uso.</p>

        <h2>ALCANCE DE LOS TÉRMINOS Y CONDICIONES</h2>
        <p>Al ingresar o utilizar los servicios ofrecidos en el portal <a href="https://motowork.co"
            target="_blank">https://motowork.co</a> el usuario acepta expresamente los Términos y Condiciones de Uso
          establecidos en esta sección. Estos términos y condiciones rigen el uso del sitio web, los contenidos, los
          productos y servicios ofrecidos por POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1.</p>

        <h2>DERECHOS DE PROPIEDAD INTELECTUAL</h2>
        <p>Los contenidos, componentes, links y cualquier otro contenido de este sitio web son propiedad exclusiva de
          POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 y están protegidos por las leyes
          de propiedad intelectual aplicables. Bajo ninguna circunstancia, el contenido de este sitio podrá ser copiado,
          vendido, rentado, duplicado, publicado, distribuido, almacenado, retransmitido o transferido de cualquier otra
          forma sin la previa y expresa autorización de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS
          NIT 900393737-1.</p>

        <h2>ACTUALIZACIÓN Y CAMBIO DE CONTENIDOS Y PRECIOS</h2>
        <p>POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 se reserva el derecho de
          actualizar y cambiar los contenidos y precios del sitio web en cualquier momento y sin previo aviso. En caso
          tal que el artículo ofrecido no se encuentre actualizado en el inventario y no haya disponibilidad para
          entrega de acuerdo a los términos y condiciones, el cliente podrá decidir si espera el plazo indicado o
          solicitar la devolución del dinero.</p>

        <h2>LIMITACIÓN DE RESPONSABILIDAD</h2>
        <p>POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 no será responsable de ningún
          daño directo, indirecto, imprevisto, especial ni emergente que se genere por el uso o falta de capacidad para
          usar el sitio web. La responsabilidad de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1 estará limitada en todo momento al monto total pagado por el usuario por los productos o servicios
          adquiridos en el sitio web.</p>

        <h2>POLÍTICA DE PRECIOS</h2>
        <p><a href="https://motowork.co" target="_blank">https://motowork.co</a> cumple con los más altos estándares de
          cumplimiento de venta en línea. Cuando usted encuentra uno de nuestros productos en nuestro sitio web, puede
          estar seguro de que está pagando igual que en nuestros puntos de venta físicos. En ocasiones podrá encontrar
          descuentos y ofertas especiales en nuestro sitio web como política de la marca para impulsar la venta en
          línea, permitiéndole disfrutar de precios realmente diferenciadores. Nuestra política de precios y publicidad
          se ajusta a lo previsto en la Ley 1480 de 2011.</p>

        <h2>ACERCA DEL PAGO</h2>
        <p>Realizar un pago en <a href="https://motowork.co" target="_blank">https://motowork.co</a> es muy sencillo.
          Cuando realice una compra a través del apartado Tienda, haga clic en el carrito de compras. Una vez allí, haga
          clic en "Ir a la Caja". La opción por defecto para el pago es MercadoPago, nuestro aliado estratégico para
          garantizar la seguridad en las transacciones.</p>

        <h2>ACERCA DEL ENVÍO</h2>
        <p>Los pedidos realizados son seleccionados y empacados después de la confirmación y el pago de los productos.
          Una vez confirmado el pago, tardará 1 día hábil en ser despachado. El proceso de envío tardará entre 1 a 7
          días dependiendo del método de pago.</p>

        <h2>DEVOLUCIONES: POLÍTICA Y PROCEDIMIENTO</h2>
        <p>Si encuentras algún problema con los productos que recibiste, como inconsistencias, imperfectos o defectos de
          fábrica, puedes devolverlos sin costo alguno. Para iniciar el proceso de devolución, envía un correo
          electrónico a <a href="mailto:c.logistico@motowork.com.co">c.logistico@motowork.com.co</a> con el asunto
          "Devolución", indicando los productos que deseas devolver y el motivo para agilizar el proceso.</p>

        <h2>SOPORTE Y CONTACTO</h2>
        <p>Para cualquier necesidad de soporte, puedes contactarnos:</p>
        <ul>
          <li>Para motocicletas: <a href="mailto:marketing@motowork.com.co">marketing@motowork.com.co</a> - Celular: 315
            7240417</li>
          <li>Para repuestos y accesorios: <a
              href="mailto:comercial-repuestos2@motowork.com">comercial-repuestos2@motowork.com</a> - Celular: 310
            6133770</li>
        </ul>
      </div>

      <div class="content privacy" v-if="$route.path === '/politicas-de-privacidad'">
        <h2>POLÍTICA DE PRIVACIDAD</h2>
        <p>En POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1, nuestra política de
          seguridad y privacidad se ajusta al manejo y tratamiento de datos personales contenido en la Ley 1581 de 2011
          (Habeas Data).</p>

        <h2>¿POR QUÉ RECIBES CORREOS ELECTRÓNICOS DE POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1?</h2>
        <p>Al realizar una compra, autorizas a POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1 a contactarte para informarte sobre el proceso de compra y proporcionarte información sobre
          nuestros productos.</p>
        <p>Durante el proceso de compra, es posible que te contactemos varias veces para confirmaciones. Nuestro
          objetivo es ofrecer información relevante y autorizada en el momento de la compra. Si no deseas recibir
          información, te sugerimos evitar realizar compras en nuestro portal, ya que la programación de mensajes es
          automática y se activa después de que hayas realizado el proceso en nuestra tienda.</p>
      </div>

      <div class="content data">
        <h2>PROTECCIÓN DE DATOS PERSONALES</h2>
        <p>En POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 garantizamos la protección
          de tus datos personales al proporcionarlos a través de nuestro sitio web. Nos aseguramos de que se almacenen
          de manera segura en nuestros servidores y no serán objeto de venta o uso por parte de terceros sin tu
          consentimiento.</p>
        <p>Los datos solo se utilizarán para el proceso de compra y la comunicación de información relevante relacionada
          con POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1.</p>
        <p>Además, no almacenamos información bancaria o de transacciones, ya que el pago se realiza directamente a
          través del operador de pagos y entidades financieras. Nuestra política de seguridad y privacidad se ajusta al
          manejo y tratamiento de datos personales contenido en la Ley 1581 de 2012 (Habeas Data).</p>

        <h2>COMPARTICIÓN Y USO DE DATOS</h2>
        <p>En ningún caso compartiremos, venderemos o alquilaremos información personal individual a menos que sea
          ordenado por un tribunal de justicia. La información que nos envíes solo será compartida con los empleados
          responsables de gestionar esta información para ponerse en contacto contigo o enviarte correos electrónicos de
          acuerdo con tus solicitudes de información.</p>
        <p>También puede ser compartida con proveedores de servicios contratados para ofrecerte servicios relacionados
          con nuestras comunicaciones.</p>

        <h2>CANCELACIÓN DE CORREOS ELECTRÓNICOS DE POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT
          900393737-1</h2>
        <p>Siempre tendrás la opción de actualizar o eliminar tu información personal. Cada correo electrónico enviado
          contiene un modo sencillo y automatizado para que puedas dejar de recibir nuestros correos electrónicos o
          modificar tus preferencias.</p>
        <p>Si deseas hacerlo, sigue las instrucciones que aparecen al inicio o final de cualquier correo electrónico.
          También puedes solicitar la eliminación de tus datos personales a través de nuestro PBX: 604 444 67 27 en la
          ciudad de Medellín.</p>

        <h2>SEGURIDAD DE LA INFORMACIÓN</h2>
        <p>En POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1, nos preocupamos por la
          seguridad de tu información personal y financiera.</p>
        <p>Por ello, utilizamos sistemas de pago seguro de entidades financieras de primera línea en comercio
          electrónico para garantizar la máxima seguridad de tu información de pago. Todos los datos confidenciales se
          transmiten directamente y de forma encriptada a la entidad financiera.</p>
        <p>Nuestro sitio web se ajusta a los principios y normas contenidos en la Ley 1480 de 2011 y la Ley 1581 de
          2012.</p>
      </div>
    </section>
  </q-page>
</template>

<script setup>
// imports
import BreadCrumb from 'src/components/layout/BreadCrumb.vue'
import BannerMotowork from 'src/components/banner/BannerMotowork.vue'
</script>

<style scoped lang="scss">
p {
  font-size: 16px;
  color: #9F9C9C;
  background-color: #fff;
  line-height: 120%;
  margin: 16px 0px;

  @media(max-width: 767px) {
    font-size: 12px;
  }
}

h2 {
  color: #000000;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  margin-top: 22px;

  @media(max-width: 767px) {
    font-size: 16px;
  }
}

ul {
  list-style: none;
  padding: 0;
}

a {
  color: $secondary;
  text-decoration: none;
}
</style>
