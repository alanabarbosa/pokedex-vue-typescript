<template>
    <span>
        {{ '#' + id }}
    </span>
  </template>
  
  <script>
  export default {
    name: "pokemon-id",
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
    span {
        border-radius: 10px;
        width: 20%;
        padding: 2px;
    }
  </style>
  