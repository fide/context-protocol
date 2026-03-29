import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const REPO_ROOT = resolve(PACKAGE_ROOT, "..", "..");
const CHECK_MODE = process.argv.includes("--check");
const GENERATED_PATHS = [
  "packages/fide-context-protocol/docs/sdk/javascript",
];

function run(command, args) {
  const pretty = [command, ...args].join(" ");
  console.log(`> ${pretty}`);

  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runCapture(command, args) {
  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    env: process.env,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.stdout ?? "";
}

run("pnpm", [
  "exec",
  "lally",
  "fumadocs",
  "generate",
  "sdk",
  "--app",
  "apps/docs",
  "--entry",
  resolve(PACKAGE_ROOT, "sdk/javascript/src/index.ts"),
  "--out",
  resolve(PACKAGE_ROOT, "docs/sdk/javascript"),
  "--package-name",
  "@fide-work/context-protocol",
  "--title",
  "SDK",
  "--section-overrides",
  "fide-id=Fide ID",
  "--component-import-path",
  "@/components/sdk-layout/sdk-function-page-interactive",
  "--component-export-name",
  "SDKFunctionPageInteractive",
  "--component-file-path",
  "src/components/sdk-layout/sdk-function-page-interactive.tsx",
]);
run("node", [resolve(PACKAGE_ROOT, "scripts/postprocess-sdk-docs.mjs")]);

if (CHECK_MODE) {
  const statusOutput = runCapture("git", ["status", "--porcelain", "--", ...GENERATED_PATHS]).trim();
  if (statusOutput.length > 0) {
    console.error("Generated files are out of date. Run `pnpm --dir packages/fide-context-protocol/sdk/javascript run generate:docs` and commit the changes.");
    console.error(statusOutput);
    process.exit(1);
  }
  console.log("Generated files are up to date.");
}
