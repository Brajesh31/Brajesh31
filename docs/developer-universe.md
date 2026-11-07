# Developer Universe

The `/world` directory is a static React/Vite companion for the GitHub profile README. It uses public, repository-grounded data and provides working navigation, project search/filtering, technology exploration, journey panels, a safe terminal command parser, achievement filters, theme switching, and contribution links.

## Local development

```powershell
cd world
npm install
npm run dev
```

Production validation:

```powershell
npm run build
```

## GitHub Pages

`deploy-developer-universe.yml` builds the app with npm and deploys `world/dist` using the official Pages artifact flow. It runs on changes under `world/` and through `workflow_dispatch`. The Vite base path is `/Brajesh31/world/`.

Repository settings must have Pages configured to **GitHub Actions** once. No repository secrets are required. The expected URL after a successful deployment is:

`https://brajesh31.github.io/Brajesh31/world/`

The app deliberately uses static public data. Live GitHub metrics remain in the existing README cards and generated assets; no client-side token is used.
