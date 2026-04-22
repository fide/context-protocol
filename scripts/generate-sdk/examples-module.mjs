#!/usr/bin/env node
/**
 * Generates `sdk/javascript/src/examples/index.ts` from the JSON example files
 * in `spec/v0/examples/`. Mirrors the pattern of `generate-sdk/spec-module.mjs`.
 *
 * Run via: pnpm --filter @fide-work/context-protocol generate:examples
 */

import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const EXAMPLES_DIR = resolve(PACKAGE_ROOT, "spec/v0/examples");
const OUTPUT_PATH = resolve(PACKAGE_ROOT, "sdk/javascript/src/examples/index.ts");

function toConstName(filename) {
  return "FCP_EXAMPLE_" + basename(filename, ".json").toUpperCase().replace(/-/g, "_");
}

async function loadExample(filePath) {
  const raw = await readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  if (!data.title || !Array.isArray(data.statements)) {
    throw new Error(`Invalid example file: ${filePath}`);
  }
  return data;
}

/** Serialize a statement role (subject/property/object) inline */
function serializeRole(role) {
  return `{ entityType: "${role.entityType}", referenceType: "${role.referenceType}", referenceIdentifier: "${role.referenceIdentifier}" }`;
}

/** Serialize a single example statement with unquoted keys */
function serializeStatement(stmt, indent = "    ") {
  const lines = [`${indent}{`];
  lines.push(`${indent}  batch_index: ${stmt.batch_index},`);
  if (stmt.notes) {
    // Escape backticks and backslashes for template safety
    const escaped = stmt.notes.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    lines.push(`${indent}  notes: "${escaped}",`);
  }
  lines.push(`${indent}  subject: ${serializeRole(stmt.subject)},`);
  lines.push(`${indent}  property: ${serializeRole(stmt.property)},`);
  lines.push(`${indent}  object: ${serializeRole(stmt.object)},`);
  lines.push(`${indent}}`);
  return lines.join("\n");
}

/** Serialize a full example as clean TypeScript (no quoted keys, no $schema/$id) */
function serializeExample(example, constName) {
  const tags = example.tags.map((t) => `"${t}"`).join(", ");
  const stmts = example.statements.map((s) => serializeStatement(s)).join(",\n");

  return [
    `export const ${constName}: FcpExample = {`,
    `  title: "${example.title}",`,
    `  description: "${example.description.replace(/"/g, '\\"')}",`,
    `  specVersion: "${example.specVersion}",`,
    `  tags: [${tags}],`,
    `  statements: [`,
    stmts,
    `  ],`,
    `} as const;`,
  ].join("\n");
}

async function main() {
  const files = (await readdir(EXAMPLES_DIR))
    .filter((f) => f.endsWith(".json"))
    .sort();

  const examples = await Promise.all(
    files.map(async (file) => {
      const data = await loadExample(resolve(EXAMPLES_DIR, file));
      return { file, constName: toConstName(file), data };
    }),
  );

  const lines = [
    `/**`,
    ` * Generated from \`packages/fide-context-protocol/spec/v0/examples/\`.`,
    ` * Do not edit directly; regenerate from the spec source of truth.`,
    ` */`,
    `import type { FcpExample } from "./types.js";`,
    ``,
  ];

  for (const { constName, data } of examples) {
    lines.push(serializeExample(data, constName));
    lines.push(``);
  }

  const allConsts = examples.map((e) => e.constName).join(", ");
  lines.push(`/** All FCP spec examples. */`);
  lines.push(`export const FCP_EXAMPLES: FcpExample[] = [${allConsts}];`);
  lines.push(``);

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, lines.join("\n"), "utf8");

  console.log(
    `Generated FCP SDK examples module: ${examples.length} example(s) → ${OUTPUT_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
