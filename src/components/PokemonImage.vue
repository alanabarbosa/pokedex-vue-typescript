<template>
    <div>
        <img v-if="image" :src="`${image}`" :alt="alt" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
        type: String,
        required: true,
    }
  },
});
</script>
  
<style scoped lang="scss">
    img {
        max-width: 100%;
    }
</style>
