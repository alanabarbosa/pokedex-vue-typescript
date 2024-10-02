<template>
  <form class="search-container" @submit.prevent>
    <input
        type="text"
        v-model="searchTerm"
        placeholder="Digite o nome do Pokémon"
        @input="filterPokemons"
      />
      <p v-if="noResults" class="no-results-message">
        Pokémon não encontrado.
      </p>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePokemons } from '../composables/usePokemon';

export default defineComponent({
  setup(props, { emit }) {
    const { pokemons } = usePokemons();
    const searchTerm = ref<string>('');
    const noResults = ref<boolean>(false); 

    const filterPokemons = () => {
      const filtered = pokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
      emit('update:filteredPokemons', filtered);
      noResults.value = filtered.length === 0 && searchTerm.value.trim() !== '';
    };

    return {
      searchTerm,
      filterPokemons,
      noResults,
    };
  },
});
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  align-items: center; 
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9; 
  grid-column: 1 / -1;
  border: 1px solid #b31312;
}

input {
  flex: 1;
  border: none;
  width: 100%;
  background: none;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
}

.no-results-message {
    color: red;
    margin-top: 10px;
  }
</style>
