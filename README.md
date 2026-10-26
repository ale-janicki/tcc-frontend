# Recycling kiosk: front end (demo branch)

Front end of a battery recycling kiosk built as a Computer Engineering capstone project. The `main` branch talks to the original FastAPI backend and to the kiosk camera, where a YOLO model counts the batteries.

This `demo` branch runs on its own as a static site on GitHub Pages: https://ale-janicki.github.io/tcc-frontend/

- `src/services/api.ts` replaces the backend with an in-memory store. A full page reload resets every user, session and deposit.
- Visitor account: `demo@totem.dev` / `demo123` (shown on the login page).
- `countBattery` simulates the camera step: after about two seconds, the valid count is the informed quantity minus 0 or 1 returned object, never below 0.
- Postal code lookup still calls the public ViaCEP API.
- Pushing to `demo` deploys through `.github/workflows/pages.yml` (`next build` with `output: 'export'` and `basePath: '/tcc-frontend'`).

```bash
npm ci
npm run dev   # http://localhost:3000/tcc-frontend
```
