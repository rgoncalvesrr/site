# AGENTS.md — Peau Santé (Site)

Guia para agentes de IA e novos chats. Leia isto antes de editar ou publicar.

## O que é o projeto

Site estático (landing) da **Peau Santé**, clínica de **Biomedicina Estética** em Santo André (SP).

- **Especialista:** Dra. Rosana Pereira (+12 anos)
- **Produção:** https://peausante.com.br
- **Repo:** https://github.com/rgoncalvesrr/site
- **Contato / WhatsApp:** +55 11 99309-2933 (`wa.me/5511993092933`)
- **Endereço:** Av. Industrial, 780, Sala 313 — Jardim Park Business, Jardim, Santo André - SP, 09080-500
- **CNPJ:** 18.416.452/0001-14
- **Redes:** Instagram `@peauetsante`, Facebook `peausante`
- **Google:** https://g.page/r/CbkVPPZtKDyIEAE (nota ~5,0)

## Stack

- HTML estático em `pub/` (não é React/SPA)
- Tailwind CSS 3: `input.css` → `pub/assets/css/style.min.css`
- JS de conversão: `pub/assets/js/conversion.js` (WhatsApp, modal de lead, GTM)
- Ícones: subset local `pub/assets/js/lucide-subset.js` (não usar CDN unpkg)
- Fontes self-hosted em `pub/assets/fonts/` (Inter subset + Playfair)

### Comandos

```bash
npm install
npm run dev    # watch Tailwind
npm run build  # CSS minificado para produção
```

Pré-visualização: servir a pasta `pub/` (ex.: `python3 -m http.server 8765 --directory pub`).

## Páginas

| URL | Arquivo |
|-----|---------|
| `/` | `pub/index.html` |
| `/botox/` | `pub/botox/index.html` |
| `/limpeza-de-pele/` | `pub/limpeza-de-pele/index.html` |
| `/politica-privacidade.html` | `pub/politica-privacidade.html` |

Assets públicos: `pub/assets/` (imagens, CSS, JS, fontes).  
Foto oficial: `pub/assets/images/dra-rosana-pereira.webp`.

## Fluxo Git (obrigatório)

- **`main`**: produção. **Nunca** commit, amend ou push direto em `main`.
- **`develop`**: desenvolvimento. Todo trabalho novo começa aqui (ou feature a partir de `develop`).
- Features: `cursor/...` ou `feature/...` → PR para `develop`.
- Produção: PR `develop` → `main` → deploy automático.
- Regra Cursor espelhada em `.cursor/rules/git-workflow.mdc`.
- Branch protection na `main`: merge só via PR.

## Deploy / Netlify

- Hosting: **Netlify** (site `peausante`)
- Publish dir: `pub` (`netlify.toml`)
- Build: `npm run build`
- CI: `.github/workflows/deploy-netlify.yml` — dispara em **push na `main`**
- Secrets no GitHub (já configurados):
  - `NETLIFY_SITE_ID` — ID do site Netlify
  - `NETLIFY_AUTH_TOKEN` — token de API Netlify
- Site ID conhecido: `c084af94-55e0-414a-8df9-efbc010c6302`
- Deploy manual (se necessário, autenticado):  
  `npx netlify-cli deploy --prod --dir=pub`

Há plugin Netlify de purge Cloudflare que às vezes falha com **401**; o deploy Netlify em si costuma funcionar. Em dúvida, hard-refresh ou purge manual no Cloudflare.

## Conversão e UX (decisões atuais)

- CTA primário: **Agendar avaliação** (modal leve: nome + WhatsApp; e-mail opcional).
- WhatsApp flutuante / CTA secundário: **abre WhatsApp direto** (`openWhatsApp`), sem modal.
- Sticky bar mobile: WhatsApp + Agendar.
- Tracking: GTM `GTM-PSBGFN7`; eventos `generate_lead` / `contact` no `dataLayer`.
- Pixel Meta: só inicia se `META_PIXEL_ID` em `conversion.js` estiver preenchido (hoje vazio de propósito).
- Prova social: reviews Google embutidas na home + link para o perfil Google.
- Não inventar avaliações nem dados clínicos.

## SEO / GEO

Já existentes em `pub/`:

- `robots.txt`, `llms.txt`, `sitemap.xml` (URLs canônicas, sem duplicar `index.html`)
- `rel="canonical"` + JSON-LD (`MedicalBusiness`/`LocalBusiness`, `Person`, `FAQPage`, etc.) nas páginas principais

Google não exige `llms.txt` para ranquear; manter como apoio a crawlers de IA. Preferir conteúdo citável (entidade clara: clínica + Dra. Rosana + cidade + serviços).

## Performance (PageSpeed)

Prioridades já aplicadas / a preservar:

- Inter subset (~52KB), não a fonte completa
- Lucide local (`lucide-subset.js`), não CDN
- Hero com `fetchpriority="high"`; sem `loading="lazy"` na LCP
- Contraste adequado nos CTAs WhatsApp
- `<main>` e labels acessíveis nos ícones sociais

Ao adicionar ícones Lucide, atualizar o subset — não voltar ao `unpkg`.

## Convenções de edição

- Preferir editar HTML em `pub/` e CSS em `input.css` + `npm run build`.
- Manter padrões visuais e copy existentes (PT-BR).
- Não commitar `node_modules/` nem `.netlify/` (estão no `.gitignore`).
- Não expor tokens/secrets no código ou no chat.
- Commits: mensagem curta em português, foco no “porquê”; só quando o usuário pedir (exceto se pedir explicitamente publicar/PR).
- PRs: usar `gh`; base default = `main` só para ir a produção; trabalho diário → PR para `develop` quando couber.

## Checklist rápido em chat novo

1. Conferir branch (`develop`, não `main`).
2. Entender se a tarefa é conteúdo, conversão, SEO ou deploy.
3. Após mudanças visuais/CSS: `npm run build`.
4. Para ir ao ar: commit em `develop` → PR → merge em `main` (Actions publica).
5. Validar https://peausante.com.br se for deploy.
