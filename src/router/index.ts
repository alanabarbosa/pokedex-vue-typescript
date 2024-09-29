import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Pokemon from '../components/views/PokemonView.vue';
import PokemonList from '../components/views/PokemonList.vue';
import Favorites from '../components/views/FavoritesView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pokemon',
    component: Pokemon,
  },
  {
    path: '/pokemon/:name',
    name: 'pokemonList',
    component: PokemonList,
    props: true, 
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  }  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
