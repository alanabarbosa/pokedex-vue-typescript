<template>
    <section class="pagination">
        <ul>
            <li v-for="pag in pages" :key="pag">
                <button 
                    :class="{ active: pag === page }" 
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
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  emits: ['changePage'],

  setup(props, { emit }) {
    const limit = 50; // Limite de pokémons por página

    const totalPages = computed(() => {
      return Math.ceil(props.total / limit); // Número total de páginas
    });

    const pages = computed(() => {
      const current = props.page;
      const range = 9;
      const offset = Math.floor(range / 2);
      const pagesArray = [];

  
      const start = Math.max(1, current - offset);
      const end = Math.min(totalPages.value, start + range - 1);

      for (let i = start; i <= end; i++) {
        pagesArray.push(i);
      }

      return pagesArray;
    });

    const goToPage = (pageNumber: number) => {
      emit('changePage', pageNumber);
    };

    return {
      pages,
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
                background-color: #a31212
            }

            &.active {
                background-color: #8b0000;
                font-weight: bold; /* Para destacar o botão ativo */
            }
        }
    }
}
</style>