import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/join/:gameId',
    name: 'Join',
    component: () => import(/* webpackChunkName: "join" */ '../views/Join.vue'),
}, {
    path: '/new-game',
    name: 'NewGame',
    component: () => import(/* webpackChunkName: "new-game" */ '../views/NewGame.vue')
}, {
    path: '/play-offline',
    name: 'PlayOffline',
    component: () => import(/* webpackChunkName: "play-offline" */ '../views/Board.vue')
}, {
    path: '/play-online',
    name: 'PlayOnline',
    component: () => import(/* webpackChunkName: "play-online" */ '../views/Board.vue')
}, {
    path: '/variants',
    name: 'Variants',
    component: () => import(/* webpackChunkName: "variants" */ '../views/Variants.vue')
}, {
    path: '/board',
    name: 'BoardDEV',
    component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue')
}];

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes});

export default router;
