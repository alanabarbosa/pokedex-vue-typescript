import { createI18n } from 'vue-i18n'; // Corrigido o import
import { usePokemons } from '../composables/usePokemon'; // Corrija o caminho conforme necessário

const messages = {
  en: {
    welcome: "Welcome to the Pokédex",
    pokemonDetails: "Pokemon Details",
    favorite: "Favorite",
    showDetails: "Show Details",
    noPokemon: "No Pokemon",
    pokemonHome: "Pokédex Home",
    favorites: "Favorites",
    types: {}
  },
  pt: {
    welcome: "Bem-vindo à Pokédex",
    pokemonDetails: "Detalhes do Pokémon",
    favorite: "Favorito",
    showDetails: "Exibir Detalhes",
    noPokemon: "Não existem pokémons",
    pokemonHome: "Pokédex Inicio",
    favorites: "Favoritos",
    types: {} // Espaço reservado para os tipos de Pokémon em português
  },
};

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Português', code: 'pt' },
];

const updatePokemonTypes = async () => {
    const { fetchPokemonTypes, types } = usePokemons();
  
    // Aguardamos a função assíncrona para buscar os tipos
    await fetchPokemonTypes();
  
    const typeNames = types.value.map((type) => type.name);
  
    // Preenchendo os tipos dinamicamente nas mensagens
    typeNames.forEach((type) => {
      messages.en.types[type] = type.charAt(0).toUpperCase() + type.slice(1); // Exemplo: "fire" -> "Fire"
      
      // Aqui você deve fornecer o nome traduzido do tipo
      const translatedType = translateTypeToPortuguese(type);
      messages.pt.types[type] = translatedType; // Exemplo: "fire" -> "Fogo"
    });
  
    console.log(messages);
  };
  
  // Função para traduzir os tipos de Pokémon para o português
  const translateTypeToPortuguese = (type: string): string => {
    const translations: Record<string, string> = {
      normal: 'Normal',
      fighting: 'Lutador',
      flying: 'Voador',
      poison: 'Venenoso',
      ground: 'Terrestre',
      rock: 'Pedra',
      bug: 'Inseto',
      ghost: 'Fantasma',
      steel: 'Aço',
      fire: 'Fogo',
      water: 'Água',
      grass: 'Grama',
      electric: 'Elétrico',
      psychic: 'Psíquico',
      ice: 'Gelo',
      dragon: 'Dragão',
      dark: 'Sombrio',
      fairy: 'Fada',
    };
    
    return translations[type] || type.charAt(0).toUpperCase() + type.slice(1); // Se não encontrado, retorna o nome do tipo em inglês com primeira maiúscula
  };

// Atualizamos os tipos antes de instanciar o i18n
await updatePokemonTypes();

// Agora, instanciamos o i18n com os tipos já atualizados
const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages, 
});

// Exporte as variáveis agora que tudo foi carregado
export default i18n;
export { languages };
