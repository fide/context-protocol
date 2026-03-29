# Contributing to Fide Context Protocol

Thank you for contributing to the Fide Context Protocol.

This repository is specification-first. The protocol definition is the core product, and the JavaScript SDK and generated docs are downstream artifacts.

## Current Stability Policy

The repository is currently in alpha.

- Breaking changes are allowed during alpha.
- SDK releases use `0.0.0-alpha.x`.
- Changes should still be deliberate and easy to review.

## Repository Scope

This repository is responsible for:

- statement structure and protocol rules
- predicate and statement validation behavior
- protocol schemas and generated interoperability artifacts
- JavaScript SDK behavior for working with FCP statements
- generated SDK reference docs

Changes that belong in other repositories should stay there:

- identifier method rules belong in `fide/id`
- entity and reference typing belongs in `fide/vocabulary`

## How To Contribute

1. Open or reference an issue describing the change.
2. Update the relevant spec, SDK, or generator source files.
3. Regenerate affected artifacts if needed.
4. Review the generated diff carefully.
5. Submit a focused pull request with a clear explanation of compatibility impact.

## Generated Files

Generated outputs include protocol artifacts and SDK reference docs.

If you change generator-owned inputs, regenerate the corresponding outputs before submitting your change.

Do not hand-edit generated files unless the change is specifically to the generator or a generator-owned post-processing step.

## Local Commands

From `sdk/javascript/`:

```bash
pnpm run generate:docs
pnpm run build
pnpm run check-types
pnpm test
```

If your change affects generated protocol artifacts or generated docs, verify they are in sync before opening a pull request.

## Pull Request Expectations

A good pull request should make it obvious:

- what changed in the protocol or SDK
- whether the change is breaking, additive, or editorial
- why the change belongs in FCP rather than a related repository
- whether generated artifacts were refreshed

If a change affects protocol validity rules, statement constraints, or normalization behavior, call that out explicitly in the pull request description.

## Editing Guidance

When contributing to FCP:

- keep spec and SDK behavior aligned
- prefer deterministic generation over manual edits
- keep strict behavior as the default and make convenience behavior explicit
- avoid semantic drift between examples, docs, and runtime behavior

## AI Use

If you used AI assistance to prepare a contribution, disclose that in the pull request.

You are still responsible for understanding the change, reviewing the output, and ensuring the contribution is technically correct.
