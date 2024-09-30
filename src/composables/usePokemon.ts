import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Pokemon {
  name: string;
  id: number;
  image: string;
  type: { type: { name: string } }[];
  color?: string;
  total: number
}

interface Type {
  name: string;
  url: string;
}

export function usePokemons() {
  const pokemons = ref<Pokemon[]>([]);
  const allPokemons = ref<Pokemon[]>([]);
  const totalPokemons = ref(0); 
  const types = ref<Type[]>([]); 

  const fetchAllPokemons = async () => {
    try {
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=50';
      while (nextUrl) {
        const response = await axios.get(nextUrl);
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
              total: totalPokemons.value,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailsResponse.data.id}.png`,
              type: detailsResponse.data.types,
              color: color
            };
          })
        );

        allPokemons.value.push(...pokemonsData);
        nextUrl = response.data.next;
      }

      //await getSpecies();
    } catch (error) {
      console.error('Erro ao buscar todos os Pokémons:', error);
    }
  };

 /* const getSpecies = async () => {
    for (const pokemon of allPokemons.value) {
      if (pokemon) {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=100/${pokemon.id}/`);
          if (response.data) pokemon.color = response.data.color.name;
          console.log(pokemon)
        } catch (error) {
          console.error(`Erro ao carregar a espécie do Pokémon ID ${pokemon.id}:`, error);
          // Continuar carregando os demais Pokémons mesmo em caso de erro
        }
      }
    }
  };*/

  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      types.value = response.data.results;
    } catch (error) {
      console.error('Erro ao buscar tipos de Pokémon:', error);
    }
  };

  onMounted(() => {
    fetchAllPokemons();
    fetchPokemonTypes();
  });

  return {
    pokemons: allPokemons,
    totalPokemons,
    fetchPokemonTypes,
    types
  };
}

