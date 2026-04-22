import { buildStatement } from "../statement/functions/buildStatement.js";
import type { Statement, StatementInput } from "../statement/types.js";
import { isBatchRef, type FcpExample, type FcpExampleStatement } from "./types.js";

/**
 * Resolve an FCP example's statement batch into built `Statement` objects.
 *
 * Processes statements in `batch_index` order. When a subject has `entityType:
 * "Statement"` and a `referenceIdentifier` matching `@N`, the actual
 * `statementFideId` from the previously built statement at `batch_index` N is
 * substituted before calling `buildStatement`.
 *
 * @param example - The FCP example to resolve
 * @param options - Optional build options passed through to `buildStatement`
 * @returns Array of fully built `Statement` objects in batch_index order
 * @throws Error if a `@N` reference cannot be resolved (batch_index not yet built, or no statementFideId)
 */
export async function resolveExampleBatch(
  example: FcpExample,
  options?: { normalizeReferenceIdentifier?: boolean },
): Promise<Statement[]> {
  const sorted = [...example.statements].sort((a, b) => a.batch_index - b.batch_index);
  const built = new Map<number, Statement>();
  const results: Statement[] = [];

  for (const stmt of sorted) {
    const input = resolveStatementInput(stmt, built);
    const statement = await buildStatement(input, options);
    built.set(stmt.batch_index, statement);
    results.push(statement);
  }

  return results;
}

/**
 * Resolve a single example statement into a concrete `StatementInput`,
 * substituting any `@N` batch reference with the real statement Fide ID.
 */
function resolveStatementInput(
  stmt: FcpExampleStatement,
  built: Map<number, Statement>,
): StatementInput {
  const { subject, property, object } = stmt;

  let resolvedSubjectReferenceIdentifier = subject.referenceIdentifier;

  if (isBatchRef(subject.referenceIdentifier)) {
    const refIndex = parseInt(subject.referenceIdentifier.slice(1), 10);
    const referenced = built.get(refIndex);
    if (!referenced) {
      throw new Error(
        `Example "${stmt.batch_index}": cannot resolve @${refIndex} — batch_index ${refIndex} has not been built yet. ` +
          `Ensure statements are ordered by batch_index and the referenced statement appears earlier in the batch.`,
      );
    }
    if (!referenced.statementFideId) {
      throw new Error(
        `Example "${stmt.batch_index}": referenced statement at batch_index ${refIndex} has no statementFideId.`,
      );
    }
    resolvedSubjectReferenceIdentifier = referenced.statementFideId;
  }

  return {
    subject: {
      entityType: subject.entityType as StatementInput["subject"]["entityType"],
      referenceType: subject.referenceType as StatementInput["subject"]["referenceType"],
      referenceIdentifier: resolvedSubjectReferenceIdentifier,
    },
    property: {
      entityType: property.entityType,
      referenceType: property.referenceType,
      referenceIdentifier: property.referenceIdentifier,
    },
    object: {
      entityType: object.entityType as StatementInput["object"]["entityType"],
      referenceType: object.referenceType as StatementInput["object"]["referenceType"],
      referenceIdentifier: object.referenceIdentifier,
    },
  };
}
