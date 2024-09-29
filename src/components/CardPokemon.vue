<template>
    <section class="slide-top">
      <article :class="pokemon.type[0]?.type.name">
        <div class="pokemon_header">
          <span :style="{ background: '#b31312' }">#{{ pokemon.id }}</span>
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
       
        <h2 v-if="pokemon.name" class="pokemon_name">{{ pokemon.name }}</h2>
        <div class="types">
          <p v-for="t in pokemon.type" :key="t.type.name"
          :class="t.type.name" >{{ t.type.name }}</p>
        
        </div>
        <img v-if="pokemon.image" :src="`${pokemon.image}`" alt="Imagem do Pokémon" />
        <ButtonLink 
          @click="selectPokemon(pokemon.name)" 
          label="Exibir Detalhes" 
          :url="{ name: 'pokemonList', params: { name: pokemon.name } }" 
          customClass="btn-primary" 
        />
      </article>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonLink from '../components/ButtonLink.vue';
  
  export default defineComponent({
    name: 'CardPokemon',
    components: {
      ButtonLink,
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
  
  <style scoped>
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
  }
  
  .favorites {
    width: 40px;
    cursor: pointer;
  }
  
  h2 {
    text-transform: capitalize;
  }

  .types {
    display: flex;
    justify-content: center;
    gap: 20px;
    p {
      border-radius: 50px;
      padding: 5px 20px;
      bordeR: 1px solid #FFF;
    }
  }
  
  span {
    border-radius: 10px;
    width: 20%;
    padding: 2px;
  }
  
  .slide-left-enter-active, .slide-left-leave-active {
    transition: transform 0.5s ease;
  }
  
  .slide-left-enter {
    transform: translateX(-100%);
  }
  
  .slide-left-leave-to  {
    transform: translateX(100%);
  }
  </style>
  