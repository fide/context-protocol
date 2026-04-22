import { STATEMENT_PREDICATE_POLICY_CONSTANTS } from "./statementPredicatePolicyConstants.js";
import { toCanonicalPropertyIri } from "./toCanonicalPredicateIri.js";

/**
 * Return the protocol-policy reason when a property is globally forbidden.
 */
export function getForbiddenPropertyReason(propertyReferenceIdentifier: string): string | null {
  const canonical = toCanonicalPropertyIri(propertyReferenceIdentifier);
  if (!canonical) return null;
  return STATEMENT_PREDICATE_POLICY_CONSTANTS.forbiddenPropertyRules[canonical] ?? null;
}
