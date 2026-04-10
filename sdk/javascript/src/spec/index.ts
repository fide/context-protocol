/**
 * Generated from `packages/fide-context-protocol/spec/v0/statement-policy.json`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
export const FCP_STATEMENT_POLICY = {
  "$schema": "https://raw.githubusercontent.com/fide/context-protocol/refs/heads/main/spec/v0/statement-policy.schema.json",
  "$id": "https://raw.githubusercontent.com/fide/context-protocol/refs/heads/main/spec/v0/statement-policy.json",
  "namespaceUrl": "https://fide.work/context-protocol/v0/",
  "specVersion": "0",
  "specDate": "2026-04-09",
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
  "guideExamples": [
    {
      "ruleId": "fcp.predicate.disallow-redundant-type-assertion",
      "strength": "SHOULD",
      "reason": "rdf:type or schema:additionalType should only be used to assert a type not already encoded by the subject's entity type. Redundancy is determined by the Fide Vocabulary: if the entity type lists the asserted type under its standards with standardFit 'Exact', the assertion is already implicit and should be omitted.",
      "discouraged": {
        "subject": {
          "entityType": "Person",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://en.wikipedia.org/wiki/Ada_Lovelace"
        },
        "predicate": {
          "entityType": "Concept",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://www.w3.org/1999/02/22-rdf-syntax-ns#type"
        },
        "object": {
          "entityType": "Concept",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://schema.org/Person"
        }
      },
      "preferred": null
    },
    {
      "ruleId": "fcp.links.prefer-has-part-direction",
      "strength": "SHOULD",
      "reason": "hasPart is the canonical authored direction for part-whole relationships. Authoring both directions for the same fact is redundant.",
      "discouraged": {
        "subject": {
          "entityType": "CreativeWork",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://example.com/papers/on-computable-numbers"
        },
        "predicate": {
          "entityType": "Concept",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://schema.org/isPartOf"
        },
        "object": {
          "entityType": "CreativeWork",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://example.com/collections/foundational-cs"
        }
      },
      "preferred": {
        "subject": {
          "entityType": "CreativeWork",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://example.com/collections/foundational-cs"
        },
        "predicate": {
          "entityType": "Concept",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://schema.org/hasPart"
        },
        "object": {
          "entityType": "CreativeWork",
          "referenceType": "NetworkResource",
          "referenceIdentifier": "https://example.com/papers/on-computable-numbers"
        }
      }
    }
  ]
} as const;

export const FCP_PREDICATE_ROLE = FCP_STATEMENT_POLICY.predicateRole;
export const FCP_FORBIDDEN_PREDICATES = FCP_STATEMENT_POLICY.forbiddenPredicates;
export const FCP_TYPE_ASSERTION_PREDICATES = FCP_STATEMENT_POLICY.typeAssertionPredicates;
export const FCP_STATEMENT_GUIDE_EXAMPLES = FCP_STATEMENT_POLICY.guideExamples;

export type FcpPredicateRole = typeof FCP_PREDICATE_ROLE;
export type FcpForbiddenPredicateRule = (typeof FCP_FORBIDDEN_PREDICATES)[number];
export type FcpStatementGuideExample = (typeof FCP_STATEMENT_GUIDE_EXAMPLES)[number];
