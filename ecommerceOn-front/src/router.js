import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Error404 from './pages/Error404.vue';
import ArticleDetail from './pages/ArticleDetail.vue';
import Cart from './pages/Cart.vue';
import Login from './pages/Login.vue';
import Orders from './pages/Orders.vue';

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
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/article/:idArticle',
            name: 'article-detail',
            component: ArticleDetail
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error-404',
            component: Error404
        }
    ]

});

export { router };