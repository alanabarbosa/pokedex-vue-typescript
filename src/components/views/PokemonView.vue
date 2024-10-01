<template>
  <section v-if="totalPokemons" id="pokemons">
    <div class="container">
      <Search @update:filteredPokemons="updateFilteredPokemons" />       
      <Filters :types="uniqueTypes" @filterPokemons="filterByType" />   

      <Pagination 
        :pokemonPage="50" 
        :pokemonsTotal="totalPokemons"
        :currentPage="currentPage"
        @changePage="onPageChange" 
      />   
        
      <div v-for="pokemon in paginatedPokemons" :key="pokemon.id">    
        <CardPokemon 
          :pokemon="pokemon" 
          :toggleFavorite="toggleFavorite" 
          :isFavorite="isFavorite" 
          :selectPokemon="selectPokemon" 
        />
      </div>
    </div>
  </section>
  <div v-else>
      <img src="../../assets/images/loading.svg" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { usePokemons } from '../../composables/usePokemon';
import Search from '../Search.vue';
import CardPokemon from '../CardPokemon.vue';
import Pagination from '../Pagination.vue';
import Filters from '../Filter.vue';

export default defineComponent({
components: {
  Search,
  CardPokemon,
  Pagination,
  Filters,
},
setup() {
  const { pokemons, types, fetchPokemons, totalPokemons } = usePokemons();
  const favorites = ref<number[]>(JSON.parse(localStorage.getItem("pokemonFavorites") || "[]"));
  const currentPage = ref(1);
  const selectedTypes = ref<string[]>([]);


  const toggleFavorite = (pokemonId: number): void => {
    if (favorites.value.includes(pokemonId)) {
      favorites.value = favorites.value.filter(id => id !== pokemonId);
    } else {
      favorites.value.push(pokemonId);
    }
    localStorage.setItem("pokemonFavorites", JSON.stringify(favorites.value));
  };

  const isFavorite = (pokemonId: number): boolean => {
    return favorites.value.includes(pokemonId);
  };

  const selectPokemon = (name: string) => {
    console.log(`Selecionou o Pokémon: ${name}`);
  };

  const filterByType = (selectedType: string) => {
    fetchPokemons(currentPage.value, selectedType);
  };

   /*const updateFilteredPokemons = (filtered: any[]) => {
    currentPage.value = 1;
  };  */

  const uniqueTypes = computed(() => types.value);

  const onPageChange = (page: number) => {
    currentPage.value = page;
    fetchPokemons(page);
  };

  const paginatedPokemons = computed(() => {
    return pokemons.value;
  });

  return {
    selectPokemon,
   // updateFilteredPokemons,
    filterByType,
    toggleFavorite,
    isFavorite,
    currentPage,
    onPageChange,
    uniqueTypes,
    paginatedPokemons,
    totalPokemons
  };
},
});
</script>

<style scoped lang="scss">
#pokemons {
  padding-bottom: 80px;
  .container {
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: #161853;
    height: auto;
  }
  .pagination {
    grid-column: 1 / -1;
  }
}
</style>
