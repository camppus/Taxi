# 🚐 Shared Mobility Platform

Uma plataforma moderna de mobilidade partilhada desenvolvida para a realidade de Angola, permitindo que vários passageiros partilhem a mesma viagem de forma segura, inteligente e económica.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-Framework-red.svg)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791.svg)

---

## 📖 Sobre o Projeto

A **Shared Mobility Platform** foi concebida para resolver um problema comum nas cidades africanas: a baixa ocupação dos veículos e o elevado custo do transporte individual.

Ao contrário de plataformas tradicionais como Uber ou Yango, este sistema foi desenhado para **transporte coletivo inteligente**, onde uma única viagem pode transportar vários passageiros que seguem trajetos compatíveis.

### Exemplo de uma viagem partilhada

```text
Kilamba ───────────────────────────────► Mutamba

🚐 Toyota Hiace (15 lugares)

👤 Francisco  — 1 lugar
👤 Carlos     — 2 lugares
👤 Ana        — 1 lugar
👤 Pedro      — 3 lugares

Total: 7/15 lugares ocupados
```

Cada passageiro possui a sua própria **reserva (Booking)**, **pagamento (Payment)**, **ponto de embarque** e **ponto de desembarque**.

---

## ✨ Funcionalidades Principais

### 👤 Gestão de Utilizadores

- Cadastro e autenticação
- Login por OTP (One-Time Password)
- Recuperação de conta
- Gestão de perfil
- Notificações personalizadas
- Controlo de permissões por roles:
  - **ADMIN**
  - **DRIVER**
  - **PASSENGER**

### 🚗 Gestão de Motoristas

- Solicitação de perfil de motorista
- Processo de KYC (Know Your Customer)
- Aprovação/rejeição pelo administrador
- Histórico de viagens realizadas
- Sistema de avaliações

### 📑 KYC e Validação

O sistema realiza uma validação completa dos motoristas antes de permitir a publicação de viagens.

**Documentos suportados:**

- Bilhete de Identidade
- Passaporte
- Carta de Condução
- Seguro
- Documento da viatura

**Fluxo de aprovação:**

```text
Motorista
    │
    ▼
Envia documentos
    │
    ▼
Administrador analisa
    │
 ┌──┴───┐
 ▼      ▼
Aprovado Rejeitado
```

### 🚐 Gestão de Veículos

- Cadastro de múltiplos veículos por motorista
- Gestão de capacidade
- Marca, modelo, ano e cor
- Matrícula única
- Aprovação administrativa

### 🗺️ Rotas e Localizações

Uma rota pode possuir vários pontos intermédios, permitindo que passageiros embarquem e desembarquem em diferentes locais.

```text
Kilamba
   │
   ▼
Camama
   │
   ▼
Golf 2
   │
   ▼
Gamek
   │
   ▼
Maianga
   │
   ▼
Mutamba
```

### 🚐 Publicação de Viagens (Trips)

Uma **Trip** representa a viagem completa da viatura, incluindo motorista, veículo, rota e passageiros.

```text
Trip
 ├── Motorista
 ├── Veículo
 ├── Rota
 └── Passageiros
```

### 🎟️ Reservas (Bookings)

Cada passageiro possui uma reserva independente dentro da mesma viagem.

```text
Trip
 ├── Booking — Francisco — 2 lugares
 ├── Booking — Carlos — 1 lugar
 ├── Booking — Ana — 3 lugares
 └── Booking — Pedro — 1 lugar
```

Cada reserva contém:

- Quantidade de lugares
- Preço individual
- Pagamento associado
- Ponto de embarque
- Ponto de desembarque
- Estado da reserva

### 💳 Pagamentos

Cada **Booking** possui o seu próprio **Payment**, garantindo controlo financeiro independente.

```text
Booking
   └── Payment — 500 Kz
```

### 💬 Chat Integrado

Comunicação direta entre motorista e passageiro associada à reserva.

```text
Passageiro
    │
    ▼
   Chat
    ▲
    │
Motorista
```

### ⭐ Avaliações

Após a conclusão da viagem, passageiros e motoristas podem avaliar-se mutuamente numa escala de 1 a 5 estrelas.

### 🔔 Notificações

O sistema envia notificações automáticas para eventos importantes:

- Reserva confirmada
- Viagem iniciada
- Pagamento aprovado
- Convite recebido
- Nova mensagem

### 📩 Convites

Passageiros podem convidar amigos para participar da mesma viagem.

---

## 🏗️ Arquitetura do Sistema

```text
                        User
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
     Passenger                     DriverProfile
          │                             │
          │                             ▼
          │                          Vehicle
          │                             │
          └──────────────┐              │
                         ▼              ▼
                        Trip
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       Booking        Payment         Route
          │              │              │
          ▼              ▼              ▼
     Conversation     Rating       RouteStop
```

