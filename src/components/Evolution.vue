<template>
  <section class="box_evolution slide-top">
    <div v-if="evolution">
      {{evolution}}
      <TitleSecondary :titleSecondary="$t('evolution_chain')"></TitleSecondary>
      <div>
        <Text v-if="evolution.min_level" :text="`Lvl: ${evolution.min_level}`"></Text>
      </div>  
      <div v-for="(nextEvolution, index) in evolution.evolves_to" :key="index" class="evolution-stage">
        <div class="evolution">
          <figure>        
            <Image v-if="evolution.species_id && 
            getPokemonImage(evolution.species_id)" 
            :image="getPokemonImage(evolution.species_id)"
            :alt="evolution.species_name || ''"
            class="image_evolution" ></Image>
            <Text v-if="evolution.species_name" 
            :text="evolution.species_name"></Text>
          </figure>
          
          <strong v-if="nextEvolution" class="level_up">          
            <div v-for="(detail, index) in nextEvolution.evolution_details" :key="index">                          
              <Text v-if="detail.min_level" :text="`Lvl: ${detail.min_level}`"></Text>
            </div>

            <div v-if="nextEvolution.evolution_details.length > 0">
            <div v-for="(detail, index) in nextEvolution.evolution_details" :key="index">             
              <Text v-if="detail.time_of_day" :text="$t('time_of_day') + ': ' + detail.time_of_day"></Text>
              <Text v-if="detail.min_happiness" :text="$t('min_happiness') + ': ' + detail.min_happiness"></Text>
              <Text v-if="detail.min_affection" :text="$t('min_affection') + ': ' + detail.min_affection"></Text> 
              <Image
                v-if="detail.item?.spriteUrl"
                :image="detail.item.spriteUrl"
                :alt="detail.item.name || ''"
                width="28px" height="33px" class="item_img"/>      
              
              <Text v-if="detail.item?.name" :text="$t(`${detail.item.name}`)"></Text>           
              
            </div>
          </div>
          </strong>
        </div>

        <figure>
          <Image v-if="nextEvolution.species_id && getPokemonImage(nextEvolution.species_id)"
          :image="getPokemonImage(nextEvolution.species_id)"
          :alt="nextEvolution.species_name || ''"
          class="image_evolution"></Image>
          <Text v-if="nextEvolution.species_name" 
          :text="nextEvolution.species_name"></Text>
        </figure>

        <div v-for="(furtherEvolution, idx) in nextEvolution.evolves_to" :key="idx" class="evolution">          
          <strong v-if="furtherEvolution" class="level_up">       
            <Text v-if="furtherEvolution.min_happiness" :text="$t('happiness')"></Text>           
            <div v-for="(detail, index) in furtherEvolution.evolution_details" :key="index">
              <Image v-if="detail.item?.spriteUrl"
              :image="detail.item.spriteUrl"
              :alt="detail.item?.name || ''"
              width="28px" height="33px" class="item_img"></Image>              
              <Text v-if="detail.min_level" :text="`Lvl: ${detail.min_level}`"></Text>
              <Text v-if="detail.item?.name" :text="$t('moon_stone')"></Text>
            </div>
          </strong>

          <figure>
            
            <Image v-if="furtherEvolution.species_id && getPokemonImage(furtherEvolution.species_id)"
            :image="getPokemonImage(furtherEvolution.species_id)"
            :alt="furtherEvolution.species_name || ''"
            class="image_evolution"></Image>
            <Text v-if="furtherEvolution.species_name" :text="furtherEvolution.species_name"></Text>
          </figure>
        </div>
      </div>
    </div>
    <div v-else>      
      <Text :text="$t('no_evolution')"></Text>
    </div>
  </section>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import Text from '../components/PokemonText.vue';
import Image from '../components/PokemonImage.vue';
import TitleSecondary from '../components/PokemonTitleSecondary.vue';

export default defineComponent({
  components: {
    Text,
    Image,
    TitleSecondary
  },
  props: {
  evolution: {
    type: Object as () => {
      species_id?: number;
      species_name?: string;
      min_level?: number | null;
      min_happiness?: number | null;
      min_affection?: number | null;
      item?: {
        name: string | null;
        url: string | null;
        spriteUrl?: string | null;
      };
      evolves_to: Array<{
        species_name?: string;
        species_id?: number;
        min_level?: number | null;
        min_happiness?: number | null;
        min_affection?: number | null;
        item?: {
          name: string | null;
          spriteUrl?: string | null;
        };
        evolution_details: Array<{
          min_level?: number | null;
          time_of_day?: string | null;
          min_happiness?: number | null;
          min_affection?: number | null;
          item?: {
            name: string | null;
            spriteUrl?: string | null;
          };
        }>;
        evolves_to: any[];
      }>;
    },
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
    @media (max-width: 900px) {
      flex-direction: column;
    }
    .image_evolution {
      width: 150px;
    }
    figure {
      display: flex;
      flex-direction: column;
      color: #000;
      font-weight: bold;
      gap: 20px;
      @media (max-width: 900px) {
        justify-content: center;
        margin: 0 auto;
      }
      figcaption {
        text-transform: capitalize;
      }
    }
    .evolution {
      display: flex;
      gap: 51px;
      align-items: center;
      @media (max-width: 900px) {
        justify-content: center;
        display: grid;
      }
      .item_img {
        width: 25px;
        height: 36px;
        margin: 0 auto;
      }
      strong {
        @media (max-width: 900px) {
         width: 100%;
        }
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
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
