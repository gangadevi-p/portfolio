---
name: replace-images
description: >
  Use to swap any picture or file on the portfolio — the portrait photo,
  case-study cover images, floating tool icons, company logos, the résumé PDF,
  the favicon, and the KIET app screenshots. Triggers: "replace my photo",
  "update the portrait", "add a cover image for the Nova project", "swap the
  Figma icon", "add the Manino logo", "upload my new résumé", "change the
  screenshots on the KIET page", "the icons are placeholders, here are the real
  ones". For the words next to an image use `edit-text` or `manage-projects`.
---

# Replace images & files

Every picture and download lives in the `static/` folder. The site refers to
each one by a path that starts at `static/`, written **without** the word
`static` — so `static/img/portrait.png` is written as `/img/portrait.png` in the
data files.

Two ways to swap a picture:

- **Keep the same filename** → drop the new file in over the old one, nothing
  else to change. Easiest.
- **New filename** → put the file in the folder, then update the path in the
  matching data file (below).

## Say things like

- "Here's my real photo — replace the placeholder portrait." (attach / point to the file)
- "Add this as the cover for the Nova Bank project."
- "These are the real tool icons, swap all six."
- "Upload my updated résumé PDF."
- "Replace the KIET home-screen screenshot with this one."

## What lives where

| Picture / file | Folder | Referred to in | Notes on the file |
|---|---|---|---|
| Portrait photo | `static/img/` | `hero.js` → `hero.photo.src` | Transparent cut-out PNG, **in colour** (the site greyscales it). Current: `portrait.png`. |
| Case-study cover images | `static/img/` | `work.js` → each `cover` | Roughly **4 : 3**. Current placeholders: `work-1.svg`…`work-4.svg`. |
| Floating tool icons (Figma, XD, Notion…) | `static/icons/` | `hero.js` → `hero.icons[].src` | Square **SVG** logos. Current: `figma.svg`, `xd.svg`, `asterisk.svg`, `notion.svg`, `chatgpt.svg`, `framer.svg`. |
| Company logos (work experience) | `static/img/experience/` | `experience.js` → each `logo` | Square PNG or SVG. Current: `manino.svg`, `geekbull.svg`, `adm.svg`. If the file is missing the card shows a letter monogram instead. |
| Résumé PDF | `static/files/` | `resume.js` → `resume.resumeUrl` | Current: `gangadevi-resume.pdf`. Keep the name to change nothing else. |
| Favicon (browser-tab icon) | `static/` | `src/app.html` | `favicon.svg`. |
| KIET app screenshots | `static/kiet/` | `kiet.js` (many fields) | Phone screenshots and charts. Keep the existing filenames (`hero-phone-home.png`, `student-home.png`, `iter-home-before.png`, `admin-a.png`, `impact-usage.png`, …) to swap with zero code changes. |

## Steps

1. Put the new file in the right folder from the table.
   - If asked to keep things tidy, match the existing filename exactly (including
     `.png` vs `.svg`) and you're done — skip to step 4.
   - If the extension differs (e.g. a new `portrait.png` replacing
     `portrait.svg`, or a `.jpg` where a `.png` was), keep the new file and
     update the path in the data file.
2. If the filename changed, open the file from the "Referred to in" column and
   update the path. Write it starting with `/` and without `static`, e.g.
   `src: '/img/portrait.png'`.
3. For a brand-new case-study cover, set `cover` on that project's entry in
   `work.js` to the new path.
4. Preview: use the running dev server or start one with `npm run dev`
   (`http://localhost:5173`) and check the picture loads and isn't stretched.
5. Say what changed in plain language and offer to publish.

## Gotchas

- A wrong path shows a broken-image icon. Double-check the folder and the exact
  spelling, including capital letters.
- SVG icons should be actual SVG files, not PNGs renamed to `.svg`.
- Big photos slow the site down — if a source image is very large (multiple MB),
  say so and suggest exporting it smaller (around 1600px wide is plenty).
- The portrait is deliberately shown in black and white by the site's styling —
  that's not a mistake; supply the colour version.
