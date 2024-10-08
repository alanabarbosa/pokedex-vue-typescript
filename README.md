# Vue Pokedex

Esta é uma aplicação de Pokedex desenvolvida com **Vue 3**, **TypeScript**, **Vite** como bundler e **Composition API**. A aplicação exibe informações sobre os Pokémon, como detalhes, habilidades e evolução.

## Tecnologias Utilizadas

- **Vue 3** (com Composition API)
- **TypeScript**
- **Vite** (para bundling)
- **Axios** (para chamadas à PokéAPI)
- **Docker** (para containerização da aplicação)

---

## Menu de Navegação

- [Iniciar com Docker](#1-iniciar-com-docker)
- [Executar Localmente com Vite](#2-executar-localmente-com-vite)

---

## Como Executar a Aplicação

### 1. Iniciar com Docker

Você pode rodar a aplicação usando Docker, o que facilitará a configuração do ambiente. Siga os passos abaixo:

#### Passos para rodar a aplicação com Docker:

1. **Construir a imagem do Docker:**
   No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t vue-pokedex .

2. **Executar o container:**
   Após a construção da imagem, execute o seguinte comando para iniciar a aplicação em um container Docker:

   ```bash
   docker run -d -p 8080:8080 -v $(pwd):/usr/app vue-pokedex 

3. **Acessar a aplicação:**
   Abra o navegador e acesse o seguinte endereço:

   ```bash
   http://localhost:8080

### 2. Executar Localmente com Vite

Se preferir executar a aplicação localmente sem Docker, você pode usar Vite para desenvolvimento:

#### Passos para executar a aplicação localmente:

1. **Instalar dependências:**
   No diretório raiz do projeto, instale as dependências usando npm:

   ```bash
   npm install

2. **Iniciar a aplicação em modo de desenvolvimento:**
  Para iniciar a aplicação em modo de desenvolvimento, rode o seguinte comando:

   ```bash
   npm run dev

3. **Acessar a aplicação:**
   Abra o navegador e acesse o seguinte endereço:

   ```bash
   http://localhost:8080
