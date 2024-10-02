<template>
    <nav  class="navigation" >
      <div class="container">
        <router-link to="/">{{ $t('pokemonHome') }}</router-link>
        <Language :languages="languages" 
        @choiceLanguage="changeLanguage"/>
        <router-link to="/favorites">
          {{ $t('favorites') }} 
            <span class="fav">{{ favoriteCount }}</span>
        </router-link>
      </div><h1>{{ t('welcome') }}</h1>  
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { languages } from '../i18n/index'
  import Language from '../components/Language.vue'; 
  
  export default defineComponent({
    name: 'Nav',
    components: {
      Language
    },
    props: {
      favoriteCount: {
        type: Number,
        required: true
      }
    },
    setup() {
      const { t, locale } = useI18n();

      const changeLanguage = (languageCode: string) => {
        locale.value = languageCode; 
      } 
      return {
        languages,
        changeLanguage,
        t
      };
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
  