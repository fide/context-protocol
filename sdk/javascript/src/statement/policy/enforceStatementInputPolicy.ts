/**
 * Enforce statement input policy before deriving Fide IDs.
 */
import type { StatementInput } from "../types.js";
import { describeValue } from "../utils.js";

type StatementRole = "subject" | "property" | "object";
type StatementField = "referenceIdentifier" | "entityType" | "referenceType";

/**
 * Assert that a statement role field (`subject`, `property`, `object`) is an object.
 */
function assertRoleObject(
  input: StatementInput | Record<string, unknown>,
  role: StatementRole,
): void {
  const value = (input as Record<string, unknown>)[role];
  if (value && typeof value === "object") {
    return;
  }
  throw new Error(
    `Invalid statement input: expected ${role} object; got ${describeValue(value)}.`,
  );
}

/**
 * Assert that a role subfield is present and is a string.
 */
function assertRoleFieldString(
  input: StatementInput | Record<string, unknown>,
  role: StatementRole,
  field: StatementField,
): void {
  const roleValue = (input as Record<string, unknown>)[role] as
    | Record<string, unknown>
    | undefined;
  const fieldValue = roleValue?.[field];
  if (typeof fieldValue === "string") {
    return;
  }
  throw new Error(
    `Invalid statement input: expected ${role}.${field} as string; got ${describeValue(fieldValue)}.`,
  );
}

/**
 * Enforce basic statement input invariants before ID derivation.
 *
 * Validates:
 * - object shape for `subject`, `property`, and `object`
 * - string-typed `referenceIdentifier`, `entityType`, `referenceType` fields
 * - protocol-level property type constraints (`DirectionalProperty` or `SymmetricProperty` + `NetworkResource`)
 *
 * Property URL validity/canonicalization is enforced later by
 * `normalizePropertyReferenceIdentifier()` in the statement build path.
 */
export function enforceStatementInputPolicy(input: StatementInput): void {
  if (!input || typeof input !== "object") {
    throw new Error(
      `Invalid statement input: expected object with subject, property, and object; got ${describeValue(input)}.`,
    );
  }

  const roles: StatementRole[] = ["subject", "property", "object"];
  const fields: StatementField[] = ["referenceIdentifier", "entityType", "referenceType"];

  for (const role of roles) {
    assertRoleObject(input, role);
    for (const field of fields) {
      assertRoleFieldString(input, role, field);
    }
  }

  if (input.property.entityType !== "DirectionalProperty" && input.property.entityType !== "SymmetricProperty") {
    throw new Error(
      `Invalid property entityType: ${input.property.entityType}. Expected DirectionalProperty or SymmetricProperty.`,
    );
  }

  if (input.property.referenceType !== "NetworkResource") {
    throw new Error(
      `Invalid property referenceType: ${input.property.referenceType}. Expected NetworkResource.`,
    );
  }
}
