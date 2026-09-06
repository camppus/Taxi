# Mobility Platform — Modelo de Dados e Financeiro

## 1. Visão geral

Esta plataforma conecta passageiros e motoristas para realização de viagens.

O sistema possui:

- autenticação por telefone e OTP;
- gestão de sessões e dispositivos;
- localização dos utilizadores;
- cadastro e validação de motoristas;
- cadastro e validação de veículos;
- criação e gestão de viagens;
- reservas de lugares;
- pagamentos;
- comissão da plataforma;
- ledger financeiro dos motoristas;
- reconciliação financeira;
- liquidação das dívidas dos motoristas;
- avaliações;
- notificações.

### Modelo de pagamento atual

A plataforma **não possui integração com API/gateway de pagamentos**.

Consequentemente, o principal método de pagamento é:

```text
CASH
```

O passageiro paga diretamente ao motorista:

```text
PASSAGEIRO
    │
    │ 5.000 Kz
    ▼
MOTORISTA
```

A plataforma não recebe esses 5.000 Kz.

Se a plataforma cobrar uma comissão de 10%:

```text
Valor da viagem:       5.000 Kz
Fee da plataforma:       500 Kz
Valor económico driver: 4.500 Kz
```

O motorista recebe fisicamente os **5.000 Kz**, mas passa a dever **500 Kz à plataforma**.

Portanto, o sistema não possui uma carteira financeira tradicional para o motorista.

Em vez disso, possui um:

> **Driver Ledger — livro de movimentos financeiros do motorista.**

---

# 2. Princípio financeiro fundamental

É importante distinguir três conceitos:

### Payment

Representa:

> Quanto o passageiro deveria/pagou pela reserva e como pagou.

### Platform Fee

Representa:

> Quanto a plataforma ganhou daquela transação.

### Driver Ledger

Representa:

> Quanto o motorista deve ou tem a receber em relação à plataforma.

### Driver Settlement

Representa:

> Dinheiro que o motorista efetivamente entregou à plataforma para liquidar a sua dívida.

---

# 3. Fluxo financeiro

Supondo uma viagem de:

```text
5.000 Kz
```

com fee de:

```text
10%
```

Temos:

```text
Gross Amount
    5.000 Kz

Platform Fee
      500 Kz

Driver Amount
    4.500 Kz
```

Como o pagamento é em dinheiro:

```text
PASSAGEIRO
    │
    │ 5.000 Kz
    ▼
MOTORISTA
```

A plataforma não recebeu nada.

Mas o motorista deve:

```text
5.000 × 10% = 500 Kz
```

Então é criado um movimento no ledger:

```text
PLATFORM_FEE
+500 Kz
```

A dívida do motorista passa a ser:

```text
500 Kz
```

---

# 4. Entidades

## 4.1 Users

Tabela:

```text
users
```

Representa qualquer pessoa que utiliza a plataforma.

Um utilizador pode ser:

- passageiro;
- motorista;
- administrador.

### Principais campos

```text
id
name
phone
image
isAdmin
status
createdAt
updatedAt
```

### Responsabilidade

A entidade `users` contém os dados gerais da pessoa.

Informações específicas de motorista não devem ser colocadas aqui.

Por exemplo:

```text
users
├── nome
├── telefone
└── estado da conta

drivers
├── estado do motorista
├── preferências
└── informações específicas de operação
```

### Relação

```text
User 1 ───── 0..1 Driver
```

Um utilizador pode não ser motorista.

Um utilizador pode tornar-se motorista através da entidade `drivers`.

---

# 5. Sessions

Tabela:

```text
sessions
```

Representa uma sessão autenticada de um utilizador.

Uma pessoa pode possuir várias sessões simultaneamente.

Exemplo:

```text
iPhone
Chrome
Android
```

Cada sessão possui um refresh token armazenado como hash.

### Campos importantes

```text
userId
refreshHash
isActive
expiresAt
revokedAt
lastUsedAt
```

Também são armazenadas informações do dispositivo:

```text
deviceName
deviceType
platform
platformVersion
deviceModel
manufacturer
appVersion
browser
browserVersion
userAgent
ipAddress
country
city
```

