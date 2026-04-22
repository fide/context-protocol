/**
 * Generated from `packages/fide-context-protocol/spec/v0/examples/`.
 * Do not edit directly; regenerate from the spec source of truth.
 */
import type { FcpExample } from "./types.js";

export const FCP_EXAMPLE_CLASSIFICATION: FcpExample = {
  title: "Classification",
  description: "Typing entities with rdf:type, schema:additionalType, and Wikidata classification using wdt:P31.",
  specVersion: "0",
  tags: ["classification", "wikidata", "concept"],
  statements: [
    {
      batch_index: 1,
      notes: "Name a concept. Concepts are labels, terms, or abstract ideas recognized socially or formally.",
      subject: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q11660" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "artificial intelligence" },
    },
    {
      batch_index: 2,
      notes: "Give the concept a preferred SKOS label.",
      subject: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q11660" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/2004/02/skos/core#prefLabel" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Artificial Intelligence" },
    },
    {
      batch_index: 3,
      notes: "Use rdf:type to add a type that is NOT already encoded by the entity type. The subject is an Organization (code 11), so asserting it is also a 'research laboratory' (a more specific type) is valid.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/1999/02/22-rdf-syntax-ns#type" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q4801036" },
    },
    {
      batch_index: 4,
      notes: "Name the type concept for human readability.",
      subject: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q4801036" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "artificial intelligence laboratory" },
    },
    {
      batch_index: 5,
      notes: "Wikidata instance-of (wdt:P31): classify the AI lab concept as a subtype of 'research institute'. This uses Wikidata properties directly as FCP properties.",
      subject: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q4801036" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.wikidata.org/prop/direct/P31" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q31855" },
    }
  ],
} as const;

export const FCP_EXAMPLE_COMMERCE: FcpExample = {
  title: "Commerce",
  description: "Modeling business interactions: actions with agents and participants, budget proposals, and action status.",
  specVersion: "0",
  tags: ["commerce", "action", "negotiation"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the client organization.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/acme-corp" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Acme Corp" },
    },
    {
      batch_index: 2,
      notes: "Name the vendor organization.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/widgets-inc" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Widgets Inc" },
    },
    {
      batch_index: 3,
      notes: "An engagement Action representing an ongoing deal. Actions are agent-driven; here the client is the agent.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/agent" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/acme-corp" },
    },
    {
      batch_index: 4,
      notes: "The vendor participates in the engagement action.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/participant" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/widgets-inc" },
    },
    {
      batch_index: 5,
      notes: "A budget proposal Action by the client. Separate from the engagement itself.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026#budget-1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/agent" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/acme-corp" },
    },
    {
      batch_index: 6,
      notes: "The budget proposal's max value. Uses a NetworkResource anchor for the budget cap, with an IntegerLiteral value.",
      subject: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026#budget-1-cap" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/maxValue" },
      object: { entityType: "IntegerLiteral", referenceType: "IntegerLiteral", referenceIdentifier: "50000" },
    },
    {
      batch_index: 7,
      notes: "The budget proposal's currency.",
      subject: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026#budget-1-cap" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/priceCurrency" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "USD" },
    },
    {
      batch_index: 8,
      notes: "Mark the budget action as still potential (not yet accepted). Uses schema.org's ActionStatus enum via NetworkResource.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/engagements/acme-widgets-2026#budget-1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionStatus" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/PotentialActionStatus" },
    }
  ],
} as const;

