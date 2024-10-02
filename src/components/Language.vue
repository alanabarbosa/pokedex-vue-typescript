<template>
    <section class="languages">
      <select @change="handleSelect" v-model="selectedLanguage">
        <option value="" hidden>Select your language</option>
        <option v-for="(lang, index) in languages" 
                :key="index" 
                :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      languages: {
        type: Array as () => { name: string; code: string }[],
        required: true,
      },
    },
    setup(props, { emit }) {
      const selectedLanguage = ref<string>('');
  
      const handleSelect = () => {
        // Emit a custom event to change the language in the parent component
        emit('choiceLanguage', selectedLanguage.value);
      };
  
      return {
        selectedLanguage,
        handleSelect,
      };
    },
  });
  </script>
  
  <style scoped lang="scss">
  .languages {
    width: 100%;
    select {
      width: 200px;
      padding: 10px;
      font-size: 16px;
    }
  }
  </style>
  