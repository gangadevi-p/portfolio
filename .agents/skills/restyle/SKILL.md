---
name: restyle
description: >
  Use to change the overall look of the portfolio — colours (background, text,
  the orange accent), fonts, spacing, corner roundness, and animation speed.
  Triggers: "change the accent colour", "make the background lighter/darker",
  "use a different heading font", "make the corners rounder", "the text is too
  small", "make the animations faster/slower", "I want a blue theme instead of
  orange". These are global settings in one file. For the text content itself use
  `edit-text`.
---

# Restyle the site (colours, fonts, spacing)

The entire look is controlled by one small file: `src/lib/styles/tokens.css`.
Change a value there and it updates everywhere on the site consistently.

## Say things like

- "Change the accent from orange to a teal — something like #12a594."
- "The background is too muddy, make it a cleaner off-white."
- "Use a rounder card corner — like 20px."
- "Headings feel too huge on mobile."
- "Slow the animations down a bit."

## What each value does

| Value in `tokens.css` | What it controls |
|---|---|
| `--c-bg` | Page background colour |
| `--c-surface` | Cards / raised panels background |
| `--c-ink` | Main text colour (also the "Gangadevi" display colour and the cursor) |
| `--c-ink-soft` | Muted / secondary text |
| `--c-line` | Hairline borders and dividers |
| `--c-accent` | The highlight colour — links, active states, the cursor dot (currently orange `#ff6a3d`) |
| `--c-ink-rgb` | Same as `--c-ink` but written as `R, G, B` numbers — used for see-through versions. **If you change `--c-ink`, update this to match.** |
| `--font-body` | Body text font (currently Archivo) |
| `--font-display` | Big headline font (currently Anton) |
| `--fs-display` | Size of the giant name headline |
| `--fs-h2` | Section heading size |
| `--fs-lead` | Large intro-paragraph size |
| `--fs-body` / `--fs-small` | Normal and fine-print text size |
| `--maxw` | How wide the content gets on large screens |
| `--pad-x` / `--pad-y` | Left/right and top/bottom breathing room |
| `--radius` / `--radius-card` | Corner roundness — general / cards |
| `--ease-out`, `--ease-back` | Animation "feel" curves — leave unless asked |
| `--dur-fast` / `--dur-med` | Animation durations (seconds). Bigger = slower. |
| `--parallax-range` | How far things drift as the pointer moves |

The `clamp(min, flexible, max)` values scale with screen size: the first number
is the phone size, the last is the big-screen size. To make headings smaller on
mobile, lower the first number.

## Steps

1. Open `src/lib/styles/tokens.css` and change only the value(s) asked for.
   Keep the `--name:` and the trailing `;`.
2. If you change `--c-ink`, also update `--c-ink-rgb` to the same colour in
   `R, G, B` form (e.g. `#3a221d` → `58, 34, 29`).
3. Changing a font name here only works if that font is actually loaded. Check
   `src/app.html` / `src/app.css` for the current `<link>` to Google Fonts. If
   they want a font that isn't loaded, add the matching Google Fonts link too,
   or tell them it needs to be added.
4. Preview: running dev server, or `npm run dev` → `http://localhost:5173`.
   Scroll the whole page — a colour change touches every section.
5. Describe the change plainly and offer to publish.

## Gotchas

- Colours must stay readable: dark text on a light background (or vice-versa).
  If a requested combination would be low-contrast, flag it before applying.
- Don't delete tokens — other files expect them to exist.
- Animation curves (`--ease-*`) are easy to make look broken; only touch them on
  an explicit request.