export const FCP_EXAMPLE_CREATIVE_WORKS: FcpExample = {
  title: "Creative Works",
  description: "Modeling publications, authorship, and part-whole relationships with schema:hasPart.",
  specVersion: "0",
  tags: ["creative-work", "authorship"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the publication.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/papers/computing-machinery" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "On Computable Numbers" },
    },
    {
      batch_index: 2,
      notes: "Add a description to the publication. Descriptions are attributes with TextLiteral objects.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/papers/computing-machinery" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/description" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "A foundational paper on computability and Turing machines." },
    },
    {
      batch_index: 3,
      notes: "Link a person as the creator. This is an Action pattern: an Agent performed creation.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Alan_Turing" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/created" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/papers/computing-machinery" },
    },
    {
      batch_index: 4,
      notes: "A collection that contains the paper. Uses schema:hasPart (preferred canonical direction per FCP policy, instead of schema:isPartOf).",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/collections/foundational-cs" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/hasPart" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/papers/computing-machinery" },
    },
    {
      batch_index: 5,
      notes: "Publication date as an attribute on the creative work itself (entity time, not statement time).",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/papers/computing-machinery" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/datePublished" },
      object: { entityType: "DateLiteral", referenceType: "DateLiteral", referenceIdentifier: "2026-02-15" },
    }
  ],
} as const;

export const FCP_EXAMPLE_DECISION: FcpExample = {
  title: "Decision",
  description: "Modeling a decision as an Action/PROV activity that considers alternatives, selects an outcome, uses inputs, involves agents, and generates an output artifact without introducing custom Fide vocabulary.",
  specVersion: "0",
  tags: ["decision", "action", "provenance", "planning"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the work item under consideration. It is modeled as a CreativeWork container without refining it to schema:Project.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/mobile-app-launch" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Mobile App Launch" },
    },
    {
      batch_index: 2,
      notes: "The decision process itself is modeled as an Action. Action is the Fide entity type that aligns with schema:Action and prov:Activity.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Approve Mobile App Launch" },
    },
    {
      batch_index: 3,
      notes: "Further classify the decision action as a schema:PlanAction using schema:additionalType.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/additionalType" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/PlanAction" },
    },
    {
      batch_index: 4,
      notes: "Associate the decision action with the organization responsible for it.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasAssociatedWith" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/acme-product" },
    },
    {
      batch_index: 5,
      notes: "Also model the human participant in the decision process.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/participant" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/people/alice-chen" },
    },
    {
      batch_index: 6,
      notes: "Point the decision action at the work item it is deciding about.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/object" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/mobile-app-launch" },
    },
    {
      batch_index: 7,
      notes: "Use PROV to capture an input used during the decision process, such as a forecast document.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#used" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/docs/mobile-launch-forecast" },
    },
    {
      batch_index: 8,
      notes: "Capture a second input used in the decision process, such as a risk memo.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#used" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/docs/mobile-launch-risk-review" },
    },
    {
      batch_index: 9,
      notes: "Name the resulting approval record generated by the decision.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/docs/mobile-launch-approval" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Mobile Launch Approval Memo" },
    },
    {
      batch_index: 10,
      notes: "Use PROV to show that the decision action generated the approval record.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#generated" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/docs/mobile-launch-approval" },
    },
    {
      batch_index: 11,
      notes: "Mark the decision action as completed.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionStatus" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/CompletedActionStatus" },
    },
    {
      batch_index: 12,
      notes: "Statement-about-statement: record where the generated-output assertion was derived from, such as meeting minutes.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@10" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/meetings/mobile-launch-steering-2026-04-10" },
    },
    {
      batch_index: 13,
      notes: "Define the first alternative considered in the decision.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/launch-now" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Launch Immediately" },
    },
    {
      batch_index: 14,
      notes: "Define the second alternative considered in the decision.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/delay-q3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Delay to Q3" },
    },
    {
      batch_index: 15,
      notes: "Link the decision action to the first considered alternative using schema:actionOption.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionOption" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/launch-now" },
    },
    {
      batch_index: 16,
      notes: "Link the decision action to the second considered alternative.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionOption" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/delay-q3" },
    },
    {
      batch_index: 17,
      notes: "Explicitly identify the selected alternative using schema:result.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/result" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/launch-now" },
    },
    {
      batch_index: 18,
      notes: "Qualify the selected-result statement with provenance from meeting minutes.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@17" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/meetings/mobile-launch-steering-2026-04-10" },
    }
  ],
} as const;

