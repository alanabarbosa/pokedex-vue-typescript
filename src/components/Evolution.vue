<template>
  <section class="box_evolution">
    <TitleSecondary titleSecondary="Evolution Chain"></TitleSecondary>
    <div v-if="evolution">
      <div>
        <!-- Verifique se `min_level` existe antes de mostrar -->
        <Text v-if="evolution.min_level" :text="`Lvl: ${evolution.min_level}`"></Text>
      </div>
      <div v-for="(nextEvolution, index) in evolution.evolves_to" :key="index" class="evolution-stage">
        <div class="evolution">
          <figure>
            <!-- Usando v-if para garantir que a imagem e o nome existam -->
            <Image v-if="nextEvolution.species_id && getPokemonImage(nextEvolution.species_id)" 
            :image="getPokemonImage(nextEvolution.species_id)"
            :alt="nextEvolution.species_name || ''"
            class="image_evolution" ></Image>
            <Text v-if="nextEvolution.species_name" :text="nextEvolution.species_name"></Text>
          </figure>
          
          <strong v-if="nextEvolution" class="level_up">
            <Text v-if="nextEvolution.min_level" :text="`Lvl: ${nextEvolution.min_level}`"></Text>
            <Text v-if="nextEvolution.min_happiness" :text="`Happiness: ${nextEvolution.min_happiness}`"></Text>
            
            <!-- Verifique a existência de `item` e evite erros caso não exista -->
            <Image v-if="nextEvolution.item?.spriteUrl"
            :image="nextEvolution.item.spriteUrl"
            :alt="nextEvolution.item?.name || ''"
            width="28px" height="33px" class="item_img"></Image>
            <Text v-if="nextEvolution.item?.name" :text="nextEvolution.item.name"></Text>
          </strong>
        </div>

        <figure>
          <Image v-if="nextEvolution.species_id && getPokemonImage(nextEvolution.species_id)"
          :image="getPokemonImage(nextEvolution.species_id)"
          :alt="nextEvolution.species_name || ''"
          class="image_evolution"></Image>
          <Text v-if="nextEvolution.species_name" :text="nextEvolution.species_name"></Text>
        </figure>

        <div v-for="(furtherEvolution, idx) in nextEvolution.evolves_to" :key="idx" class="evolution">
          <strong v-if="furtherEvolution" class="level_up">
            {{furtherEvolution}}
            <Text v-if="furtherEvolution.min_level" :text="`Lvl: ${furtherEvolution.min_level}`"></Text>
            <Text v-if="furtherEvolution.min_happiness" :text="`Happiness: ${furtherEvolution.min_happiness}`"></Text>  
            
            <!-- Verifique a existência de `item` e evite erros -->
            <Image v-if="furtherEvolution.item?.spriteUrl"
            :image="furtherEvolution.item.spriteUrl"
            :alt="furtherEvolution.item?.name || ''"
            width="28px" height="33px" class="item_img"></Image>
            <Text v-if="furtherEvolution.item?.name" :text="furtherEvolution.item.name"></Text>
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
      <p></p>
      <Text text="No evolution data available."></Text>
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
        item?: {
          name: string;
          url: string;
          spriteUrl?: string;
        };
        evolves_to: Array<{
          species_name?: string;
          species_id?: number;
          min_level?: number | null;
          min_happiness?: number | null;
          item?: {
            name: string;
            spriteUrl?: string;
          };
          evolves_to: Array<{
            species_name?: string;
            species_id?: number;
            min_level?: number | null;
            min_happiness?: number | null;
            item?: {
              name: string;
              spriteUrl?: string;
            };
            evolves_to: any[];
          }>;
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
    .image_evolution {
      width: 150px;
    }
    figure {
      display: flex;
      flex-direction: column;
      color: #000;
      font-weight: bold;
      gap: 20px;
      figcaption {
        text-transform: capitalize;
      }
    }
    .evolution {
      display: flex;
      gap: 51px;
      align-items: center;
      .item_img {
        width: 25px;
        height: 36px;
        margin: 0 auto;
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
