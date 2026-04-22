#!/usr/bin/env node
/**
 * Generates `sdk/javascript/src/spec/index.ts` from validated `statement-policy.json`.
 * Emits TypeScript-style literals (unquoted keys, JSON.stringify for strings) like
 * `fide-vocabulary/scripts/generate-sdk/spec-module.mjs`, omitting JSON-only `$schema` / `$id`.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadValidatedStatementPolicySpec } from "../lib/statement-policy-spec.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const SDK_SPEC_OUTPUT = resolve(PACKAGE_ROOT, "sdk/javascript/src/spec/index.ts");

function ind(n) {
  return " ".repeat(n);
}

function S(s) {
  return JSON.stringify(s);
}

/** Runtime spec shape (no JSON Schema metadata). */
function pickStatementPolicySpec(spec) {
  return {
    namespaceUrl: spec.namespaceUrl,
    specVersion: spec.specVersion,
    specDate: spec.specDate,
    propertyRole: spec.propertyRole,
    statementNormalizationRules: spec.statementNormalizationRules,
    forbiddenProperties: spec.forbiddenProperties,
    typeAssertionProperties: spec.typeAssertionProperties,
    guideExamples: spec.guideExamples,
  };
}

function serializePropertyRole(role) {
  return `{
    entityTypes: [
      ${role.entityTypes.map((entityType) => S(entityType)).join(",\n      ")}
    ],
    referenceType: ${S(role.referenceType)},
    description: ${S(role.description)},
    path: ${S(role.path)},
  }`;
}

function serializeStatementNormalizationRule(rule, depth) {
  const i = ind(depth);
  const d2 = depth + 2;
  return `{
${ind(d2)}id: ${S(rule.id)},
${ind(d2)}description: ${S(rule.description)},
${ind(d2)}path: ${S(rule.path)},
${i}}`;
}

function serializeRoleForTripleAsValue(role, lineIndent) {
  const inner = ind(lineIndent + 2);
  return `{
${inner}entityType: ${S(role.entityType)},
${inner}referenceType: ${S(role.referenceType)},
${inner}referenceIdentifier: ${S(role.referenceIdentifier)},
${ind(lineIndent)}}`;
}

function serializeTriple(triple, depth) {
  const i = ind(depth);
  const d2 = depth + 2;
  return `{
${ind(d2)}subject: ${serializeRoleForTripleAsValue(triple.subject, d2)},
${ind(d2)}property: ${serializeRoleForTripleAsValue(triple.property, d2)},
${ind(d2)}object: ${serializeRoleForTripleAsValue(triple.object, d2)},
${i}}`;
}

function serializeGuideExample(ex) {
  const discouraged = serializeTriple(ex.discouraged, 6);
  const preferred = ex.preferred === null ? "null" : serializeTriple(ex.preferred, 6);
  return `    {
      ruleId: ${S(ex.ruleId)},
      strength: ${S(ex.strength)},
      reason: ${S(ex.reason)},
      discouraged: ${discouraged},
      preferred: ${preferred},
    }`;
}

function buildSpecModule(data) {
  const forbidden = data.forbiddenProperties
    .map(
      (rule) => `    {
      id: ${S(rule.id)},
      propertyIri: ${S(rule.propertyIri)},
      description: ${S(rule.description)},
      path: ${S(rule.path)},
    }`,
    )
    .join(",\n");

  const typePreds = data.typeAssertionProperties.map((iri) => `    ${S(iri)}`).join(",\n");

  const guides = data.guideExamples.map((ex) => serializeGuideExample(ex)).join(",\n");
  const normalizationRules = data.statementNormalizationRules.map((rule) => `    ${serializeStatementNormalizationRule(rule, 4)}`).join(",\n");

  return `/**
 * Generated from \`packages/fide-context-protocol/spec/v0/statement-policy.json\`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
export const FCP_STATEMENT_POLICY = {
  namespaceUrl: ${S(data.namespaceUrl)},
  specVersion: ${S(data.specVersion)},
  specDate: ${S(data.specDate)},
  propertyRole: ${serializePropertyRole(data.propertyRole)},
  statementNormalizationRules: [
${normalizationRules}
  ],
  forbiddenProperties: [
${forbidden}
  ],
  typeAssertionProperties: [
${typePreds}
  ],
  guideExamples: [
${guides}
  ],
} as const;

export const FCP_PREDICATE_ROLE = FCP_STATEMENT_POLICY.propertyRole;
export const FCP_STATEMENT_NORMALIZATION_RULES = FCP_STATEMENT_POLICY.statementNormalizationRules;
export const FCP_FORBIDDEN_PREDICATES = FCP_STATEMENT_POLICY.forbiddenProperties;
export const FCP_TYPE_ASSERTION_PREDICATES = FCP_STATEMENT_POLICY.typeAssertionProperties;
export const FCP_STATEMENT_GUIDE_EXAMPLES = FCP_STATEMENT_POLICY.guideExamples;

export type FcpPropertyRole = typeof FCP_PREDICATE_ROLE;
export type FcpStatementNormalizationRule = (typeof FCP_STATEMENT_NORMALIZATION_RULES)[number];
export type FcpForbiddenPropertyRule = (typeof FCP_FORBIDDEN_PREDICATES)[number];
export type FcpStatementGuideExample = (typeof FCP_STATEMENT_GUIDE_EXAMPLES)[number];
`;
}

async function main() {
  const spec = await loadValidatedStatementPolicySpec(PACKAGE_ROOT);
  const data = pickStatementPolicySpec(spec);
  await mkdir(dirname(SDK_SPEC_OUTPUT), { recursive: true });
  await writeFile(SDK_SPEC_OUTPUT, buildSpecModule(data), "utf8");
  console.log(
    `Generated FCP SDK spec module for ${data.forbiddenProperties.length} forbidden property rules, ${data.statementNormalizationRules.length} normalization rules, and ${data.guideExamples.length} guide examples.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
