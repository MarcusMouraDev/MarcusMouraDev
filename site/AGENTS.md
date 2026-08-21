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
- Hero kicker is stacked: `Marcus Moura` in medium size on top, `Software, automação, dados e IA` on the line below, left-aligned with the H1. Do not restore the cobalt dash between name and practice line.
- Respect a single light editorial surface. Do not restore a dark theme toggle or `prefers-color-scheme` theme switch.
- Gate decorative hover motion behind `(hover: hover) and (pointer: fine)`. Keep `Detalhes` visible on touch.
- Honor `prefers-reduced-motion` in CSS and Motion. Prefer `transform` and `opacity`. Cursor light is pointer-follow only on fine pointers and is removed when motion is reduced. The left SVG stroke draws with page scroll and is removed when motion is reduced or on narrow screens.
- Loading uses `PreloaderTw` (stairs variant) with the Pip sticker mascot: a teenage gamer-programmer at a dual-monitor desk, typing, facing the setup on the right (sprite is mirrored). Display size is 200×150. The typing loop is 1.68s. Duration is 5200ms so the loop is readable. Copy is exactly `carregando a magia...`. Do not show a percentage. After load, `ScrollMaskTw` (iris, reveal mode) opens the portfolio between hero and featured cases. Project details open through `ModalCardsTw`. Archive projects are cards that morph into the modal. No portrait photos anywhere on the site.
- Stack names appear inline in About copy, archive cards and case dialogs via native `HoverPreviewTw`. Hover previews use real brand marks in `public/assets/tech/` (Simple Icons, official product SVGs). Do not restore editorial STACK cards or a chip strip of technologies at the end of About. Regenerate marks with `node scripts/generate-tech-previews.mjs`. Do not run `npx shadcn@latest add @reactbits-starter/hover-preview-tw`: the registry needs `REACTBITS_LICENSE_KEY` and this project has no Tailwind. Unknown labels fall back to `default.svg`.
- Do not add React to project `technologies` arrays. React may appear only in the About copy.
