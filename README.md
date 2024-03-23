# Online Store

Trata-se da API de uma simulação de uma loja virtual, onde é possível cadastrar novos usuários, realizar login, adicionar e remover produtoas aos favoritos e visualizar produtos.

### Shopify

A API em questão utilizou a API da [Shopify](https://shopify.dev/docs) como provedora da listagem de produtos e seus devidos detalhes.

# Sumário
- [Tecnologias utilizadas](#tecnologias)
- [Instruções para rodar o projeto](#instrucoes)

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

## Instruções para rodar o projeto <a name="instrucoes"></a>