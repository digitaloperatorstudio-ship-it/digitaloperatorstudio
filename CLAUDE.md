# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What this is

Digital Operator Studio (DOS) is a static website deployed on Vercel — a suite of productised AI tools for solo founders. The tools themselves run inside Claude as public artifacts. Built and run solo by Phil.

## File structure

- `index.html` — homepage (hero, kit listings, how it works, about, newsletter, contact, featured-on badges, footer)
- `kit-1.html` — setup guide for Kit 01: Feedback Synthesiser
- `vercel.json` — URL rewrite: `/kit-1` → `/kit-1.html`
- `favicon.ico` — site favicon

No build system, no package manager, no dependencies — plain HTML, CSS, and vanilla JS only.

## Deployment

Push to `main` — Vercel auto-deploys. No local dev server needed, open HTML files directly in browser to preview.

## Design system

CSS custom properties defined in `:root` in each file:

| Variable | Value | Role |
|---|---|---|
| `--ink` | `#0D0D0D` | Primary text, dark fills |
| `--paper` | `#F5F0E8` | Background (warm off-white) |
| `--accent` | `#C8401A` | Burnt orange - CTAs, labels, highlights |
| `--mid` | `#6B6560` | Secondary text, captions |
| `--rule` | `rgba(13,13,13,0.15)` | Borders and dividers |

**Fonts (Google Fonts):**
- `Bebas Neue` — display headings, nav logo, hero titles
- `Lora` — body copy, paragraph text
- `DM Mono` — labels, tags, micro text, monospace elements

## Writing conventions

- No em dashes — use hyphens (-) instead
- No hype, no motivational padding, no "excited to announce"
- Direct and specific — founder-to-founder tone
- Short sentences preferred

## Integrations

- **Contact form**: Formspree (`https://formspree.io/f/xojbqnbn`)
- **Newsletter**: Buttondown (`https://buttondown.com/api/emails/embed-subscribe/digitaloperatorstudio`)
- **Kit 01 artifact**: `https://claude.ai/public/artifacts/a30c03ba-0879-4120-bb3b-a8b7fe0539f7`
- **Scroll animations**: `.reveal` class + `IntersectionObserver` in each page's inline `<script>`

## Adding a new kit

1. Create `kit-N.html` following `kit-1.html` structure (single column, `max-width: 720px`)
2. Add URL rewrite in `vercel.json`
3. Add kit section in `index.html` following `#kit-1` pattern
4. Add to nav links in `index.html`

## Featured on badges (both pages, above footer)

Fazier, Peerlist, Uneed, Launch (trylaunch.ai) — all in `.featured-on` section above `<footer>`.

## Git

Commit messages should be short and descriptive. Push to `main` to deploy.
