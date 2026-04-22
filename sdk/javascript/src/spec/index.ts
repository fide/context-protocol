/**
 * Generated from `packages/fide-context-protocol/spec/v0/statement-policy.json`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
export const FCP_STATEMENT_POLICY = {
  namespaceUrl: "https://fide.work/context-protocol/v0/",
  specVersion: "0",
  specDate: "2026-04-09",
  propertyRole: {
    entityTypes: [
      "DirectionalProperty",
      "SymmetricProperty"
    ],
    referenceType: "NetworkResource",
    description: "Property must use entityType=DirectionalProperty or SymmetricProperty and referenceType=NetworkResource.",
    path: "/fcp/specification/statements",
  },
  statementNormalizationRules: [
    {
      id: "fcp.statement.canonicalize-symmetric-property-order",
      description: "When a statement uses a symmetric property, subjectFideId and objectFideId MUST be ordered canonically before constructing the statement reference. Canonical ordering MUST be determined by lexicographic comparison of the canonical Fide ID strings.",
      path: "/fcp/specification/statements",
    }
  ],
  forbiddenProperties: [
    {
      id: "fcp.property.disallow-schema-identifier",
      propertyIri: "https://schema.org/identifier",
      description: "Entity identifiers are implicit in Fide IDs and reference identifiers; do not add redundant identifier properties.",
      path: "/fcp/specification/statements",
    },
    {
      id: "fcp.property.disallow-schema-sameAs",
      propertyIri: "https://schema.org/sameAs",
      description: "Use http://www.w3.org/2002/07/owl#sameAs for strict identity assertions; https://schema.org/sameAs is not allowed in FCP statements.",
      path: "/fcp/specification/statements",
    }
  ],
  typeAssertionProperties: [
    "https://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "https://schema.org/additionalType"
  ],
  guideExamples: [
    {
      ruleId: "fcp.property.disallow-redundant-type-assertion",
      strength: "SHOULD",
      reason: "rdf:type or schema:additionalType should only be used to assert a type not already encoded by the subject's entity type. Redundancy is determined by the Fide Vocabulary: if the entity type lists the asserted type under its standards with standardFit 'Exact', the assertion is already implicit and should be omitted.",
      discouraged: {
        subject: {
          entityType: "Person",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://en.wikipedia.org/wiki/Ada_Lovelace",
        },
        property: {
          entityType: "DirectionalProperty",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        },
        object: {
          entityType: "Concept",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://schema.org/Person",
        },
      },
      preferred: null,
    },
    {
      ruleId: "fcp.links.prefer-has-part-direction",
      strength: "SHOULD",
      reason: "hasPart is the canonical authored direction for part-whole relationships. Authoring both directions for the same fact is redundant.",
      discouraged: {
        subject: {
          entityType: "CreativeWork",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://example.com/papers/on-computable-numbers",
        },
        property: {
          entityType: "DirectionalProperty",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://schema.org/isPartOf",
        },
        object: {
          entityType: "CreativeWork",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://example.com/collections/foundational-cs",
        },
      },
      preferred: {
        subject: {
          entityType: "CreativeWork",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://example.com/collections/foundational-cs",
        },
        property: {
          entityType: "DirectionalProperty",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://schema.org/hasPart",
        },
        object: {
          entityType: "CreativeWork",
          referenceType: "NetworkResource",
          referenceIdentifier: "https://example.com/papers/on-computable-numbers",
        },
      },
    }
  ],
} as const;

export const FCP_PREDICATE_ROLE = FCP_STATEMENT_POLICY.propertyRole;
export const FCP_STATEMENT_NORMALIZATION_RULES = FCP_STATEMENT_POLICY.statementNormalizationRules;
export const FCP_FORBIDDEN_PREDICATES = FCP_STATEMENT_POLICY.forbiddenProperties;
export const FCP_TYPE_ASSERTION_PREDICATES = FCP_STATEMENT_POLICY.typeAssertionProperties;
export const FCP_STATEMENT_GUIDE_EXAMPLES = FCP_STATEMENT_POLICY.guideExamples;

export type FcpPropertyRole = typeof FCP_PREDICATE_ROLE;
export type FcpStatementNormalizationRule = (typeof FCP_STATEMENT_NORMALIZATION_RULES)[number];
export type FcpForbiddenPropertyRule = (typeof FCP_FORBIDDEN_PREDICATES)[number];
export type FcpStatementGuideExample = (typeof FCP_STATEMENT_GUIDE_EXAMPLES)[number];
