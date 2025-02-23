<template>
  <q-page>
    <!--Banner-->
    <BannerMotowork title="Terminos y condiciones" :banner="{}" default-img="/images/cart_background.webp" :btnLabel="''"
      :bannerComplement="'¿Tienes alguna duda sobre nuestros servicios?, no te preocupes, aca te las aclaramos?'"
      :contentEnd="true" :noOverflow="true" :reduceBanner="true" />
    <!--End banner-->

    <!--main content-->
    <section class="container-motowork bg-white">
      <!--breadcrumb-->
      <BreadCrumb />
      <!--End breadcrumb-->

      <div class="content">
        <p>Gracias por visitar la página web de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 y revisar los términos y condiciones de uso.</p>

        <h2>ALCANCE DE LOS TÉRMINOS Y CONDICIONES</h2>
        <p>Al ingresar o utilizar los servicios ofrecidos en el portal <a href="https://motowork.co" target="_blank">https://motowork.co</a> el usuario acepta expresamente los Términos y Condiciones de Uso establecidos en esta sección. Estos términos y condiciones rigen el uso del sitio web, los contenidos, los productos y servicios ofrecidos por POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1.</p>

        <h2>DERECHOS DE PROPIEDAD INTELECTUAL</h2>
        <p>Los contenidos, componentes, links y cualquier otro contenido de este sitio web son propiedad exclusiva de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 y están protegidos por las leyes de propiedad intelectual aplicables. Bajo ninguna circunstancia, el contenido de este sitio podrá ser copiado, vendido, rentado, duplicado, publicado, distribuido, almacenado, retransmitido o transferido de cualquier otra forma sin la previa y expresa autorización de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1.</p>

        <h2>ACTUALIZACIÓN Y CAMBIO DE CONTENIDOS Y PRECIOS</h2>
        <p>POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 se reserva el derecho de actualizar y cambiar los contenidos y precios del sitio web en cualquier momento y sin previo aviso. En caso tal que el artículo ofrecido no se encuentre actualizado en el inventario y no haya disponibilidad para entrega de acuerdo a los términos y condiciones, el cliente podrá decidir si espera el plazo indicado o solicitar la devolución del dinero.</p>

        <h2>LIMITACIÓN DE RESPONSABILIDAD</h2>
        <p>POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 no será responsable de ningún daño directo, indirecto, imprevisto, especial ni emergente que se genere por el uso o falta de capacidad para usar el sitio web. La responsabilidad de POSADA SANIN 114 SAS NIT 900305315-1 / POSADA SANIN Y CIA SAS NIT 900393737-1 estará limitada en todo momento al monto total pagado por el usuario por los productos o servicios adquiridos en el sitio web.</p>

        <h2>POLÍTICA DE PRECIOS</h2>
        <p><a href="https://motowork.co" target="_blank">https://motowork.co</a> cumple con los más altos estándares de cumplimiento de venta en línea. Cuando usted encuentra uno de nuestros productos en nuestro sitio web, puede estar seguro de que está pagando igual que en nuestros puntos de venta físicos. En ocasiones podrá encontrar descuentos y ofertas especiales en nuestro sitio web como política de la marca para impulsar la venta en línea, permitiéndole disfrutar de precios realmente diferenciadores. Nuestra política de precios y publicidad se ajusta a lo previsto en la Ley 1480 de 2011.</p>

        <h2>ACERCA DEL PAGO</h2>
        <p>Realizar un pago en <a href="https://motowork.co" target="_blank">https://motowork.co</a> es muy sencillo. Cuando realice una compra a través del apartado Tienda, haga clic en el carrito de compras. Una vez allí, haga clic en "Ir a la Caja". La opción por defecto para el pago es MercadoPago, nuestro aliado estratégico para garantizar la seguridad en las transacciones.</p>

        <h2>ACERCA DEL ENVÍO</h2>
        <p>Los pedidos realizados son seleccionados y empacados después de la confirmación y el pago de los productos. Una vez confirmado el pago, tardará 1 día hábil en ser despachado. El proceso de envío tardará entre 1 a 7 días dependiendo del método de pago.</p>

        <h2>DEVOLUCIONES: POLÍTICA Y PROCEDIMIENTO</h2>
        <p>Si encuentras algún problema con los productos que recibiste, como inconsistencias, imperfectos o defectos de fábrica, puedes devolverlos sin costo alguno. Para iniciar el proceso de devolución, envía un correo electrónico a <a href="mailto:c.logistico@motowork.com.co">c.logistico@motowork.com.co</a> con el asunto "Devolución", indicando los productos que deseas devolver y el motivo para agilizar el proceso.</p>

        <h2>SOPORTE Y CONTACTO</h2>
        <p>Para cualquier necesidad de soporte, puedes contactarnos:</p>
        <ul>
            <li>Para motocicletas: <a href="mailto:marketing@motowork.com.co">marketing@motowork.com.co</a> - Celular: 315 7240417</li>
            <li>Para repuestos y accesorios: <a href="mailto:comercial-repuestos2@motowork.com">comercial-repuestos2@motowork.com</a> - Celular: 310 6133770</li>
        </ul>
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
