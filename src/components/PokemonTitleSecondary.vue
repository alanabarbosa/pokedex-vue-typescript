<template>
    <h2>{{ titleSecondary }}</h2>
  </template>
  
  <script>
  export default {
    name: "pokemon-title",
    props: {
        titleSecondary: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
    h2 {
        font-size: 20px;
        text-transform: capitalize;
    }
  </style>
  