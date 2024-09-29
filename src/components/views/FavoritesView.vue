<template>
  <section id="favorites">
    <div class="container">
      <h1>Meus Favoritos</h1>
      <div v-if="favoritePokemons.length === 0" class="no_content">
        <p>Não existem pokémons salvos</p>
      </div>
      <div v-for="pokemon in favoritePokemons" :key="pokemon.id">
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
import CardPokemon from '../CardPokemon.vue';

export default defineComponent({
  components: {
    CardPokemon
  },
  setup() {
    const { pokemons } = usePokemons();
    const favorites = ref<number[]>(JSON.parse(localStorage.getItem("pokemonFavorites") || "[]"));

    // Filtra os pokémons favoritos
    const favoritePokemons = computed(() => {
      return pokemons.value.filter(pokemon => favorites.value.includes(pokemon.id));
    });

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

    return {
      favoritePokemons,
      toggleFavorite,
      isFavorite,
      selectPokemon
    };
  },
});
</script>

<style scoped lang="scss">
#favorites {
  .container {
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    h1,
    .no_content {
      grid-column: 1 / -1;
      margin-top: 20px;
    }
  }
}
</style>
