<template>
    <h1>{{ title }}</h1>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'pokemon-title',
    props: {
      title: {
        type: Object,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
    h1 {
        font-size: 26px;
        text-transform: capitalize;
        color: #FFF;
    }
  </style>
  