### Relação

```text
User 1 ───── N Sessions
```

Uma sessão pertence a exatamente um utilizador.

---

# 6. Challenges

Tabela:

```text
challenges
```

Representa desafios de autenticação, principalmente OTP.

Exemplo:

```text
+244 923 XXX XXX
        │
        ▼
      OTP
        │
        ▼
Challenge
```

O código OTP não deve ser armazenado em texto puro.

O sistema armazena:

```text
hash
```

### Principais campos

```text
userId
hash
context
channel
target
expiresAt
used
attempts
```

### Context

Indica para que o OTP foi criado.

Exemplos:

```text
REGISTER
LOGIN
DEVICE
RECOVERY
```

### Channel

Define onde o código foi enviado:

```text
SMS
EMAIL
```

### Relação

```text
User 1 ───── N Challenges
```

Um utilizador pode possuir vários desafios ao longo do tempo.

---

# 7. Locations

Tabela:

```text
locations
```

Armazena posições geográficas enviadas pelos utilizadores.

É especialmente útil para motoristas.

### Dados armazenados

```text
latitude
longitude
accuracy
heading
speed
recordedAt
```

### Exemplo

```text
Driver
   │
   ├── Location 10:00
   ├── Location 10:01
   ├── Location 10:02
   └── Location 10:03
```

### Relação

```text
User 1 ───── N Locations
```

As localizações são históricas.

Não devem ser tratadas simplesmente como `currentLocation`, porque cada registro representa um ponto no tempo.

---

# 8. Drivers

Tabela:

```text
drivers
```

Representa o perfil operacional de um motorista.

Um motorista é sempre um `user`.

### Campos

```text
userId
status
acceptsPets
allowsMusic
acceptsCharge
```

### Preferências

As preferências ficam no próprio motorista porque fazem parte do comportamento operacional dele.

```text
acceptsPets = true
allowsMusic = true
acceptsCharge = true
```

Isso significa que o motorista aceita:

- animais;
- música;
- cargas.

### Relação

```text
User 1 ───── 1 Driver
```

---

# 9. Driver Documents

Tabela:

```text
driver_docs
```

Representa documentos necessários para validar um motorista.

Exemplos:

```text
BI
PASSAPORT
DRIVER_LICENSE
TAX_ID
```

### Campos

```text
driverId
type
documentNumber
fileUrl
status
expiresAt
verifiedAt
rejectionReason
```

### Relação

```text
Driver 1 ───── N DriverDocuments
```

Um motorista pode possuir vários documentos.

Cada documento pode estar:

```text
PENDING
APPROVED
REJECTED
EXPIRED
```

---

# 10. Vehicles

Tabela:

```text
vehicles
```

Representa os veículos utilizados pelos motoristas.

### Campos

```text
driverId
plateNumber
brand
model
color
year
image
status
```

### Relação atual

```text
Driver 1 ───── N Vehicles
```

Um motorista pode possuir mais de um veículo.

Isso permite situações como:

```text
Driver
 ├── Toyota Corolla
 ├── Hyundai i10
 └── Toyota Vitz
```

---

# 11. Vehicle Documents

Tabela:

```text
vehicle_docs
```

Armazena documentos associados a um veículo.

Exemplos:

```text
vehicle registration
insurance
inspection
```

### Relação

```text
Vehicle 1 ───── N VehicleDocuments
```

Um veículo pode possuir vários documentos.

---

# 12. Trips

Tabela:

```text
trips
```

Representa uma viagem criada pelo motorista.

Neste modelo, **o motorista é quem cria a viagem**.

Uma trip possui:

```text
driver
vehicle
origin
destination
departure time
seats
price
status
```

### Origem

```text
fromName
fromLatitude
fromLongitude
```

### Destino

```text
toName
toLatitude
toLongitude
```

### Capacidade

```text
totalSeats
availableSeats
```

### Preço

```text
price
currency
```

### Relações

```text
Driver 1 ───── N Trips

Vehicle 1 ───── N Trips

Trip 1 ───── N Bookings
```

Uma viagem pertence a um motorista e utiliza um veículo.

---

# 13. Bookings

