---
name: preview-and-publish
description: >
  Use to see the site running locally while editing, and to publish the finished
  site so the changes go live. Triggers: "show me the site", "preview my
  changes", "start the site", "open it in my browser", "does it look right",
  "publish this", "push it live", "deploy the site", "make the changes live",
  "build the site". Invoke this after any content, image, or style change so the
  person can check the result before it goes public.
---

# Preview & publish

## Preview (see changes while editing)

Run the development server — it shows the site with every edit applied and
refreshes automatically as files are saved:

```
npm run dev
```

Then give the person this link: **http://localhost:5173**

- Leave it running during an editing session; each save updates the page.
- If `npm run dev` fails with missing-package errors, run `npm install` once
  first, then `npm run dev` again.
- If the page shows a red error overlay, the last edit has a broken line
  (usually a missing comma or quote). Re-open the file that was just edited and
  fix it — the overlay names the file.
- To stop the server: press `Ctrl + C` in its terminal.

## Check before publishing

Always look at the running preview and confirm:

- the section that changed looks right,
- for a new project, `http://localhost:5173/work/<slug>` opens,
- no broken-image icons.

## Publish (make it live)

1. Build the final site:

   ```
   npm run build
   ```

   This creates a `build/` folder — a complete, static copy of the site.

2. Preview that exact build once (optional but wise):

   ```
   npm run preview
   ```

3. Put the `build/` folder online. How depends on where the site is hosted:

   - **Netlify / Vercel / Cloudflare Pages (drag-and-drop):** open the host's
     dashboard and drag the `build/` folder onto the deploy area.
   - **Connected to a Git repository (auto-deploy):** commit and push the
     changes; the host rebuilds and deploys automatically. (Note: `git` may not
     be available from PowerShell on this machine — if a git command isn't
     recognised, use the host's dashboard method instead, or ask for git to be
     added to PATH.)
   - **GitHub Pages:** the `build/` folder's contents go on the publishing
     branch/folder GitHub Pages serves.

4. Tell the person it's live and roughly how long the host takes to update
   (usually under a minute), and share the public URL if known.

## If the host is unknown

Ask: "Where is the site currently hosted — Netlify, Vercel, Cloudflare Pages,
GitHub Pages, or somewhere else?" Once known, the exact publish steps can be
written into this skill so it's one instruction next time.

## Notes

- Publishing only sends the site's files to the host — it does not touch the
  editable `src/` files.
- A subpath host (site served from `example.com/portfolio/` rather than its own
  domain) needs `paths.base` set in `svelte.config.js` — mention this only if
  images/links break after deploying to a subpath.