export const FCP_EXAMPLE_DISAGREEMENT: FcpExample = {
  title: "Disagreement",
  description: "Modeling disagreement by treating the original claim as a Statement and linking a later review action to that claim using standard vocab.",
  specVersion: "0",
  tags: ["epistemics", "disagreement", "statement", "review"],
  statements: [
    {
      batch_index: 1,
      notes: "Base claim: Alice works for Acme Product.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/people/alice-chen" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/worksFor" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/orgs/acme-product" },
    },
    {
      batch_index: 2,
      notes: "Qualify the base claim with provenance from Alice's profile.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/profiles/alice-chen-linkedin" },
    },
    {
      batch_index: 3,
      notes: "A review action evaluates the original claim.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-claim-review" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Review Alice Employment Claim" },
    },
    {
      batch_index: 4,
      notes: "Classify the action as a review-oriented action.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-claim-review" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/additionalType" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/ReviewAction" },
    },
    {
      batch_index: 5,
      notes: "The review action is associated with the reviewer.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-claim-review" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasAssociatedWith" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/people/bob-martinez" },
    },
    {
      batch_index: 6,
      notes: "Point the review at the original claim statement.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-claim-review" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/object" },
      object: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@1" },
    },
    {
      batch_index: 7,
      notes: "Generate a review artifact that records disagreement with the original claim.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-review-note" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/text" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Current HR records indicate Alice no longer works for Acme Product." },
    },
    {
      batch_index: 8,
      notes: "The review action generated the disagreement note.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-claim-review" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#generated" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-review-note" },
    },
    {
      batch_index: 9,
      notes: "Name the generated disagreement review note.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/reviews/alice-employment-review-note" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Employment Claim Review Note" },
    }
  ],
} as const;

export const FCP_EXAMPLE_EDUCATION: FcpExample = {
  title: "Education",
  description: "Modeling educational participation with temporal qualifiers using statement-about-statement patterns.",
  specVersion: "0",
  tags: ["education", "temporal", "statement-qualifier"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the student.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Ada Lovelace" },
    },
    {
      batch_index: 2,
      notes: "Name the institution.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/school/university-of-london/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "University of London" },
    },
    {
      batch_index: 3,
      notes: "Link the person to the institution using a participation-style relation, while keeping the person as the primary subject in the statement.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.wikidata.org/prop/direct/P710" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/school/university-of-london/" },
    },
    {
      batch_index: 4,
      notes: "Statement-about-statement: when the participation started.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/validFrom" },
      object: { entityType: "YearLiteral", referenceType: "YearLiteral", referenceIdentifier: "2018" },
    },
    {
      batch_index: 5,
      notes: "Statement-about-statement: when the participation ended.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/validThrough" },
      object: { entityType: "YearLiteral", referenceType: "YearLiteral", referenceIdentifier: "2022" },
    },
    {
      batch_index: 6,
      notes: "A description of the educational experience, attached to the institution. This captures program-specific detail.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/school/university-of-london/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/description" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Studies in mathematics and science under the tutelage of Augustus De Morgan." },
    }
  ],
} as const;

