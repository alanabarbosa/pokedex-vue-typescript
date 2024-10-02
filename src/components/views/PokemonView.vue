<template>
  <section v-if="totalPokemons" class="pokemons">
    <div class="container">
      <Search @update:filteredPokemons="updateFilteredPokemons" 
      :searchTerm="searchTerm" />   
      <Filters :types="uniqueTypes" 
      @filterPokemons="filterByType" /> 
      <Pagination 
        :pokemonPage="50" 
        :pokemonsTotal="totalPokemons"  
        :currentPage="currentPage"
        @changePage="onPageChange" 
      />        
      <div v-for="pokemon in paginatedPokemons" 
      :key="pokemon.id">  
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
    const filteredPokemons = ref(pokemons.value);
    const favorites = ref<number[]>(JSON.parse(localStorage.getItem("pokemonFavorites") || "[]"));
    const currentPage = ref(1);    
    const selectedTypes = ref<string[]>([]);
    const isFiltering = ref(false);
    const searchTerm = ref<string>(''); // Adicione esta linha

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

    const filterByType = async (selectedType: string) => {
      currentPage.value = 1;      
      if (selectedType === '') {
        isFiltering.value = false;
        selectedTypes.value = [];
        await fetchPokemons(currentPage.value);
        filteredPokemons.value = pokemons.value;
      } else {
        isFiltering.value = true;
        selectedTypes.value = [selectedType];
        await fetchPokemons(currentPage.value, selectedType);
        filteredPokemons.value = pokemons.value;
      }
    };

    const updateFilteredPokemons = (filtered: any[]) => {
      if (filtered.length === 0 && !isFiltering.value) {
        currentPage.value = 1;
        fetchPokemons(currentPage.value).then(() => {
          filteredPokemons.value = pokemons.value;
        });
      } else {
        filteredPokemons.value = filtered;
      }
    };

    const filteredPokemonsComputed = computed(() => {
      if (selectedTypes.value.length > 0) {
        return pokemons.value.filter(pokemon =>
          pokemon.type.some(t => selectedTypes.value.includes(t.type.name))
        );
      }
      return filteredPokemons.value.length ? filteredPokemons.value : pokemons.value;
    }); 
    
    const filteredPokemonsCount = computed(() => filteredPokemonsComputed.value.length);

    const uniqueTypes = computed(() => types.value);

    const onPageChange = async (page: number) => {
      currentPage.value = page;
      
      if (isFiltering.value ) {
        console.log('Tipos filtrados:', selectedTypes.value);
        await fetchPokemons(currentPage.value, selectedTypes.value.join(','));
      } else {
        await fetchPokemons(currentPage.value); 
        filteredPokemons.value = pokemons.value; 
      }
    };

    const paginatedPokemons = computed(() => {
      return filteredPokemonsComputed.value ? filteredPokemonsComputed.value : pokemons.value;
    });

    return {
      selectPokemon,
      updateFilteredPokemons,
      filterByType,
      toggleFavorite,
      isFavorite,
      currentPage,
      onPageChange,
      uniqueTypes,
      paginatedPokemons,
      totalPokemons,
      isFiltering,
      filteredPokemonsCount,
      filteredPokemons,
      searchTerm,
    };
  },
});
</script>


<style scoped lang="scss">

</style>