---

## 🚀 Fluxos Principais

### Cadastro e Autenticação

```text
Criar Conta
    │
    ▼
Verificar OTP
    │
    ▼
Conta Ativada
```

### Fluxo do Motorista

```text
Criar Conta
    │
    ▼
Enviar KYC
    │
    ▼
Administrador Aprova
    │
    ▼
Cadastrar Veículo
    │
    ▼
Publicar Trips
```

### Fluxo do Passageiro

```text
Login
   │
   ▼
Pesquisar Viagens
   │
   ▼
Selecionar Trip
   │
   ▼
Reservar Lugares
   │
   ▼
Efetuar Pagamento
   │
   ▼
Reserva Confirmada
```

### Fluxo da Viagem

```text
Trip
 │
 ▼
Boarding
 │
 ▼
Em andamento
 │
 ▼
Concluída
 │
 ▼
Avaliação
```

---

## 🛠️ Stack Tecnológica

### Backend

- **Node.js** — Runtime JavaScript
- **NestJS** — Framework backend escalável
- **TypeScript** — Tipagem estática
- **Prisma ORM** — Mapeamento objeto-relacional
- **PostgreSQL** — Base de dados relacional
- **JWT** — Autenticação segura
- **Redis** — Cache e sessões
- **BullMQ** — Filas e jobs assíncronos
- **Socket.IO** — Comunicação em tempo real

### Frontend Web

- **Next.js**
- **React**
- **TailwindCSS**
- **shadcn/ui**
- **React Query**

### Mobile

- **React Native**
- **Expo**

---

## 📂 Estrutura do Projeto

```text
src
├── auth
├── users
├── drivers
├── vehicles
├── routes
├── trips
├── bookings
├── payments
├── ratings
├── chat
├── notifications
├── otp
├── kyc
└── common
```

---

## 📊 Modelo de Dados

### Entidades Principais

- **User**
- **UserProfile**
- **DriverProfile**
- **DriverDocument**
- **Vehicle**
- **VehicleDocument**
- **VehicleType**
- **Location**
- **Route**
- **RouteStop**
- **Trip**
- **TripStop**
- **Booking**
- **Payment**
- **Conversation**
- **Message**
- **Notification**
- **Rating**
- **Complaint**
- **UserReport**
- **ActivityLog**

### Relação Central

A entidade central do sistema é a **Trip**, que pode possuir **N Bookings** independentes.

```text
USER (Motorista)
        │
        ▼
      TRIP
   ┌────┼────┐
   ▼    ▼    ▼
BOOKING BOOKING BOOKING
   │    │    │
   ▼    ▼    ▼
PASS A PASS B PASS C
   │    │    │
   ▼    ▼    ▼
PAY A PAY B PAY C
```

---

## 🔒 Regras de Negócio Críticas

- Uma **Trip** pertence a um motorista.
- Uma **Trip** utiliza um veículo aprovado.
- Uma **Trip** pode possuir várias **Bookings**.
- Uma **Booking** pertence a apenas uma **Trip**.
- O pagamento está sempre associado à **Booking**, nunca diretamente à **Trip**.
- O sistema nunca permite reservas superiores à capacidade disponível.
- A disponibilidade é recalculada automaticamente após confirmação, cancelamento ou expiração de reservas.
- Apenas motoristas aprovados podem publicar viagens.
- Apenas veículos aprovados podem ser utilizados em viagens.

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 20+
- PostgreSQL
- Redis
- npm ou yarn

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/shared-mobility-platform.git
cd shared-mobility-platform
```

### Instalar dependências

```bash
npm install
```

### Configurar variáveis de ambiente

Crie um ficheiro **.env** na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shared_mobility"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
```

### Executar migrações

```bash
npx prisma migrate dev
```

### Iniciar o servidor

```bash
npm run start:dev
```

---

## 🧩 Funcionalidades Futuras

- GPS em tempo real
- Tracking completo da viagem
- Wallet integrada
- Cashback e promoções
- Cupons de desconto
- Split Payment
- IA para agrupamento de passageiros
- Sugestão automática de rotas
- Dashboard administrativo avançado
- Relatórios e analytics
- Sistema antifraude

---

## 🎯 Objetivo

Construir uma plataforma de mobilidade partilhada **moderna, escalável e adaptada à realidade africana**, permitindo que passageiros com destinos compatíveis partilhem a mesma viatura de forma eficiente, reduzindo custos e aumentando a ocupação dos veículos.

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma branch para a sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 👨‍💻 Desenvolvido com

**TypeScript + NestJS + Prisma + PostgreSQL + Redis**

Feito com ❤️ para transformar a mobilidade urbana em Angola e em África.
