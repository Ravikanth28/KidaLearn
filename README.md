# KidaLearn — Learn, Play & Grow!

A frontend-only, responsive learning playground for numbers and letters. KidaLearn includes number and alphabet learning modes, twelve number and alphabet games, browser speech, and locally saved stars and badges. No account, backend, API key, or paid service is required.

## Run locally

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

The production build is written to `dist`.

## Deploy to Render

Create a **Static Site** from this repository. The included `render.yaml` sets the build command to `npm install && npm run build`, publishes `dist`, and rewrites client-side routes to `/index.html` so refreshed game and learning pages load correctly.

## Learning and games

- Explore numbers 1–20 and letters A–Z at your own pace.
- Play number ordering, missing-number patterns, object counting, number-and-quantity matching, more-or-less comparisons, number building, addition and subtraction, skip-counting patterns, and Number Bingo; plus alphabet ordering, missing-letter patterns, and letter-picture matching.
- Use the Easy, Medium, and Hard choices to adjust game rounds. Number ordering supports ranges of 1–5, 1–10, and 1–20; alphabet ordering uses progressively larger groups. Alphabet games can be switched between uppercase and lowercase.
- Game tiles support touch-friendly tap-to-select and tap-to-place interactions; desktop users can drag ordering tiles between slots.
- Stars, completed rounds, badge progress, and the sound preference are stored only in this browser's LocalStorage. Use the reset option in My Rewards to clear progress (with confirmation).
- Speech uses the browser's optional Web Speech API. If unavailable or disabled, the rest of the site works normally.

Illustrations are inline vector artwork bundled with the app, so essential visuals do not depend on remote image services. The optional heading fonts load from Google Fonts with system fallbacks.
