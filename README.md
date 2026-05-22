# Simulado ENEM ELEVE — Landing de Inscrição

Landing page estática para inscrição no Simulado ENEM Adaptado do Colégio ELEVE. Formulário grava direto em Google Sheets via Apps Script.

**🌐 Produção:** https://simulado.colegioeleve.com
**🔄 Mirror Vercel:** https://simulado-enem-eleve.vercel.app

## Stack

- HTML/CSS/JS puros (sem framework, sem build)
- Background em CSS puro (gradient multi-camada com as cores da marca)
- Fonte institucional **Neue Montreal** servida localmente (woff2)
- Fallback Google Fonts (DM Sans)
- Deploy Vercel (estático)
- Persistência via **Google Apps Script + Google Sheets**

## Estrutura

```
.
├── index.html                  # página única
├── vercel.json                 # config de deploy + cache headers
├── favicon.ico
├── logo-eleve-wordmark.png     # logo institucional
├── fonts/
│   ├── NeueMontreal-Regular.woff2
│   ├── NeueMontreal-Medium.woff2
│   └── NeueMontreal-Bold.woff2
├── google-apps-script.gs       # script pra colar no Apps Script
└── README.md
```

## Setup do backend (Google Sheets)

1. Cria um Google Sheets novo: **Inscrições Simulado ENEM ELEVE**
2. Em `Extensões → Apps Script`, cola o conteúdo de [`google-apps-script.gs`](google-apps-script.gs)
3. Salva, depois `Deploy → New deployment`:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copia a URL gerada (termina em `/exec`)
5. Em `index.html`, substitui a constante `GOOGLE_SCRIPT_URL`:
   ```js
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/SEU_ID/exec";
   ```
6. Commit + push → Vercel publica automaticamente

## Deploy local

Sem build. Pra testar localmente:

```bash
npx serve -l 4173 .
# abre http://localhost:4173
```

## Deploy Vercel

Conectado ao repositório GitHub — push em `main` publica automático. Para deploy manual:

```bash
npx vercel --prod
```

### Domínio

- **Produção:** `simulado.colegioeleve.com` (CNAME na Cloudflare → `cname.vercel-dns.com`)
- O zone DNS de `colegioeleve.com` é gerenciado na Cloudflare (nameservers `donald.ns.cloudflare.com` / `kara.ns.cloudflare.com`), embora o domínio em si esteja registrado no Hostinger.

## Campos coletados pelo formulário

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome completo | text | sim |
| Série | select (9º ano / 1ª EM / 2ª EM) | sim |
| Turma | text | sim |
| Tipo de carteira | radio (Destro / Canhoto) | sim |
| Telefone/WhatsApp | tel | sim |
| E-mail | email | sim |
| Observação | textarea | não |
| Política de frequência | checkbox | sim |
| Ciência dos materiais | checkbox | sim |

Cada submit grava uma linha na aba **Inscrições** do Sheets vinculado, com data/hora local em pt-BR.

## Identidade visual

Segue o style guide do Colégio ELEVE:

| Token | Hex | Uso |
|---|---|---|
| `eleve-orange` | `#FF6F3D` | CTAs primários, eyebrow, acentos |
| `eleve-teal` | `#1AC2C2` | CTAs secundários, callouts |
| `eleve-purple` | `#8A2BE2` | Apenas em gradientes de texto (regra do guia) |
| `eleve-dark` | `#2D2D2D` | Texto sobre claro |
| `eleve-light` | `#F8F9FA` | Backgrounds claros |

Fonte: **Neue Montreal** (Regular 400 / Medium 500 / Bold 700) em woff2 subset Latino.

## Histórico

- 2026-05-22: Lançamento inicial. Setup completo: Vercel + GitHub + Apps Script + domínio `simulado.colegioeleve.com`.
