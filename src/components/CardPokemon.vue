<template>
  <section class="slide-top" v-if="pokemon">
    <article :class="pokemon.type?.[0]?.type.name">
      <div class="pokemon_header">
        <PokemonId :style="{ background: pokemon.color }" :id="pokemon.id"></PokemonId>
        <svg
          width="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="favorites"
          @click="toggleFavorite(pokemon.id)"
          :class="{ favorites: isFavorite(pokemon.id) }"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
            :stroke="isFavorite(pokemon.id) ? 'red' : '#fff'"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            :fill="isFavorite(pokemon.id) ? 'red' : 'none'"
          />
        </svg>
      </div>
      <PokemonTitle :title="pokemon.name"></PokemonTitle>
      <PokemonType :types="pokemon.type || []"></PokemonType>
      <PokemonImage v-if="pokemon.image" 
      :image="pokemon.image" 
      :alt="pokemon.name"></PokemonImage>
      <ButtonLink 
        @click="selectPokemon(pokemon.name)" 
        label="Exibir Detalhes" 
        :url="{ name: 'pokemonList', params: { name: pokemon.name } }" 
        customClass="btn-primary" 
      />
    </article>
  </section>
  <section v-else>
    <PokemonText text="Não existe pokemon"></PokemonText>
    <img src="../../assets/images/loading.svg" alt="">
  </section>
</template>

  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonLink from './ButtonLink.vue';
  import PokemonTitle from './PokemonTitle.vue';
  import PokemonText from './PokemonText.vue';
  import PokemonType from './PokemonType.vue';
  import PokemonId from './PokemonId.vue';
  import PokemonImage from './PokemonImage.vue'  
  
  export default defineComponent({
    name: 'CardPokemon',
    components: {
      ButtonLink,
      PokemonTitle,
      PokemonText,
      PokemonType,
      PokemonId,
      PokemonImage
    },
    props: {
      pokemon: {
        type: Object,
        required: true
      },
      toggleFavorite: {
        type: Function,
        required: true
      },
      isFavorite: {
        type: Function,
        required: true
      },
      selectPokemon: {
        type: Function,
        required: true
      }
    }
  });
  </script>
  
  <style scoped lang="scss">
  .pokemon_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  article {
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    transition: all .5s;
    //backdrop-filter: blur(10px);
   // -webkit-backdrop-filter: blur(10px);
    //box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
  
  .favorites {
    width: 40px;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .article {
      margin: 0 30px;
      border: 1px solid red;
    }
  }  
  
  </style>
  