import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/components/HomePrinc.vue') },
    { path: '/pagination', name: 'pagination', component: () => import('@/components/pagination/HomePages.vue') },
    { path: '/scrollInfini', name: 'scrollInfini', component: () => import('@/components/scroll/UserHome.vue') },
  ]
});

export default router