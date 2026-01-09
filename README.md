# 🚀 API de Carteira Digital (Mini-Ledger)

> ⚠️ **Status: Funcional e em Desenvolvimento**
>
> Este projeto implementa o núcleo transacional de uma carteira digital segura.

## 🏆 Sobre o Projeto

Este projeto consiste em uma API RESTful de alta performance que simula as operações essenciais de uma carteira digital. O foco principal é a **robustez**, **consistência** (ACID) e **segurança** do back-end.

### Destaques da Implementação (O "Pulo do Gato") 🐱

1.  **Transações ACID Reais**: O `TransactionService` utiliza `prisma.$transaction()` interativo. Isso garante que a validação de saldo, o débito no pagador, o crédito no recebedor e a criação do registro histórico aconteçam **tudo ou nada**. Se o banco falhar no meio do caminho, o dinheiro não some.
2.  **Isolamento e Atomicidade**: Usamos *Atomic Updates* (`balance: { start decrement: amount }`) do Prisma/Postgres. Isso previne *Race Conditions* (condição de corrida) onde duas requisições simultâneas poderiam gastar o mesmo saldo duas vezes. O banco serializa essas operações nativamente.
3.  **Schema Seguro**: Tipagem forte no banco (`Int` para centavos, `Unique` para CPF/Email) garante integridade de dados na camada mais baixa.

## 🛠️ Tech Stack

-   **Linguagem**: TypeScript 5+
-   **Framework**: NestJS (Injeção de Dependência, Modularidade)
-   **Banco de Dados**: PostgreSQL 15 (Dockerizado)
-   **ORM**: Prisma 5 (Standard Library Engine para compatibilidade)
-   **Validação**: DTOs e Typesseguros

## 📂 Estrutura do Código

Aqui está um resumo do que cada parte faz:

*   **`src/prisma`**: Módulo global. Conecta no banco de dados. O `PrismaService` estende o cliente do Prisma e gerencia a conexão.
*   **`src/user`**:
    *   `UserController`: Recebe requisições HTTP para criar usuários (`POST /users`).
    *   `UserService`: Contém a regra de negócio para criar usuário e sua carteira inicial (`Wallet`) em uma única transação.
*   **`src/transaction`**:
    *   `TransactionController`: Recebe o pedido de transferência (`POST /transaction`).
    *   `TransactionService`: O coração do sistema. Gerencia a lógica ACID de transferência entre carteiras.
*   **`test.http`**: Arquivo de requisições prontads para testar a API manualmente (usando extensão Rest Client ou similar).

## 🚀 Como Rodar e Testar

### Pré-requisitos
-   Docker e Docker Compose
-   Node.js 18+

### Passo a Passo

1.  **Suba o Banco de Dados**:
    ```bash
    docker-compose up -d
    ```

2.  **Instale Dependências e Gere o Cliente**:
    ```bash
    npm install
    npx prisma generate
    ```

3.  **Execute as Migrações**:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Rode a Aplicação**:
    ```bash
    npm run start:dev
    ```
    A API estará rodando em `http://localhost:3000`.

### Teste Manual Simplificado

Use o arquivo `test.http` incluído na raiz do projeto!

1.  **Crie o Pagador**: Envie a requisição "Create User (Payer)". Copie o `id`.
2.  **Crie o Recebedor**: Envie a requisição "Create User (Payee)". Copie o `id`.
3.  **Transfira**: Na requisição "Make Transaction", cole os IDs em `payer` e `payee` e envie.
4.  **Verifique**: Se tentar transferir mais do que o saldo, receberá erro 400.

## 🧪 Comandos Úteis

```bash
# Rodar linter
npm run lint

# Rodar testes (futuro)
npm run test
```

---
Desenvolvido com 💙 foco em qualidade de software.
