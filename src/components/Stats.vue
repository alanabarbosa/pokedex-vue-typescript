<template>
  <section v-if="stats && stats.length" v-for="(stat, index) in stats" :key="index" class="stats slide-top">
    <Text class="stat_name" :text="$t(`stats_name.${stat.stat.name}`)"></Text>
    <Text :text="`${stat.base_stat}%`"></Text>
    <div class="stat-bar-box">
      <div class="stat-bar">
        <div
          class="stat-bar-inner"
          :style="{ width: stat.base_stat + '%', backgroundColor: 'red' }"
        ></div>
      </div>
    </div>
  </section>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Text from '../components/PokemonText.vue';
  
  export default defineComponent({
    components: {
      Text
    },
    props: {
      stats: {
        type: Array as () => Array<{ stat: { name: string }, base_stat: number }>,
        required: true,
      },
    },
  });
  </script>

  <style lang="scss" scoped>
    .stats {
        display: grid;
        align-items: center;  
        grid-template-columns: 200px 50px 1fr;      
        width: 80%;
        justify-content: center;
        text-align: justify;
        margin: 0 auto;
        .stat_name {
          font-weight:bold;
        }
        .stat-bar {
            width: 100%;
            background-color: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
            .stat-bar-inner {
                height: 20px; 
                transition: width 0.3s ease-in-out; 
            }
        }            
        .stat-bar-box {
            width: 100%;
        }
        .stat-bar {
            display: flex;
        }
        p {
            display: flex;
            color: #000;
        }
    }
    </style>
  