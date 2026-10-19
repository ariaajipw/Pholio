## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Tailwind CSS v4 Migration Rules

The following rules govern the planned CSS-to-Tailwind migration. They are binding for any agent executing that work.

1. **`DESIGN.md` is the authoritative visual contract** — The approved design documented in `DESIGN.md` (including all component specs, tokens, responsive behavior, motion levels, and accessibility criteria) is the baseline. Migration is not a redesign. Do not change visual values, spacing, typography scales, colors, or interaction behavior to fit Tailwind defaults.

2. **Inspect existing implementation before making changes** — Read the actual component files (`src/components/*.astro`, `src/pages/*.astro`, `src/layouts/*.astro`, `src/styles/global.css`) to understand current CSS patterns, dependencies, and JavaScript couplings before proposing utility replacements.

3. **Follow Tailwind CSS v4 conventions documented in `DESIGN.md` §16** — Use `@import "tailwindcss"`, `@theme` for design tokens, `@utility` for reusable patterns, component-scoped `<style>` for complex patterns. No `tailwind.config.js`, no `@apply`, no `@layer`.

4. **Source-code changes must remain within the scope of the currently approved migration task** — Do not combine styling migration with unrelated refactoring, redesign, feature addition, or content changes.

5. **Migration must be incremental, reviewable, and reversible** — Migrate in small batches (by component or page). After each batch: `npm run build` must pass, visual parity must be verified at 360px, 768px, 1024px, 1200px+, and removed CSS must be confirmed to have no remaining consumers.

6. **The agent must not combine styling migration with unrelated refactoring or redesign** — No restructuring components, no changing HTML semantics, no modifying data flow, no adding/removing features.

7. **Existing user changes must be preserved** — Check `git status --short` before editing. Do not overwrite uncommitted work.

8. **The agent must not delete old CSS until its usage and replacement have been verified** — Verify computed styles in DevTools match before removing any CSS rule. Build success does not prove visual parity.

9. **Build success does not prove visual parity** — Visual comparison at representative viewports (mobile, tablet, desktop, wide) is required. Check typography, layout, spacing, color, image rendering, overflow, interactions, and reduced-motion behavior.

10. **Any unresolved design decision, unexpected behavior, or scope expansion must be reported before proceeding** — Document unknowns (M1 entrance motion, stack view, font loading, AVIF, missing content fields) as open questions. Do not invent requirements or mark future work as complete.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
