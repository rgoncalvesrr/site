# Documentação — Peau Santé (Site)

Pasta para documentos de apoio (marketing, processo, decisões).  
**Não** entram no site público (`pub/`); ficam só no repositório Git.

## Formato

Fonte da verdade: **Markdown (`.md`)** — fácil de versionar e editar.  
Para stakeholders (sem acesso ao GitHub), **não** compartilhe o repositório: use **Google Docs** ou **PDF** (veja abaixo).

## Índice

| Documento | Para quê |
|-----------|----------|
| [briefing-ads-leads.md](./briefing-ads-leads.md) | Estratégia + tracking + copy para campanhas Google/Meta (leads) |

---

## Como compartilhar com um profissional (sem acesso ao repo)

O GitHub é **privado**. Quem paga a conta / revisa mídia **não** precisa (nem deve) ser colaborador do repositório.

### Opção A — Google Docs (recomendado)

Melhor para quem só usa o navegador: link, comentários e “Sugestões”.

1. Abra [Google Drive](https://drive.google.com) → **Novo** → **Documentos Google**.
2. No Cursor, abra `docs/briefing-ads-leads.md`.
3. Selecione tudo (`Ctrl+A`) → copie (`Ctrl+C`).
4. Cole no Docs (`Ctrl+V`).  
   - Se a formatação vier estranha: no Docs use **Arquivo → Importar** e envie o `.md`, **ou** cole primeiro num converter Markdown→Docs (ex.: cola no [Dillinger](https://dillinger.io/) / preview e copie o HTML), **ou** exporte PDF (opção B) e anexe no Drive.
5. No Docs: **Compartilhar** → e-mail do profissional → permissão **Leitor** ou **Comentador** (não “Editor”, se quiser controlar o texto).
6. Envie o link. Pronto — só navegador, sem GitHub.

**Dica:** quando o briefing mudar no Git, atualize o Docs (cole de novo a versão nova) ou anote a data no topo (“versão 2026-09-23”).

### Opção B — PDF por e-mail / WhatsApp

Bom para “arquivo anexo” sem pedir conta Google.

**No Cursor (mais simples):**

1. Extensões → busque **Markdown PDF** (autor yzane) → Instalar.
2. Abra `docs/briefing-ads-leads.md`.
3. `Ctrl+Shift+P` → **Markdown PDF: Export (pdf)**.
4. O PDF nasce na mesma pasta `docs/`.
5. Envie o PDF por e-mail ou WhatsApp.

**Sem extensão (alternativa):**

1. Abra o `.md` → ícone de preview / “Open Preview”.
2. `Ctrl+P` (imprimir) → destino **Salvar como PDF**.

Não suba PDF grande no Git como rotina — gere na hora de enviar. A fonte continua sendo o `.md`.

### O que evitar

- Adicionar o stakeholder como colaborador do repo só para ler um briefing.
- Links de “raw” do GitHub (pedem login e assustam quem não é de tech).
- Ferramentas online desconhecidas com dados sensíveis da clínica (prefira Drive / PDF local).
