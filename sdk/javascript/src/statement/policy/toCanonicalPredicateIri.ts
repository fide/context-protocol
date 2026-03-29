import {
  expandPredicateReferenceIdentifier,
} from "../../predicate-vocabulary/index.js";
import { normalizePredicateReferenceIdentifier } from "@fide-work/id";

/**
 * Canonicalize a predicate token to an absolute predicate IRI.
 *
 * Accepts shorthand (for example `schema:name`) and returns `null`
 * when the value cannot be normalized as a valid predicate IRI.
 */
export function toCanonicalPredicateIri(predicateReferenceIdentifier: string): string | null {
  try {
    const expanded = expandPredicateReferenceIdentifier(predicateReferenceIdentifier);
    return normalizePredicateReferenceIdentifier(expanded);
  } catch {
    return null;
  }
}
