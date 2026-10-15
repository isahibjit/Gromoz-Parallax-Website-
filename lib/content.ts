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
      "Explore qualification, follow-up dates and a shared activity history, built around one lead record.",
    status: "draft",
  },
  {
    slug: "property-inventory",
    title: "Property inventory",
    task: "Find the property that fits.",
    detail:
      "Explore project and unit information alongside a buyer’s requirements, with sample availability.",
    status: "draft",
  },
  {
    slug: "site-visit-management",
    title: "Site visits",
    task: "Turn interest into a visit.",
    detail:
      "Explore a shared schedule, visit details and a place to record what happens next.",
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
      "Unit availability discussions",
      "A view of the next sales activity",
    ],
  },
  {
    slug: "brokerages",
    title: "Brokerages",
    heading: "Keep your team on the same page.",
    text: "Explore a shared approach to buyer enquiries, property matches and timely follow-ups.",
    needs: [
      "A named owner for each enquiry",
      "Buyer and property context together",
      "A clear queue of next actions",
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
export const chapters = [
  {
    title: "Capture and assign",
    text: "An enquiry arrives. Give it context, a source and one person responsible for the next step.",
    stage: "New enquiry",
    action: "Call to understand requirements",
    date: "16 Oct, 10:00 am",
  },
  {
    title: "Match and follow up",
    text: "Keep the buyer’s requirements beside a suitable property and a visible follow-up date.",
    stage: "Qualified",
    action: "Discuss Cedar Heights · A-1204",
    date: "16 Oct, 2:30 pm",
  },
  {
    title: "Plan the site visit",
    text: "Agree a time, share the details and keep the visit outcome in the same record.",
    stage: "Visit scheduled",
    action: "Site visit at Cedar Heights",
    date: "17 Oct, 11:00 am",
  },
  {
    title: "Track the deal",
    text: "Move the conversation forward with a clear stage and an explicit next action.",
    stage: "Negotiation",
    action: "Share payment-plan details",
    date: "18 Oct, 10:30 am",
  },
];
export const faqs = [
  [
    "Who is Gromoze intended for?",
    "The proposed workspace is designed around developers, brokerages and real estate sales teams. The demo conversation can help assess your team’s needs.",
  ],
  [
    "What can I explore in this preview?",
    "A fictional enquiry moves through ownership, property matching, a site visit and a pipeline discussion. All screens are illustrative; capabilities are awaiting confirmation.",
  ],
  [
    "What happens in a demo?",
    "The intended demo is a conversation about your sales process, team structure and requirements. Scheduling and availability need confirmation from Gromoze.",
  ],
  [
    "Are prices available?",
    "Plans and prices have not been confirmed. Use the pricing enquiry preview to outline team size, business type and requirements.",
  ],
  [
    "Can we discuss imports and integrations?",
    "Yes—include those requirements in a demo discussion. This website does not claim that any particular import or integration is available.",
  ],
  [
    "Does this preview save my enquiries?",
    "No. The forms validate locally and show a preview result. They do not send or retain your entered details.",
  ],
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
