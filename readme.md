## Infoprodutos e Produtos Físicos

## 1. VISÃO GERAL DO PROJETO

## Desenvolver uma plataforma de e-commerce robusta e segura que permita:

- Venda de infoprodutos (cursos, ebooks, templates, etc.)

- Venda de produtos físicos (com gestão de estoque e logística)

- Integração com múltiplos métodos de pagamento de países lusófonos

- Sistema de autenticação seguro com 2FA obrigatório

- Painel administrativo e de usuários intuitivos

## 2. REQUISITOS FUNCIONAIS

## 2.1 GESTÃO DE PRODUTOS

## Infoprodutos

- Upload de arquivos (PDF, vídeos, conteúdo em ZIP)

- Controle de acesso (links de download únicos, acesso por tempo limitado)

- Histórico de downloads

- Proteção contra compartilhamento não autorizado

- Entrega automática após pagamento confirmado

## Produtos Físicos

- Gestão de estoque em tempo real

- Múltiplas variações (tamanho, cor, quantidade)

- Integração com sistemas de logística

- Cálculo automático de frete

- Rastreamento de pedidos

- Notificações de status de entrega

## 2.2 CARRINHO E CHECKOUT

- Carrinho persistente (salvo na sessão/conta)

- Cálculo automático de impostos e taxas regionais

- Cupons e códigos de desconto

- Gestão de itens digitais vs físicos na mesma compra

- Estimativa de entrega para produtos físicos

- Checkout em uma página (minimizar abandono)

## 3. SISTEMA DE PAGAMENTO INTEGRADO

## 3.1 MÉTODOS DE PAGAMENTO - PORTUGAL

Cartão de Crédito/Débito


- Procesadora: SIBS (Sistema Interbancário Português) / UNICRE

- PCI-DSS compliance obrigatório

- Integração com Stripe, Square ou provider local (SIBS Gateway)

Referências Bancárias

- Multibanco (transferência)

- IBAN PT

- SEPA Direct Debit

Wallets Digitais

- PayPal Portugal

- Apple Pay

- Google Pay

- MB WAY (aplicação de pagamento imediato portuguesa)

## 3.2 MÉTODOS DE PAGAMENTO - ANGOLA

- Integração com providers como PAYBAN, EMIS Angola ou similar

## 3.3 MÉTODOS DE PAGAMENTO - MOÇAMBIQUE

Integração com providers locais

Transferência Bancária

- IBAN MOZ

- Bancos principais

- mCodigos (Vodacom)

- M-Pesa (Vodacom)

- Emola (TDM)

- USSD PUSH

Moeda Local

- Metical (MZN)

- Taxa de câmbio atualizada


A plataforma deve ter a capacidade de integrar várias API de pagamento, de Moçambique, Angola e Portugal.

Numa primeira fase será feita a Integração de API da EUPAGO de Portugal uma vez que é a mais facil de adquirir, depois será integrado a API da Emis, e por último de Moçambique.

A plataforma deve oferecer segurança aos clientes que compram artigos fisicos. no sentido de os vendedores de produtos fisicos receberem pagamentos após a confrimação da entrega do produto, enquanto issoos valores ficam na conta da plataforma.

O nome da plataforma será RESULT.COM