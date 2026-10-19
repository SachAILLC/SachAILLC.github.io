# SachAI website

A simple static site for SachAI LLC. The four top-menu sections — **Our Consumer
Apps**, **Our Business Apps**, **Our Services**, **Demos** — each pull their
content live from a plain `.txt` file in `/content`, so you can update the
site by editing a text file in Notepad, no code required.

## Files

```
index.html                 the page itself
styles.css                 all visual styling
script.js                  loads the .txt files and switches tabs
content/consumer-apps.txt  entries shown under "Our Consumer Apps"
content/business-apps.txt  entries shown under "Our Business Apps"
content/services.txt       entries shown under "Our Services"
content/demos.txt          entries shown under "Demos"
logos/                     three logo concepts (see below)
```

## Editing content

Open any file in `/content` with Notepad (or any text editor). Each entry
looks like this:

```
Title: App Name
Tagline: A short one-line description
Description: A longer sentence or two about what it does.
Link: https://example.com
---
```

- Keep the `Title:`, `Tagline:`, `Description:`, `Link:` labels exactly as shown.
- Separate entries with a line containing only `---`.
- `Tagline`, `Description`, and `Link` are optional — you can omit a line if
  you don't need it.
- Add as many entries as you like; the page lays them out automatically.
- Save the file and refresh the page — no other changes needed.

## Publishing on GitHub (account: SachAILLC)

1. Sign in to GitHub as **SachAILLC** and create a new repository.
   - For a site at `https://sachaillc.github.io` (your main site), name the
     repository exactly `SachAILLC.github.io`.
   - For a project site at a sub-path instead (e.g.
     `https://sachaillc.github.io/website`), name it anything you like, e.g.
     `website`.
2. Upload all the files in this folder to the repository, keeping the same
   folder structure (`content/` and `logos/` as subfolders).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will publish the site in a minute or two at the URL shown on that
   Pages settings screen.

### A note on testing locally

Because the page loads the `.txt` files with `fetch`, opening `index.html`
directly by double-clicking it (a `file://` URL) will fail to load content —
browsers block that for local files. GitHub Pages serves the site over
`https://`, so this isn't an issue once published. To preview locally before
publishing, run a simple local server from this folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000` in your browser.

## Logo concepts

Three starting concepts are in `/logos`, all built around the same palette
(deep navy `#12141b` with a brass accent `#c6912b`) so they match the site:

1. **`logo-1-ascent.svg`** — an upward stroke forming a peak, reading as both
   an "A" (for AI) and a growth line. Used in the site header. Safest,
   most versatile choice.
2. **`logo-2-circuit-knot.svg`** — an "S" built from a single connected
   line with node points, like a circuit trace. Leans more technical/AI.
3. **`logo-3-bracket-monogram.svg`** — code brackets `< >` framing a
   flowing "S", a more literal nod to software development.

Open any `.svg` in a browser to preview it at full size. They're vector
files, so they'll scale cleanly from a favicon up to signage — a designer
can also refine the curves further if you want to commission a polished
final mark.
