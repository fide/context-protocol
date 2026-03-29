import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..", "..", "..");
const SDK_SRC_ROOT = resolve(REPO_ROOT, "packages", "fide-context-protocol", "sdk", "javascript", "src");
const SDK_DOCS_ROOT = resolve(REPO_ROOT, "packages", "fide-context-protocol", "docs", "sdk", "javascript");

function toSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function listTsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listTsFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

function parsePoliciesFromSource(source) {
  const functionMatches = [...source.matchAll(/\/\*\*([\s\S]*?)\*\/\s*export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g)];
  const result = new Map();

  for (const [, commentBody, functionName] of functionMatches) {
    const policies = [];
    const policyMatches = [...commentBody.matchAll(/@policy\s+([^\n*]+)/g)];
    for (const [, raw] of policyMatches) {
      const [name, description = "", bypass = ""] = raw.split("|").map((part) => part.trim());
      if (!name) continue;
      const bypassOptions = bypass
        ? bypass.split(",").map((part) => part.trim()).filter(Boolean)
        : undefined;
      policies.push({
        name,
        description,
        skippable: Boolean(bypassOptions?.length),
        bypassOptions,
      });
    }
    if (policies.length > 0) {
      result.set(functionName, policies);
    }
  }

  return result;
}

async function buildPolicyMap() {
  const files = await listTsFiles(SDK_SRC_ROOT);
  const policies = new Map();
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const filePolicies = parsePoliciesFromSource(source);
    for (const [functionName, entries] of filePolicies.entries()) {
      policies.set(functionName, entries);
    }
  }
  return policies;
}

function injectPoliciesIntoMdx(mdx, policies) {
  const match = mdx.match(/<SDKFunctionPageInteractive data=\{(\{[\s\S]*\})\} \/>/);
  if (!match) return mdx;

  const data = JSON.parse(match[1]);
  if (policies) {
    data.policyEnforcements = policies;
  } else {
    delete data.policyEnforcements;
  }

  return mdx.replace(match[0], `<SDKFunctionPageInteractive data={${JSON.stringify(data)}} />`);
}

const policyMap = await buildPolicyMap();
const files = await readdir(SDK_DOCS_ROOT);

for (const file of files) {
  if (file === "meta.json") {
    const fullPath = resolve(SDK_DOCS_ROOT, file);
    const source = await readFile(fullPath, "utf8");
    const meta = JSON.parse(source);
    meta.root = true;
    delete meta.defaultOpen;
    meta.pages = meta.pages.map((page) =>
      page === "--- @Chris Test ---" ? "--- Fide ID ---" : page
    );
    const updatedMeta = `${JSON.stringify(meta, null, 2)}\n`;
    if (updatedMeta !== source) {
      await writeFile(fullPath, updatedMeta, "utf8");
    }
    continue;
  }

  if (!file.endsWith(".mdx")) continue;
  const fullPath = resolve(SDK_DOCS_ROOT, file);
  const source = await readFile(fullPath, "utf8");

  if (file === "index.mdx") {
    let updatedIndex = source.replace(
      "### @Chris Test",
      "### Fide ID\n\nFunctions are re-exported from the [Fide ID SDK](/fide-id/sdk/javascript)."
    );
    updatedIndex = updatedIndex.replaceAll("](./", "](./javascript/");
    if (updatedIndex !== source) {
      await writeFile(fullPath, updatedIndex, "utf8");
    }
    continue;
  }

  const functionName = source.match(/"name":"([^"]+)"/)?.[1];
  if (!functionName) continue;

  const updated = injectPoliciesIntoMdx(source, policyMap.get(functionName));
  if (updated !== source) {
    await writeFile(fullPath, updated, "utf8");
  }
}
