/**
 * Types for FCP example recipe format.
 *
 * Example files use a superset of `StatementInput` where statement-about-statement
 * subjects may use `@N` as a `referenceIdentifier` to reference a previously
 * built statement by its `batch_index`. These are resolved at runtime by
 * `resolveExampleBatch()`.
 */
import type { FideEntityType } from "@fide-work/id";
import type { FideStatementPropertyEntityType, FideStatementPropertyReferenceType } from "@fide-work/id";

/** A batch-local reference to a previously computed statement Fide ID, e.g. "@3" */
export type BatchRef = `@${number}`;

/** Whether a referenceIdentifier is a batch reference */
export function isBatchRef(value: string): value is BatchRef {
  return /^@\d+$/.test(value);
}

/** A statement role that may use a batch reference as its referenceIdentifier */
export type ExampleStatementSubject =
  | { entityType: "Statement"; referenceType: "Statement"; referenceIdentifier: BatchRef }
  | { entityType: FideEntityType; referenceType: FideEntityType; referenceIdentifier: string };

export type ExampleStatementProperty = {
  entityType: FideStatementPropertyEntityType;
  referenceType: FideStatementPropertyReferenceType;
  referenceIdentifier: string;
};

export type ExampleStatementObject = {
  entityType: FideEntityType;
  referenceType: FideEntityType;
  referenceIdentifier: string;
};

/** A single statement within an example, potentially referencing a prior statement via @N */
export interface FcpExampleStatement {
  /** 1-based index used for @N cross-references within this batch */
  batch_index: number;
  /** Teaching prose for this specific statement */
  notes?: string;
  subject: ExampleStatementSubject;
  property: ExampleStatementProperty;
  object: ExampleStatementObject;
}

/** A complete FCP example file */
export interface FcpExample {
  $schema?: string;
  $id?: string;
  title: string;
  description: string;
  specVersion: string;
  tags: string[];
  statements: FcpExampleStatement[];
}