export const FCP_EXAMPLE_EMPLOYMENT: FcpExample = {
  title: "Employment",
  description: "Modeling work relationships with temporal qualifiers and job titles using statement-about-statement patterns.",
  specVersion: "0",
  tags: ["employment", "temporal", "statement-qualifier"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the person.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Ada Lovelace" },
    },
    {
      batch_index: 2,
      notes: "Name the employer.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/company/analytical-engines-ltd/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Analytical Engines Ltd" },
    },
    {
      batch_index: 3,
      notes: "Link the person to their employer. This statement will be the target of temporal and role qualifiers below.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/worksFor" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/company/analytical-engines-ltd/" },
    },
    {
      batch_index: 4,
      notes: "Statement-about-statement: qualify WHEN the worksFor relationship began. The subject is batch_index 3's computed statementFideId.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/validFrom" },
      object: { entityType: "YearMonthLiteral", referenceType: "YearMonthLiteral", referenceIdentifier: "2021-01" },
    },
    {
      batch_index: 5,
      notes: "Statement-about-statement: qualify WHEN the worksFor relationship ended.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/validThrough" },
      object: { entityType: "YearMonthLiteral", referenceType: "YearMonthLiteral", referenceIdentifier: "2024-11" },
    },
    {
      batch_index: 6,
      notes: "Statement-about-statement: attach a job title to the worksFor relationship.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@3" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/jobTitle" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Chief Algorithm Officer" },
    }
  ],
} as const;

export const FCP_EXAMPLE_EVENTS: FcpExample = {
  title: "Events",
  description: "Modeling events with location, time, and organizer relationships.",
  specVersion: "0",
  tags: ["event", "place", "temporal"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the event.",
      subject: { entityType: "Event", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/events/turing-symposium-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Turing Symposium 2026" },
    },
    {
      batch_index: 2,
      notes: "Event start date as entity time (the event itself is temporally bounded).",
      subject: { entityType: "Event", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/events/turing-symposium-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/startDate" },
      object: { entityType: "DateLiteral", referenceType: "DateLiteral", referenceIdentifier: "2026-06-23" },
    },
    {
      batch_index: 3,
      notes: "Event end date.",
      subject: { entityType: "Event", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/events/turing-symposium-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/endDate" },
      object: { entityType: "DateLiteral", referenceType: "DateLiteral", referenceIdentifier: "2026-06-25" },
    },
    {
      batch_index: 4,
      notes: "Link the event to its physical location. Place is for spatial contexts that can contain presence.",
      subject: { entityType: "Event", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/events/turing-symposium-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/location" },
      object: { entityType: "Place", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Bletchley_Park" },
    },
    {
      batch_index: 5,
      notes: "Name the venue.",
      subject: { entityType: "Place", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Bletchley_Park" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Bletchley Park" },
    },
    {
      batch_index: 6,
      notes: "Link the event to its organizer. This is a Link pattern (entity relationship).",
      subject: { entityType: "Event", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/events/turing-symposium-2026" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/organizer" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Royal_Society" },
    }
  ],
} as const;

export const FCP_EXAMPLE_IDENTITY: FcpExample = {
  title: "Identity",
  description: "Naming entities and bridging identity across multiple references with owl:sameAs.",
  specVersion: "0",
  tags: ["identity", "naming"],
  statements: [
    {
      batch_index: 1,
      notes: "Assign a human-readable name to a Person identified by their Wikipedia page.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Ada_Lovelace" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Ada Lovelace" },
    },
    {
      batch_index: 2,
      notes: "Bridge identity: assert that two different references resolve to the same Person. Uses owl:sameAs (not schema:sameAs, which is forbidden).",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Ada_Lovelace" },
      property: { entityType: "SymmetricProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/2002/07/owl#sameAs" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.wikidata.org/wiki/Q7259" },
    },
    {
      batch_index: 3,
      notes: "Name an Organization by its canonical URL.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/University_of_London" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "University of London" },
    }
  ],
} as const;

export const FCP_EXAMPLE_ORGANIZATIONS: FcpExample = {
  title: "Organizations",
  description: "Modeling organizational structure, founding, roles, and inter-org relationships.",
  specVersion: "0",
  tags: ["organization", "subsidiary", "classification"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the parent organization.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Alphabet_Inc." },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Alphabet Inc." },
    },
    {
      batch_index: 2,
      notes: "Name the subsidiary.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Google DeepMind" },
    },
    {
      batch_index: 3,
      notes: "Part-whole: parent org contains the subsidiary. Uses schema:hasPart per FCP canonical direction policy.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Alphabet_Inc." },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/hasPart" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
    },
    {
      batch_index: 4,
      notes: "Link the founder. This is a Link pattern (entity-to-entity relationship), not an Action.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/founder" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Demis_Hassabis" },
    },
    {
      batch_index: 5,
      notes: "A rich description for the subsidiary. Long-form text is a normal TextLiteral attribute.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/description" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "A British-American artificial intelligence research laboratory and subsidiary of Alphabet Inc." },
    },
    {
      batch_index: 6,
      notes: "Classify the org using Wikidata's 'instance of' property (wdt:P31). The object is the Concept 'artificial intelligence laboratory'.",
      subject: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://en.wikipedia.org/wiki/Google_DeepMind" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.wikidata.org/prop/direct/P31" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "http://www.wikidata.org/entity/Q4801036" },
    }
  ],
} as const;

