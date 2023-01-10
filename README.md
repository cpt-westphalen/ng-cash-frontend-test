# NG-CASH Jr Frontend Dev Test

[NG.CASH](https://ng.cash/) é uma empresa de tecnologia que fornece um app financeiro para a geração Z.

## Desafio

O teste técnico para o cargo de **desenvolvedor frontend júnior** consistia em:

> Construir aplicação web fullstack dockeirizada para usuários NG.CASH fazerem transações entre si, com prazo sugerido de 7 dias para execução.

Foram fornecidas regras de negócio, schemas para o Banco de Dados e as características mínimas para o frontend.
Você encontra uma cópia dos requisitos [aqui](https://www.notion.so/cpt-westphalen/C-pia-Teste-T-cnico-NG-CASH-0c4ecf60aca04c129c0c25f33ba69a19).

## Exemplo

> . . .

## Como rodar o código

É necessário ter `docker` e `docker-compose` instalados.

1. Clone o repositório para sua máquina local;
2. Abra a pasta raíz do projeto no terminal;
3. Execute: `docker-compose -f compose-dev.yml up --build`
4. Acesse [localhost:5173](http://localhost:5173/) para acessar o frontend de desenvolvimento com proxy
5. Acesse [localhost:3000](http://localhost:3000/) para acessar apenas o backend com a última build do frontend
6. Para parar os containers, aperte <kbd>ctrl</kbd>+<kbd>c</kbd> no terminal do docker-compose
7. Na pasta raíz, execute: `docker-compose -f compose-dev.yml down` para remover os containers

OBS: Alterações feitas no código na máquina local são percebidas automaticamente nos containers.

### Observações

O primeiro commit de setup do projeto ([64de54e](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/64de54eafaf9b79eb82f5847d66a278cdbe1b836)) foi feito em **15/nov./2022.**

Consta no Readme da entrega parcial, feita em **04/dez./2022** ([787a3cb](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/787a3cbe24d85aa924f6986c7251e1f770af713f)):

> -   Não conhecia Docker;
> -   Não sabia como funcionava o processo de autenticação com JWT;
> -   Pouquíssimo conhecimento em backend (nunca implementei server com db);
> -   Para executar o frontend, optei por usar um Mock Service Worker para interceptar e lidar com os requests enquanto não tenho o backend;

**Devido a essas limitações,** optei por enviar um frontend funcional, porém mockado **e continuar aprendendo para ter em portfólio um projeto fullstack.**

### Empreitada extra

**Para isso, entre 04/dez. e 10/jan. aprendi:**

-   Node + Express + Auth JWT (até [3a32b29](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/3a32b29e7ed9ab16c473384a2bfc9fcf1054451d))
-   Banco de Dados + SQLite + Nestjs ([Confira aqui](https://github.com/cpt-westphalen/nestjs-notification-microservice); Influência começa em [d196996](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/d1969965399c0983b8e9f813dff8abf8655f5871))
    -   Padrões de Repository, Módulos, Inversão de Dependências, Camadas da Aplicação (db/repo/app/http)
    -   Uso de Mappers entre camadas
    -   Obs: Não usei Nest nem SQLite aqui, mas me apropriei de conceitos de DDD, OOP e SOLID para o projeto.
-   Docker CLI + Docker-Compose ([d1caa3d](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/d1caa3d3b9fda7dfe101cfff686988290245c5b9))
    -   Configuração de ambiente dev em docker com nodemon e proxy de chamadas para API a partir do frontend ([e55f583](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/e55f5838e0f924bc882dabddbe37f5fdda6a9934))
    -   Postgres containerizado ([ac2e91b](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/ac2e91bdfa5da69c3ce97685904609b06b491462))
-   Prisma ORM (Inicial: [03cceeb](https://github.com/cpt-westphalen/ng-cash-frontend-test/commit/03cceebcdde40c2ea6f43dd8c29b66a79f2df7cc))

Confira a história completa de commits: [commits/main](https://github.com/cpt-westphalen/ng-cash-frontend-test/commits/main).

## Stack final

### Frontend

-   TypeScript
-   React
-   Vite
-   TailwindCSS
-   Outros: react-modal, react-icons, axios

### Backend

-   TypeScript
-   Nodejs
-   Express
-   Outros: jsonwebtoken, bcrypt

#### ORM

-   Prisma

#### Database

-   Postgresql

### DevOps

-   Docker-compose
-   Git

## Destaques do Autor

**Frontend**

-   Frontend 100% responsivo
-   Práticas de acessibilidade no React
-   Padronização de tema no Tailwind
-   Validação de entradas (register/login/transferência)
-   Modais de Erro conforme retorno da API
-   Uma tabela automática linda para as transações financeiras <3 (ver prints abaixo)

**Backend**

-   Camadas desacopladas com inversão de dependência
-   Validação de entradas do usuário e checagens redundantes
-   Validação de JWT via middleware custom
-   Hashing de senhas
-   Postgres via imagem docker
-   Repositório Prisma / ORM com migrations

## Screenshots

// To-do ...

## API Routes

**ATTENTION: API WORKS WITH INTEGERS, aka: 1001 == $ 10.01**

### POST /api/register

_@@ Public_

Create new account and user.

**Request Body**

```
// application/json
{
  "username": string,
  "password": string
}
```

**Response Body**

```
// application/json
{
    "message": "account created!",
    "user": {
        "id": string,
        "username": string,
        "account": {
            "id": string,
            "balance": number,
            "transaction_ids": string[]
        },
        "accessToken": string
    }
}
```

### POST /api/login

_@@ Public_

Login to existing account.

**Request Body**

```
{
  "username": string,
  "password": string
}
```

**Response Body**

```
// application/json
{
    "id": string,
    "username": string,
    "account": {
        "id": string,
        "balance": number
        "transaction_ids": string[]
    },
    "accessToken": string
}
```

### GET /api/:account_id/cash

_@@ Private ("Authorization": "Bearer ...")_

Gets account balance.

**Response Body**

```
// application/json
{
  "account": {
    "id": string,
    "balance": number
  }
}
```

### POST /api/:account_id/send

_@@ Private ("Authorization": "Bearer ...")_

**Request Body**

```
// application/json
{
  "from": string,
  "to": string,
  "amount": number
}
```

**Important: "from" is ACCOUNT_ID, "to" is USERNAME**
_Example:_

> ```
> // application/json
> {
>  "from": "59a33a94-d4e7-4fdf-a2c3-95cc7e32d960",
>  "to": "user1234",
>  "amount": 1000
> }
> ```

**Response Body**

```
{
  "message": "Success!",
  "transaction": {
    "from": string,
    "to": string,
    "amount": number,
    "created_at": DateTime,
    "transaction_id": string
  }
}
```

### GET /api/:account_id/history

_@@ Private ("Authorization": "Bearer ...")_

Gets transaction history as an array.

**Response Body**

```
// application/json
[
    {
        "from": string,
        "to": string,
        "amount": number,
        "created_at": DateTime,
        "transaction_id": string
    },
    // example:
    {
        "from": "teste_123",
        "to": "user1234",
        "amount": 15000,
        "created_at": "2023-01-10T12:41:04.028Z",
        "transaction_id": "6f7c72be-f868-47b2-8d54-b3abd196a5e9"
    },
]
```

### GET /api/users

_@@ DEBUG Public_
This route only exists for debugging purposes. Gets all users in Database.

### GET /api/transactions

_@@ DEBUG Public_
This route only exists for debugging purposes. Gets all transactions in Database.
