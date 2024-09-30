<!-- About.vue -->
<template>
    <section class="about">
      <div class="abilities">
        <p><strong>Abilities:</strong></p>
        <div v-for="(item) in abilities" :key="item.ability.name">
          <span>{{ item.ability.name }}</span>
        </div>
      </div>
  
      <div class="height">
        <p><strong>Height:</strong></p>
        <span>{{ height / 10 }}cm</span>
      </div>
  
      <div class="weight">
        <p><strong>Weight:</strong></p>
        <span>{{ weight / 10 }}kg</span>
      </div>
  
      <div class="types">
        <p><strong>Type:</strong></p>
        <div v-for="(type) in types" :key="type.type.name">
          <span :class="type.type.name">{{ type.type.name }}</span>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      abilities: {
        type: Array as () => Array<{ ability: { name: string } }>,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      types: {
        type: Array as () => Array<{ type: { name: string } }>,
        required: true,
      },
    },
  });
  </script>

  <style lang="scss" scoped>
    .about {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #000;
        width: 100%;
        width: 32%;
        margin: 0 auto;
        .abilities,
        .height,
        .weight,
        .types {
            display: flex;
            gap: 20px;
            justify-content: space-between;
        }
    }
</style>
  