import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/',
      name: 'Inicio',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'Acerca de',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Inicio de sesión',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Registro',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/products',
      name: 'Productos',
      component: () => import('../views/ProductsView.vue'),
      redirect: {name: 'Productos.list'},
      children: [
        {
          path: 'list',
          name: 'Productos.list',
          component: () => import('../components/products/ProductList.vue'),
        },
        {
          path: 'add',
          name: 'Productos.add',
          component: () => import('../components/products/ProductAdd.vue'),
        },
        {
          path: 'edit',
          name: 'Productos.edit',
          component: () => import('../components/products/ProductEdit.vue'),
        }
      ],
    },
    {
      path: '/clients',
      name: 'Clientes',
      component: () => import('../views/ClientsView.vue'),
      redirect: {name: 'Clientes.list'},
      children: [
        {
          path: 'list',
          name: 'Clientes.list',
          component: () => import('../components/clients/ClientList.vue'),
        },
        {
          path: 'add',
          name: 'Clientes.add',
          component: () => import('../components/clients/ClientAdd.vue'),
        },
        {
          path: 'edit',
          name: 'Clientes.edit',
          component: () => import('../components/clients/ClientEdit.vue'),
        }
      ],
    }
  ]
})

export default router
