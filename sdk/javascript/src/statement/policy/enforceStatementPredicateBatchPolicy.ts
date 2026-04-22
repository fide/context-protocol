import type { Statement } from "../types.js";
import { getForbiddenPropertyReason } from "./getForbiddenPredicateReason.js";

/**
 * Enforce property policy for already-built statements (batch context).
 *
 * Batch checks currently apply global forbidden-property rules to persisted
 * statement payloads.
 */
export function enforceStatementPropertyBatchPolicy(statements: Statement[]): void {
  for (let i = 0; i < statements.length; i += 1) {
    const propertyReferenceIdentifier = statements[i]?.propertyReferenceIdentifier;
    if (typeof propertyReferenceIdentifier !== "string") continue;

    const reason = getForbiddenPropertyReason(propertyReferenceIdentifier);
    if (reason) {
      throw new Error(
        `Invalid statement line ${i + 1}: property ${JSON.stringify(propertyReferenceIdentifier)} is not allowed. ${reason}`,
      );
    }
  }
}
