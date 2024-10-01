<template>
    <p>{{ text }}</p>
  </template>
  
  <script>
  export default {
    name: "pokemon-text",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
    p {
        font-size: 18px;
        text-transform: capitalize;
        color: #000;
    }
  </style>
  