import type { StatementInput } from "../types.js";
import { getForbiddenPredicateReason } from "./getForbiddenPredicateReason.js";
import { getRedundantTypeAssertionReason } from "./getRedundantTypeAssertionReason.js";

const OWL_SAME_AS_PREDICATE = "https://www.w3.org/2002/07/owl#sameAs";

/**
 * Enforce predicate policy for a single statement input.
 *
 * - rejects globally forbidden predicates
 * - rejects redundant base-type assertions derived from exact FCP mappings
 * - enforces predicate-specific subject/object compatibility rules
 */
export function enforceStatementPredicateInputPolicy(input: StatementInput): void {
  const predicateReferenceIdentifier = input?.predicate?.referenceIdentifier;
  if (typeof predicateReferenceIdentifier !== "string") return;

  const forbiddenReason = getForbiddenPredicateReason(predicateReferenceIdentifier);
  if (forbiddenReason) {
    throw new Error(
      `Invalid predicate ${JSON.stringify(predicateReferenceIdentifier)}: ${forbiddenReason}`,
    );
  }

  const redundancyReason = getRedundantTypeAssertionReason(input);
  if (redundancyReason) {
    throw new Error(
      `Invalid predicate ${JSON.stringify(predicateReferenceIdentifier)}: ${redundancyReason}`,
    );
  }

  if (
    predicateReferenceIdentifier === OWL_SAME_AS_PREDICATE &&
    input.subject.entityType !== input.object.entityType
  ) {
    throw new Error(
      `Invalid predicate ${JSON.stringify(predicateReferenceIdentifier)}: ` +
      `owl:sameAs requires subject and object to use the same entityType ` +
      `(got ${input.subject.entityType} vs ${input.object.entityType}).`,
    );
  }
}
