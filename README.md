# Vue Pokedex

Esta é uma aplicação de Pokedex desenvolvida com **Vue.js** utilizando **Vite** como bundler. A aplicação exibe informações sobre os Pokémon, como detalhes, habilidades e evolução.

## Tecnologias Utilizadas

- **Vue.js** (com Vite)
- **Axios** (para chamadas à PokéAPI)
- **Docker** (para containerização da aplicação)

## Como Executar a Aplicação

### 1. Iniciar com Docker

Você pode rodar a aplicação usando Docker, o que facilitará a configuração do ambiente. Siga os passos abaixo:

#### Passos para rodar a aplicação com Docker:

1. **Construir a imagem do Docker:**
   No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t vue-pokedex .
