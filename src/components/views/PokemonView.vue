<template>
    <section v-if="filteredPokemons.length" id="pokemons">
      <div class="container">
        <Search @update:filteredPokemons="updateFilteredPokemons" />       
        <Filters :types="uniqueTypes" @filterPokemons="filterByType" />
        <Pagination 
        :total="filteredPokemons.length" 
        :page="currentPage"
        @changePage="onPageChange" />
          
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
      const { pokemons, totalPokemons, types } = usePokemons();
      const filteredPokemons = ref(pokemons.value);
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
  
      const updateFilteredPokemons = (filtered: any[]) => {
        filteredPokemons.value = filtered;
      };
  
      const filteredPokemonsComputed = computed(() => {
        if (selectedTypes.value.length > 0) {
          return pokemons.value.filter(pokemon => 
            pokemon.type.some(t => selectedTypes.value.includes(t.type.name))
          );
        }
        return filteredPokemons.value.length ? filteredPokemons.value : pokemons.value;
      });
  
      const uniqueTypes = computed(() => types.value); // Use os tipos que você obteve
  
      const onPageChange = (page: number) => {
        currentPage.value = page;
      };
  
      const filterByType = (type: string) => {
        if (type) {
          selectedTypes.value = [type]; 
        } else {
          selectedTypes.value = []; 
        }
      };

      const paginatedPokemons = computed(() => {
        const startIndex = (currentPage.value - 1) * 50;
        const endIndex = startIndex + 50;
        return filteredPokemonsComputed.value.slice(startIndex, endIndex);
      });     
        
      return {
        filteredPokemons: filteredPokemonsComputed,
        selectPokemon,
        updateFilteredPokemons,
        toggleFavorite,
        isFavorite,
        totalPokemons,
        currentPage,
        onPageChange,
        filterByType,
        uniqueTypes,
        paginatedPokemons
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  #pokemons {
    .container {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    .pagination {
      grid-column: 1 / -1;
    }
  }
  </style>
  