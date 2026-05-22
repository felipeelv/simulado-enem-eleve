# Simulado ENEM ELEVE — Landing de Inscrição

Landing page estática para inscrição no Simulado ENEM Adaptado do Colégio ELEVE. Formulário grava direto em Google Sheets via Apps Script.

## Stack

- HTML/CSS/JS puros (sem framework, sem build)
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
├── fundo2.jpg                  # background fixo da página
├── logo-eleve-wordmark.png     # logo institucional
├── fonts/
│   ├── NeueMontreal-Regular.woff2
│   ├── NeueMontreal-Medium.woff2
│   └── NeueMontreal-Bold.woff2
└── google-apps-script.gs       # script pra colar no Apps Script
```

## Setup do backend (Google Sheets)

1. Crie um Google Sheets novo: **Inscrições Simulado ENEM ELEVE**
2. Em `Extensões → Apps Script`, cole o conteúdo de [`google-apps-script.gs`](google-apps-script.gs)
3. Salve, depois `Deploy → New deployment`:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copie a URL gerada (termina em `/exec`)
5. Em `index.html`, substitua a constante `GOOGLE_SCRIPT_URL`:
   ```js
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/SEU_ID/exec";
   ```
6. Commit + push → Vercel publica automaticamente

## Deploy local

Não tem build. Pra testar localmente:

```bash
npx serve -l 4173 .
# abra http://localhost:4173
```

## Deploy Vercel

Conectado ao repositório GitHub — push em `main` publica automático. Para deploy manual:

```bash
npx vercel --prod
```

## Campos coletados pelo formulário

| Campo | Tipo |
|---|---|
| Nome | text |
| Série | select (9º / 1ª EM / 2ª EM) |
| Turma | text |
| Tipo de carteira | radio (Destro / Canhoto) |
| Telefone/WhatsApp | tel |
| E-mail | email |
| Observação | textarea (opcional) |
| Política de frequência | checkbox (obrigatório) |
| Ciência dos materiais | checkbox (obrigatório) |

Cada submit grava uma linha na aba **Inscrições** do Sheets com data/hora local.

## Identidade visual

Segue o [Style Guide do Colégio ELEVE](https://github.com/felipeelv) — paleta laranja `#FF6F3D`, teal `#1AC2C2`, navy `#2D2D2D`, fonte Neue Montreal.