Tabela:

```text
bookings
```

Representa a reserva feita por um passageiro para uma viagem.

Exemplo:

```text
Trip
  │
  ├── Booking - User A
  ├── Booking - User B
  └── Booking - User C
```

### Campos

```text
tripId
userId
seats
unitPrice
totalPrice
currency
status
```

### Exemplo

Se o preço por lugar for:

```text
3.000 Kz
```

e o utilizador reservar:

```text
2 lugares
```

temos:

```text
unitPrice  = 3.000
seats      = 2
totalPrice = 6.000
```

### Relações

```text
Trip 1 ───── N Bookings

User 1 ───── N Bookings
```

---

# 14. Payments

Tabela:

```text
payments
```

Representa uma tentativa de pagamento associada a uma reserva.

Uma reserva pode possuir várias tentativas.

Exemplo:

```text
Booking
   │
   ├── Payment #1 → FAILED
   ├── Payment #2 → FAILED
   └── Payment #3 → COMPLETED
```

Por isso:

```text
Booking 1 ───── N Payments
```

---

# 15. Default Payment

Apenas um pagamento pode ser o pagamento principal da reserva:

```text
isDefault = true
```

Existe uma constraint que garante:

```text
Booking → máximo 1 default payment
```

Isso permite manter histórico de tentativas sem perder a referência para o pagamento efetivamente concluído.

---

# 16. Payment Amounts

Cada pagamento guarda um snapshot financeiro.

```text
grossAmount
platformFee
platformFeeRate
driverAmount
```

Exemplo:

```text
grossAmount      = 5.000
platformFeeRate  = 10%
platformFee      = 500
driverAmount     = 4.500
```

A fórmula é:

```text
platformFee =
grossAmount × platformFeeRate
```

E:

```text
driverAmount =
grossAmount - platformFee
```

---

# 17. Por que guardar platformFeeRate?

Porque a taxa da plataforma pode mudar.

Hoje:

```text
10%
```

Amanhã:

```text
12%
```

Uma viagem antiga não pode ser recalculada usando 12%.

Por isso o pagamento guarda o snapshot:

```text
platformFeeRate = 10%
```

Assim, o histórico financeiro permanece imutável.

---

# 18. CASH Payment

No modelo atual:

```text
method = CASH
```

O campo:

```text
providerReference
```

fica:

```text
NULL
```

porque não existe gateway externo.

O fluxo é:

```text
Passenger
    │
    │ cash
    ▼
Driver
```

O sistema apenas registra:

```text
Payment = COMPLETED
```

Isso **não significa que a plataforma recebeu o dinheiro**.

Significa apenas que o pagamento da viagem foi concluído entre passageiro e motorista.

---

# 19. Driver Ledger

Tabela:

```text
driver_ledger_entries
```

Esta é a entidade financeira mais importante do sistema atual.

Ela registra todos os movimentos financeiros relacionados ao motorista.

### Tipos

```text
PLATFORM_FEE
SETTLEMENT
REFUND
ADJUSTMENT
PENALTY
BONUS
```

O `amount` deve ser armazenado como valor positivo.

A direção do movimento é determinada pelo tipo.

---

# 20. PLATFORM_FEE

Quando um pagamento CASH é concluído:

```text
grossAmount = 5.000
platformFee = 500
```

É criado:

```text
DriverLedgerEntry

type   = PLATFORM_FEE
amount = 500
```

Isso significa:

> O motorista deve 500 Kz à plataforma.

---

# 21. SETTLEMENT

Quando o motorista entrega dinheiro à plataforma:

```text
amount = 500
```

é criado:

```text
type   = SETTLEMENT
amount = 500
```

Esse movimento reduz a dívida.

---

# 22. Como calcular a dívida

O saldo financeiro não precisa ser armazenado em uma `wallet`.

Pode ser calculado pelo ledger.

Conceitualmente:

```text
Outstanding Debt =
PLATFORM_FEES
+
PENALTIES
-
SETTLEMENTS
-
BONUSES
-
ADJUSTMENTS
```

Exemplo:

```text
PLATFORM_FEE = 5.000
SETTLEMENT   = 2.000
```

