# StudyHub Frontend — Quick Guide

## What we're using right now
- React
- Tailwind (v4, set up through `@tailwindcss/vite` in `vite.config.js` — colors live in `src/index.css`)
- React Router (routes are in `App.jsx`)

## What we're NOT using (yet)
- No `tailwind.config.js` or `postcss.config.js` needed — v4 doesn't require them.
- Axios is used in the code (`src/api/`) but it's **missing from `package.json`.**
  Add it properly with `npm install axios` so it's not just sitting in
  someone's local `node_modules`.

---

## Before you start working
Drop a quick message in the channel saying what component/page you're
about to work on — even if it feels obvious. Takes 10 seconds, and it
means no one else accidentally starts the same thing or edits the same
file at the same time.

## How to open a PR
**Every change goes: branch → PR → review → merge. No exceptions, no
matter how small the change is.** This isn't optional or just for "big"
changes — a branch is what makes review possible in the first place, so
there's no lighter version of this rule.

1. Make a new branch for what you're working on (e.g. `fix/notes-page`).
   One branch can cover a few small related changes — it doesn't need to
   be one branch per single page every time.
2. Push it, open a PR into `main`. **Never commit or merge straight to
   `main`, for any reason** — even if you're blocked or in a hurry. If a
   PR won't open for some reason, ask before working around it — don't
   just push directly to get unstuck.
3. Write 1-2 lines: what you did.
4. Someone reviews it before it merges — just a sanity check.

## What you can change freely
- Anything inside a page/component you're already working on
- Fixing a bug in your own section
- Styling inside your own component
- Filling in a page that's currently empty

## Ask before changing
- Adding a new package (`npm install anything`)
- Any config file: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- Shared colors/theme in `src/index.css`
- Routes in `App.jsx` (adding/removing pages, login protection, etc.)
- `AuthContext.jsx`
- Anything in `src/api/`

If it touches something everyone relies on, just ask first — takes 10 seconds, saves an hour.

## File naming (so files don't clash)
- One page = one file, named like the component: `Dashboard.jsx`, `Notes.jsx`, `Login.jsx`.
- Always **PascalCase**, first letter capital. No `dashboard.jsx` and `Dashboard.jsx` both existing.
- Before creating a new page, check `src/pages/` — if it already exists, edit that one instead of making a new copy.


