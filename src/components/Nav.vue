<template>
    <nav  class="navigation" >
      <div class="container">
        <router-link to="/">Pokédex Home</router-link>
        <router-link to="/favorites">
            Favorites 
            <span class="fav">{{ favoriteCount }}</span>
        </router-link>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Nav',
    props: {
      favoriteCount: {
        type: Number,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  nav {
    display: flex;
    gap: 20px;
    background: #b31312;
    flex-wrap: wrap;
    .container {
        display: flex;
        padding: 0 30px;
        justify-content: space-between
    }
  
    a {
      font-weight: bold;
      color: #ffff;
      padding: 30px;
      text-transform: uppercase;
      text-decoration: none;
  
      &.router-link-exact-active {
        color: yellow;
      }
    }
  }
  </style>
  