# Briefing: campanhas de leads (Google Ads + Meta Ads)

**Projeto:** Peau Santé — site / landing  
**Objetivo deste documento:** alinhar estratégia, tracking e copy com um profissional de mídia, sem gastar verba às cegas.  
**Atualizado em:** 2026-09-23  
**Status:** rascunho para revisão externa (não é plano de mídia fechado)

---

## 1. Contexto do negócio

| Item | Detalhe |
|------|---------|
| Marca | Peau Santé |
| Segmento | Biomedicina estética / tratamentos faciais |
| Cidade | Santo André (SP) — ABC |
| Especialista | Dra. Rosana Pereira (+12 anos) |
| Site | https://peausante.com.br |
| WhatsApp | +55 11 99309-2933 (`wa.me/5511993092933`) |
| Endereço | Av. Industrial, 780, Sala 313 — Jardim Park Business, Jardim, Santo André - SP, 09080-500 |
| Prova social | Google ~nota 5,0 — https://g.page/r/CbkVPPZtKDyIEAE |
| Instagram | @peauetsante |
| Facebook | peausante |

### Páginas de destino (LPs)

| Campanha / tema | URL |
|-----------------|-----|
| Institucional / marca | https://peausante.com.br/ |
| Toxina botulínica (Botox) | https://peausante.com.br/botox/ |
| Limpeza de pele | https://peausante.com.br/limpeza-de-pele/ |
| Privacidade (LGPD) | https://peausante.com.br/politica-privacidade.html |

### Conversão no site (já implementada)

1. **Primária — “Agendar avaliação”**  
   Abre modal (nome + WhatsApp; e-mail opcional + consentimento LGPD) e envia para o WhatsApp com os dados.  
   Evento: `generate_lead` (dataLayer) / `Lead` (Meta, se Pixel ativo).

2. **Secundária — “Falar no WhatsApp”**  
   Abre WhatsApp direto, sem modal.  
   Evento: `contact` (dataLayer) / `Contact` (Meta, se Pixel ativo).

**Regra de ouro comercial:** anunciar *avaliação / conversa*, não preço fechado nem resultado clínico garantido. Estética tem políticas rígidas no Google e no Meta.

---

## 2. Estratégia mínima (fase 1)

### Por que estratégia + tracking primeiro

Sem evento de lead medido, o algoritmo otimiza clique barato — não paciente.  
Definir **CPL máximo aceitável** (custo por lead) e revisar em 7 dias com tracking validado.

### Canais na fase 1

| Canal | Papel | Prioridade |
|-------|--------|------------|
| Google Search | Intenção alta (quem já busca o serviço + cidade) | Alta — começar aqui |
| Meta (Feed/Stories) | Descoberta local + reforço de marca | Média — teste paralelo pequeno |
| Display / YouTube amplos | — | Evitar no início |

### Estrutura sugerida de campanhas

1. **Search — Botox** → LP `/botox/`
2. **Search — Limpeza de pele** → LP `/limpeza-de-pele/`
3. **Search — Marca / clínica** (opcional) → LP `/`
4. **Meta — 1 campanha** geo ABC, criativos alinhados à copy abaixo, destino LP ou WhatsApp (definir com o gestor)

### Público (ponto de partida — ajustar com o profissional)

- **Geo:** Santo André + ABC (raio / cidades vizinhas conforme orçamento)
- **Idade:** faixa a validar (ex.: 25–45 / 30–55) conforme mix Botox vs limpeza
- **Meta:** interesses em estética / cuidados com a pele — **sem lookalike** até haver volume de leads reais (orientação típica: dezenas de leads qualificados)
- **Exclusões:** fora da região de atendimento; termos irrelevantes no Search (cursos, vagas, DIY, etc.)

### O que evitar no início

- Abrir verba nacional ou “interesse amplo” sem geo
- Otimizar só por clique / sessão sem conversão de lead
- Criativo com promessa milagrosa, preço “a partir de” sem base, ou antes/depois sensacionalista (risco de reprovação)
- Contar clique de WhatsApp como único KPI de otimização (é mais barato e menos qualificado que o modal)

### Orçamento (definição a fechar com o profissional)

- Começar **estreito** (2 campanhas Search + 1 teste Meta)
- Registrar: CPL do evento `generate_lead` e % desses leads que viram **agendamento real** na clínica
- Se CPL ficar 2–3× acima do teto por ~7 dias com tracking ok → pausar criativo/audience e revisar, não só “aumentar verba”

---

## 3. Tracking — estado atual e checklist

### Já no código do site

| Item | Valor / status |
|------|----------------|
| Google Tag Manager | `GTM-PSBGFN7` |
| Evento lead (modal) | `dataLayer` → `event: generate_lead`, `lead_source` |
| Evento contato (WhatsApp) | `dataLayer` → `event: contact`, `contact_method: whatsapp` |
| Meta Pixel ID | **Vazio de propósito** em `pub/assets/js/conversion.js` (`META_PIXEL_ID`) — Pixel **não** dispara até preencher |
| Eventos Meta (quando Pixel ativo) | `PageView`, `Lead`, `Contact` |

Arquivo de referência: `pub/assets/js/conversion.js`.

### Definição de conversão para mídia

| Prioridade | Ação do usuário | Evento site | Uso sugerido |
|------------|-----------------|-------------|--------------|
| **Primária** | Envia modal “Agendar” → WhatsApp | `generate_lead` / `Lead` | Otimizar e reportar CPL |
| Secundária | Clica WhatsApp direto | `contact` / `Contact` | Monitorar; não otimizar só por isto no início |

