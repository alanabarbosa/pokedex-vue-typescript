<template>
  <div class="tab-nav">
    <div class="container">
      <div class="tab-buttons">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = index"
          :class="[{ active: selectedTab === index }, colorClass]"
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
import { defineComponent, ref, computed } from 'vue';
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
    color: {
      type: String,
      required: false,
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
        species_id: number,
          species_name: string;
          min_level: number | null;
          min_happiness?: number | null;
          item?: {
            name: string | null;
            url: string | null;
            spriteUrl?: string | null; 
          };
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
    const selectedTab = ref(0);

    const colorClass = computed(() => {
      return props.color ? props.color : '';
    });

    return {
      selectedTab,
      colorClass,
    };
  },
});
</script>


<style lang="scss">
.tab-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  border-radius: 45px;
  padding: 20px 0 80px 0;

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
      box-shadow: none !important;

      &.active {
        opacity: 1;
        background: none !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }
    }
  }
}
</style>
