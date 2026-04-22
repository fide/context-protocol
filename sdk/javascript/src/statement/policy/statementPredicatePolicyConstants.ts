import { FIDE_ENTITY_TYPES } from "@fide-work/id";
import { STANDARD_CURIE_PREFIXES } from "../../predicate-vocabulary/index.js";
import {
  FCP_FORBIDDEN_PREDICATES,
  FCP_STATEMENT_GUIDE_EXAMPLES,
  FCP_TYPE_ASSERTION_PREDICATES,
  type FcpStatementGuideExample,
} from "../../spec/index.js";

export type StatementGuideExample = FcpStatementGuideExample;

const FORBIDDEN_PREDICATE_REASONS_BY_IRI: Record<string, string> = Object.fromEntries(
  FCP_FORBIDDEN_PREDICATES.map((rule) => [rule.propertyIri, rule.description]),
);

export const STATEMENT_GUIDE_EXAMPLES: readonly StatementGuideExample[] = FCP_STATEMENT_GUIDE_EXAMPLES;

/**
 * Properties treated as type assertion channels.
 */
const TYPE_ASSERTION_PREDICATE_URIS = new Set<string>(FCP_TYPE_ASSERTION_PREDICATES);

const EXACT_STANDARD_URIS_BY_ENTITY_TYPE: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(FIDE_ENTITY_TYPES).map(([entityType, spec]) => {
    const uris = new Set<string>();
    if (spec.standardFit === "Exact") {
      for (const standard of spec.standards) {
        const [prefix, local] = standard.split(":");
        if (!prefix || !local) continue;
        const base = STANDARD_CURIE_PREFIXES[prefix];
        if (!base) continue;
        uris.add(`${base}${local}`);
      }
    }
    return [entityType, uris];
  }),
);

/**
 * Shared constants for statement property policy checks.
 */
export const STATEMENT_PREDICATE_POLICY_CONSTANTS = {
  forbiddenPropertyRules: FORBIDDEN_PREDICATE_REASONS_BY_IRI,
  typeAssertionPropertyUris: TYPE_ASSERTION_PREDICATE_URIS,
  exactStandardUrisByEntityType: EXACT_STANDARD_URIS_BY_ENTITY_TYPE,
} as const;
