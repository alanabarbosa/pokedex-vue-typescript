<template>
  <section class="filters">
    <select @change="handleSelect" v-model="selectedType">
      <option value="" hidden>Filter By Type</option>
      <option v-for="(type, index) in types" :key="index" :value="type.name">{{ type.name }}</option>
    </select>
    <button @click="removeFilter" class="button-link">
      Limpar Filtros
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ButtonLink from './ButtonLink.vue';

export default defineComponent({
  components: {
    ButtonLink
  },
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

    const removeFilter = () => {
      selectedType.value = ''; 
      emit('filterPokemons', ''); 
    };

    return {
      selectedType,
      handleSelect,
      removeFilter, 
    };
  },
});
</script>


<style scoped lang="scss">
.filters {
  width: 100%;
  grid-column: 1 /-1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  select {
    border-radius: 5px;
    width: 18%;
    height: 30px;
    cursor: pointer;
    border: 1px solid #b31312;
    background-color: #f9f9f9;
    option {
      text-transform: capitalize;
    }
  }   
  .button-link {
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    background-color: #b31312;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    width: 13%;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
  }

  .button-link:hover {
    background-color: #a31212;
  }

  .button-link:active {
    background-color: #a31212;
  }  
}
</style>
