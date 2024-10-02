import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

interface Pokemon {
  name: string;
  id: number;
  image: string;
  types: { type: { name: string } }[];
  color?: string;
  total: number;
}

interface Type {
  name: string;
  url: string;
}

export function usePokemonFavorites() {
  const favorites = ref<number[]>(JSON.parse(localStorage.getItem("pokemonFavorites") || "[]"));
  const favoritePokemons = ref<Pokemon[]>([]);
  const totalPokemons = ref(0);
  const types = ref<Type[]>([]);

  const fetchFavoritePokemons = async () => {
    try {
      const pokemonsData = await Promise.all(
        favorites.value.map(async (id) => {
          const detailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const speciesUrl = detailsResponse.data.species.url;
          const speciesResponse = await axios.get(speciesUrl);
          const color = speciesResponse.data.color.name;

          return {
            name: detailsResponse.data.name,
            id: detailsResponse.data.id,
            total: totalPokemons.value,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailsResponse.data.id}.png`,
            types: detailsResponse.data.types,
            color: color,
          };
        })
      );

      favoritePokemons.value = pokemonsData;
    } catch (error) {
      console.error('Erro ao buscar Pokémons favoritos:', error);
    }
  };

  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      types.value = response.data.results.filter((type: Type) => type.name !== 'unknown');
    } catch (error) {
      console.error('Erro ao buscar tipos de Pokémon:', error);
    }
  };

  onMounted(() => {
    fetchFavoritePokemons();
    fetchPokemonTypes();
  });

  watch(favorites, () => {
    fetchFavoritePokemons(); 
  });

  return {
    favoritePokemons,
    totalPokemons,
    fetchPokemonTypes,
    types,
    favorites,
  };
}
