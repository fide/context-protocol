import type { StatementInput } from "../types.js";
import { getForbiddenPropertyReason } from "./getForbiddenPredicateReason.js";
import { getRedundantTypeAssertionReason } from "./getRedundantTypeAssertionReason.js";

const OWL_SAME_AS_PREDICATE = "https://www.w3.org/2002/07/owl#sameAs";

/**
 * Enforce property policy for a single statement input.
 *
 * - rejects globally forbidden properties
 * - rejects redundant base-type assertions derived from exact FCP mappings
 * - enforces property-specific subject/object compatibility rules
 */
export function enforceStatementPropertyInputPolicy(input: StatementInput): void {
  const propertyReferenceIdentifier = input?.property?.referenceIdentifier;
  if (typeof propertyReferenceIdentifier !== "string") return;

  const forbiddenReason = getForbiddenPropertyReason(propertyReferenceIdentifier);
  if (forbiddenReason) {
    throw new Error(
      `Invalid property ${JSON.stringify(propertyReferenceIdentifier)}: ${forbiddenReason}`,
    );
  }

  const redundancyReason = getRedundantTypeAssertionReason(input);
  if (redundancyReason) {
    throw new Error(
      `Invalid property ${JSON.stringify(propertyReferenceIdentifier)}: ${redundancyReason}`,
    );
  }

  if (
    propertyReferenceIdentifier === OWL_SAME_AS_PREDICATE &&
    input.subject.entityType !== input.object.entityType
  ) {
    throw new Error(
      `Invalid property ${JSON.stringify(propertyReferenceIdentifier)}: ` +
      `owl:sameAs requires subject and object to use the same entityType ` +
      `(got ${input.subject.entityType} vs ${input.object.entityType}).`,
    );
  }
}
