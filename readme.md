# Plataforma de Mobilidade Partilhada

Aplicação de mobilidade para gerir viagens partilhadas, reservas e a operação de motoristas. O repositório reúne uma API, uma aplicação móvel e uma aplicação web.

## Componentes

| Diretório | Tecnologia | Finalidade |
| --- | --- | --- |
| `server/api` | NestJS, Prisma, PostgreSQL e Redis | API REST, autenticação, regras de negócio e documentação da API. |
| `client/mobile` | Expo, React Native e Expo Router | Aplicação móvel para passageiros e motoristas. |
| `client/web` | Next.js e React | Aplicação web. |

## Funcionalidades implementadas

- Autenticação por OTP e perfis de utilizador (`ADMIN`, `DRIVER` e `PASSENGER`)
- Gestão e validação de motoristas, documentos e veículos
- Criação, pesquisa e gestão de viagens
- Reservas, confirmação, cancelamento e conclusão de viagens
- Conversas associadas a reservas
- Notificações, avaliações e denúncias
- Localizações e rotas

## Pré-requisitos

- Node.js 20 ou superior
- pnpm
- PostgreSQL
- Redis

## Configuração da API

Entre na pasta da API e instale as dependências:

```bash
cd server/api
pnpm install
```

Crie `server/api/.env` com os valores adequados ao seu ambiente:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cisclient"
REDIS_URL="redis://localhost:6379"
PORT=8080
FRONTEND_URL="http://localhost:3000"

JWT_SECRET="altere-esta-chave"
JWT_ACCESS_SECRET="altere-esta-chave-tambem"
ENCRYPTION_KEY="uma-chave-segura"
BCRYPT_SALT_ROUNDS=10

EMAIL_DEFAULT_ADMIN="admin@example.com"
PASS_DEFAULT_ADMIN="altere-esta-palavra-passe"
```

Gere o cliente Prisma, aplique as migrações e inicie a API em modo de desenvolvimento:

```bash
pnpm generate
pnpm prisma migrate deploy
pnpm dev
```

A API fica disponível em `http://localhost:8080` e a documentação interativa em `http://localhost:8080/docs`.

> Para desenvolvimento local de novas migrações, use `pnpm migrate` e informe o nome pedido pelo Prisma. O comando `pnpm seed` cria o administrador definido no ficheiro `.env`.

### Serviços com Docker

O ficheiro `server/api/docker-compose.yml` disponibiliza PostgreSQL e Redis, além de uma definição para a API:

```bash
cd server/api
docker compose up -d postgres redis
```

## Aplicação móvel

```bash
cd client/mobile
pnpm install
pnpm start
```

Depois, use o Expo para abrir a aplicação num dispositivo, emulador ou navegador. Os ecrãs estão organizados por tipo de utilizador em `app/(passenger)` e `app/(driver)`.

## Aplicação web

```bash
cd client/web
pnpm install
pnpm dev
```

Por padrão, a aplicação web inicia em `http://localhost:3000`.

## Comandos úteis

| Área | Comando | Descrição |
| --- | --- | --- |
| API | `pnpm dev` | Inicia a API com recarregamento automático. |
| API | `pnpm test` | Executa os testes unitários. |
| API | `pnpm test:e2e` | Executa os testes de integração. |
| API | `pnpm studio` | Abre o Prisma Studio. |
| Mobile | `pnpm start` | Inicia o Expo. |
| Mobile | `pnpm lint` | Analisa o código da aplicação móvel. |
| Web | `pnpm dev` | Inicia o Next.js em desenvolvimento. |
| Web | `pnpm build` | Gera a versão de produção. |

## Estrutura da API

```text
server/api/src
├── infra/        # Prisma, Redis, segurança, SMS e HTTP
├── modules/      # auth, booking, driver, trip, vehicle, etc.
└── shared/       # entidades, interfaces e utilitários comuns
```

O esquema e as migrações da base de dados encontram-se em `server/api/prisma`.

## Contribuição

1. Crie uma branch a partir de `main`.
2. Faça alterações pequenas e focadas.
3. Execute os testes ou a validação aplicável.
4. Abra um pull request, explicando a alteração e como a testou.

## Licença

O repositório ainda não declara uma licença. Antes de o distribuir ou reutilizar publicamente, defina uma licença no projeto.
