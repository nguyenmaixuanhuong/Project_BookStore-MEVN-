import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue';
import productView from '../views/productView.vue';
import productDetailView from '../views/productDetailView.vue';
import cartView from '../views/cartView.vue';
import contactView from '../views/contactView.vue';
import aboutView from '../views/aboutView.vue';
import ordersView from '../views/ordersView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products/:id',
      name: 'productDetails',
      component: productDetailView
    },
    {
      path: '/products',
      name: 'products',
      component: productView,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: cartView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: contactView,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: ordersView,
    },
    {
      path: '/',
      name: 'home',
      component: homeView,
      props: true
    },
  ]
})

export default router
