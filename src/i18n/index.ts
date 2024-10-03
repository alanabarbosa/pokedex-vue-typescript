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
        types: {},
        abilities_title: "Abilities",
        abilities: {
            overgrow: "Overgrow",
            chlorophyll: "Chlorophyll",
            blaze: "Blaze",
            "solar-power": "Solar Power",
            torrent: "Torrent",
            "rain-dish": "Rain Dish",
            "shield-dust": "Shield Dust",
            "run-away": "Run Away",
            "shed-skin": "Shed Skin",
            "compound-eyes": "Compound Eyes",
            "tinted-lens": "Tinted Lens",
            swarm: "Swarm",
            sniper: "Sniper",
            "keen-eye": "Keen Eye",
            "tangled-feet": "Tangled Feet",
            "big-pecks": "Big Pecks",
            guts: "Guts",
            hustle: "Hustle",
            intimidate: "Intimidate",
            unnerve: "Unnerve",
            static: "Static",
            "lightning-rod": "Lightning Rod",
            "sand-veil": "Sand Veil",
            "sand-rush": "Sand Rush",
            "poison-point": "Poison Point",
            rivalry: "Rivalry",
            "sheer-force": "Sheer Force",
            "cute-charm": "Cute Charm",
            "magic-guard": "Magic Guard",
            "friend-guard": "Friend Guard",
            unaware: "Unaware",
            "flash-fire": "Flash Fire",
            drought: "Drought",
            competitive: "Competitive",
            frisk: "Frisk",
            "inner-focus": "Inner Focus",
            infiltrator: "Infiltrator",
            stench: "Stench",
            "effect-spore": "Effect Spore",
            "dry-skin": "Dry Skin",
            damp: "Damp",
            "wonder-skin": "Wonder Skin",
            "arena-trap": "Arena Trap",
            "sand-force": "Sand Force",
        },        
        height_title: "Height",
        weight_title: "Weight",
        type: "Types",
        about: "About",
        stats: "Stats",
        evolution: "Evolution",
        stats_name: {
            hp: "Health Points",
            attack: "Attack",
            defense: "Defense",
            "special-attack": "Special Attack",
            "special-defense": "Special Defense",
            speed: "Speed",
        },
        evolution_chain: "Evolution Chain",
        min_happiness: "Happiness",
        moon_stone: "Moon-Stone"
    },
    pt: {
        welcome: "Bem-vindo à Pokédex",
        pokemonDetails: "Detalhes do Pokémon",
        favorite: "Favorito",
        showDetails: "Exibir Detalhes",
        noPokemon: "Não existem pokémons",
        pokemonHome: "Pokédex Inicio",
        favorites: "Favoritos",
        types: {},
        abilities_title: "Habilidades",
        abilities: {
            overgrow: "Crescimento Aumentado",
            chlorophyll: "Clorofila",
            blaze: "Chama",
            "solar-power": "Poder Solar",
            torrent: "Torrent",
            "rain-dish": "Chuva",
            "shield-dust": "Pó Protetor",
            "run-away": "Fuga",
            "shed-skin": "Desprendimento de Pele",
            "compound-eyes": "Olhos Compostos",
            "tinted-lens": "Lentes Coradas",
            swarm: "Enxame",
            sniper: "Atirador",
            "keen-eye": "Olho Afiado",
            "tangled-feet": "Pés Emaranhados",
            "big-pecks": "Peito Grande",
            guts: "Entrando com Tudo",
            hustle: "Esforço",
            intimidate: "Intimidação",
            unnerve: "Desconforto",
            static: "Estático",
            "lightning-rod": "Condutor",
            "sand-veil": "Véu de Areia",
            "sand-rush": "Corrida na Areia",
            "poison-point": "Ponto de Veneno",
            rivalry: "Rivalidade",
            "sheer-force": "Força Bruta",
            "cute-charm": "Charme Fofo",
            "magic-guard": "Guarda Mágica",
            "friend-guard": "Guarda de Amigo",
            unaware: "Inconsciente",
            "flash-fire": "Chama Ardente",
            drought: "Seca",
            competitive: "Competitivo",
            frisk: "Revistamento",
            "inner-focus": "Foco Interno",
            infiltrator: "Infiltrador",
            stench: "Fedor",
            "effect-spore": "Esporo de Efeito",
            "dry-skin": "Pele Seca",
            damp: "Úmido",
            "wonder-skin": "Pele Maravilha",
            "arena-trap": "Armadilha de Arena",
            "sand-force": "Força da Areia",
        }, 
        height_title: "Altura",
        weight_title: "Peso",
        type: "Tipos",
        about: "Sobre",
        stats: "Estatísticas",
        evolution: "Evolução",
        stats_name: {
            hp: "Pontos de Vida",
            attack: "Ataque",
            defense: "Defesa",
            "special-attack": "Ataque Especial",
            "special-defense": "Defesa Especial",
            speed: "Velocidade",
        },
        evolution_chain: "Cadeia de Evolução",
        min_happiness: "Felicidade",
        moon_stone: "Pedra da lua"
    }
};


const languages = [
  { name: 'English', code: 'en' },
  { name: 'Português', code: 'pt' },
];

const updatePokemonTypes = async () => {
    const { fetchPokemonTypes, types } = usePokemons(); 
    await fetchPokemonTypes();  
    const typeNames = types.value.map((type) => type.name);    
    typeNames.forEach((type) => {
    messages.en.types[type] = type.charAt(0).toUpperCase() + type.slice(1);      
        const translatedType = translateTypeToPortuguese(type);
        messages.pt.types[type] = translatedType; 
    });
}; 


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

return translations[type] || type.charAt(0).toUpperCase() + type.slice(1); 
};


await updatePokemonTypes();

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages, 
});

export default i18n;
export { languages };
