import { ref } from 'vue';
import axios from 'axios';

interface EvolutionDetails {
  min_level?: number | null;
  min_happiness?: number | null;
  species_name: string;
  evolves_to: EvolutionDetails[];
  species_id: number;
  item?: {
    name: string;
    url: string;
    spriteUrl?: string;
  };
}

interface PokemonEvolution {
  species_name: string;
  min_happiness?: number | null;
  evolves_to: EvolutionDetails[];
  species_id?: number;  
  item?: {
    name: string;
    url: string;
    spriteUrl?: string; 
  };
}


export function usePokemonEvolution(pokemonId: number) {
  const pokemonEvolution = ref<PokemonEvolution | null>(null);

  const fetchPokemonEvolution = async (id: number) => {
    try {
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const chain = evolutionResponse.data.chain;

      const getSpeciesId = (speciesUrl: string): number => {
        return Number(speciesUrl.split('/').slice(-2, -1)[0]);
      };

      const fetchItemSprite = async (itemUrl: string) => {
        try {
          const itemResponse = await axios.get(itemUrl);
          const spriteUrl = itemResponse.data.sprites.default;
          return spriteUrl;
        } catch (error) {
          console.error('Erro ao buscar sprite do item:', error);
          return undefined;
        }
      };

      const mapEvolutionChain = async (chain: any): Promise<EvolutionDetails> => {
        const itemDetails = chain.evolution_details.length > 0 && chain.evolution_details[0].item
          ? {
              name: chain.evolution_details[0].item.name,
              url: chain.evolution_details[0].item.url,
              spriteUrl: await fetchItemSprite(chain.evolution_details[0].item.url)
            }
          : undefined;

        return {
          species_name: chain.species.name,
          min_level: chain.evolution_details.length > 0 ? chain.evolution_details[0].min_level : undefined,
          min_happiness: chain.evolution_details.length > 0 ? chain.evolution_details[0].min_happiness : undefined,
          evolves_to: await Promise.all(chain.evolves_to.map((evolution: any) => mapEvolutionChain(evolution))),
          species_id: getSpeciesId(chain.species.url),
          item: itemDetails,
        };
      };

      pokemonEvolution.value = {
        species_name: chain.species.name,
        evolves_to: await Promise.all(chain.evolves_to.map((evolution: any) => mapEvolutionChain(evolution))),
        species_id: getSpeciesId(chain.species.url),
      };

      console.log('Evolução do Pokémon:', pokemonEvolution.value);
      
    } catch (error) {
      console.error('Erro ao buscar evolução do Pokémon:', error);
    }
  };

  fetchPokemonEvolution(pokemonId);

  return {
    pokemonEvolution,
  };
}
