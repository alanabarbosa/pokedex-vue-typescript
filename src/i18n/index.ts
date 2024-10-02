import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: "Welcome to the Pokédex",
    pokemonDetails: "Pokemon Details",
    favorite: "Favorite",
  },
  pt: {
    welcome: "Bem-vindo à Pokédex",
    pokemonDetails: "Detalhes do Pokémon",
    favorite: "Favorito",
  },
};

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Português', code: 'pt' },
];

const i18n = createI18n({
    legacy: true,
    locale: 'en',
    messages, 
});

export default i18n;
export { languages };
