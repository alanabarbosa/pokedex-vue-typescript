import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stat[];
  type: Type[];
  image: string;
}


export function usePokemonDetails() {
  const pokemon = ref<Pokemon | null>(null);
  const route = useRoute();

  const fetchPokemonDetails = async (name: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);   
      
      pokemon.value = {
        ...response.data,
        id: response.data.id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
      };
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
  };

  const fetchPokemonEvolution = () => {
    console.log('aqui')
  }

  const calculatePercentage = (baseStat: number): number => {
    const maxStat = 255;
    return (baseStat / maxStat) * 100;
  };

  onMounted(() => {
    const pokemonName = route.params.name as string;
    fetchPokemonDetails(pokemonName);
  });

  return {
    pokemon,
    calculatePercentage,
    fetchPokemonEvolution
  };
}
