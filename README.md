# 🚀 API de Carteira Digital (Mini-Ledger)

> Um sistema robusto de transações financeiras simulando o núcleo de um banco digital.

## 🏆 Sobre o Projeto

Este projeto consiste em uma API RESTful de alta performance que simula as operações essenciais de uma carteira digital (como PicPay ou Nubank). O foco principal não é a interface do usuário, mas sim a **robustez**, **consistência** e **segurança** do back-end.

O objetivo é demonstrar competências avançadas em desenvolvimento de software, resolvendo problemas reais como:
- **Concorrência e Race Conditions:** Garantir que o usuário não gaste o mesmo dinheiro duas vezes simultaneamente.
- **Transações ACID:** Assegurar integridade dos dados financeiras (atomicidade, consistência, isolamento e durabilidade).
- **Escalabilidade:** Arquitetura preparada para lidar com alto volume de requisições.

## 🛠️ Tech Stack

Este projeto foi desenvolvido utilizando tecnologias modernas e amplamente adotadas no mercado:

- **Linguagem:** TypeScript 5+
- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma / TypeORM (Configurável)
- **Containerização:** Docker & Docker Compose
- **Testes:** Jest & Supertest

## 📋 Funcionalidades

### 1. Módulo de Usuários (Auth)
- Cadastro de usuários (Pessoa Física e Lojistas).
- Autenticação via JWT (JSON Web Token).
- Hash de senha robusto (Bcrypt/Argon2).
- Validação de dados (CPF/CNPJ e Email únicos).

### 2. Módulo de Carteira (Wallet)
- Criação automática de carteira ao registrar usuário.
- Consulta de saldo.
- Operações de depósito/saque.

### 3. Módulo de Transações (Core) 🔥
Endpoint `/transfer` para transferência de valores entre usuários.
- **Regras de Negócio:**
  - Validação de saldo suficiente.
  - Consulta a serviço autorizador externo (Mock) antes da efetivação.
  - Operação atômica (Transação de Banco de Dados).
  - Impede transferências para a mesma conta.

### 4. Diferenciais Técnicos (O "Pulo do Gato")
- **Tratamento de Concorrência:** Implementação de Locks (Otimista/Pessimista) para evitar *Race Conditions* e gastos duplos.
- **Notificações Assíncronas:** Uso de filas (Queue) para envio de notificações após o sucesso da transação, garantindo baixa latência na resposta da API.
- **Documentação:** API documentada com Swagger/OpenAPI.

## 🚀 Como Rodar

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/caiosemblano/api-carteira-digital.git
   cd wallet-api
   ```

2. **Suba o ambiente com Docker:**
   ```bash
   docker-compose up -d
   ```
   > Este comando irá provisionar o Banco de Dados (PostgreSQL) e a Aplicação.

3. **Acesse a Documentação da API:**
   Abra seu navegador em: `http://localhost:3000/api` (Swagger)

## 🗺️ Roteiro de Desenvolvimento

- [ ] **Modelagem de Dados:** Tabelas `Users`, `Wallets`, `Transactions`.
- [ ] **Configuração:** Docker com Postgres.
- [ ] **CRUD Básico:** Usuários e Carteiras.
- [ ] **Core:** Implementação de transferências com Transactions (BEGIN/COMMIT).
- [ ] **Segurança:** Autenticação e Autorização.
- [ ] **Concorrência:** Testes de carga e implementação de Locks.
- [ ] **Mensageria:** Módulo de notificações separado.

## 🧪 Testes

Para rodar os testes automatizados:

```bash
# Testes unitários
npm run test

# Testes e2e (integração)
npm run test:e2e
```

---
Desenvolvido com 💙 para fins de estudo e aprimoramento técnico.
