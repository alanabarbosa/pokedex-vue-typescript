import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pokemon',
    component: () => import('../components/views/PokemonView.vue'), // Lazy loading
  },
  {
    path: '/pokemon/:name',
    name: 'pokemonList',
    component: () => import('../components/views/PokemonList.vue'), // Lazy loading
    props: true,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../components/views/FavoritesView.vue'), // Lazy loading
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
