<!-- Evolution.vue -->
<template>
    <section class="box_evolution">
      <TitleSecondary titleSecondary="Evolution Chain"></TitleSecondary>
      <div v-if="evolution">
        <div>
          <Text v-if="evolution.min_level" :text="`Lvl: ${evolution.min_level}`"></Text>
        </div>
        <div v-for="(nextEvolution, index) in evolution.evolves_to" :key="index" class="evolution-stage">
          <div class="evolution">
            <figure>
              <Image :image="getPokemonImage(evolution.species_id)"
              :alt="evolution.species_name"
              class="image_evolution" ></Image>
              <Text v-if="evolution.species_name" :text="evolution.species_name"></Text>
            </figure>
  
            <strong v-if="nextEvolution" class="level_up">
              <Text v-if="nextEvolution.min_level" :text="`Lvl: ${nextEvolution.min_level}`"></Text>
              <Text v-if="nextEvolution.min_happiness" :text="`Happiness: ${nextEvolution.min_happiness}`"></Text>
              <Image v-if="nextEvolution.item"
              :image="nextEvolution.item.spriteUrl"
              :alt="evolution.species_name" width="28px" 
              height="33px" class="item_img"></Image>  
              <Text v-if="nextEvolution.item" :text="nextEvolution.item.name"></Text>
            </strong>
          </div>
  
          <figure>
            <Image v-if="getPokemonImage(nextEvolution.species_id)"
              :image="getPokemonImage(nextEvolution.species_id)"
              :alt="nextEvolution.species_name"
              class="image_evolution"></Image>  
              <Text v-if="nextEvolution.species_name " :text="nextEvolution.species_name "></Text>
          </figure>
  
          <div v-for="(furtherEvolution, idx) in nextEvolution.evolves_to" :key="idx" class="evolution">
            <strong v-if="furtherEvolution.min_level" class="level_up">
              <Text v-if="furtherEvolution.min_level " :text="`Lvl: ${furtherEvolution.min_level }`"></Text>
              <Text v-if="furtherEvolution.min_happiness" :text="`Happiness: ${furtherEvolution.min_happiness }`"></Text>               
              <Image v-if="furtherEvolution.item"
              :image="furtherEvolution.item.spriteUrl"
              :alt="furtherEvolution.item.name"
              width="28px" height="33px" class="item_img" ></Image>          
              <Text v-if="furtherEvolution.item" :text="furtherEvolution.item.name"></Text>               
             </strong>
            <strong class="level_up">        
            
            <Image v-if="furtherEvolution.item"
            :image="furtherEvolution.item.spriteUrl"
            :alt="furtherEvolution.item.name"
            width="28px" height="33px" class="item_img" ></Image> 
            <Text v-if="furtherEvolution.item" :text="furtherEvolution.item.name"></Text>
            <Text v-if="furtherEvolution.species_name" :text="furtherEvolution.species_name"></Text> 
         
              
            </strong>    
            <figure>
              <Image 
              :image="getPokemonImage(furtherEvolution.species_id)"
              :alt="furtherEvolution.species_name"
              class="image_evolution"  ></Image>  
              <Text v-if="nextEvolution.species_name " :text="nextEvolution.species_name "></Text>
          </figure>        
           
          </div>
        </div>
      </div>
      <div v-else>
        <p></p>
        <Text text="No evolution data available."></Text>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Text from '../components/PokemonText.vue';
  import Image from '../components/PokemonImage.vue';
  import TitleSecondary from '../components/PokemonTitleSecondary.vue'
  
  export default defineComponent({
    components: {
      Text,
      Image,
      TitleSecondary
    },
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
            .image_evolution {
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