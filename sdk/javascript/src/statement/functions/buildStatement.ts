import {
  calculateFideId,
  calculateStatementFideId,
  normalizeReferenceIdentifier,
  normalizePropertyReferenceIdentifier,
  type FideId,
} from "@fide-work/id";
import { enforceStatementFideIdsPolicy } from "../policy/enforceStatementFideIdsPolicy.js";
import { enforceStatementInputPolicy } from "../policy/enforceStatementInputPolicy.js";
import { enforceStatementPropertyInputPolicy } from "../policy/enforceStatementPredicateInputPolicy.js";
import type { Statement, StatementBuildOptions, StatementInput } from "../types.js";

/**
 * Build a statement object with all required fields.
 *
 * Always computes Fide IDs from referenceIdentifier + entityType + referenceType.
 * Properties must be canonical full URLs.
 *
 * @param input - Statement input with subject, property, and object
 * @paramDefault input { subject: { referenceIdentifier: "https://x.com/alice", entityType: "Person", referenceType: "NetworkResource" }, property: { referenceIdentifier: "https://schema.org/knows", entityType: "DirectionalProperty", referenceType: "NetworkResource" }, object: { referenceIdentifier: "https://x.com/bob", entityType: "Person", referenceType: "NetworkResource" } }
 * @paramDefault options { normalizeReferenceIdentifier: true }
 * @policy Statement Input Policy | Validates the subject, property, and object input shape before any Fide IDs are calculated.
 * @policy Statement Property Policy | Validates property-specific input rules before any Fide IDs are calculated.
 * @policy Statement Fide IDs Policy | Validates the calculated subject, property, and object Fide IDs before building the final statement.
 * @policy Nested Fide ID Policies | Calls calculateFideId for each statement part, so reference type and reference identifier policies are also enforced.
 * @returns Complete statement object
 * @throws Error if statement input policy fails, Fide ID format/policy checks fail, or statement ID derivation fails
 */
export async function buildStatement(
  input: StatementInput,
  options?: StatementBuildOptions,
): Promise<Statement> {
  enforceStatementInputPolicy(input);
  enforceStatementPropertyInputPolicy(input);
  const shouldNormalizeReferenceIdentifier = options?.normalizeReferenceIdentifier === true;
  const subjectReferenceIdentifier = shouldNormalizeReferenceIdentifier
    ? normalizeReferenceIdentifier(input.subject.referenceIdentifier)
    : input.subject.referenceIdentifier;
  const propertyReferenceIdentifier = normalizePropertyReferenceIdentifier(
    input.property.referenceIdentifier,
    { skipUrlNormalization: !shouldNormalizeReferenceIdentifier },
  );
  const objectReferenceIdentifier = shouldNormalizeReferenceIdentifier
    ? normalizeReferenceIdentifier(input.object.referenceIdentifier)
    : input.object.referenceIdentifier;

  const subjectFideId = await calculateFideId(
    input.subject.entityType,
    input.subject.referenceType,
    subjectReferenceIdentifier
  );

  const propertyFideId: FideId = await calculateFideId(
    input.property.entityType,
    input.property.referenceType,
    propertyReferenceIdentifier
  );

  const objectFideId = await calculateFideId(
    input.object.entityType,
    input.object.referenceType,
    objectReferenceIdentifier
  );

  enforceStatementFideIdsPolicy(subjectFideId, propertyFideId, objectFideId);

  const statementFideId = await calculateStatementFideId(
    subjectFideId,
    propertyFideId,
    objectFideId
  );

  return {
    subjectFideId,
    subjectReferenceIdentifier,
    propertyFideId,
    propertyReferenceIdentifier,
    objectFideId,
    objectReferenceIdentifier,
    statementFideId,
  };
}
