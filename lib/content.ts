export type Approval = "draft" | "approved" | "hidden";
// Product areas checked against the CRM implementation. Availability depends on
// workspace configuration and user permissions.
export const workspaceCapabilities = [
  {
    title: "Leads and follow-ups",
    description: "Capture and import enquiries, assign owners, configure assignment rules, track stages and schedule follow-ups.",
  },
  {
    title: "Projects and site visits",
    description: "Organize project and property details, and coordinate visits with the team.",
  },
  {
    title: "Bookings and payouts",
    description: "Manage booking records and review brokerage, incentives and payment details.",
  },
  {
    title: "Teams and employee operations",
    description: "Manage employees, teams, attendance, leave, payroll and tasks from the workspace.",
  },
  {
    title: "Workspace and access control",
    description: "Use a dedicated workspace with a Gromoze subdomain, configure branding and manage role-based access.",
  },
  {
    title: "Reports and integrations",
    description: "Review sales and team performance, import leads and configure available notification providers.",
  },
] as const;

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
      "Capture enquiries, assign the right owner and keep the next follow-up in view.",
    status: "draft",
  },
  {
    slug: "property-inventory",
    title: "Property inventory",
    task: "Find the property that fits.",
    detail:
      "Organize project and property information for your sales team.",
    status: "draft",
  },
  {
    slug: "site-visit-management",
    title: "Site visits",
    task: "Turn interest into a visit.",
    detail:
      "Coordinate site visits and keep the visit details connected to the sales process.",
    status: "draft",
  },
  {
    slug: "sales-pipeline",
    title: "Sales pipeline",
    task: "See the next step in every deal.",
    detail:
      "Track lead stages and follow-ups to keep sales progress visible.",
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
