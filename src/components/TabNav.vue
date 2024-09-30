<template>
  <div class="tab-nav">
    <div class="container">
      <div class="tab-buttons">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = index"
          :class="{ active: selectedTab === index }"
        >
          {{ tab }}
        </button>
      </div>

      <div class="tab-content">
        <About v-if="selectedTab === 0" 
        :abilities="abilities" 
        :height="height" 
        :weight="weight" 
        :types="types" />
        <Stats v-else-if="selectedTab === 1" 
        :stats="stats" />
        <Evolution v-else-if="selectedTab === 2" 
        :evolution="evolution" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import About from './About.vue';
import Stats from './Stats.vue';
import Evolution from './Evolution.vue';

export default defineComponent({
  components: {
    About,
    Stats,
    Evolution,
  },
  props: {
    tabs: {
      type: Array as () => string[],
      required: true,
    },
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
    stats: {
      type: Array as () => Array<{ stat: { name: string }, base_stat: number }>,
      required: true,
    },
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
  setup() {
    const selectedTab = ref(0);
    return {
      selectedTab,
    };
  },
});
</script>
  
<style lang="scss">
.tab-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 45px;
  padding: 20px 0 80px 0;
  p,
  span {
    text-transform: capitalize
  }
  p {
      text-transform: capitalize;
      line-height: 39px;
  }
  span {
      border-radius: 3px;
      text-transform: capitalize;
      font-size: 18px;
      padding: 5px 10px;
      line-height: 39px;
  }
  .tab-buttons {
    display: flex;
    gap: 20px;
    padding: 30px 0;
    position: relative;

    button {
      border: none;
      border-radius: 5px;
      text-transform: uppercase;
      padding: 5px 25px;
      width: 33%;
      margin-top: -50px;
      font-size: 30px;
      cursor: pointer;
      font-weight: 700;
      background: none;
      opacity: 0.2;

      &.active {
        color: blue;
        opacity: 1;
      }
    }
  }

}
</style>
  
  