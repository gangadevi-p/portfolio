---
name: manage-projects
description: >
  Use to add, remove, reorder, or edit the case-study cards in the "Projects"
  grid on the portfolio, and to edit the detailed KIET Student App case-study
  page. Triggers: "add a new project", "add a case study", "remove the travel
  project", "put the retail one first", "change the summary/tags/year on a
  project", "rename a project", "edit the KIET case study", "update the KIET
  stats / personas / reviews". For the plain text on the home page use
  `edit-text`; for the cover images and screenshots use `replace-images`.
---

# Manage the Projects grid & case studies

The "Projects" section is a grid of case-study cards. Each card is one entry in
`src/lib/data/work.js`, and **each entry automatically builds its own page** at
`/work/<slug>`. Add an entry → the page appears. Remove it → the page is gone.

One project — **KIET Student App** — has a full custom-designed page. All of its
content is in `src/lib/data/kiet.js`.

## Say things like

- "Add a project: *Nova Bank App*, 2025, Product Designer, tags Mobile and
  Fintech, summary 'A friendlier way to move money.'"
- "Remove the *Long Way — Travel Brand* project."
- "Move *Cura — Patient Portal* to the top of the grid."
- "Change the year on the retail dashboard to 2025."
- "Add a *Case study coming soon* tag to Cura."
- "In the KIET case study, change the timeline from 4 months to 5."
- "Add a new review to the KIET page."
- "Update the KIET impact numbers — 7,200 acquisitions, 900 daily users."

## Add a project

Add an object to the `work` array in `src/lib/data/work.js`. Copy an existing one
and edit every field:

```js
{
  slug: 'nova-bank-app',        // lowercase-with-dashes, no spaces — becomes the URL /work/nova-bank-app
  title: 'Nova Bank App',
  year: '2025',
  role: 'Product Designer',
  summary: 'A friendlier way to move money.',   // one short sentence
  cover: '/img/work-2.svg',     // picture for the card — see replace-images to add a real one
  tags: ['Mobile', 'Fintech']  // small pills on the card
}
```

- Put the entry where you want it to appear (top of the array = top-left of the grid).
- **Do not** add `bespoke: true` — that's only for projects that have a
  hand-built page (currently just KIET).
- Until a real cover image is supplied, point `cover` at any existing file in
  `static/img/` (e.g. `/img/work-2.svg`) so the card isn't broken. Then use
  `replace-images` to drop in the real one.
- The generated page shows the title, role, year, summary, tags, the cover
  image, and placeholder body text. That's expected — the grid card is the main
  deliverable.

## Remove a project

Delete its whole `{ … }` block from the `work` array in `work.js` (including the
trailing comma). If it had its own images in `static/`, they can be left or
cleaned up later — leaving them does no harm.

## Reorder

Cut and paste the `{ … }` blocks into the desired order in the `work` array.

## Edit a project's card

Change the field on its entry in `work.js`: `title`, `year`, `role`, `summary`,
or the `tags` list. Changing `slug` changes the page's URL — only do it if asked,
and mention that any existing link to the old URL will break.

## Edit the KIET Student App case study

Everything on that page is in `src/lib/data/kiet.js`, grouped into named blocks:

| Block | Controls |
|---|---|
| `kietMeta` | title, role, year, summary, cover (also mirrors the grid card) |
| `hero` | top badge, big title (`titleLead` + `titleAccent`), the 3 stat pills, intro line, the 2 phone images |
| `overview` | overview paragraph, the Problem and Solution cards |
| `team` | the facts pills, the "Download App" button link, team members and their contribution lists |
| `process` | the 5 process steps (title + text each) |
| `personas` | the 2 student personas — roll no., name, branch, photo, `pains[]`, `goals[]` |
| `existing` | the "existing tools" pills (WhatsApp, College website, ERP portal) |
| `jobs` | the "when / want / outcome" rows |
| `ia` | the information-architecture map (each `root` with `children[]` or a `grid[]`) |
| `flow` | the user-flow diagram (`spine`, `branches`, `quickActions`) |
| `studentExperience` | the single phone screenshot in that section |
| `iterations` | before/after image pairs for the student app + captions |
| `admin` | before/after image pairs for the admin side + captions |
| `reviews` | Play Store reviews — name, date, stars, helpful count, text |
| `impact` / `usage` | the two stats-with-chart blocks (numbers, caption, chart image) |

Edit text and numbers freely. `tone` values (`blue`, `green`, `sky`, `blush`,
`mint`, `butter`, `teal`, …) are just colour names for the coloured pills/cards —
keep them from the set already used in the file. To change any image referenced
here, use `replace-images`.

## After any change

1. Preview it: use the running dev server, or start one with `npm run dev`
   (`http://localhost:5173`). Check the Projects grid and, for a new project,
   open `http://localhost:5173/work/<slug>`.
2. Summarise what changed in plain language — no code — and offer to publish.

## Gotchas

- Every entry needs its commas and closing `}`. A missing one breaks the page;
  if the preview errors, re-check the block you just edited.
- `slug` must be unique and URL-safe: lowercase letters, numbers, dashes only.
- Two entries with the same `slug` will collide — don't duplicate.
