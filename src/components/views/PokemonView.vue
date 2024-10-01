<template>
  <section v-if="totalPokemons" id="pokemons">
    <div class="container">
      <Search @update:filteredPokemons="updateFilteredPokemons" @noResults="restorePokemons" />

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
    const allPokemons = ref([]); // Inicie como um array vazio
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

    const fetchAllPokemons = async () => {
      await fetchPokemons(currentPage.value);
      allPokemons.value = [...pokemons.value]; // Armazena todos os Pokémons
      totalPokemons.value = allPokemons.value.length; // Atualiza o total
    };

    const filterByType = async (selectedType: string) => {
      currentPage.value = 1; 
      await fetchPokemons(currentPage.value, selectedType);
      totalPokemons.value = pokemons.value.length;
    };

    const updateFilteredPokemons = (filteredPokemons: any[]) => {
      if (filteredPokemons.length === 0) {
        // Se não houver resultados, faça uma nova requisição para restaurar a lista de Pokémons
        console.log("Nenhum Pokémon encontrado, fazendo nova requisição...");
        fetchAllPokemons(); // Requisição para obter todos os Pokémons
      } else {
        pokemons.value = filteredPokemons;
      }
      totalPokemons.value = pokemons.value.length;
    };

    const restorePokemons = () => {
      pokemons.value = [...allPokemons.value];
      totalPokemons.value = allPokemons.value.length; 
    };

    const uniqueTypes = computed(() => types.value);

    const onPageChange = (page: number) => {
      currentPage.value = page;
      fetchPokemons(page); // Atualiza os Pokémons para a nova página
    };

    const paginatedPokemons = computed(() => {
      return pokemons.value;
    });

    // Buscar todos os Pokémons na montagem do componente
    fetchAllPokemons();

    return {
      selectPokemon,
      updateFilteredPokemons,
      restorePokemons,
      filterByType,
      toggleFavorite,
      isFavorite,
      currentPage,
      onPageChange,
      uniqueTypes,
      paginatedPokemons,
      totalPokemons,
      allPokemons,
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
