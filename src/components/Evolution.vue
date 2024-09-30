<!-- Evolution.vue -->
<template>
    <div class="box_evolution">
      <h2><strong>Evolution Chain:</strong></h2>
      <div v-if="evolution">
        <div>
          <span v-if="evolution.min_level">(Level: {{ evolution.min_level }})</span>
        </div>
        {{ evolution.species_name }}
        <div v-for="(nextEvolution, index) in evolution.evolves_to" :key="index" class="evolution-stage">
          <div class="evolution">
            <figure>
              <img :src="getPokemonImage(evolution.species_id)" alt="evolution image" />
              <figcaption>{{ evolution.species_name }}</figcaption>
            </figure>
  
            <strong v-if="nextEvolution" class="level_up">
              <p v-if="nextEvolution.min_level">Lvl: {{ nextEvolution.min_level }}</p>
              <p v-if="nextEvolution.min_happiness">Happiness: <br>{{ nextEvolution.min_happiness }}</p>
              <img v-if="nextEvolution.item" :src="nextEvolution.item.spriteUrl" :alt="nextEvolution.item.name" width="28px" height="33px" class="item_img" />
              <p v-if="nextEvolution.item">{{ nextEvolution.item.name }}</p>
            </strong>
          </div>
  
          <figure>
            <img :src="getPokemonImage(nextEvolution.species_id)" alt="next evolution image" />
            <figcaption>{{ nextEvolution.species_name }}</figcaption>
          </figure>
  
          <div v-for="(furtherEvolution, idx) in nextEvolution.evolves_to" :key="idx" class="evolution">
            <strong v-if="furtherEvolution" class="level_up">
              <p v-if="furtherEvolution.min_level">Lvl: {{ furtherEvolution.min_level }}</p>
              <p v-if="furtherEvolution.min_happiness">Happiness: <br>{{ furtherEvolution.min_happiness }}</p>
              <img v-if="furtherEvolution.item" :src="furtherEvolution.item.spriteUrl" :alt="furtherEvolution.item.name" width="28px" height="33px" class="item_img" />
              <p v-if="furtherEvolution.item">{{ furtherEvolution.item.name }}</p>
            </strong>
            <figure>
              <img :src="getPokemonImage(furtherEvolution.species_id)" alt="next evolution image" />
              <figcaption>{{ furtherEvolution.species_name }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No evolution data available.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      evolution: {
        type: Object as () => ({
          species_name: string;
          min_level: number | null;
          evolves_to: Array<{
            species_name: string;
            min_level: number | null;
            evolves_to: Array<{
              species_name: string;
              min_level: number | null;
              evolves_to: any[];
            }>;
          }>;
        }),
        required: false,
        default: null,
      },
    },
    setup(props) {
      const getPokemonImage = (speciesId: number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;
      };
  
      return {
        getPokemonImage,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>
    .box_evolution {
        .evolution-stage {
            display: flex;
            gap: 50px;
            justify-content: center;
            margin-top: 30px;
            img {
                width: 150px
            }
            figure {
                display: flex;
                flex-direction: column;
                color: #000;
                font-weight: bold;
                gap: 20px;
                figcaption {
                    text-transform: capitalize
                }
            }
            .evolution {
                display: flex;   
                gap: 51px; 
                align-items: center;
                .item_img {
                    width: 25px;
                    height: 36px;
                }
                .level_up {
                    position: relative;
                    color: #000;
                    &::before {
                        content: '';
                        display: block;
                        background: url('../assets/images/arrow.svg') no-repeat;
                        width: 42px;
                        height: 42px;
                        background-size: 36px;
                    }
                }
            }
        }
    } 
       
</style>