<template>
  <div id="app">
    <Nav :favoriteCount="favoriteCount" />
    <main>
      <div class="container main_content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Nav from '../src/components/Nav.vue';
import Language from '../src/components/Language.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
    Language,
  },
  setup() {
    const { t, locale } = useI18n(); // Acessa o i18n

    const favoriteCount = ref<number>(0);
    let storedFavorites = localStorage.getItem("pokemonFavorites");

    const updateFavoriteCount = (): void => {
      const storedFavorites = localStorage.getItem("pokemonFavorites");
      const favorites: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      favoriteCount.value = favorites.length;
    };

    const changeLanguage = (languageCode: string) => {
      locale.value = languageCode; // Altera o idioma no i18n
    };

    let interval: number;

    const checkStorage = () => {
      const currentFavorites = localStorage.getItem("pokemonFavorites");
      if (currentFavorites !== storedFavorites) {
        updateFavoriteCount();
      }
    };

    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      const navigation = document.querySelector(".navigation");

      if (navigation) {
        if (scrollPosition > 3) {
          navigation.classList.add('sticky');
        } else {
          navigation.classList.remove('sticky');
        }
      }
    };

    onMounted(() => {
      updateFavoriteCount();
      interval = window.setInterval(checkStorage, 1000);
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.clearInterval(interval); 
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      favoriteCount,
      updateFavoriteCount,
      handleScroll,
      changeLanguage, // Função para mudar o idioma
    };
  }
});
</script>


<style lang="scss">
*,
body {
  margin: 0;
  padding: 0;
  
}

body {
  background-color: rgb(46, 45, 45);
}

body {
  &.dark {
      transition:  all .5s;
      background-color: #f9f9f9 !important;
      #app {
        transition:  all .5s;
        background-color: #f9f9f9 !important;
        main {
          .main_content {
            transition:  all .5s;
            background-color: #f9f9f9 !important;
            .pokemons {
              .container {
                background: #f9f9f9;
                h1,
                p{
                  color: #000 !important;
                }
                article {
                  h1 {
                    color: #FFF !important;
                  }
                }
              }
            }
          }
          .pokemon-details {
            .container {
              h1 {
                color: #000 !important;
              }
            }
          }
          .tab-nav {
            background: rgb(46, 45, 45) !important;
            .container {
              background: rgb(46, 45, 45) !important;
              .tab-content {
                h2,
                p {
                  color: #FFF !important;
                }               
              }
            }
          }
        }
      }
  }
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: rgb(46, 45, 45);
  transition:  all .5s;
  padding-bottom: 80px;
  height: 100vh;
}

@keyframes toTop {
    0% {
      opacity: 0;
      transform: translate3d(0px, -32px, 0px);
    }
    100% {
      opacity: 1;
      transform: initial;
    }
}

.button-link {
  .button-link {
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    background-color: #b31312;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .button-link:hover {
    background-color: #a31212;
  }
  
  .button-link:active {
    background-color: #a31212;
  }
}

.slide-top {
    animation: toTop 0.8s ease 0s 1 normal none running;
    margin-top: 50px;
    border-radius: 45px;
}

.container {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
}

p {
  font-size: 18px;
  text-transform: capitalize;
}

img {
  max-width: 100%;
}

img {
  max-width: 100%;
}

li {
  list-style: none;
}

// Tipos de Pokémon
$colors: (
  normal: rgba(168, 168, 120),
  fire: rgba(240, 128, 48),
  water: rgba(104, 144, 240),
  electric: rgba(248, 208, 48),
  grass: rgba(120, 200, 80),
  ice: rgba(152, 216, 216),
  ground: rgba(224, 192, 104),
  flying: rgba(168, 144, 240),
  ghost: rgba(112, 88, 152),
  rock: rgba(184, 160, 56),
  fighting: rgba(192, 48, 40),
  poison: rgba(160, 64, 160),
  psychic: rgba(248, 88, 136),
  bug: rgba(168, 184, 32),
  dark: rgba(112, 88, 72),
  steel: rgba(184, 184, 208),
  dragon: rgba(112, 56, 248),
);


// Gera as classes de tipo de Pokémon
@each $type, $color in $colors {
  .#{$type} {
    background-color: $color;
    //box-shadow: 0 8px 32px 0 $color;
   // backdrop-filter: blur( 7px );
   // -webkit-backdrop-filter: blur( 7px );
    color: $color !important;
    
  }
}
nav {
  width: 100%;
  transition: all 0.5s;
}
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all .5s;
  z-index: 1000;
}

.pokemons {
  padding-bottom: 80px;
  padding: 0 30px;
  
  .container {
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: rgb(46, 45, 45);
    transition:  all .5s;
    height: auto;
  }

  .pagination {
    grid-column: 1 / -1;
  }

  @media (max-width: 900px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
  }  
}
</style>