export const FCP_EXAMPLE_PLANNING: FcpExample = {
  title: "Planning",
  description: "Modeling work containers, tasks, ownership, status, and dependencies using existing vocabulary and current Fide entity types without relying on schema:Project.",
  specVersion: "0",
  tags: ["planning", "project", "task", "dependency"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the work container. It is kept as a CreativeWork container rather than refined to schema:Project.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/customer-portal" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Customer Portal Refresh" },
    },
    {
      batch_index: 2,
      notes: "Name the first planned task.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Design New Portal Navigation" },
    },
    {
      batch_index: 3,
      notes: "Refine the task into a schema:PlanAction using schema:additionalType.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/additionalType" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/PlanAction" },
    },
    {
      batch_index: 4,
      notes: "The work container has this task as a part. hasPart is the canonical authored direction for part-whole relationships.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/customer-portal" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/hasPart" },
      object: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
    },
    {
      batch_index: 5,
      notes: "Assign an owner to the task using schema:agent.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/agent" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/people/alice-chen" },
    },
    {
      batch_index: 6,
      notes: "Mark the task as actively in progress.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionStatus" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/ActiveActionStatus" },
    },
    {
      batch_index: 7,
      notes: "Name the second planned task.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Implement Portal Navigation" },
    },
    {
      batch_index: 8,
      notes: "Refine the second task into a schema:PlanAction using schema:additionalType.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/additionalType" },
      object: { entityType: "Concept", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/PlanAction" },
    },
    {
      batch_index: 9,
      notes: "The work container also has the implementation task as a part.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/customer-portal" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/hasPart" },
      object: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
    },
    {
      batch_index: 10,
      notes: "Assign the implementation task to a different owner.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/agent" },
      object: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/people/bob-martinez" },
    },
    {
      batch_index: 11,
      notes: "Mark the implementation task as potential because it has not started yet.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionStatus" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/PotentialActionStatus" },
    },
    {
      batch_index: 12,
      notes: "Model a dependency by saying the implementation task requires the design task. dcterms:requires is used here as an existing external property instead of inventing a custom one.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://purl.org/dc/terms/requires" },
      object: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/design" },
    },
    {
      batch_index: 13,
      notes: "Attach a target deliverable to the implementation task.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/tasks/customer-portal/implement" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/object" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/designs/customer-portal-nav-spec" },
    },
    {
      batch_index: 14,
      notes: "Statement-about-statement: qualify the dependency with provenance from the planning doc that established it.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@12" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/plans/customer-portal-q2-plan" },
    }
  ],
} as const;