### Checklist — Google (antes de escalar verba)

- [ ] GA4 conectado ao container GTM `GTM-PSBGFN7`
- [ ] Eventos `generate_lead` e `contact` visíveis no GA4 (DebugView / tempo real)
- [ ] `generate_lead` marcado como **conversão** (e, se fizer sentido, `contact` como secundária)
- [ ] Google Ads: conversão importada do GA4 (ou tag de conversão equivalente)
- [ ] UTMs padronizados nos anúncios, por exemplo:
  - `utm_source=google` / `utm_medium=cpc`
  - `utm_campaign=botox-santo-andre` (ou limpeza / marca)
  - `utm_content=` criativo ou grupo de anúncios

### Checklist — Meta (antes de escalar verba)

- [ ] Criar Pixel + conjunto de dados no Events Manager
- [ ] Preencher `META_PIXEL_ID` no site e publicar (deploy)
- [ ] Validar `PageView`, `Lead` e `Contact` em **Test Events**
- [ ] Domínio verificado + política de privacidade acessível (já existe LP de privacidade)
- [ ] (Opcional fase 2) Conversions API (CAPI) — não bloqueia o dia 1

### Pedido explícito ao profissional de mídia

1. Fechar tracking (GA4 + Ads + Pixel) **antes** de subir verba.  
2. Rodar 7–14 dias: Search (Botox + Limpeza) + teste Meta geo ABC.  
3. Reportar semanal: CPL (`generate_lead`), volume, e (com a clínica) quantos viraram agendamento.  
4. Revisar a copy abaixo sob políticas de anúncios de **saúde / beleza**.

---

## 4. Copy — rascunho para revisão

Tom alinhado ao site: naturalidade, avaliação sem compromisso, Santo André, Dra. Rosana.  
**Não** prometer resultado clínico, eliminação de rugas, “milagre” ou preço sem contexto.

### 4.1 Google Search — Botox

| Campo | Texto sugerido |
|-------|----------------|
| Título 1 | Botox em Santo André |
| Título 2 | Avaliação com a Dra. Rosana |
| Título 3 | Resultados naturais \| Peau Santé |
| Descrição 1 | Suavize linhas com protocolo personalizado. Agende avaliação — valores após análise da pele. |
| Descrição 2 | Clínica no Jardim, Santo André. +12 anos de experiência. Fale pelo WhatsApp. |
| URL final | https://peausante.com.br/botox/ |

### 4.2 Google Search — Limpeza de pele

| Campo | Texto sugerido |
|-------|----------------|
| Título 1 | Limpeza de Pele em Santo André |
| Título 2 | Pele renovada com cuidado profissional |
| Título 3 | Peau Santé \| Dra. Rosana Pereira |
| Descrição 1 | Remoção de impurezas, controle de oleosidade e textura mais uniforme. Agende sua sessão. |
| Descrição 2 | Atendimento com horário marcado. Peça avaliação pelo WhatsApp. |
| URL final | https://peausante.com.br/limpeza-de-pele/ |

### 4.3 Meta — textos principais (feed / stories)

1. Linhas de expressão te incomodam? Avaliação personalizada em Santo André — resultados com naturalidade. Agende pelo WhatsApp.  
2. Limpeza de pele profunda com protocolo sob medida. Peau Santé · Dra. Rosana Pereira (+12 anos). Sem compromisso para avaliar.  
3. Clínica de biomedicina estética no ABC. Nota alta no Google. Quer saber se o tratamento faz sentido para você? Chama no WhatsApp.

### 4.4 CTAs

| Usar | Evitar |
|------|--------|
| Agendar avaliação | Garanta seu resultado |
| Falar no WhatsApp | Elimine rugas em 1 sessão |
| Pedir avaliação | Por apenas R$… (sem base / política) |

### 4.5 Prova social (com cuidado)

- Avaliações no Google · nota ~5,0 (link do perfil Google)
- Nome da especialista + cidade
- Antes/depois: **somente** se o profissional validar política da plataforma e houver consentimento das pacientes

### 4.6 Termos / keywords (ponto de partida — Search)

**Incluir (exemplos):** botox Santo André; toxina botulínica Santo André; limpeza de pele Santo André; estética facial Santo André; clínica estética Jardim Santo André / ABC.

**Excluir (exemplos):** curso, vaga, emprego, “em casa”, treinamento, preço genérico de outras cidades, marcas/produtos irrelevantes.

O gestor deve expandir/negar com o relatório de termos de pesquisa.

---

## 5. Entregáveis esperados do profissional

1. Plano de contas (campanhas, orçamento diário sugerido, KPIs).  
2. Tracking validado (print do GA4 DebugView / Test Events Meta).  
3. Criativos finais (texto + imagem/vídeo) aprovados sob política.  
4. Relatório semanal simples: impressões, cliques, leads (`generate_lead`), CPL, observações.  
5. Alinhamento com a clínica sobre o que conta como **agendamento** (offline), para fechar o funil.

---

## 6. Próximos passos técnicos no site (equipe / agente)

Quando houver ID do Pixel Meta:

1. Preencher `META_PIXEL_ID` em `pub/assets/js/conversion.js`.  
2. Build/deploy via fluxo `develop` → `main`.  
3. Validar eventos no Events Manager.  
4. Confirmar no GTM/GA4 se tags de conversão do Ads estão publicadas.

---

## Histórico

| Data | Alteração |
|------|-----------|
| 2026-09-23 | Criação do briefing (estratégia, tracking, copy) a partir do estado do site |
