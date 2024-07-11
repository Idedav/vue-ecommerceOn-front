import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Error404 from './pages/Error404.vue';
import ArticleDetail from './pages/ArticleDetail.vue';
import Cart from './pages/Cart.vue';
import Login from './pages/Login.vue';
import Orders from './pages/Orders.vue';
import CheckOut from './pages/CheckOut.vue';
import OrderDetail from './pages/OrderDetail.vue';
import Error401 from './pages/Error401.vue';

const router = createRouter({

    history: createWebHistory(),

    linkExactActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckOut
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/order-detail/:idOrder',
            name: 'order-detail',
            component: OrderDetail
        },
        {
            path: '/article/:idArticle',
            name: 'article-detail',
            component: ArticleDetail
        },
        {
            path: '/unauthorized',
            name: 'error-401',
            component: Error401
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error-404',
            component: Error404
        }
    ]

});

export { router };