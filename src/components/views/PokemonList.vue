<template>
    <section class="slide-top">
        <div class="pokemon-details" v-if="pokemon" 
        :class="pokemon.types[0].type.name">
        <div class="container">
            <div class="pokemon_title">
              <PokemonId :style="{ background: pokemon.color}"
              :id="pokemon.id"></PokemonId>
                <PokemonTitle :title="pokemon.name"></PokemonTitle>
                <PokemonType :types="pokemon.type"></PokemonType>
            </div>    
            <div v-if="pokemon.image">
              <PokemonImage v-if="pokemon.image"
              :image="pokemon.image"
              :alt="pokemon.name"></PokemonImage>
            </div> 
        </div>
        
            <TabNav 
            :tabs="['about', 'stats', 'evolution']"
            :abilities="pokemon.abilities"
            :height="pokemon.height"
            :weight="pokemon.weight"
            :types="pokemon.types"
            :stats="pokemon.stats"
            :evolution="pokemonEvolution.value" 
            />
        </div>
    </section>
  </template>
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import TabNav from '../TabNav.vue';
  import { usePokemonDetails } from '../../composables/usePokemonDetails'; 
  import { usePokemonEvolution } from '../../composables/usePokemonEvolution'; 
  import PokemonTitle from '../PokemonTitle.vue';
  import PokemonType from '../PokemonType.vue';
  import PokemonId from '../PokemonId.vue';
  import PokemonImage from '../PokemonImage.vue'   
  
  export default defineComponent({
    components: {
      TabNav,
      PokemonTitle,
      PokemonType,
      PokemonId,
      PokemonImage
    },
    setup() {
      const { pokemon, calculatePercentage } = usePokemonDetails();
      const pokemonEvolution = ref({});

      watch(pokemon, (newPokemon) => {
        if (newPokemon && newPokemon.id) {
          const { pokemonEvolution: evolutionData } = usePokemonEvolution(newPokemon.id);  
          pokemonEvolution.value = evolutionData; 
        }
      }, { immediate: true });
  
      return {
        pokemon,
        pokemonEvolution,
        calculatePercentage
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .pokemon-details {
    border-radius: 45px;
    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
      text-align: center;
      padding: 30px 0;
      p {
        font-size: 30px;
        font-weight: bold;
        color: #000;
      }
      img {
        width: 300px;
      }
      h2 {
        grid-column: 1 / -1;
        font-size: 35px;
        padding: 20px 0;
        color: #000
      }
      .grid-1 {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
      .box_stats {
        display: flex;
        flex-direction: column;
        text-align: left;
        .abilities,
        .stats,
        .info {
          display: flex;
          gap: 20px;
        }
  
        .stat-bar {
          width: 100%;
          background-color: #e0e0e0;
          height: 10px;
          margin: 5px 0;
          border-radius: 5px;
          overflow: hidden;
  
          .stat-bar-inner {
            height: 100%;
            transition: width 0.3s ease-in-out;
          }
        }
      }
    }
  }
  </style>
  