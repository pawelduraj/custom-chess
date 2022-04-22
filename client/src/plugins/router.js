import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/board',
    name: 'Board',
    component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue')
}, {
    path: '/new-game',
    name: 'NewGame',
    component: () => import(/* webpackChunkName: "new-game" */ '../views/NewGame.vue')
}, {
    path: '/variants',
    name: 'Variants',
    component: () => import(/* webpackChunkName: "variants" */ '../views/Variants.vue')
}];

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes});

export default router;
