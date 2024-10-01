<template>
  <section class="pagination">
    <ul>
      <li v-for="pag in visiblePages" :key="pag">
        <button
          :class="{ active: pag === currentPage }"
          @click="goToPage(pag)"
        >
          {{ pag }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    pokemonsTotal: {
      type: Number,
      required: true
    },
    pokemonPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['changePage'],

  setup(props, { emit }) {
    const totalPages = computed(() => {
      const total = props.pokemonsTotal / props.pokemonPage;
      return total !== Infinity ? Math.ceil(total) : 0;
    });

    const visiblePages = computed(() => {
      const pages = [];
      const startPage = Math.max(1, props.currentPage - 4);
      const endPage = Math.min(totalPages.value, startPage + 8);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    });

    const goToPage = (pageNumber: number) => {
      emit('changePage', pageNumber);
    };

    return {
      visiblePages,
      goToPage,
      totalPages
    };
  }
});
</script>

<style scoped lang="scss">
.pagination {
    display: flex;

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        margin: 0 auto;
        padding: 0;
        list-style-type: none; 

        button {
            border: none;
            background: none;
            background-color: #b31312;
            color: #FFF;
            padding: 5px 10px;
            cursor: pointer;

            &:hover {
                background-color: #a31212;
            }

            &.active {
                background-color: #8b0000;
                font-weight: bold;
            }
        }
    }
}
</style>
