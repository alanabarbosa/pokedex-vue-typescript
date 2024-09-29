// src/composables/usePokemons.ts
import { ref, computed } from 'vue';
import axios from './services/pokemonService';

interface Pokemon {
    name: string;
    id: number;
    image: string;
    type: any;
}

interface SelectedPokemon extends Pokemon {
    abilities: any;
    height: number;
    weight: number;
    stats: any;
}

interface PokemonSpecies {
    
}

export function usePokemons() {
    const pokemons = ref<Pokemon[]>([]);
    const idPokemon = ref<number | null>(null);
    const selectedPokemon = ref<SelectedPokemon | null>(null);
    const pokemonSpecies = ref<PokemonSpecies | null>(null);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('pokemon?limit=50&offset=0');
            const pokemonsData = await Promise.all(
                response.data.results.map(async (pokemon: { name: string; url: string }) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    const formattedId = detailsResponse.data.id.toString().padStart(3, '0');   
                    return {
                        name: pokemon.name,
                        id: detailsResponse.data.id,
                        image: `/images/${formattedId}.png`,
                        type: detailsResponse.data.types,
                    };
                })
            );
            pokemons.value = pokemonsData;
            // esse console nao aparece no navegador
            console.log(pokemons.value)
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const fetchPokemonDetails = async (name: string) => {
        try {
            const response = await axios.get(`pokemon/${name}`);
            const formattedId = response.data.id.toString().padStart(3, '0');
            selectedPokemon.value = {
                name: response.data.name,
                id: response.data.id,
                image: `/images/${formattedId}.png`,
                type: response.data.types,
                abilities: response.data.abilities,
                height: response.data.height,
                weight: response.data.weight,
                stats: response.data.stats,
            };

            idPokemon.value = response.data.id;
            await fetchPokemonSpecies();
        } catch (error) {
            console.error('Erro ao buscar detalhes do pokemon', error);
        }
    };

    const fetchPokemonSpecies = async () => {
        try {
            if (idPokemon.value) {
                const response = await axios.get(`pokemon-species/${idPokemon.value}/`);
                pokemonSpecies.value = response.data;
            } else {
                console.error('ID do Pokémon não definido.');
            }
        } catch (error) {
            console.error('Erro ao buscar espécies do Pokémon:', error);
        }
    };

    const getPokemons = computed(() => pokemons.value);
    const getSelectedPokemon = computed(() => selectedPokemon.value);
    const getPokemonSpecies = computed(() => pokemonSpecies.value);

    return {
        pokemons,
        idPokemon,
        selectedPokemon,
        pokemonSpecies,
        fetchPokemons,
        fetchPokemonDetails,
        fetchPokemonSpecies,
        getPokemons,
        getSelectedPokemon,
        getPokemonSpecies,
    };
}
