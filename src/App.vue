<template>
  <div id="app">
    <Nav :favoriteCount="favoriteCount" />
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import Nav from '../src/components/Nav.vue'

export default defineComponent({
  name: 'App',
  components: {
    Nav
  },
  setup() {
    const favoriteCount = ref<number>(0);
    let storedFavorites = localStorage.getItem("pokemonFavorites");

    const updateFavoriteCount = (): void => {
      const storedFavorites = localStorage.getItem("pokemonFavorites");
      const favorites: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      favoriteCount.value = favorites.length;
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
  background-color: #161853;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #161853;
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
</style>
