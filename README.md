# Gangadevi — animated designer portfolio

SvelteKit (Svelte 5) · GSAP · Lenis. Static site, prerendered to plain HTML/CSS/JS.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → ./build  (static, deploy anywhere)
npm run preview  # serve the build locally
```

## Where things live

```
src/
├─ lib/
│  ├─ data/            ← ALL copy & content. Edit these, not the components.
│  │  ├─ site.js       ·  name, location, nav links, socials
│  │  ├─ hero.js       ·  headline, portrait, speech card, floating icons
│  │  ├─ work.js       ·  case-study grid (drives /work/[slug] too)
│  │  └─ resume.js     ·  about text, experience, skills, PDF link
│  ├─ styles/
│  │  └─ tokens.css    ← colours, fonts, spacing, motion — the whole look
│  ├─ motion/
│  │  ├─ pointer.svelte.js  ·  shared pointer state for parallax
│  │  ├─ gsap.js            ·  lazy GSAP + ScrollTrigger loader
│  │  └─ reveal.js          ·  `use:reveal` scroll-in action
│  ├─ components/      ← small reusable pieces (nav, card, icon, image…)
│  └─ sections/        ← page-level blocks (Hero, Work, Resume)
└─ routes/
   ├─ +layout.svelte  ·  Lenis smooth scroll + footer
   ├─ +page.svelte    ·  home = Hero + Work + Resume
   └─ work/[slug]/    ·  auto-generated case-study page per work.js entry
```

## Swapping in your exported assets

Replace the placeholders in `static/` — keep the filenames or update the paths in `src/lib/data/*`.

| Placeholder | Replace with |
|---|---|
| `static/img/portrait.svg` | `portrait.png` — transparent cut-out of the photo. Update `hero.js → photo.src` to `/img/portrait.png`. |
| `static/img/work-1…4.svg` | `work-1.png` … real case-study covers (4 : 3). |
| `static/icons/*.svg` | your real app-logo SVGs (Figma, XD, Notion, …). |
| `static/files/gangadevi-resume.pdf` | your real résumé PDF. |

Photo is greyscaled in CSS (`ParallaxImage` `grayscale` prop) — export it in colour.

## Custom cursor

An orange dot (`CustomCursor.svelte`, mounted once in the layout) trails the
pointer and expands into a labelled pill over any element tagged with the
`use:cursorLabel` action:

```svelte
<script>
  import { cursorLabel } from '$motion/cursor.svelte.js';
</script>

<a use:cursorLabel={'Nudge — Fintech App'}>…</a>
<div use:cursorLabel={{ label: "That's me", variant: 'view' }}>…</div>
```

Already tagged: the hero photo (`hero.js → photo.label`), each floating icon
(its `name`), every work-card cover (project title), the project rows, and the
case-study hero image. Mouse / trackpad only — touch devices keep the native
cursor.

The cursor is a **heart** (`--c-cursor` = `--c-ink`, the "Gangadevi" colour). As
it moves it drops a sparse **path of tiny falling hearts** on a full-screen
canvas — they sway, spin and fade under gravity. Tune in `CustomCursor.svelte`:
`EMIT_EVERY` (px between drops), `MAX_HEARTS`, the `size` range (kept 3–6px),
`decay`. Most are ink; ~16% pick up `--c-accent`. Skipped for reduced motion.

## Animation

- **Hero intro** — one GSAP timeline in `sections/HeroSection.svelte` (headline mask-reveal, icon stagger, photo clip-wipe, speech-card pop).
- **Floating icons** — each `FloatingIcon` runs its own CSS bob loop + pointer parallax on separate layers (no transform clashes). Tune `x/y/size/depth` per icon in `hero.js`.
- **Photo** — drifts opposite the icons + a slow breathe.
- **Scroll-ins** — `use:reveal` on any element; add `{{ y, delay, duration }}` to taste.
- **Work section 3D** — `use:tilt3d` (`motion/scene3d.js`) pitches / recedes / dims each
  card by its distance from the viewport centre; the centred card snaps flat, gets
  `.is-active` (accent border, drop shadow, sheen sweep). The `.grid` supplies the
  `perspective`. No-op under reduced motion.
- **Reduced motion** — every ambient animation and the GSAP intro are skipped when `prefers-reduced-motion: reduce`; content stays fully visible.

## Deploy

`npm run build` emits a static `build/`. Drop it on Netlify / Cloudflare Pages / Vercel / GitHub Pages. For a subpath host, set `paths.base` in `svelte.config.js`.
