import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Category from '../views/Category.vue'
import ProductForm from '@/views/ProductForm.vue';
import Product from '@/views/Product.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/home/:id',
      name: 'homeEdit',
      component: HomeView,
      props: true
    },
    {
      path: '/categories',
      name: 'category',
      component: Category
    },
    {
      path: '/products',
      name: 'products',
      component: Product
    },
    {
      path: '/product',
      name: 'product',
      component: ProductForm
    },{
      path: '/product/:id',
      name: 'productEdit',
      component: ProductForm,
      props: true
    },
  ]
})

export default router
