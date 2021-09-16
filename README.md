<h1 align="center" style="color:#0091EA; font-weight:bold;">
    
  <a href="#"> POTIANUNCIOS </a>
</h1>

<p align="center">
 <a href="#ℹ%EF%B8%8F-sobre-o-projeto">Sobre</a> •
 <a href="#%EF%B8%8F-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-autores">Autores</a> •
 <a href="#-licença">Licença</a>
</p>


## ℹ️ Sobre o projeto
Uma ferramenta para divulgação e gestão de anúncios de pequenos produtores
rurais do RN, um projeto em conjunto com a [Escola Agrícola de Jundiaí](https://eaj.ufrn.br/).


## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend ([backend folder](https://github.com/brunojamelli/potianuncios-api))
2. Frontend ([frontend folder](https://github.com/brunojamelli/poti-front))

💡Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/). Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

#### 🏁 Começar
```bash

# Clone este repositório
git clone https://github.com/brunojamelli/potianuncios-api.git

# Acesse a pasta do projeto no terminal/cmd
cd potianuncios-api

```
#### 🐳 Se você não tem o docker
```bash

# baixe o instalador genérico do site oficial do docker
curl -fsSL https://get.docker.com -o get-docker.sh

# usando instalador genérico
sh get-docker.sh

```

#### 🎲 Rodando o Backend (servidor)

```bash

# Instale as dependências
npm install

# Crie o banco de dados
knex migrate:latest

# Preencha o banco de dados com dados fake para testes
knex seed:run

# Execute a aplicação 
npm start

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

### 🌐 **Backend** ([Node.js](https://nodejs.org/en/))
- **[Express](https://expressjs.com/)**
- **[Celebrate](https://github.com/arb/celebrate)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[Multer](https://github.com/expressjs/multer#readme)**
- **[@sendgrid/mail](https://sendgrid.com/)**
- **[KnexJS](http://knexjs.org/)**
- **[Pg](https://github.com/brianc/node-postgres)**
- **[Dotenv-safe](https://www.npmjs.com/package/dotenv-safe)**
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[Morgan](https://github.com/expressjs/morgan)**
- **[Pino](https://getpino.io/#/)**

> Veja o arquivo [package.json](https://github.com/brunojamelli/potianuncios-api/blob/master/package.json)

---

## 👩🏽‍💻 Autores
<table>
  <tr>
    <td align="center"><a href="https://github.com/brunojamelli"><img src="https://avatars0.githubusercontent.com/u/21262825?s=400&u=8d99e00b964f6e0eb0684b34b9094a6c6163b65e&v=4" width="100px;" alt=""/><br /><sub><b>Bruno Jamelli</b></sub></a><br /><a href="https://github.com/brunojamelli/potianuncios-api" title="Code">💻 🎨</a></td>
  <tr>
</table>

---

## 📝 Licença
This project is under MIT. See at here [LICENSE](https://github.com/brunojamelli/potianuncios-api/blob/master/LICENSE) for more informations.

---