/**
 * @fide-work/context-protocol - Fide Context Protocol SDK
 *
 * Core functions for calculating Fide IDs and working with
 * the FCP protocol in JavaScript/TypeScript.
 */

export {
  assertFideId,
  buildFideIdFromParts,
  calculateFideId,
  calculateStatementFideId,
  parseFideId,
  normalizeReferenceIdentifier,
  normalizePropertyReferenceIdentifier,
  FIDE_NAMESPACE_URL as FCP_NAMESPACE_URL,
  FIDE_SPEC_VERSION as FCP_SPEC_VERSION,
  FIDE_SPEC_DATE as FCP_SPEC_DATE,
  FIDE_ENTITY_TYPE_MAP,
  FIDE_CHAR_TO_ENTITY_TYPE,
  FIDE_ID_PREFIX,
  FIDE_ID_HEX_LENGTH,
  FIDE_ID_LENGTH,
  FIDE_ID_FINGERPRINT_LENGTH,
} from "@fide-work/id";

export type {
  FideEntityType,
  FideStatementPropertyEntityType,
  FideStatementPropertyReferenceType,
  FideIdCalculationOptions,
  NormalizeReferenceIdentifierOptions,
  NormalizePropertyReferenceIdentifierOptions,
  FideEntityTypeChar,
  FideId,
  FideFingerprint,
  ParsedFideId,
  StatementReferenceIdentifier,
} from "@fide-work/id";

export {
  FIDE_VOCABULARY,
  FIDE_ENTITY_TYPES,
  getFideEntityTypeSpecByName,
  getFideEntityTypeSpecByCode,
  listFideEntityTypes,
} from "@fide-work/id";

export type {
  FideEntityTypeName,
  FideEntityTypeCode,
  FideEntityTypeSpec,
  FideStandardFit,
} from "@fide-work/id";

export {
  compactpropertyReferenceIdentifier,
  expandpropertyReferenceIdentifier,
  STANDARD_CURIE_PREFIXES,
} from "./predicate-vocabulary/index.js";

export type {
  CompactpropertyReferenceIdentifierOptions,
  ExpandpropertyReferenceIdentifierOptions,
} from "./predicate-vocabulary/index.js";

export {
  buildStatement,
  calculateCanonicalStatementSetRoot,
  calculateStatementSetRoot,
  type StatementInput,
  type Statement,
  type CanonicalStatementSet,
} from "./statement/index.js";

export {
  FCP_STATEMENT_POLICY,
  FCP_PREDICATE_ROLE,
  FCP_FORBIDDEN_PREDICATES,
  FCP_TYPE_ASSERTION_PREDICATES,
  FCP_STATEMENT_GUIDE_EXAMPLES,
} from "./spec/index.js";

export type {
  FcpPropertyRole,
  FcpForbiddenPropertyRule,
  FcpStatementGuideExample,
} from "./spec/index.js";

// Policies (used by downstream SDKs/CLIs)
export { enforceStatementPropertyBatchPolicy } from "./statement/policy/enforceStatementPredicateBatchPolicy.js";
export {
  STATEMENT_GUIDE_EXAMPLES,
} from "./statement/policy/statementPredicatePolicyConstants.js";
export type {
  StatementGuideExample,
} from "./statement/policy/statementPredicatePolicyConstants.js";

// Examples
export { FCP_EXAMPLES } from "./examples/index.js";
export { resolveExampleBatch } from "./examples/resolveExampleBatch.js";
export type {
  FcpExample,
  FcpExampleStatement,
  BatchRef,
} from "./examples/types.js";
