/**
 * Generated from `packages/fide-context-protocol/spec/v0/statement-policy.json`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
export const FCP_STATEMENT_POLICY = {
  "namespaceUrl": "https://fide.work/context-protocol/v0/",
  "specVersion": "0",
  "specDate": "2026-04-04",
  "predicateRole": {
    "entityType": "Concept",
    "referenceType": "NetworkResource",
    "description": "Predicate must use entityType=Concept and referenceType=NetworkResource.",
    "path": "/fcp/specification/statements"
  },
  "forbiddenPredicates": [
    {
      "id": "fcp.predicate.disallow-schema-identifier",
      "predicateIri": "https://schema.org/identifier",
      "description": "Entity identifiers are implicit in Fide IDs and reference identifiers; do not add redundant identifier predicates.",
      "path": "/fcp/specification/statements"
    },
    {
      "id": "fcp.predicate.disallow-schema-sameAs",
      "predicateIri": "https://schema.org/sameAs",
      "description": "Use http://www.w3.org/2002/07/owl#sameAs for strict identity assertions; https://schema.org/sameAs is not allowed in FCP statements.",
      "path": "/fcp/specification/statements"
    }
  ],
  "typeAssertionPredicates": [
    "https://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "https://schema.org/additionalType"
  ],
  "guideRules": [
    {
      "id": "fcp.predicate.concept-network-resource",
      "description": "Predicate must use entityType=Concept and referenceType=NetworkResource.",
      "path": "/fcp/specification/statements"
    },
    {
      "id": "fcp.predicate.disallow-redundant-type-assertion",
      "description": "Do not use rdf:type or schema:additionalType when the object type is already encoded by the subject entity type.",
      "path": "/fcp/specification/statements"
    },
    {
      "id": "fcp.links.prefer-has-part-direction",
      "description": "For part-whole relationships, prefer schema:hasPart as the canonical authored direction and avoid redundantly authoring schema:isPartOf for the same fact.",
      "path": "/fcp/specification/links#inverse-direction"
    }
  ],
  "canonicalInversePredicates": [
    {
      "canonicalPredicateIri": "https://schema.org/hasPart",
      "inversePredicateIri": "https://schema.org/isPartOf",
      "strength": "SHOULD",
      "description": "For part-whole relationships, prefer schema:hasPart as the canonical authored direction.",
      "path": "/fcp/specification/links#inverse-direction"
    }
  ]
} as const;

export const FCP_PREDICATE_ROLE = FCP_STATEMENT_POLICY.predicateRole;
export const FCP_FORBIDDEN_PREDICATES = FCP_STATEMENT_POLICY.forbiddenPredicates;
export const FCP_TYPE_ASSERTION_PREDICATES = FCP_STATEMENT_POLICY.typeAssertionPredicates;
export const FCP_STATEMENT_GUIDE_RULES = FCP_STATEMENT_POLICY.guideRules;
export const FCP_CANONICAL_INVERSE_PREDICATES = FCP_STATEMENT_POLICY.canonicalInversePredicates;

export type FcpPredicateRole = typeof FCP_PREDICATE_ROLE;
export type FcpForbiddenPredicateRule = (typeof FCP_FORBIDDEN_PREDICATES)[number];
export type FcpStatementGuideRule = (typeof FCP_STATEMENT_GUIDE_RULES)[number];
export type FcpCanonicalInversePredicateRule = (typeof FCP_CANONICAL_INVERSE_PREDICATES)[number];
