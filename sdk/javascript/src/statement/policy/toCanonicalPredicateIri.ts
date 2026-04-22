import {
  expandpropertyReferenceIdentifier,
} from "../../predicate-vocabulary/index.js";
import { normalizePropertyReferenceIdentifier } from "@fide-work/id";

/**
 * Canonicalize a property token to an absolute property IRI.
 *
 * Accepts shorthand (for example `schema:name`) and returns `null`
 * when the value cannot be normalized as a valid property IRI.
 */
export function toCanonicalPropertyIri(propertyReferenceIdentifier: string): string | null {
  try {
    const expanded = expandpropertyReferenceIdentifier(propertyReferenceIdentifier);
    return normalizePropertyReferenceIdentifier(expanded);
  } catch {
    return null;
  }
}
