<template>
  <section class="pokemons" v-if="favoritePokemons">
    <div class="container" >
      <PokemonTitle title="Meus Favoritos"></PokemonTitle>
      <div v-if="favoritePokemons.length === 0" 
      class="no_content">
        <Text text="Não existem pokémons salvos"></Text>
      </div>
      <div v-for="pokemon in favoritePokemons" 
      :key="pokemon.id">
        <CardPokemon 
          :pokemon="{ 
            ...pokemon, 
            types: pokemon.types || [] 
          }" 
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
import { defineComponent } from 'vue';
import { usePokemonFavorites } from '../../composables/usePokemonFavorites';
import CardPokemon from '../CardPokemon.vue';
import PokemonTitle from '../PokemonTitle.vue';
import Text from '../PokemonText.vue';

export default defineComponent({
  components: {
    CardPokemon,
    PokemonTitle,
    Text
  },
  setup() {
    const { favoritePokemons, favorites } = usePokemonFavorites(); 

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
.pokemons {
  padding-bottom: 80px;
}
  h1,
  p {
    grid-column: 1 / -1;
    color: #FFF;
    text-align: center;
  }
   h1 {
    margin-top: 30px;
   }
</style>
