# Augmented_Ops Spiral Redesign

This package rebuilds the Augmented_Ops website into a scroll-driven spiral design.

## What changed

- The old static/landing layout was replaced with a React/Vite spatial agency gallery.
- VSA, RSA, MSA and CSA are placed as interactive cards on a spiral.
- Scroll position pulls the next agency card forward.
- Blurred depth typography sits behind the spiral and changes with the active agency.
- Each card opens a full-page popup with:
  - agency hero
  - metrics
  - agency logic
  - agent mesh
  - operating flow
  - principles
  - modules
  - links to existing sub-sites and investor decks
- Accessible fallback list is included below the spiral.
- Reduced-motion mode is supported.
- VSA/CSA/MSA/RSA folders are copied into `public/` so their pages and PDFs remain available after Vite build.

## Key files

- `src/App.tsx` - full spiral experience and agency data
- `src/index.css` - spatial spiral styling, popup page design, responsive and reduced-motion rules
- `index.html` - Vite entry document
- `public/VSA`, `public/RSA`, `public/MSA`, `public/CSA` - linked agency pages and PDFs

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Extend

Add or edit agencies in the `agencies` array inside `src/App.tsx`.
Each card and popup page is generated from that single data source.
