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
        <div v-if="selectedTab === 0">
          <div class="about">
            <div class="abilities">
                <p><strong>Abilities:</strong></p>
                <div v-for="(item) in abilities" :key="item.ability.name">
                    <span>{{ item.ability.name }}</span>
                </div>
            </div>
           
            <div class="height">
                <p><strong>Height:</strong></p>
                <span> {{ height / 10 }}cm</span>
            </div>

            <div class="weight">
                <p><strong>Weight:</strong> </p>
                <span>{{ weight / 10 }}kg</span>
            </div>

            <div class="types">
                <p><strong>Type:</strong></p>            
                <div
                v-for="(type) in types" 
                :key="type.type.name">
                <span
                :class="type.type.name">
                    {{ type.type.name }}
                </span>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="selectedTab === 1">
            <div v-for="(stat, index) in stats" :key="index" class="stats">
                <p><strong>{{ stat.stat.name }}: </strong> </p>
                <p> {{ stat.base_stat }}%</p>
              <div class="stat-bar-box">
                <div class="stat-bar">
                    <div
                        class="stat-bar-inner"
                        :style="{ width: stat.base_stat + '%', 
                        backgroundColor: 'red' }">
                    </div>
                </div>
            </div>    
          </div>
        </div>
        <div v-else-if="selectedTab === 2">
            <div class="box_evolution">
                <h2><strong>Evolution Chain:</strong></h2>
                
                <div v-if="evolution">
                   
                <div>               
                    <span v-if="evolution.min_level"> (Level: {{ evolution.min_level }})</span>
                </div>

                <div v-for="(nextEvolution, index) in evolution.evolves_to" :key="index" class="evolution-stage">

                    <div class="evolution">
                        <figure>
                            <img :src="getPokemonImage(evolution.species_id)" alt="evolution image" />
                            <figcaption>
                                {{ evolution.species_name }}
                            </figcaption>
                        </figure>
                        <strong v-if="nextEvolution"
                        class="level_up"> 
                        <p v-if="nextEvolution.min_level">Lvl: {{ nextEvolution.min_level }}</p>   
                        <p v-if="nextEvolution.min_happiness">Happiness: <br> {{ nextEvolution.min_happiness}}</p> 
                        <img v-if="nextEvolution.item" 
                        :src="nextEvolution.item.spriteUrl" :alt="nextEvolution.item.name"
                        width="28px"
                        height="33px"
                        class="item_img">
                        <p v-if="nextEvolution.item">{{ nextEvolution.item.name }}</p>                                                
                    </strong>                       
                    </div>

                    <figure>
                        <img :src="getPokemonImage(nextEvolution.species_id)" alt="next evolution image" />
                        <figcaption>
                            {{ nextEvolution.species_name }}
                        </figcaption>
                    </figure>                    

                    <div v-for="(furtherEvolution, idx) in nextEvolution.evolves_to" :key="idx" class="evolution">               
                        <strong v-if="furtherEvolution"
                        class="level_up"> 
                            <p v-if="furtherEvolution.min_level">Lvl: {{ furtherEvolution.min_level }}</p>
                            <p v-if="furtherEvolution.min_happiness">Happiness: <br> {{ furtherEvolution.min_happiness}}</p>                             
                            <img v-if="furtherEvolution.item" 
                            :src="furtherEvolution.item.spriteUrl" :alt="furtherEvolution.item.name"
                            width="28px"
                            height="33px"
                            class="item_img">
                            <p v-if="furtherEvolution.item">{{ furtherEvolution.item.name }}</p> 
                        </strong>
                        <figure>
                            <img :src="getPokemonImage(furtherEvolution.species_id)" alt="next evolution image" />
                            <figcaption>
                                {{ furtherEvolution.species_name }}
                            </figcaption>
                        </figure>
                    </div>
                </div>

                </div>
                <div v-else>
                <p>No evolution data available.</p>
                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
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
    setup(props) {
      const selectedTab = ref(0);

      const getPokemonImage = (speciesId: number) => {
        return `/src/assets/images/${speciesId.toString().padStart(3, '0')}.png`;;
     };
      
      return {
        selectedTab,
        getPokemonImage
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .tab-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #CCC;
    border-radius: 45px 45px 0 0;
    padding: 20px 0 80px 0;
    .tab-buttons {
      display: flex;
      gap: 20px;
      padding: 30px 0;
  
      button {
        border: none;
        border-radius: 5px;
        text-transform: uppercase;
        padding: 5px 25px;
        cursor: pointer;
  
        &.active {
          background-color: #e0e0e0; /* estilo ativo */
        }
      }
    }
  
    .tab-content {
      margin-top: 20px;
      width: 100%;
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
      .about {
        display: flex;
        flex-direction: column;
        color: #000;
        width: 100%;
        .abilities,
        .height,
        .weight,
        .types {
            display: flex;
            gap: 20px;
        }
      }
    .stats {
        display: grid;
        align-items: center;  
        grid-template-columns: 200px 50px 1fr;      
        width: 100%;
        justify-content: center;
        gap: 50px;
        text-align: justify;
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
    }
  
    .stat-bar {
      width: 100%;
      background-color: #e0e0e0;
      border-radius: 5px;
      overflow: hidden;
  
      .stat-bar-inner {
        height: 20px; 
        transition: width 0.3s ease-in-out; 
      }
    }

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
        h2 {
            color: #000;
        }
    }




  }
  </style>
  
  