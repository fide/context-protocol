import type { StatementInput } from "../types.js";
import { STATEMENT_PREDICATE_POLICY_CONSTANTS } from "./statementPredicatePolicyConstants.js";
import { toCanonicalPropertyIri } from "./toCanonicalPredicateIri.js";

/**
 * Return the policy reason when a statement asserts a redundant base type.
 *
 * A type assertion is redundant only when:
 * - property is a supported type-assertion property,
 * - subject entity type has one or more exact standard mappings,
 * - object equals one of those exact mapped standard IRIs.
 */
export function getRedundantTypeAssertionReason(input: StatementInput): string | null {
  const propertyIri = toCanonicalPropertyIri(input.property.referenceIdentifier);
  if (
    !propertyIri ||
    !STATEMENT_PREDICATE_POLICY_CONSTANTS.typeAssertionPropertyUris.has(propertyIri)
  ) {
    return null;
  }

  const exactStandardUris =
    STATEMENT_PREDICATE_POLICY_CONSTANTS.exactStandardUrisByEntityType[input.subject.entityType];
  if (!exactStandardUris || exactStandardUris.size === 0) {
    return null;
  }

  const objectIri = toCanonicalPropertyIri(input.object.referenceIdentifier);
  if (!objectIri || !exactStandardUris.has(objectIri)) {
    return null;
  }

  return (
    `redundant type assertion ${JSON.stringify(objectIri)} for ${input.subject.entityType}. ` +
    "Exact base type is already encoded in the subject Fide ID; omit this statement."
  );
}
