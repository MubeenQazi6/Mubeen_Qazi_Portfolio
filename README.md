# Mubeen Qazi — Portfolio

Modern portfolio site for **Mubeen Qazi**, Software Quality Assurance Engineer.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- TypeScript

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
OPENAI_API_KEY=sk-your-openai-api-key
```

`OPENAI_API_KEY` powers the **AI Job Match** bot (GPT compares job descriptions against your real profile). On Netlify, add it under **Site settings → Environment variables**.

Place your resume at `public/Mubeen-Qazi-Resume.pdf`.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Content

All copy lives in `content/portfolio.ts`.
