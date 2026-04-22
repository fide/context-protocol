/**
 * Property vocabulary shorthand helpers.
 */

export { FCP_CURIE_PREFIX_IRIS as STANDARD_CURIE_PREFIXES } from "./constants.js";
export { expandpropertyReferenceIdentifier } from "./functions/expandPredicateReferenceIdentifier.js";
export { compactpropertyReferenceIdentifier } from "./functions/compactPredicateReferenceIdentifier.js";

export type {
  ExpandpropertyReferenceIdentifierOptions,
  CompactpropertyReferenceIdentifierOptions,
} from "./types.js";
