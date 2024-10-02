import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

interface Pokemon {
  name: string;
  id: number;
  image: string;
  types: { type: { name: string } }[];
  color?: string;
  total: number;
  count: number;
}

interface Type {
  name: string;
  url: string;
}

export function usePokemons() {
  const pokemons = ref<Pokemon[]>([]);
  const totalPokemons = ref(0);
  const types = ref<Type[]>([]);
  const currentPage = ref(1);
  const limit = 50;
  const selectedTypes = ref<string[]>([]);
  const filteredPokemons = ref<Pokemon[]>([]);

  const fetchPokemons = async (page = 1, selectedType: string | null = null) => {
    try {
      if (selectedType) {    
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
        
        // Armazena todos os pokémons filtrados
        filteredPokemons.value = await Promise.all(
          response.data.pokemon.map(async (pokemonData: { pokemon: { name: string; url: string } }) => {
            const pokemon = pokemonData.pokemon;
            const detailsResponse = await axios.get(pokemon.url);
            const speciesUrl = detailsResponse.data.species.url;
            const speciesResponse = await axios.get(speciesUrl);
            const color = speciesResponse.data.color.name;

            return {
              name: pokemon.name,
              id: detailsResponse.data.id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailsResponse.data.id}.png`,
              types: detailsResponse.data.types,
              color: color,
            };
          })
        );

        // Define o total de pokémons filtrados
        totalPokemons.value = filteredPokemons.value.length;

        // Atualiza os pokémons a serem exibidos de acordo com a página
        const offset = (page - 1) * limit;
        pokemons.value = filteredPokemons.value.slice(offset, offset + limit);
      } else {
        const offset = (page - 1) * limit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        totalPokemons.value = response.data.count;

        const pokemonsData = await Promise.all(
          response.data.results.map(async (pokemon: { name: string; url: string }) => {
            const detailsResponse = await axios.get(pokemon.url);
            const speciesUrl = detailsResponse.data.species.url;
            const speciesResponse = await axios.get(speciesUrl);
            const color = speciesResponse.data.color.name;

            return {
              name: pokemon.name,
              id: detailsResponse.data.id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailsResponse.data.id}.png`,
              types: detailsResponse.data.types,
              color: color,
            };
          })
        );

        pokemons.value = pokemonsData;
      }
    } catch (error) {
      console.error('Erro ao buscar os Pokémons:', error);
    }
  };

  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      types.value = response.data.results.filter((item) => item.name !== 'unknown' && item.name !== 'stellar');
    } catch (error) {
      console.error('Erro ao buscar tipos de Pokémon:', error);
    }
  };

  onMounted(() => {
    fetchPokemons(currentPage.value);
    fetchPokemonTypes();
  });

  return {
    pokemons,
    totalPokemons,
    fetchPokemons,
    currentPage,
    types,
    selectedTypes,
  };
}
