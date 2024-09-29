<template>
  <div id="app">
    <Nav :favoriteCount="favoriteCount" />
    <div class="container">
      <router-view />
    </div>
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
      handleScroll
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #3498db;
  height: 100vh;
}

@keyframes toTop {
    0% {
        transform: translateY(-20%);
    }
    100% {
        transform: translateX(0);
    }
}



.slide-top {
    animation: toTop .3s ease normal forwards;
}

.container {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
}

h2 {
  text-transform: capitalize;
  font-size: 20px;
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
  normal: #a8a878,
  fire: #f08030,
  water: #6890f0,
  electric: #f8d030,
  grass: #78c850,
  ice: #98d8d8,
  ground: #e0c068,
  flying: #a890f0,
  ghost: #705898,
  rock: #b8a038,
  fighting: #c03028,
  poison: #a040a0,
  psychic: #f85888,
  bug: #a8b820,
  dark: #705848,
  steel: #b8b8d0,
  dragon: #7038f8,
);

// Gera as classes de tipo de Pokémon
@each $type, $color in $colors {
  .#{$type} {
    background-color: $color;
    box-shadow: 0 0 20px $color;
    color: #fff;
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
