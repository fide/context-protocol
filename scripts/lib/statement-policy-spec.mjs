import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fail(errors) {
  const message = ["Statement policy spec validation failed:", ...errors.map((e) => `- ${e}`)].join("\n");
  throw new Error(message);
}

function validateRule(rule, path, errors) {
  if (!isObject(rule)) {
    errors.push(`${path} must be an object`);
    return;
  }
  if (typeof rule.id !== "string" || rule.id.length === 0) {
    errors.push(`${path}.id must be a non-empty string`);
  }
  if (typeof rule.description !== "string" || rule.description.length === 0) {
    errors.push(`${path}.description must be a non-empty string`);
  }
  if (typeof rule.path !== "string" || rule.path.length === 0) {
    errors.push(`${path}.path must be a non-empty string`);
  }
}

export async function loadValidatedStatementPolicySpec(fcpRoot) {
  const specPath = resolve(fcpRoot, "spec/v0/statement-policy.json");
  const schemaPath = resolve(fcpRoot, "spec/v0/statement-policy.schema.json");

  const spec = JSON.parse(await readFile(specPath, "utf8"));
  const schema = JSON.parse(await readFile(schemaPath, "utf8"));
  const errors = [];

  if (!isObject(spec)) {
    fail(["spec root must be an object"]);
  }

  const rootRequired = schema.required ?? [];
  for (const key of rootRequired) {
    if (!(key in spec)) errors.push(`missing required root field: ${key}`);
  }

  const specVersionPattern = new RegExp(schema.properties.specVersion.pattern);
  const datePattern = new RegExp(schema.properties.specDate.pattern);

  if (typeof spec.namespaceUrl !== "string" || spec.namespaceUrl.length === 0) {
    errors.push("namespaceUrl must be a non-empty URI string");
  }
  if (typeof spec.specVersion !== "string" || !specVersionPattern.test(spec.specVersion)) {
    errors.push(`specVersion must match ${schema.properties.specVersion.pattern}`);
  }
  if (typeof spec.specDate !== "string" || !datePattern.test(spec.specDate)) {
    errors.push(`specDate must match ${schema.properties.specDate.pattern}`);
  }

  if (!isObject(spec.predicateRole)) {
    errors.push("predicateRole must be an object");
  } else {
    if (spec.predicateRole.entityType !== "Concept") {
      errors.push("predicateRole.entityType must equal Concept");
    }
    if (spec.predicateRole.referenceType !== "NetworkResource") {
      errors.push("predicateRole.referenceType must equal NetworkResource");
    }
    if (typeof spec.predicateRole.description !== "string" || spec.predicateRole.description.length === 0) {
      errors.push("predicateRole.description must be a non-empty string");
    }
    if (typeof spec.predicateRole.path !== "string" || spec.predicateRole.path.length === 0) {
      errors.push("predicateRole.path must be a non-empty string");
    }
  }

  if (!Array.isArray(spec.forbiddenPredicates)) {
    errors.push("forbiddenPredicates must be an array");
  } else {
    for (const [index, rule] of spec.forbiddenPredicates.entries()) {
      validateRule(rule, `forbiddenPredicates[${index}]`, errors);
      if (typeof rule?.predicateIri !== "string" || !rule.predicateIri.startsWith("https://")) {
        errors.push(`forbiddenPredicates[${index}].predicateIri must be an https URI string`);
      }
    }
  }

  if (!Array.isArray(spec.typeAssertionPredicates)) {
    errors.push("typeAssertionPredicates must be an array");
  } else {
    for (const [index, iri] of spec.typeAssertionPredicates.entries()) {
      if (typeof iri !== "string" || !iri.startsWith("https://")) {
        errors.push(`typeAssertionPredicates[${index}] must be an https URI string`);
      }
    }
  }

  if (!Array.isArray(spec.guideRules)) {
    errors.push("guideRules must be an array");
  } else {
    for (const [index, rule] of spec.guideRules.entries()) {
      validateRule(rule, `guideRules[${index}]`, errors);
    }
  }

  if (!Array.isArray(spec.canonicalInversePredicates)) {
    errors.push("canonicalInversePredicates must be an array");
  } else {
    for (const [index, rule] of spec.canonicalInversePredicates.entries()) {
      if (!isObject(rule)) {
        errors.push(`canonicalInversePredicates[${index}] must be an object`);
        continue;
      }
      if (typeof rule.canonicalPredicateIri !== "string" || !rule.canonicalPredicateIri.startsWith("https://")) {
        errors.push(`canonicalInversePredicates[${index}].canonicalPredicateIri must be an https URI string`);
      }
      if (typeof rule.inversePredicateIri !== "string" || !rule.inversePredicateIri.startsWith("https://")) {
        errors.push(`canonicalInversePredicates[${index}].inversePredicateIri must be an https URI string`);
      }
      if (rule.strength !== "SHOULD" && rule.strength !== "MAY") {
        errors.push(`canonicalInversePredicates[${index}].strength must be SHOULD or MAY`);
      }
      if (typeof rule.description !== "string" || rule.description.length === 0) {
        errors.push(`canonicalInversePredicates[${index}].description must be a non-empty string`);
      }
      if (typeof rule.path !== "string" || rule.path.length === 0) {
        errors.push(`canonicalInversePredicates[${index}].path must be a non-empty string`);
      }
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  return spec;
}
