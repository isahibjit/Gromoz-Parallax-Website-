export type Approval = "draft" | "approved" | "hidden";
export const modules: {
  slug: string;
  title: string;
  task: string;
  detail: string;
  status: Approval;
}[] = [
  {
    slug: "lead-management",
    title: "Lead management",
    task: "Give every enquiry a clear owner.",
    detail:
      "Explore a buyer’s property requirements, a named owner and the next follow-up around one sample enquiry.",
    status: "draft",
  },
  {
    slug: "property-inventory",
    title: "Property inventory",
    task: "Find the property that fits.",
    detail:
      "Review the sample project, unit, apartment configuration and area alongside the buyer’s requirements.",
    status: "draft",
  },
  {
    slug: "site-visit-management",
    title: "Site visits",
    task: "Turn interest into a visit.",
    detail:
      "Review the visit time, property and owner, then prepare the questions and property details for the follow-up.",
    status: "draft",
  },
  {
    slug: "sales-pipeline",
    title: "Sales pipeline",
    task: "See the next step in every deal.",
    detail:
      "Explore stages and visible next actions so a team can discuss progress with context.",
    status: "draft",
  },
  {
    slug: "channel-partners",
    title: "Channel partners",
    task: "Bring clarity to the handover.",
    detail:
      "Explore how referral context and a named owner could travel together.",
    status: "draft",
  },
  {
    slug: "reports",
    title: "Reports and team visibility",
    task: "Start the conversation with context.",
    detail:
      "Explore an overview of ownership, upcoming activity and sample pipeline stages.",
    status: "draft",
  },
];
export const audiences = [
  {
    slug: "developers",
    title: "Developers",
    heading: "One project. A shared perspective.",
    text: "Bring project enquiries, unit discussions and sales activity into the same conversation.",
    needs: [
      "Project-level enquiry ownership",
      "Unit configuration and area discussions",
      "A view of the next sales activity",
    ],
  },
  {
    slug: "brokerages",
    title: "Brokerages",
    heading: "Keep your team on the same page.",
    text: "Keep buyer requirements, project discussions and visit preparation connected to a named owner and next action.",
    needs: [
      "A named owner for each enquiry",
      "Buyer requirements beside property details",
      "Visit preparation and follow-up questions",
    ],
  },
  {
    slug: "channel-partners",
    title: "Channel partners",
    heading: "A better-informed handover.",
    text: "Discuss how referrals, ownership and progress could work across your partner relationships.",
    needs: [
      "Referral context at handover",
      "Clear responsibility for next steps",
      "Progress discussions with context",
    ],
  },
];
export const routes = [
  "product",
  "pricing",
  "about",
  "book-demo",
  "contact",
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
  ...modules.map((m) => "features/" + m.slug),
  ...audiences.map((a) => "solutions/" + a.slug),
];
