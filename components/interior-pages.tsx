import Link from "next/link";
import { ArrowRight, CalendarDays, Check, UserRound } from "lucide-react";
import { audiences, modules } from "@/lib/content";
import { sampleLead } from "@/lib/story";
import { CTA } from "./ui";
import styles from "./interior-pages.module.css";

type PreviewKind = "enquiry" | "property" | "visit" | "pipeline";

function SampleHeader({ title }: { title: string }) {
  return (
    <div className={styles.sampleHeader}>
      <strong>
        gromoze <span>/ {title}</span>
      </strong>
      <span>Sample workflow</span>
    </div>
  );
}

function RecordIdentity() {
  return (
    <div className={styles.identity}>
      <span className="avatar" aria-hidden="true">
        {sampleLead.initials}
      </span>
      <div>
        <strong>{sampleLead.name}</strong>
        <span>
          {sampleLead.id} · {sampleLead.project}, {sampleLead.unit}
        </span>
      </div>
    </div>
  );
}

export function FocusedPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "property")
    return (
      <div className={styles.preview}>
        <SampleHeader title="Property detail" />
        <div className={styles.propertyBody}>
          <div
            className={styles.floor}
            role="img"
            aria-label={`Illustrative floor layout, unit ${sampleLead.unit} selected`}
          >
            <span>B-801</span>
            <span>B-802</span>
            <span className={styles.corridor}>Floor 8 · shared corridor</span>
            <span>B-803</span>
            <span className={styles.selectedUnit}>
              {sampleLead.unit}
              <small>Selected unit</small>
            </span>
          </div>
          <div className={styles.unitDetails}>
            <span className={styles.context}>Property in the conversation</span>
            <h3>{sampleLead.project}</h3>
            <p>
              {sampleLead.unit} · {sampleLead.requirement}
            </p>
            <dl>
              <div>
                <dt>Illustrative area</dt>
                <dd>{sampleLead.area}</dd>
              </div>
              <div>
                <dt>Enquiry</dt>
                <dd>{sampleLead.name}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{sampleLead.owner}</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className={styles.sampleFoot}>
          Fictional project and floor layout. Availability is not represented.
        </p>
      </div>
    );
  if (kind === "visit")
    return (
      <div className={styles.preview}>
        <SampleHeader title="Site visits" />
        <div className={styles.visitBody}>
          <div className={styles.weekHeading}>
            <CalendarDays size={20} aria-hidden="true" />
            <strong>12–18 October 2026</strong>
            <span>Sample week</span>
          </div>
          <div className={styles.week}>
            {[
              "Mon 12",
              "Tue 13",
              "Wed 14",
              "Thu 15",
              "Fri 16",
              "Sat 17",
              "Sun 18",
            ].map((day, index) => (
              <div key={day} className={index === 5 ? styles.visitDay : ""}>
                <span>
                  {day.split(" ")[0]}
                  <span className={styles.weekDate}>{day.split(" ")[1]}</span>
                </span>
                {index === 5 && <strong>{sampleLead.visitTime}</strong>}
              </div>
            ))}
          </div>
          <div className={styles.visitDetail}>
            <RecordIdentity />
            <dl>
              <div>
                <dt>Visit</dt>
                <dd>
                  {sampleLead.visitDate} · {sampleLead.visitTime}
                </dd>
              </div>
              <div>
                <dt>With</dt>
                <dd>{sampleLead.owner}</dd>
              </div>
              <div>
                <dt>After the visit</dt>
                <dd>{sampleLead.status}</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className={styles.sampleFoot}>
          A fixed sample visit, with the enquiry and property attached.
        </p>
      </div>
    );
  if (kind === "pipeline")
    return (
      <div className={`${styles.preview} ${styles.pipelinePreview}`}>
        <SampleHeader title="Sales progress" />
        <div className={styles.pipeline}>
          {["Enquiry", "Visit", sampleLead.status].map((stage, index) => (
            <section key={stage}>
              <h3>{stage}</h3>
              {index < 2 ? (
                <p className={styles.quietStage}>
                  {index === 0
                    ? "Enquiry received and owner assigned."
                    : "Property viewed. Visit details retained."}
                </p>
              ) : (
                <div className={styles.pipelineRecord}>
                  <RecordIdentity />
                  <span className={styles.context}>Next action</span>
                  <strong>{sampleLead.nextAction}</strong>
                  <p>
                    <UserRound size={14} aria-hidden="true" />
                    {sampleLead.owner}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
        <p className={styles.sampleFoot}>
          The sample record is in {sampleLead.status} after its site visit.
        </p>
      </div>
    );
  return (
    <div className={styles.preview}>
      <SampleHeader title="Enquiry detail" />
      <div className={styles.recordBody}>
        <RecordIdentity />
        <dl className={styles.recordFields}>
          <div>
            <dt>Source</dt>
            <dd>{sampleLead.source}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{sampleLead.owner}</dd>
          </div>
          <div>
            <dt>Property</dt>
            <dd>
              {sampleLead.project} · {sampleLead.unit}
            </dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>{sampleLead.status}</dd>
          </div>
        </dl>
        <div className={styles.action}>
          <span>Next action</span>
          <strong>{sampleLead.nextAction}</strong>
        </div>
        <div className={styles.activity}>
          <Check size={16} aria-hidden="true" />
          <p>
            Site visit recorded{" "}
            <span>
              {sampleLead.visitDate} · {sampleLead.visitTime}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface FeatureDetail {
  readonly kind: PreviewKind;
  readonly heading: string;
  readonly intro: string;
  readonly points: readonly [string, string][];
}

const featureDetails: Record<string, FeatureDetail> = {
  "lead-management": {
    kind: "enquiry",
    heading: "Start with the person. Keep the context.",
    intro:
      "A useful enquiry record makes responsibility and the next conversation easy to understand.",
    points: [
      [
        "One named owner",
        `${sampleLead.owner} owns ${sampleLead.name}’s enquiry, so the person taking the next step is explicit.`,
      ],
      [
        "A connected activity history",
        "The property discussion and sample visit sit alongside the enquiry.",
      ],
      [
        "An action with a purpose",
        "Sharing the requested property details gives the follow-up a clear starting point.",
      ],
    ],
  },
  "property-inventory": {
    kind: "property",
    heading: "The unit belongs in the conversation.",
    intro:
      "Review a focused project and unit view beside the buyer’s requirements, without losing the enquiry that brought you here.",
    points: [
      [
        "Project to unit",
        `${sampleLead.project} and ${sampleLead.unit} stay identifiable from the enquiry to the visit.`,
      ],
      [
        "Requirements in view",
        "The sample record keeps the requested apartment type alongside the property.",
      ],
      [
        "Discuss the details",
        "Use the demo to confirm actual inventory fields, availability rules and access permissions.",
      ],
    ],
  },
  "site-visit-management": {
    kind: "visit",
    heading: "A time, a place, and a person to meet.",
    intro:
      "Bring the essential visit details together before the meeting, then keep its outcome connected to the follow-up.",
    points: [
      [
        "Before the visit",
        "Review the sample appointment with its buyer, unit and owner in one place.",
      ],
      [
        "During the conversation",
        "Keep the property identity clear when several enquiries are moving at once.",
      ],
      [
        "After the visit",
        `The same sample enquiry moves to ${sampleLead.status}, with the requested details as its next action.`,
      ],
    ],
  },
  "sales-pipeline": {
    kind: "pipeline",
    heading: "Progress is more useful with a next action.",
    intro:
      "A stage tells part of the story. The linked enquiry, visit and next step explain what should happen next.",
    points: [
      [
        "Read the current position",
        `${sampleLead.name}’s sample enquiry is in ${sampleLead.status} after a site visit.`,
      ],
      [
        "Keep the history close",
        "The same owner and property remain attached as the conversation develops.",
      ],
      [
        "Make the next step explicit",
        "The requested property details give the owner a concrete task to take forward.",
      ],
    ],
  },
  "channel-partners": {
    kind: "enquiry",
    heading: "Start a handover with shared context.",
    intro:
      "Use a demo conversation to explore how a referral, a property requirement and a named owner could travel together.",
    points: [
      [
        "Clarify the referral",
        "Discuss what information a partner should provide at handover.",
      ],
      [
        "Agree responsibility",
        "Identify who owns the next conversation and how ownership is communicated.",
      ],
      [
        "Confirm the workflow",
        "Partner access, permissions and progress visibility remain subject to product confirmation.",
      ],
    ],
  },
  reports: {
    kind: "pipeline",
    heading: "A team conversation grounded in the work.",
    intro:
      "Start with visible enquiries and next actions. Discuss which views your team needs before defining reports.",
    points: [
      [
        "Review ownership",
        "Understand who is responsible for the enquiry being discussed.",
      ],
      [
        "Read the activity",
        "Use property and visit context to explain the current stage.",
      ],
      [
        "Confirm reporting needs",
        "Specific reports, exports and team permissions must be confirmed in the demo.",
      ],
    ],
  },
};

export function FeaturePage({
  feature,
}: {
  feature: (typeof modules)[number];
}) {
  const detail =
    featureDetails[feature.slug] ?? featureDetails["lead-management"];
  return (
    <>
      <section className={`container ${styles.hero}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/product">Product</Link>
          <ArrowRight size={14} aria-hidden="true" />
          <span aria-current="page">{feature.title}</span>
        </nav>
        <h1>{feature.task}</h1>
        <p className={styles.intro}>{feature.detail}</p>
        <CTA />
        <p className={styles.draft}>
          Illustrative workflow · Product capabilities awaiting confirmation.
        </p>
      </section>
      <section
        className={`container ${styles.featureBody} ${detail.kind === "pipeline" ? styles.pipelineLayout : ""}`}
      >
        <div className={styles.editorial}>
          <h2>{detail.heading}</h2>
          <p>{detail.intro}</p>
        </div>
        <FocusedPreview kind={detail.kind} />
        <div className={styles.explanations}>
          {detail.points.map(([title, body]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedModules current={feature.slug} />
    </>
  );
}

const solutionDetails: Record<
  string,
  {
    kind: PreviewKind;
    heading: string;
    description: string;
    steps: readonly [string, string][];
  }
> = {
  developers: {
    kind: "property",
    heading: "Keep the project and its conversations together.",
    description:
      "A project discussion needs the unit, the enquiry and the person responsible for moving it forward.",
    steps: [
      [
        "Project context",
        `Begin with ${sampleLead.project} and the unit under discussion.`,
      ],
      ["Team responsibility", "Keep the owner visible alongside the enquiry."],
      [
        "The next sales activity",
        "Connect the sample visit and follow-up to the same unit.",
      ],
    ],
  },
  brokerages: {
    kind: "enquiry",
    heading: "Give the next conversation a clear starting point.",
    description:
      "Buyer requirements, property discussions and ownership belong in the same working record.",
    steps: [
      [
        "Understand the enquiry",
        "Keep the buyer’s requirements close to the property conversation.",
      ],
      [
        "Coordinate the team",
        "A named owner makes the next responsibility visible.",
      ],
      [
        "Follow up with context",
        "Use the sample visit outcome to explain the next action.",
      ],
    ],
  },
  "channel-partners": {
    kind: "pipeline",
    heading: "Agree what a useful handover looks like.",
    description:
      "Explore the information and responsibilities that matter across your partner relationships.",
    steps: [
      [
        "At referral",
        "Discuss which enquiry details and property requirements should be shared.",
      ],
      ["At handover", "Clarify who is responsible for the next conversation."],
      [
        "As work progresses",
        "Confirm which progress details a partner may see. Partner capabilities and access rules are unverified.",
      ],
    ],
  },
};

export function SolutionPage({
  audience,
}: {
  audience: (typeof audiences)[number];
}) {
  const detail = solutionDetails[audience.slug];
  return (
    <>
      <section className={`container ${styles.hero} ${styles.solutionHero}`}>
        <div>
          <p className={styles.breadcrumb}>
            For {audience.title.toLowerCase()}
          </p>
          <h1>{audience.heading}</h1>
          <p className={styles.intro}>{audience.text}</p>
          <CTA />
        </div>
        <div className={styles.needs}>
          <h2>Your team’s starting points</h2>
          <ul>
            {audience.needs.map((need) => (
              <li key={need}>
                <Check size={17} aria-hidden="true" />
                {need}
              </li>
            ))}
          </ul>
          <p>
            Proposed workflows. Confirm capabilities and access rules during a
            demo.
          </p>
        </div>
      </section>
      <section className={`container ${styles.solutionStory}`}>
        <div>
          <h2>{detail.heading}</h2>
          <p>{detail.description}</p>
        </div>
        <FocusedPreview kind={detail.kind} />
        <ol>
          {detail.steps.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>
      <RelatedModules />
    </>
  );
}

function RelatedModules({ current }: { current?: string }) {
  return (
    <section className={`container ${styles.related}`}>
      <h2>Follow the connected workflow.</h2>
      <div>
        {modules
          .slice(0, 4)
          .filter(
            (module) => module.slug !== current && module.status !== "hidden",
          )
          .map((module) => (
            <Link key={module.slug} href={`/features/${module.slug}`}>
              <span>{module.title}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
      </div>
    </section>
  );
}

export function ProductOverview() {
  return (
    <>
      <section className={`container ${styles.hero}`}>
        <p className={styles.breadcrumb}>The Gromoze workspace</p>
        <h1>
          One enquiry.
          <br />
          The whole conversation.
        </h1>
        <p className={styles.intro}>
          Explore how the person, the property, the visit and the next action
          connect around a shared sales record.
        </p>
        <div className="hero-actions">
          <CTA />
          <CTA href="/#home-story" secondary>
            Explore Gromoze
          </CTA>
        </div>
        <p className={styles.draft}>
          Sample workflow · Proposed product capabilities.
        </p>
      </section>
      <section className={`container ${styles.overview}`}>
        <nav
          className={styles.relationships}
          aria-label="Connected product modules"
        >
          {modules
            .slice(0, 4)
            .filter((module) => module.status !== "hidden")
            .map((module, index) => (
              <Link key={module.slug} href={`/features/${module.slug}`}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{module.title}</strong>
                  <small>{module.task}</small>
                </div>
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            ))}
        </nav>
        <FocusedPreview kind="enquiry" />
      </section>
      <section className={`container ${styles.overviewFollow}`}>
        <h2>
          The same details.
          <br />A useful next step.
        </h2>
        <p>
          {sampleLead.name}’s sample record stays connected to{" "}
          {sampleLead.project}, unit {sampleLead.unit}, and {sampleLead.owner}.
          The visit becomes context for a clear follow-up.
        </p>
        <FocusedPreview kind="pipeline" />
      </section>
    </>
  );
}
