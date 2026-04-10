#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadValidatedStatementPolicySpec } from "../lib/statement-policy-spec.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const SDK_SPEC_OUTPUT = resolve(PACKAGE_ROOT, "sdk/javascript/src/spec/index.ts");

function buildSpecModule(spec) {
  return `/**
 * Generated from \`packages/fide-context-protocol/spec/v0/statement-policy.json\`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
export const FCP_STATEMENT_POLICY = ${JSON.stringify(spec, null, 2)} as const;

export const FCP_PREDICATE_ROLE = FCP_STATEMENT_POLICY.predicateRole;
export const FCP_FORBIDDEN_PREDICATES = FCP_STATEMENT_POLICY.forbiddenPredicates;
export const FCP_TYPE_ASSERTION_PREDICATES = FCP_STATEMENT_POLICY.typeAssertionPredicates;
export const FCP_STATEMENT_GUIDE_EXAMPLES = FCP_STATEMENT_POLICY.guideExamples;

export type FcpPredicateRole = typeof FCP_PREDICATE_ROLE;
export type FcpForbiddenPredicateRule = (typeof FCP_FORBIDDEN_PREDICATES)[number];
export type FcpStatementGuideExample = (typeof FCP_STATEMENT_GUIDE_EXAMPLES)[number];
`;
}

async function main() {
  const spec = await loadValidatedStatementPolicySpec(PACKAGE_ROOT);
  await mkdir(dirname(SDK_SPEC_OUTPUT), { recursive: true });
  await writeFile(SDK_SPEC_OUTPUT, buildSpecModule(spec), "utf8");
  console.log(
    `Generated FCP SDK spec module for ${spec.forbiddenPredicates.length} forbidden predicate rules and ${spec.guideExamples.length} guide examples.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
