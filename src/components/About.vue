<!-- About.vue -->
<template>
    <section class="about">
      <div class="abilities">
        <TitleSecondary titleSecondary="Abilities:"></TitleSecondary>
        <div v-for="(item) in abilities" :key="item.ability.name">
          <Text :text="item.ability.name"></Text>
        </div>
      </div>

      <div class="height">
        <TitleSecondary titleSecondary="Height:"></TitleSecondary>
        <Text :text="`${height.toString()}cm`"></Text>
      </div>

      <div class="weight">
        <TitleSecondary titleSecondary="Weight:"></TitleSecondary>
        <Text :text="`${weight.toString()}kg`"></Text>
      </div>
  
      <div class="types">
        <TitleSecondary titleSecondary="Type:"></TitleSecondary>
        <PokemonType :types="types || []"></PokemonType>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Text from '../components/PokemonText.vue';
  import TitleSecondary from '../components/PokemonTitleSecondary.vue';
  import PokemonType from '../components/PokemonType.vue'
  
  export default defineComponent({
    components: {
      Text,
      TitleSecondary,
      PokemonType
    },
    props: {
      abilities: {
        type: Array as () => Array<{ ability: { name: string } }>,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      types: {
        type: Array as () => Array<{ type: { name: string } }>,
        required: true,
      },
    },
  });
  </script>

  <style lang="scss" scoped>
    .about {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #000;
        width: 100%;
        width: 42%;
        margin: 0 auto;
        h2 {
          color: #000
        }
        .abilities,
        .height,
        .weight,
        .types {
            display: flex;
            gap: 20px;
            justify-content: space-between;
        }
    }
</style>
  