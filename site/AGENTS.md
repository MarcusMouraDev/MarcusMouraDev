# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved portfolio direction

- Visual system: **pipeline editorial**. Cool off-white paper (`#f3f4f1`), charcoal dark (`#0e1112`), cobalt `#0b46ef` as the only brand chromatic. Coral is optional and rare (status / lab), not a required pair.
- Signature: the three process boards (automation, data, IA), with one-shot flow motion. Not polygon clips on every module. At most one clipped corner, on the boards.
- Type: Inter Tight + IBM Plex Mono. Do not add a new font package without approval.
- Identity is not locked to the former Design 3 mock. Palette, clip, rhythm, surfaces and hierarchy may change if they serve the portfolio.
- Show 11 verified archive projects and the AI assistant as a separate lab in construction. Never invent quantitative outcomes.
- Include Engenharia de Software at UNA without formation dates or date ranges.
- Current public identity is `MarcusMouraDev`; never restore the former `MarcusPaulodev1` links.
- Public profile URLs live in `src/data/site.ts`. Do not invent a second source of email, GitHub, LinkedIn or WhatsApp.
- Do not claim unverified repository counts. Archive copy stays qualitative besides the verified 11-project archive.
- Production URL currently published in the profile README: `https://marcus-moura-portfolio.mpfagundesmoura.chatgpt.site`. Keep canonical, Open Graph and JSON-LD aligned with it until a new domain is confirmed.
- Primary contact CTA label is `Conversar` in hero and contact. Do not add a second contact label with the same intent.
- Respect `prefers-color-scheme` when the visitor has no stored `mm-theme` preference.
- Gate decorative hover motion behind `(hover: hover) and (pointer: fine)`. Keep `Detalhes` visible on touch.
- Honor `prefers-reduced-motion` in CSS and Motion. Animate only `transform` and `opacity`.
