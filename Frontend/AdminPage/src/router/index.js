import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView.vue';
import homeView from '../views/homeView.vue';
import listProductView from '../views/listProductsView.vue';
import listUserView from '../views/listUserView.vue';
import ordersView from '../views/ordersView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView
    },
    {
      path: '/listproducts',
      name: 'listproducts',
      component: listProductView,
      props: true
    },
    {
      path: '/listusers',
      name: 'listusers',
      component: listUserView
    },
    {
      path: '/orders',
      name: 'orders',
      component: ordersView
    },
    {
      path: '/homeadmin',
      name: 'home',
      component: homeView
    },
  ]
})

export default router
