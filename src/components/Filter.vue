<template>
    <section id="filters">
      <select @change="handleSelect" v-model="selectedType">
        <option value="" hidden>Filter By Type</option>
        <option v-for="(type, index) in types" :key="index" :value="type.name">{{ type.name }}</option>
      </select>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
        types: {
        type: Array as () => { name: string; url: string; }[], 
        required: true,
        },
    },
    setup(props, { emit }) {
        const selectedType = ref('');  

        const handleSelect = () => {
        emit('filterPokemons', selectedType.value); 
        };

        return {
        selectedType,
        handleSelect,
        };
    },
  });
  </script>
  
  <style scoped lang="scss">
  /* Estilos para o componente */
  option{
    text-transform: capitalize;
  }
  </style>
  