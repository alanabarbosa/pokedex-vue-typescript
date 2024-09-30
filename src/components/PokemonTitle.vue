<template>
    <h1>{{ title }}</h1>
  </template>
  
  <script>
  export default {
    name: "pokemon-title",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
    h1 {
        font-size: 26px;
        text-transform: capitalize;
    }
  </style>
  