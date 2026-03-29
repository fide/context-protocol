import { FIDE_ENTITY_TYPES } from "@fide-work/id";
import { STANDARD_CURIE_PREFIXES } from "../../predicate-vocabulary/index.js";

export type StatementGuideRule = {
  id: string;
  description: string;
  path: string;
};

const STATEMENTS_SPEC_PATH = "/fcp/specification/statements";

/**
 * Canonical predicate URIs that are not allowed at protocol level.
 */
const FORBIDDEN_PREDICATE_RULES = [
  {
    id: "fcp.predicate.disallow-schema-identifier",
    predicateIri: "https://schema.org/identifier",
    description:
      "Entity identifiers are implicit in Fide IDs and reference identifiers; do not add redundant identifier predicates.",
    path: STATEMENTS_SPEC_PATH,
  },
  {
    id: "fcp.predicate.disallow-schema-sameAs",
    predicateIri: "https://schema.org/sameAs",
    description:
      "Use http://www.w3.org/2002/07/owl#sameAs for strict identity assertions; https://schema.org/sameAs is not allowed in FCP statements.",
    path: STATEMENTS_SPEC_PATH,
  },
] as const;

const FORBIDDEN_PREDICATE_REASONS_BY_IRI: Record<string, string> = Object.fromEntries(
  FORBIDDEN_PREDICATE_RULES.map((rule) => [rule.predicateIri, rule.description]),
);

export const STATEMENT_GUIDE_RULES: readonly StatementGuideRule[] = [
  {
    id: "fcp.predicate.concept-network-resource",
    description: "Predicate must use entityType=Concept and referenceType=NetworkResource.",
    path: STATEMENTS_SPEC_PATH,
  },
  ...FORBIDDEN_PREDICATE_RULES.map(({ id, description, path }) => ({
    id,
    description,
    path,
  })),
  {
    id: "fcp.predicate.disallow-redundant-type-assertion",
    description:
      "Do not use rdf:type or schema:additionalType when the object type is already encoded by the subject entity type.",
    path: STATEMENTS_SPEC_PATH,
  },
] as const;

/**
 * Predicates treated as type assertion channels.
 */
const TYPE_ASSERTION_PREDICATE_URIS = new Set<string>([
  "https://www.w3.org/1999/02/22-rdf-syntax-ns#type",
  "https://schema.org/additionalType",
]);

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
 * Shared constants for statement predicate policy checks.
 */
export const STATEMENT_PREDICATE_POLICY_CONSTANTS = {
  forbiddenPredicateRules: FORBIDDEN_PREDICATE_REASONS_BY_IRI,
  typeAssertionPredicateUris: TYPE_ASSERTION_PREDICATE_URIS,
  exactStandardUrisByEntityType: EXACT_STANDARD_URIS_BY_ENTITY_TYPE,
} as const;
