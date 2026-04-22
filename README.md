# Fide Context Protocol

Canonical specification and SDK for the Fide Context Protocol.

The Fide Context Protocol defines interoperable statement structures for graph-based world models across systems. It depends on [Fide ID](https://github.com/fide/id) for identifier rules and on the [Fide Vocabulary](https://github.com/fide/vocabulary) for entity and property typing semantics.

Public docs are published at:

- [fide.work/docs/context-protocol](https://fide.work/docs/context-protocol)

## Structure

- `spec/`: protocol specification artifacts (canonical source in `spec/v0`)
- `docs/`: protocol docs
- `sdk/javascript/`: JavaScript SDK package (`@fide-work/context-protocol`)

## Generate Protocol Artifacts

Property prefix mappings and JS SDK constants are generated from:

- `spec/v0/property-prefixes.json`

Run from repo root:

```bash
pnpm run generate:context-protocol
pnpm run check:generated:context-protocol
```

## SDK Release

- Monorepo release tag: `context-protocol/v<version>`
- Standalone repo release tag: `v<version>`

## JavaScript SDK

The JavaScript SDK package lives in:

- `sdk/javascript/`

Current package name:

- [`@fide-work/context-protocol`](https://www.npmjs.com/package/@fide-work/context-protocol)

Additional docs:

- [fide.work/docs/context-protocol/specification](https://fide.work/docs/context-protocol/specification)
- [fide.work/docs/context-protocol/sdk/javascript](https://fide.work/docs/context-protocol/sdk/javascript)

## License

Licensed under Apache-2.0. See `LICENSE` for the full text.
