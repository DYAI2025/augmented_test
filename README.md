# Augmented_Ops Spiral

Scroll-driven React/Vite website for the Augmented_Ops agency mesh, including static sub-sites and investor deck assets in `public/`.

## Local development

**Prerequisites**

- Node.js 20+
- npm 10+

```bash
npm install
npm run dev
```

The development server listens on `0.0.0.0:3000`.

## Production build

```bash
npm run build
npm run start
```

`npm run start` serves the generated `dist/` directory with Express and reads the port from `process.env.PORT`, which is required for Railway deployments. A health endpoint is available at `/healthz`.

## Railway deployment

This repository is ready for Railway via `railway.json` and the root `Dockerfile`:

- Builder: Dockerfile
- Build step: `npm ci` followed by `npm run build` inside the image build stage
- Runtime command: `node server.js` (set explicitly in `railway.json` and matching the Docker `CMD`)
- Healthcheck: `/healthz`

### Deploy checklist

1. Create a new Railway project from this Git repository.
2. Keep the default root directory (`/`).
3. Do not add a fixed `PORT`; Railway injects it automatically.
4. Optional: set `APP_URL` to the final Railway public domain if future features need absolute links.
5. Deploy and verify `/healthz` returns `{ "status": "ok" }`.

The Dockerfile builds the Vite assets in a dedicated build stage, prunes development dependencies, and copies only the production server, production dependencies, and `dist/` output into the runtime image. `railway.json` also sets the exact start command so Railway does not inherit a stale dashboard start command or interpret a missing command differently from the Docker `CMD`.

## Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run lint` | Run TypeScript checks |
| `npm run build` | Build static production assets |
| `npm run start` | Serve `dist/` for production/Railway |
| `npm run clean` | Remove `dist/` |
