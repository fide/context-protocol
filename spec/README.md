# FCP Spec Sources

Canonical protocol data lives under versioned folders:

- vocabulary source of truth now lives in [github.com/fide/vocabulary](https://github.com/fide/vocabulary).
- `v0/property-prefixes.json`: source of truth for CURIE prefix mappings.
- `v0/property-prefixes.schema.json`: schema rules for property prefix mappings.
- `v0/statement.schema.json`: canonical statement object schema for FCP v0.

Generated SDK/docs artifacts now derive from standalone `fide-id` and `fide-vocabulary` packages.
- `../sdk/javascript/src/spec/index.ts`
- `../../fide-vocabulary/docs/definitions/*`

From repo root:

```bash
pnpm run generate:context-protocol
pnpm run check:generated:context-protocol
```
