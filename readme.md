# 🚐 Shared Mobility Platform

> Uma plataforma moderna de mobilidade partilhada desenvolvida para a realidade de Angola, permitindo que vários passageiros partilhem a mesma viagem de forma segura, inteligente e económica.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-20+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)

---

# 📖 Sobre

Ao contrário de plataformas como Uber ou Yango, este projeto foi desenvolvido para **transporte coletivo inteligente**.

Uma única viagem pode transportar vários passageiros que seguem trajetos compatíveis.

Exemplo:

```
Kilamba ---------------> Mutamba

🚐 Toyota Hiace (15 lugares)

👤 Francisco (1)
👤 Carlos (2)
👤 Ana (1)
👤 Pedro (3)

Total:
7/15 lugares ocupados
```

Cada passageiro possui sua própria reserva, pagamento e ponto de embarque.

---

# ✨ Features

## 👤 Utilizadores

- Cadastro
- Login
- Recuperação de senha
- OTP
- Perfil
- Notificações
- Roles
  - Admin
  - Driver
  - Passenger

---

## 🚗 Motoristas

- Cadastro
- KYC
- Aprovação pelo administrador
- Gestão de veículos
- Histórico de viagens
- Avaliações

---

## 📑 KYC

Validação completa do motorista.

- Bilhete
- Passaporte
- Carta de condução
- Seguro
- Documento da viatura

Fluxo

```
Driver
   │
   ▼
Envia documentos
   │
   ▼
Admin analisa
   │
   ├───────────────┐
   ▼               ▼
Approved       Rejected
```

---

## 🚐 Veículos

- Gestão de frota
- Capacidade
- Marca
- Modelo
- Cor
- Matrícula

---

## 🗺️ Rotas

Uma rota pode possuir diversos pontos.

```
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

---

## 🚐 Trips

Uma Trip representa a viagem completa da viatura.

```
Trip

Motorista
    │
    ▼
Veículo
    │
    ▼
Rota
    │
    ▼
Passageiros
```

---

## 🎟️ Booking

Cada passageiro possui sua própria reserva.

```
Trip

│

├──── Booking
│       Francisco
│       2 lugares
│
├──── Booking
│       Carlos
│       1 lugar
│
├──── Booking
│       Ana
│       3 lugares
│
└──── Booking
        Pedro
        1 lugar
```

Cada reserva possui:

- quantidade de lugares
- preço
- pagamento
- embarque
- desembarque

---

## 💳 Pagamentos

Cada Booking possui seu próprio pagamento.

```
Booking

│

└──── Payment

        500 Kz
```

---

## 💬 Chat

Negociação entre motorista e passageiro.

```
Passageiro

      │

      ▼

     Chat

      ▲

      │

 Motorista
```

---

## ⭐ Avaliações

Após finalizar a viagem.

```
Passenger

      │

      ▼

⭐ ⭐ ⭐ ⭐ ⭐

      ▲

      │

 Driver
```

Também é possível o motorista avaliar passageiros.

---

## 🔔 Notificações

Eventos automáticos.

- Reserva confirmada
- Viagem iniciada
- Pagamento aprovado
- Convite recebido
- Nova mensagem

---

## 📩 Convites

Um passageiro pode convidar amigos.

```
Francisco

     │

     ├──── Carlos

     ├──── Ana

     └──── Pedro
```

---

# 🏗️ Arquitetura

```
                     User
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
   Passenger                    Driver
        │                           │
        │                           │
        ▼                           ▼
     Booking                   Vehicle
        │                           │
        └──────────────┐            │
                       ▼            ▼
                      Trip
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Payment         Chat          Route
        │              │              │
        ▼              ▼              ▼
    Rating        ChatMessage     RouteStop
```

---

# 🚀 Fluxo da Aplicação

## Cadastro

```
Criar Conta

      │

      ▼

Verificar OTP

      │

      ▼

Conta Ativada
```

---

## Motorista

```
Criar Conta

      │

      ▼

Enviar KYC

      │

      ▼

Admin Aprova

      │

      ▼

Cadastrar Veículo

      │

      ▼

Criar Trips
```

---

## Passageiro

```
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

Pagamento

   │

   ▼

Reserva Confirmada
```

---

## Viagem

```
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

# 🛠️ Stack

## Backend

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Redis
- BullMQ
- Socket.IO

---

## Frontend

- Next.js
- React
- TailwindCSS
- shadcn/ui
- React Query

---

## Mobile

- React Native
- Expo

---

# 📦 Estrutura

```
src

├── auth
├── users
├── drivers
├── passengers
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

# 🧩 Funcionalidades Futuras

- GPS em tempo real
- Tracking da viagem
- Wallet
- Cashback
- Promoções
- Cupons
- Split Payment
- IA para agrupamento de passageiros
- Sugestão automática de rotas
- Dashboard administrativo
- Relatórios
- Analytics
- Sistema antifraude

---

# 📊 Banco de Dados

Principais entidades

```
User
Driver
Passenger
DriverKYC
DriverDocument
Vehicle
Route
RouteStop
Trip
Booking
Payment
TripInvite
Chat
ChatMessage
OTPCode
Notification
Rating
```

---

# ❤️ Objetivo

Construir uma plataforma de mobilidade partilhada moderna, escalável e adaptada à realidade africana, permitindo que passageiros com destinos compatíveis partilhem a mesma viatura de forma eficiente, reduzindo custos e aumentando a ocupação dos veículos.

---

## Desenvolvido usando Typescript + NestJS + Prisma + PostgreSQL + Redis
