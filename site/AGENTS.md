# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved portfolio direction

- Source of truth: the approved “Design 3” mock at `/Users/marcuspaulo/.codex/generated_images/01a00383-e71e-7762-8419-07ef48b7bf48/exec-84e28e1c-8dc9-4f64-bd5f-a34cbf01bd8a.png`.
- Preserve its warm editorial base, cobalt/coral accents, clipped modules, strong typography and asymmetric case-study layout.
- Keep the result lucid and authorial: recognizable monoline icons, one shared node accent, restrained motion, no ornamental clutter.
- Show 11 verified archive projects and the AI assistant as a separate lab in construction. Never invent quantitative outcomes.
- Include Engenharia de Software at UNA without formation dates or date ranges.
- Current public identity is `MarcusMouraDev`; never restore the former `MarcusPaulodev1` links.
