# NG.CASH Entrevista técnica

Objetivo: construir aplicação web fullstack dockeirizada para usuários NG.CASH poderem fazer transações entre si, com prazo sugerido de 7 dias para execução.

## Stack

React / Node.js

## Features

-   Registro de conta
-   Login
-   Logout
-   Transações
-   Extrato de transações
-   Verificações diversas (validação username, token, valores e usuário para transação)

### Como rodar a aplicação

1.  Clone o repositório;
2.  Abra a pasta frontend no terminal;
3.  Execute o código abaixo para criar a imagem:

        sudo docker build -f Dockerfile.dev -t ng-frontend:latest .

4.  Execute o código abaixo para criar o container:

        sudo docker run -it --rm -p 5173:5173 --name ng-frontend-dev ng-frontend:latest

## Não implementado

-   Backend e JWT
    \*\* Mock Service Worker faz a simulação da API, e o JWT na verdade é um número aleatório, mas está fácil de integrar depois;

## Limitações pessoais para o teste

-   Não conhecia Docker;
-   Não sabia como funcionava o processo de autenticação com JWT;
-   Pouquíssimo conhecimento em backend (nunca implementei server com db);
    \*\* Para executar o frontend, optei por usar um Mock Service Worker para interceptar e lidar com os requests enquanto não tenho o backend;
-   Bônus: Positivei para Covid na semana que recebemos o teste técnico;
