# Client API

## Descrição

Este projeto é uma API REST desenvolvida com [NestJS](https://nestjs.com/) para o gerenciamento de clientes. A API inclui documentação via Swagger, coleta de métricas via Prometheus e suporte à telemetria com OpenTelemetry.

## Tecnologias Utilizadas

- **NestJS** - Framework para aplicações Node.js
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação da API
- **Prometheus** - Coleta de métricas
- **OpenTelemetry** - Monitoramento e rastreamento de execução
- **Docker** - Contêinerização

## Requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL 13+

## Instalação

1. Clone este repositório:

   ```sh
   git clone https://github.com/stecks10/teddy-client.git
   cd client-api
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Copie o arquivo de variáveis de ambiente:

   ```sh
   cp .env.example .env
   ```

4. Suba o banco de dados via Docker Compose:

   ```sh
   docker-compose up -d
   ```

## Execução

### Ambiente de Desenvolvimento

```sh
npm run start:dev
```

### Ambiente de Produção

```sh
npm run build
npm run start:prod
```

## Documentação da API

A API conta com documentação interativa via Swagger:

- Acesse: [http://localhost:3333/clients/api](http://localhost:3333/clients/api)

## Banco de Dados

O banco de dados é um PostgreSQL rodando em um contêiner Docker. Para acessá-lo:

```sh
docker exec -it postgres_client_management psql -U postgres -d client_management
```

## Testes

Para rodar os testes unitários:

```sh
npm run test
```

## Monitoramento e Métricas

- **Prometheus** coleta métricas automaticamente.
- **OpenTelemetry** é utilizado para rastrear execução e desempenho da API.

## Autor

- **Seu Nome** - [GitHub](https://github.com/seuusuario)

## Licença

Este projeto está sob a licença UNLICENSED.