Resultado:

```text
Outstanding = 3.000 Kz
```

---

# 23. Por que não existe Driver Wallet?

Não existe uma verdadeira wallet porque a plataforma não está custodiante do dinheiro do motorista.

O dinheiro físico está com o motorista:

```text
Passenger
   │
   │ cash
   ▼
Driver
```

A plataforma possui apenas um direito de receber:

```text
Driver
   │
   │ owes 500 Kz
   ▼
Platform
```

Portanto, semanticamente é melhor tratar isso como:

```text
Driver Ledger
```

e não como:

```text
Driver Wallet
```

---

# 24. Driver Settlements

Tabela:

```text
driver_settlements
```

Representa o dinheiro que o motorista efetivamente entrega à plataforma.

Exemplo:

```text
Driver debt = 10.000 Kz
```

Motorista entrega:

```text
5.000 Kz
```

É criado:

```text
Settlement
amount = 5.000
method = CASH
```

A dívida passa para:

```text
10.000 - 5.000 = 5.000 Kz
```

---

# 25. Por que Settlement é separado do Ledger?

Porque são conceitos diferentes.

### Ledger

Registra o movimento contábil:

```text
SETTLEMENT - 5.000
```

### Settlement

Registra o evento operacional:

```text
Motorista entregou 5.000 Kz
Método: CASH
Confirmado por: Admin
Data: ...
```

Isso permite auditoria.

```text
Settlement
     │
     ▼
Ledger Entry
```

O settlement representa o evento real.

O ledger representa o impacto financeiro desse evento.

---

# 26. Confirmação manual

Como o sistema não possui gateway, settlements em cash precisam de confirmação.

Fluxo:

```text
Driver
   │
   │ entrega 5.000 Kz
   ▼
Operador/Admin
   │
   │ confirma
   ▼
Settlement
   │
   ▼
Ledger
```

Nunca se deve considerar automaticamente que o motorista liquidou uma dívida apenas porque declarou que pagou.

---

# 27. Driver Reconciliation

Tabela:

```text
driver_reconciliations
```

Representa o fechamento/conferência financeira de um determinado período.

Não é uma wallet.

Não é um payout.

Não é uma transferência para o motorista.

É uma fotografia financeira de um período.

---

# 28. Exemplo de Reconciliação

Período:

```text
01/09 → 07/09
```

Durante esse período:

```text
Gross Amount       = 500.000 Kz
Platform Fee        = 50.000 Kz
Driver Amount       = 450.000 Kz
Settled Amount      = 30.000 Kz
Outstanding Amount  = 20.000 Kz
```

A interpretação é:

> O motorista recebeu 500.000 Kz dos passageiros, gerou 50.000 Kz de comissão para a plataforma e já entregou 30.000 Kz. Ainda deve 20.000 Kz.

---

# 29. Reconciliation ≠ Settlement

Uma reconciliação pode existir sem nenhum settlement.

Exemplo:

```text
Platform Fee = 10.000
Settled      = 0
Outstanding  = 10.000
```

Depois podem existir vários settlements:

```text
Settlement #1 = 3.000
Settlement #2 = 2.000
Settlement #3 = 5.000
```

Total:

```text
Settled = 10.000
Outstanding = 0
```

---

# 30. Reviews

Tabela:

```text
reviews
```

Representa a avaliação de uma reserva.

### Campos

```text
bookingId
reviewerId
rating
comment
status
```

Uma reserva possui no máximo uma avaliação.

```text
Booking 1 ───── 0..1 Review
```

O `reviewerId` identifica quem fez a avaliação.

---

# 31. Notifications

Tabela:

```text
notifications
```

Representa notificações enviadas ao utilizador.

Exemplos:

```text
Booking accepted
Trip cancelled
Payment completed
Driver arrived
Settlement reminder
```

### Relação

```text
User 1 ───── N Notifications
```

Uma pessoa pode possuir muitas notificações.

---

# 32. Modelo completo de relacionamentos

