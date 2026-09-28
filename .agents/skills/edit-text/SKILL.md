---
name: edit-text
description: >
  Use whenever someone wants to change words/copy/text shown on the portfolio
  site — the greeting or headline, name, job title, location, email, the "What do
  I do?" card, navigation labels, social links, work-experience blurbs and dates,
  the About / résumé intro, the skills list, or the small "Playground" list.
  Triggers: "change my headline", "update my job title", "fix this typo",
  "reword my about section", "add a LinkedIn link", "update my email",
  "change the dates on my Geekbull job", "rename a nav item".
  For adding/removing case-study projects use `manage-projects`; for photos and
  the résumé PDF use `replace-images`; for colours and fonts use `restyle`.
---

# Edit the words on the site

All visible text lives in small, plain files under `src/lib/data/`. You never
touch the design code — just these files. After any edit, show a live preview so
the person can see the change, then offer to publish.

## Say things like

- "Change my title from *Product & UX Designer* to *Senior Product Designer*."
- "Fix the typo in the speech card — both lines say the same thing."
- "My email is now gangadevi@example.com."
- "Add a Behance link to my socials: behance.net/gangadevi"
- "Update the Geekbull dates to Nov 2024 – Mar 2025."
- "Reword my about paragraph to mention 3 years, not six."
- "Rename the *Resume* menu item to *CV*."

## Where each thing lives

| The person mentions… | File | Field |
|---|---|---|
| Name, job title, location, email | `src/lib/data/site.js` | `site.name` / `site.role` / `site.location` / `site.email` |
| Social links (Dribbble, LinkedIn, …) | `src/lib/data/site.js` | `site.socials[]` — each `{ label, href }` |
| Menu / navigation labels | `src/lib/data/site.js` | `nav[]` — each `{ label, href }`. Keep the `href` (e.g. `#work`) unchanged unless asked. |
| Greeting line ("Hi, I am designer"), big name | `src/lib/data/hero.js` | `hero.kicker` / `hero.name` |
| "What do I do?" card title + lines | `src/lib/data/hero.js` | `hero.speech.title` / `hero.speech.lines[]` |
| Photo caption ("That's me") | `src/lib/data/hero.js` | `hero.photo.label` / `hero.photo.alt` |
| Floating tool-icon names (Figma, Notion…) | `src/lib/data/hero.js` | `hero.icons[].name` (rename only — to swap the picture use `replace-images`) |
| Work-experience cards (company, role, dates, blurb, bullet points) | `src/lib/data/experience.js` | `experience[]` — `company` / `role` / `period` / `blurb` **or** `points[]` / optional `href` |
| About / résumé intro paragraph | `src/lib/data/resume.js` | `resume.intro` |
| Skills chips | `src/lib/data/resume.js` | `resume.skills[]` |
| Résumé "experience" list in the Resume section | `src/lib/data/resume.js` | `resume.experience[]` — `company` / `role` / `period` / `notes` |
| "Playground" experiments list | `src/lib/data/projects.js` | `projects[]` — `title` / `year` / `href` / `note` |

Not sure which section they mean? The site sections are: **ME** (hero), **Work
Experience**, **Projects** (the case-study grid), **Playground**, **Resume**.

## Steps

1. Find the field in the table above and open that file.
2. Make the change. Keep the file's exact shape:
   - Text sits inside quotes: `role: 'Senior Product Designer'`.
   - If the new text contains an apostrophe, wrap it in double quotes instead:
     `notes: "Owns the design system"` — or write `\'`.
   - Keep every comma and bracket. Lists look like `['a', 'b', 'c']`.
   - To add a social link or a list item, copy the nearest existing line and
     edit it — don't forget the trailing comma.
3. Save, then run the preview so the change is visible:
   - If a dev server is already running, just point them to it.
   - Otherwise start one: `npm run dev` and share `http://localhost:5173`.
4. Tell the person, in plain language, exactly what changed and where it shows up
   on the page. Do **not** paste code unless they ask.
5. Offer to publish (see the `preview-and-publish` skill).

## Gotchas

- A missing comma or quote breaks the whole page. If the preview shows an error,
  re-open the file and check the line you edited for a lost `,` `'` or `]`.
- `hero.speech.lines` currently has two identical lines — that's a real bug in
  the content; if they ask to "fix" it, replace the second line with new copy or
  delete it.
- Changing a `nav` label does not change where it scrolls to; the `href` does.
- Don't rename a work-item `slug` here — that's a URL. Use `manage-projects`.
