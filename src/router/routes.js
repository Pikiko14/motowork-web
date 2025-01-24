const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/vehiculos',
        component: () => import('pages/StorePage.vue'),
        name: 'vehicles'
      },
      {
        path: '/productos',
        component: () => import('pages/StorePage.vue'),
        name: 'products'
      },
      {
        path: '/vehiculos/:product_name',
        component: () => import('pages/products/PorductShow.vue'),
        name: 'vehiclesShow'
      },
      {
        path: '/productos/:product_name',
        component: () => import('pages/products/PorductShow.vue'),
        name: 'productsShow'
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
