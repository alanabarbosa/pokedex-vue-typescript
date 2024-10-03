import { ref } from 'vue';
import axios from 'axios';

interface EvolutionDetails {
  min_level?: number | null;
  min_happiness?: number | null;
  min_affection?: number | null;
  time_of_day?: string | null;
  species_name: string;
  evolves_to: EvolutionDetails[];
  species_id: number;
  item?: {
    name: string;
    url: string;
    spriteUrl?: string;
  };
  evolution_details?: EvolutionDetails[];
}

interface PokemonEvolution {
  species_name: string;
  min_happiness?: number | null;
  min_affection?: number | null;
  time_of_day?: string | null;
  evolves_to: EvolutionDetails[];
  species_id?: number;
  item?: {
    name: string | undefined;
    url: string | undefined;
    spriteUrl?: string;
  };
  evolution_details?: EvolutionDetails[];
}

export function usePokemonEvolution(pokemonId: number) {
  const pokemonEvolution = ref<PokemonEvolution | null>(null);

  const fetchPokemonEvolution = async (id: number) => {
    try {
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const chain = evolutionResponse.data.chain;

      console.log("chain", chain)

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
        const evolutionDetailsArray = chain.evolution_details.length > 0 ? chain.evolution_details : [];
      
        // Mapear todos os detalhes de evolução (não apenas o primeiro)
        const evolutionDetails = await Promise.all(
          evolutionDetailsArray.map(async (details: any) => {
            const itemDetails = details.item
              ? {
                  name: details.item.name,
                  url: details.item.url,
                  spriteUrl: await fetchItemSprite(details.item.url),
                }
              : undefined;
      
            return {
              min_level: details.min_level || undefined,
              min_happiness: details.min_happiness || undefined,
              min_affection: details.min_affection || undefined,
              time_of_day: details.time_of_day || undefined,
              item: itemDetails,
            };
          })
        );
      
        return {
          species_name: chain.species.name,
          evolves_to: await Promise.all(chain.evolves_to.map((evolution: any) => mapEvolutionChain(evolution))),
          species_id: getSpeciesId(chain.species.url),
          evolution_details: evolutionDetails,
        };
      };
      

      pokemonEvolution.value = {
        species_name: chain.species.name,
        evolves_to: await Promise.all(chain.evolves_to.map((evolution: any) => mapEvolutionChain(evolution))),
        species_id: getSpeciesId(chain.species.url),
        evolution_details: await Promise.all(chain.evolution_details.map((details: any) => mapEvolutionChain(details))),
      };

      console.log(pokemonEvolution.value);

    } catch (error) {
      console.error('Erro ao buscar evolução do Pokémon:', error);
    }
  };

  fetchPokemonEvolution(pokemonId);

  return {
    pokemonEvolution,
  };
}
