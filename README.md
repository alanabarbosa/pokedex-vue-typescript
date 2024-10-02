# Vue Pokedex

Esta é uma aplicação de Pokedex desenvolvida com **Vue.js** utilizando **Vite** como bundler. A aplicação exibe informações sobre os Pokémon, como detalhes, habilidades e evolução.

## Tecnologias Utilizadas

- **Vue.js** (com Vite)
- **Axios** (para chamadas à PokéAPI)
- **Docker** (para containerização da aplicação)

## Como Executar a Aplicação

### 2. Iniciar com Docker

Você pode rodar a aplicação usando Docker, o que facilitará a configuração do ambiente. Siga os passos abaixo:

#### Passos para rodar a aplicação com Docker:

1. **Construir a imagem do Docker:**
   No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t vue-pokedex .

2. **Executar o container:**
   Após a construção da imagem, execute o seguinte comando para iniciar a aplicação em um container Docker:

   ```bash
   docker run -d -p 8080:8080 vue-pokedex  

3. **Acessar a aplicação:**
   Abra o navegador e acesse o seguinte endereço:

   ```bash
   http://localhost:8080

### 2. Executar Localmente com Vite

Se preferir executar a aplicação localmente sem Docker, você pode usar Vite para desenvolvimento:

1. **Instalar dependências:**
   No diretório raiz do projeto, instale as dependências usando npm:

   ```bash
   npm install

2. **Iniciar a aplicação em modo de desenvolvimento:**
  Após iniciar o servidor de desenvolvimento, abra o navegador e acesse o seguinte endereço:

   ```bash
   npm run dev

3. **Acessar a aplicação:**
   Abra o navegador e acesse o seguinte endereço:

   ```bash
   http://localhost:5173