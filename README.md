# WBLS Engineering — NMC Configuration Tools (Changelog Site)

This folder is the static GitHub Pages site for the tool's release notes.

## Layout
```
docs/
├── index.html          # main landing page (animated hero + release cards)
├── styles.css          # all styling, animations, responsive rules
├── script.js           # scroll-reveal + cursor-tracked highlight
├── version.json        # current release manifest (read by script.js)
├── .nojekyll           # tell GitHub Pages to skip Jekyll
├── changelog/
│   ├── v1.md           # mirror of assets/changelog/v1.md
│   └── v2.md           # mirror of assets/changelog/v2.md
└── README.md
```

## Enabling GitHub Pages
1. Push the repo to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: **main**, Folder: **`/docs`**.
5. Save. GitHub builds the site at `https://<user>.github.io/<repo>/`.

The `CHANGELOG_URL` constant in `nmc_tools/__about__.py` already points at
`https://wbls-eng.github.io/nmc-tools/changelog/` — update both the constant
and `version.json` when the actual GitHub username / repo name is finalized.

## Updating release notes
- Edit the corresponding `assets/changelog/vN.md` (this is what the desktop
  app's What's New modal reads).
- Copy the file into `docs/changelog/` and update the matching card in
  `docs/index.html`.
- Bump `version.json` so the hero pill picks up the new release.

## Design credits
The animated card border uses the rotating `conic-gradient` pattern popularized
on [uiverse.io](https://uiverse.io). The cursor-following highlight is pure
CSS driven by JS-set custom properties (`--mx`, `--my`).
