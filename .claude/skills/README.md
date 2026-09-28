# Skills for editing this portfolio

These let you change the site by **asking in plain English** in Claude Code.
You don't need to know which file anything is in — Claude picks the right skill.

Open a terminal in this folder, run `claude`, and type what you want.

| You want to… | Just say something like… | Skill used |
|---|---|---|
| Change any wording | "Change my job title to *Senior Product Designer*." | `edit-text` |
| Fix a typo | "There's a typo in the About paragraph — fix it." | `edit-text` |
| Add / update a social link | "Add my Behance: behance.net/gangadevi" | `edit-text` |
| Edit a work-experience card | "Update the Geekbull dates to Nov 2024 – Mar 2025." | `edit-text` |
| Add a case-study project | "Add a project: Nova Bank App, 2025, tags Mobile + Fintech." | `manage-projects` |
| Remove / reorder projects | "Remove the travel project." / "Put Cura first." | `manage-projects` |
| Edit the KIET case study | "Change the KIET timeline to 5 months." | `manage-projects` |
| Replace the photo / a logo / an icon | "Replace my portrait with this file." | `replace-images` |
| Upload a new résumé PDF | "Here's my updated résumé, swap it in." | `replace-images` |
| Change colours / fonts / spacing | "Change the orange accent to teal." | `restyle` |
| See the site while editing | "Show me the site." | `preview-and-publish` |
| Make changes live | "Publish this." | `preview-and-publish` |

## The normal flow

1. Ask for a change.
2. Claude edits the right file and opens a live preview at
   `http://localhost:5173` so you can see it.
3. If it looks good, say "publish it."

## Good to know

- Nothing goes public until you say "publish."
- If a preview shows an error after an edit, tell Claude "the preview is broken" —
  it's almost always a small punctuation slip Claude can fix in seconds.
- All editable content is in `src/lib/data/` (words), `src/lib/styles/tokens.css`
  (look), and `static/` (images and the résumé).