```text
                         USERS
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      SESSIONS         CHALLENGES      LOCATIONS
          │
          │
          ▼
       DRIVER
          │
      ┌───┴───────────────┐
      │                   │
      ▼                   ▼
 DRIVER_DOCS           VEHICLES
                          │
                          ▼
                    VEHICLE_DOCS
                          │
                          │
                          ▼
                        TRIPS
                          │
                          ▼
                      BOOKINGS
                          │
                          ▼
                       PAYMENTS
                          │
                          ▼
                 DRIVER LEDGER
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
       SETTLEMENTS             RECONCILIATIONS
```

---

# 33. Fluxo completo de uma viagem

## Step 1 — Driver cria trip

```text
Driver
  │
  ▼
Trip
```

A viagem possui:

```text
origin
destination
departureAt
price
seats
vehicle
```

---

## Step 2 — Passenger cria booking

```text
Passenger
    │
    ▼
Booking
```

Exemplo:

```text
seats = 2
unitPrice = 3.000
totalPrice = 6.000
```

---

## Step 3 — Passenger paga

Atualmente:

```text
method = CASH
```

O passageiro entrega:

```text
6.000 Kz
```

diretamente ao motorista.

---

## Step 4 — Payment é concluído

```text
grossAmount = 6.000

platformFeeRate = 10%

platformFee = 600

driverAmount = 5.400
```

---

## Step 5 — Criar ledger

```text
DriverLedgerEntry

type   = PLATFORM_FEE
amount = 600
```

Agora:

```text
Driver outstanding debt = 600 Kz
```

---

## Step 6 — Mais viagens

Suponha:

```text
Trip #1 → fee 600
Trip #2 → fee 400
Trip #3 → fee 800
```

Dívida:

```text
600 + 400 + 800
=
1.800 Kz
```

---

## Step 7 — Driver liquida

Motorista entrega:

```text
1.000 Kz
```

Cria-se:

```text
DriverSettlement
amount = 1.000
method = CASH
```

E:

```text
DriverLedgerEntry
type   = SETTLEMENT
amount = 1.000
```

Resultado:

```text
1.800 - 1.000
=
800 Kz
```

O motorista ainda deve:

```text
800 Kz
```

---

# 34. Exemplo completo

Imagine:

```text
Trip price = 10.000 Kz
Platform fee = 10%
```

Pagamento:

```text
Gross = 10.000
Fee   = 1.000
Driver = 9.000
```

Passageiro paga:

```text
10.000 Kz cash
```

ao motorista.

Financeiramente:

```text
Passenger
   │
   │ 10.000
   ▼
Driver
```

Ledger:

```text
PLATFORM_FEE
+1.000
```

Dívida:

```text
1.000 Kz
```

Motorista entrega 1.000 Kz:

```text
Settlement
1.000 Kz
```

Ledger:

```text
PLATFORM_FEE +1.000
SETTLEMENT   -1.000
```

Resultado:

```text
Outstanding = 0
```

---

# 35. O que acontece quando houver API de pagamento?

O modelo já está preparado para isso.

Atualmente:

```text
CASH
```

Futuramente:

```text
CARD
MOBILE_MONEY
BANK_TRANSFER
```

O fluxo digital será:

```text
Passenger
    │
    │ payment
    ▼
Payment Provider
    │
    ▼
Platform
```

Nesse cenário a plataforma efetivamente recebe o dinheiro.

Porém, o modelo CASH continuará existindo:

```text
CASH:

Passenger → Driver


DIGITAL:

Passenger → Provider → Platform
```

---

# 36. Diferença entre CASH e DIGITAL

## CASH

```text
Passenger
   │
   ▼
Driver
   │
   │ owes platform fee
   ▼
Platform
```

A plataforma possui:

```text
Account Receivable
```

do motorista.

---

## DIGITAL

```text
Passenger
   │
   ▼
Payment Provider
   │
   ▼
Platform
```

A plataforma recebe o dinheiro.

Depois pode existir um processo futuro de payout/settlement para o motorista.

---

# 37. Não usar uma única lógica de saldo para tudo

É importante não fazer:

```text
driver.balance
```

como fonte primária.

O problema seria possuir:

```text
drivers.balance
```

e:

```text
driver_ledger_entries
```

ao mesmo tempo.

Isso cria duas fontes de verdade.

