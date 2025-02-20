const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'vehiculos',
        component: () => import('pages/StorePage.vue'),
        name: 'vehicles'
      },
      {
        path: 'productos',
        component: () => import('pages/StorePage.vue'),
        name: 'products'
      },
      {
        path: 'vehiculos/:product_name',
        component: () => import('src/pages/products/ProductShow.vue'),
        name: 'vehiclesShow'
      },
      {
        path: 'productos/:product_name',
        component: () => import('src/pages/products/ProductShow.vue'),
        name: 'productsShow'
      },
      {
        path: 'vehiculos/:product_name/formulario',
        component: () => import('src/pages/products/VehicleFormulario.vue'),
        name: 'vehicleForm'
      },
      {
        path: 'carro-de-compra',
        component: () => import('src/pages/orders/ShoppingBag.vue'),
        name: 'shoppingCart'
      },
      {
        path: 'carro-de-compra/detalles-del-envio',
        component: () => import('src/pages/orders/CheckoutPage.vue'),
        name: 'checkout'
      },
      {
        path: 'carro-de-compra/detalles-de-pago',
        component: () => import('src/pages/orders/OrdersPayment.vue'),
        name: 'payment'
      },
      {
        path: 'orden-de-compra/:order/:status',
        component: () => import('src/pages/orders/OrdersPayment.vue'),
        name: 'payment_complete'
      },
      {
        path: 'conocenos',
        component: () => import('src/pages/aboutUs/AboutUs.vue'),
        name: 'aboutUs'
      },
      {
        path: 'experiencias',
        component: () => import('src/pages/experiences/ExperiencesPage.vue'),
        name: 'experiences'
      },
      {
        path: 'experiencias/:name',
        component: () => import('src/pages/experiences/ShowExperience.vue'),
        name: 'showExperience'
      },
      {
        path: 'servicio-tecnico',
        component: () => import('src/pages/services/ServicesPage.vue'),
        name: 'tecnicalServices'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
