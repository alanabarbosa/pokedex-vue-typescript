<template>
    <div class="types">
        <p v-for="type in types" :key="type.type.name" :class="type.type.name">
            {{ type.type.name }}
        </p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    types: {
      type: Array as () => Array<{ type: { name: string } }>,
      required: true,
    },
  },
});
</script>
  
<style scoped lang="scss">
.types {
    display: flex;
    justify-content: center;
    gap: 20px;

    p {
        border-radius: 50px;
        padding: 5px 20px;
        border: 1px solid #FFF;
        color: #FFF !important;
    }
}
</style>
