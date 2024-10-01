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
      await fetchPokemons(currentPage.value, selectedType);
      totalPokemons.value = pokemons.value.length;
    };

    const updateFilteredPokemons = (filtered: any[]) => {
      filteredPokemons.value = filtered;
    };

    const filteredPokemonsComputed = computed(() => {
      // Filtra os Pokémons com base no tipo selecionado
      if (selectedTypes.value.length > 0) {
        return pokemons.value.filter(pokemon =>
          pokemon.type.some(t => selectedTypes.value.includes(t.type.name))
        );
      }
      return filteredPokemons.value.length ? filteredPokemons.value : pokemons.value;
    });    

    const uniqueTypes = computed(() => types.value);

    const onPageChange = (page: number) => {
      currentPage.value = page;
      const selectedType = selectedTypes.value.length ? selectedTypes.value[0] : null;
      fetchPokemons(page, selectedType);
    }

    const paginatedPokemons = computed(() => {
      const startIndex = (currentPage.value - 1) * 50;
      const endIndex = startIndex + 50;
      //return filteredPokemonsComputed.value.slice(startIndex, endIndex);
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
      //allPokemons,
      filteredPokemonsComputed
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
