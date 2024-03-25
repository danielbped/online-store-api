# Online Store

Trata-se da API de uma simulação de uma loja virtual, onde é possível cadastrar novos usuários, realizar login, adicionar e remover produtoas aos favoritos e visualizar produtos.

### Shopify

A API em questão utilizou a API da [Shopify](https://shopify.dev/docs) como provedora da listagem de produtos e seus devidos detalhes.

# Sumário
- [Licença](#licenca)
- [Tecnologias utilizadas](#tecnologias)
- [Instruções para rodar o projeto](#instrucoes)
  - [.env](#env)
  - [Iniciando o projeto](#start)
  - [Rotas e autenticação](#rotas)

# Licença <a name="licença"></a>

Este projeto está sob licença do [MIT](https://github.com/danielbped/online-store-api/blob/master/LICENSE)

## Tecnologias Utilizadas <a name="tecnologias"></a>
- **[Node.js](https://nodejs.org/en/)**: Plataforma de desenvolvimento para construção do ambiente de servidor.
- **[Express](https://expressjs.com/pt-br/)**: Framework web para Node.js utilizado na construção da API.
- **[TypeScript](https://www.typescriptlang.org/)**: Linguagem de programação que adiciona tipagem estática ao JavaScript, proporcionando maior robustez ao código.
- **[TypeORM](https://typeorm.io/)**: ORM (Object-Relational Mapping) para TypeScript e JavaScript que simplifica o acesso e manipulação de banco de dados relacionais.
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados da aplicação.
- **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises para fazer requisições HTTP tanto do navegador quanto do Node.js.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Biblioteca para hashing de senhas utilizada para armazenar senhas de forma segura.
- **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Implementação de JSON Web Tokens (JWT) para autenticação de usuários.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: Módulo que carrega variáveis de ambiente a partir de um arquivo .env para o processo do Node.js.
- **[Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)**: Middleware para Express que habilita o controle de acesso HTTP (CORS).
- **[Http](https://www.npmjs.com/package/http-status-codes)**: Status Codes: Pacote que fornece uma lista de constantes para códigos de status HTTP.
- **[Jest](https://jestjs.io/pt-BR/)**: Framework de teste em JavaScript com foco na simplicidade.
- **[Supertest](https://www.npmjs.com/package/supertest)**: Biblioteca utilizada para testar APIs HTTP.
- **[Uuidv4](https://www.npmjs.com/package/uuidv4)**: Pacote para geração de UUIDs (identificadores únicos universais) versão 4.
- **[Docker](https://docs.docker.com/compose/)**: Uma ferramenta para definir e executar aplicações multi-contêineres. É a chave para desbloquear uma experiência de desenvolvimento e implantação simplificada e eficiente.
- **[Swagger](https://swagger.io/)**: Ferramente utilizada para criar documentações exemplificando a utilização das rotas, de uma forma prática.

## Instruções para rodar o projeto <a name="instrucoes"></a>

### Será necessário ter instalado na sua máquina:

```
  Git
  Node v20.11.1
  Docker
```

- Clone o repositório com o comando git clone:

```
  git clone git@github.com:danielbped/online-store-api.git
```

- Entre no diretório que acabou de ser criado:

```
  cd online-store-api
```
- Para o projeto funcionar na sua máquia, será necessário instalar suas dependências, para isso, utilize npm install:
```
  npm install
```

Outro passo importante é instanciarmos o banco de dados. Para isso, foi criado um arquivo **docker-compose** para gerar uma banco de dados local, o banco de dados utilizado é com a linguagem de consulta **PostgreSQL**. Então, para instanciar o banco de dados, basta rodar o comando abaixo no terminal:

```
  docker-compose up -d
```

## .env <a name="env"></a>
Na raiz do projeto, será necessário criar um arquivo .env, com as seguintes informações:

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
HOST_DB=
PORT=
SECRET_KEY_JWT=
STORE_API_KEY=
STORE_API_PASSWORD=
STORE_NAME=

```

Um arquivo com estas definições já está presente no projeto, o **.env.example**, para que funcione corretamente, basta renomear para apenas **.env**, e alterar os dados **STORE_API_KEY**, **STORE_API_PASSWORD** e **STORE_NAME** de acordo com a loja vinculada ao Shopify. Em relação às outras variáveis, podem ser usadas as credenciais presentes no arquivo, são responsáveis pela criação do banco de dados.

## Iniciando o projeto <a name="start"></a>

Para rodar o projeto na sua máquina, basta utilizar o comando a seguir:

```
  npm start
```

Caso tudo esteja de acordo, você verá as seguintes mensagens no terminal:

```
  Server running on port 3000
  Database connected successfully
```

## Rotas e autenticação <a name="rotas"></a>

Para visualizar as rotas disponíveis, também como seus respectivos conteúdos de body e parametros, basta navegar para a rota **http://localhost:3000/docs**, onde está disponibilizada uma documentação exclusiva das rotas, desenvolvida utilizando Swagger. Vale a pena ressaltar que algumas rotas precisarão do token recebido ao realizar o login, então basta utilizar **Bearer token-recebido** no parametro Authorization dos headers da api para poder utilizar as rotas livremente.