export const FCP_EXAMPLE_PROVENANCE: FcpExample = {
  title: "Provenance",
  description: "Tracking where statements were derived from using prov:wasDerivedFrom on statement-about-statement patterns.",
  specVersion: "0",
  tags: ["provenance", "statement-qualifier"],
  statements: [
    {
      batch_index: 1,
      notes: "A person works for an organization. This is the base fact we want to track provenance for.",
      subject: { entityType: "Person", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/worksFor" },
      object: { entityType: "Organization", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/company/analytical-engines-ltd/" },
    },
    {
      batch_index: 2,
      notes: "Statement-about-statement: record that batch_index 1 was derived from a specific LinkedIn profile page. The NetworkResource subject references the profile page as the provenance source.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://www.linkedin.com/in/ada-lovelace/" },
    }
  ],
} as const;

export const FCP_EXAMPLE_SUPERSESSION: FcpExample = {
  title: "Supersession",
  description: "Modeling a later decision action that replaces an earlier decision action using standard vocab.",
  specVersion: "0",
  tags: ["decision", "supersession", "action", "history"],
  statements: [
    {
      batch_index: 1,
      notes: "Name the work item under decision.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/mobile-app-launch" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Mobile App Launch" },
    },
    {
      batch_index: 2,
      notes: "Earlier decision action.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Approve Mobile App Launch v1" },
    },
    {
      batch_index: 3,
      notes: "Earlier decision action is about the work item.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/object" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/mobile-app-launch" },
    },
    {
      batch_index: 4,
      notes: "Earlier decision selected the phased launch.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/result" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/mobile-launch-ios-first" },
    },
    {
      batch_index: 5,
      notes: "Later decision action.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v2" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Approve Mobile App Launch v2" },
    },
    {
      batch_index: 6,
      notes: "Later decision action is also about the same work item.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v2" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/object" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/projects/mobile-app-launch" },
    },
    {
      batch_index: 7,
      notes: "Later decision selected the full launch instead.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v2" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/result" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/mobile-launch-ios-android" },
    },
    {
      batch_index: 8,
      notes: "Use a standard replacement property to show that the later decision supersedes the earlier one.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v2" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://purl.org/dc/terms/replaces" },
      object: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v1" },
    },
    {
      batch_index: 9,
      notes: "Mark the later decision as completed.",
      subject: { entityType: "Action", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/decisions/mobile-app-launch/approve-v2" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/actionStatus" },
      object: { entityType: "NetworkResource", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/CompletedActionStatus" },
    },
    {
      batch_index: 10,
      notes: "Qualify the supersession statement with provenance from the new steering memo.",
      subject: { entityType: "Statement", referenceType: "Statement", referenceIdentifier: "@8" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://www.w3.org/ns/prov#wasDerivedFrom" },
      object: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/docs/mobile-launch-steering-update" },
    },
    {
      batch_index: 11,
      notes: "Name the first alternative option.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/mobile-launch-ios-first" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Launch iOS first, Android later" },
    },
    {
      batch_index: 12,
      notes: "Name the second alternative option.",
      subject: { entityType: "CreativeWork", referenceType: "NetworkResource", referenceIdentifier: "https://example.com/options/mobile-launch-ios-android" },
      property: { entityType: "DirectionalProperty", referenceType: "NetworkResource", referenceIdentifier: "https://schema.org/name" },
      object: { entityType: "TextLiteral", referenceType: "TextLiteral", referenceIdentifier: "Launch iOS and Android together" },
    }
  ],
} as const;

/** All FCP spec examples. */
export const FCP_EXAMPLES: FcpExample[] = [FCP_EXAMPLE_CLASSIFICATION, FCP_EXAMPLE_COMMERCE, FCP_EXAMPLE_CREATIVE_WORKS, FCP_EXAMPLE_DECISION, FCP_EXAMPLE_DISAGREEMENT, FCP_EXAMPLE_EDUCATION, FCP_EXAMPLE_EMPLOYMENT, FCP_EXAMPLE_EVENTS, FCP_EXAMPLE_IDENTITY, FCP_EXAMPLE_ORGANIZATIONS, FCP_EXAMPLE_PLANNING, FCP_EXAMPLE_PROVENANCE, FCP_EXAMPLE_SUPERSESSION];