Exemplo:

```text
drivers.balance = 2.000

ledger = 2.500
```

Qual está correto?

O ledger deve ser a fonte de verdade.

Se futuramente for necessário performance, pode ser criado um snapshot/cache:

```text
driver_balance_snapshot
```

mas ele deve ser derivado do ledger e não substituir o histórico.

---

# 38. Regras de integridade financeira

O sistema deve respeitar estas regras:

### Regra 1

Um payment `COMPLETED` com:

```text
method = CASH
```

não significa:

```text
platform received money
```

Significa:

```text
passenger paid driver
```

---

### Regra 2

Para um payment CASH concluído:

```text
platformFee > 0
```

deve gerar um:

```text
PLATFORM_FEE
```

no driver ledger.

---

### Regra 3

O mesmo payment não pode gerar duas vezes o mesmo ledger entry.

Por isso existe:

```text
reference
```

para idempotência.

Exemplo:

```text
PAYMENT_PLATFORM_FEE:{paymentId}
```

---

### Regra 4

Settlement nunca deve alterar diretamente o saldo.

Deve criar um movimento no ledger.

---

### Regra 5

Reconciliação deve ser derivada dos movimentos financeiros.

---

### Regra 6

Valores históricos não devem depender da configuração atual da plataforma.

Por isso:

```text
platformFee
platformFeeRate
driverAmount
```

ficam armazenados no próprio payment.

---

# 39. Cardinalidades

```text
User
 ├── 1:N Sessions
 ├── 1:N Challenges
 ├── 1:N Locations
 ├── 1:N Bookings
 ├── 1:N Notifications
 └── 1:0..1 Driver


Driver
 ├── 1:N DriverDocuments
 ├── 1:N Vehicles
 ├── 1:N Trips
 ├── 1:N DriverLedgerEntries
 ├── 1:N DriverSettlements
 └── 1:N DriverReconciliations


Vehicle
 ├── 1:N VehicleDocuments
 └── 1:N Trips


Trip
 └── 1:N Bookings


Booking
 ├── 1:N Payments
 └── 1:0..1 Review


Payment
 └── 0:N DriverLedgerEntries


DriverSettlement
 └── 1:N / 0:N LedgerEntries
```

---

# 40. Financial architecture

A arquitetura financeira atual pode ser resumida assim:

```text
                    PAYMENT
                       │
                       │
              ┌────────┴────────┐
              │                 │
            CASH             DIGITAL
              │                 │
              ▼                 ▼
           DRIVER           PROVIDER
              │                 │
              │                 ▼
              │              PLATFORM
              │
              ▼
       PLATFORM FEE
              │
              ▼
       DRIVER LEDGER
              │
              ▼
       OUTSTANDING DEBT
              │
              ▼
     DRIVER SETTLEMENT
              │
              ▼
           PLATFORM
```

---

# 41. Entidades financeiras

O domínio financeiro possui quatro entidades principais:

```text
Payment
   │
   │ gera obrigação
   ▼
DriverLedgerEntry
   │
   │ é liquidada por
   ▼
DriverSettlement
   │
   │ agrupada/conferida em
   ▼
DriverReconciliation
```

### Payment

O que o passageiro pagou.

### DriverLedgerEntry

O que isso significa financeiramente para o motorista.

### DriverSettlement

Quando a dívida foi efetivamente liquidada.

### DriverReconciliation

Fechamento/conferência de um período.

---

# 42. Resumo

O modelo não assume que a plataforma controla o dinheiro do passageiro.

Atualmente:

```text
Passenger → Cash → Driver
```

A plataforma apenas registra a comissão:

```text
Trip = 5.000
Fee = 500

Driver owes Platform = 500
```

O ledger registra essa obrigação:

```text
PLATFORM_FEE +500
```

Quando o motorista paga:

```text
SETTLEMENT -500
```

Resultado:

```text
Debt = 0
```

Portanto, o sistema funciona como um **marketplace com cobrança de comissão e acerto posterior com os motoristas**, e não como uma fintech/wallet.

Essa separação deixa o domínio preparado para adicionar gateways de pagamento no futuro sem destruir o modelo financeiro atual.
