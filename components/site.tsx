"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, X, Check, CircleCheck } from "lucide-react";
import { audiences, modules } from "@/lib/content";
import { HomeStory } from "./home-story";
import { HomeSections } from "./homepage-sections";
import { BuildingPoster } from "./building-poster";
import { siteConfig } from "@/lib/site-config";
import { CTA, Logo } from "./ui";
import { FeaturePage, ProductOverview, SolutionPage } from "./interior-pages";
import interiorStyles from "./interior-pages.module.css";

function subscribeMotion(callback: () => void) {
  window.addEventListener("motionchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("motionchange", callback);
    window.removeEventListener("storage", callback);
  };
}
function readMotion() {
  try {
    return localStorage.getItem("gromoze-motion") === "reduce";
  } catch {
    return document.documentElement.dataset.motion === "reduce";
  }
}
export function Shell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, readMotion, () => false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const value = readMotion();
      document.documentElement.dataset.motion = value ? "reduce" : "system";
      document.documentElement.classList.toggle(
        "motion-reduced",
        value || media.matches,
      );
    };
    update();
    media.addEventListener("change", update);
    window.addEventListener("motionchange", update);
    window.addEventListener("storage", update);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("motionchange", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  function toggleMotion() {
    const value = !reduced;
    document.documentElement.dataset.motion = value ? "reduce" : "system";
    try {
      localStorage.setItem("gromoze-motion", value ? "reduce" : "system");
    } catch {
      // The preference still works for this page when browser storage is blocked.
    }
    document.documentElement.classList.toggle(
      "motion-reduced",
      value || matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    window.dispatchEvent(new Event("motionchange"));
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            const trigger = mobile
              ? e.currentTarget.querySelector<HTMLButtonElement>(".mobile-toggle")
              : e.target instanceof Element
                ? e.target.closest(".nav-group")?.querySelector<HTMLButtonElement>("button")
                : null;
            setMenu(null);
            setMobile(false);
            trigger?.focus();
          }
        }}
      >
        <div className="container header-inner">
          <Link
            href="/"
            aria-label="Gromoze homepage"
            onClick={() => { setMenu(null); setMobile(false); }}
          >
            <Logo />
          </Link>
          <button
            className="mobile-toggle icon-button"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
          <nav
            aria-label="Main navigation"
            className={mobile ? "nav open" : "nav"}
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest("a")) {
                setMenu(null);
                setMobile(false);
              }
            }}
          >
            {["Product", "Solutions"].map((item) => (
              <div className="nav-group" key={item}>
                <button
                  aria-expanded={menu === item}
                  onClick={() => setMenu(menu === item ? null : item)}
                >
                  {item}
                  <ChevronDown size={14} />
                </button>
                {menu === item && (
                  <div className="mega">
                    <span className="menu-label">
                      {item === "Product"
                        ? "Explore the workspace"
                        : "Find your perspective"}
                    </span>
                    {item === "Product" && (
                      <Link
                        href="/product"
                        onClick={() => {
                          setMenu(null);
                          setMobile(false);
                        }}
                      >
                        Product overview
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                    {(item === "Product"
                      ? modules
                          .filter((m) => m.status !== "hidden")
                          .slice(0, 4)
                          .map((m) => ({
                            href: "/features/" + m.slug,
                            title: m.title,
                          }))
                      : audiences.map((a) => ({
                          href: "/solutions/" + a.slug,
                          title: a.title,
                        }))
                    ).map((i) => (
                      <Link
                        key={i.href}
                        href={i.href}
                        onClick={() => {
                          setMenu(null);
                          setMobile(false);
                        }}
                      >
                        {i.title}
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                    <small>Concept pages · capabilities under review</small>
                  </div>
                )}
              </div>
            ))}
            <Link href="/pricing" onClick={() => setMobile(false)}>
              Pricing
            </Link>
            <Link href="/about" onClick={() => setMobile(false)}>
              About
            </Link>
            <CTA />
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} onClick={() => menu && setMenu(null)}>
        {children}
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Link href="/" aria-label="Gromoze home">
              <Logo />
            </Link>
            <p>Real Estate Sales. Simplified.</p>
            <small>
              Private website concept. Product claims pending approval.
            </small>
          </div>
          <div>
            <h3>Product</h3>
            <Link href="/product">Overview</Link>
            <Link href="/features/lead-management">Lead management</Link>
            <Link href="/features/property-inventory">Property inventory</Link>
            <Link href="/features/site-visit-management">Site visits</Link>
            <Link href="/features/sales-pipeline">Sales pipeline</Link>
            <Link href="/pricing">Pricing enquiry</Link>
          </div>
          <div>
            <h3>Solutions</h3>
            {audiences.map((a) => (
              <Link key={a.slug} href={"/solutions/" + a.slug}>
                {a.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about">About Gromoze</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/book-demo">Book a demo</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <small>
            © {new Date().getFullYear()} Gromoze · Operating entity pending
            confirmation
          </small>
          <div>
            <Link href="/privacy-policy">Privacy draft</Link>
            <Link href="/terms-of-service">Terms draft</Link>
            <Link href="/cookie-policy">Cookies</Link>
            <button onClick={toggleMotion} aria-pressed={reduced}>
              {reduced ? "Reduce motion: on" : "Motion: follows system"}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

function Closing() {
  return (
    <section className="closing">
      <div className="container">
        <div className="closing-building" aria-hidden="true"><BuildingPoster /></div>
        <div>
          <h2>
            Bring your sales
            <br />
            process into view.
          </h2>
          <p>Explore Gromoze with your team’s workflow in mind.</p>
          <CTA />
        </div>
      </div>
    </section>
  );
}
export function Home() {
  return <><HomeStory /><HomeSections /></>;
}
const subscribeHydration = () => () => {};
function DemoForm({ pricing = false }: { pricing?: boolean }) {
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const [done, setDone] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (done) result.current?.focus();
  }, [done]);
  return (
    <form
      className={`demo-form ${interiorStyles.form}`}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <noscript><p>Enable JavaScript to try the local preview form. No request can be submitted here.</p></noscript>
      <span className="sample-tag">
        Preview form · No data is sent or saved
      </span>
      {done && (
        <div ref={result} role="status" tabIndex={-1} className="form-result">
          <CircleCheck size={36} />
          <h2>Your preview is complete.</h2>
          <p>
            Your details passed local validation. No request has been submitted
            or booked. A delivery service and verified contact are needed before
            launch.
          </p>
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              setDone(false);
              requestAnimationFrame(() => nameInput.current?.focus());
            }}
          >
            Back to the form
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      <div hidden={done}>
          <h2>
            {pricing
              ? "Tell us about your setup."
              : "Let’s start with your team."}
          </h2>
          <div className="form-grid">
            <label>
              Name
              <input
                ref={nameInput}
                required
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                maxLength={100}
                pattern=".*\S.*"
                title="Enter your name."
              />
            </label>
            <label>
              Work email
              <input
                type="email"
                required
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                maxLength={254}
              />
            </label>
            <label className="full">
              Company
              <input
                name="company"
                required
                autoComplete="organization"
                placeholder="Company or brokerage name"
                maxLength={150}
                pattern=".*\S.*"
                title="Enter your company name."
              />
            </label>
            <label>
              Team size
              <select name="teamSize" required defaultValue="">
                <option value="" disabled>
                  Select team size
                </option>
                <option>1–5 people</option>
                <option>6–20 people</option>
                <option>21–50 people</option>
                <option>51+ people</option>
              </select>
            </label>
            <label>
              Business type
              <select name="businessType" required defaultValue="">
                <option value="" disabled>
                  Select business type
                </option>
                <option>Developer</option>
                <option>Brokerage</option>
                <option>Channel partner</option>
                <option>Other</option>
              </select>
            </label>
            <label className="full">
              Phone <span>(optional)</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Include your country code"
                maxLength={40}
              />
            </label>
            <label className="full">
              What would you like to discuss? <span>(optional)</span>
              <textarea
                name="requirements"
                rows={4}
                placeholder="Your workflow, projects, or requirements…"
                maxLength={2000}
              />
            </label>
          </div>
          <p className="form-privacy">
            This concept validates your entries in this browser only. Don’t
            enter sensitive information. Read the{" "}
            <Link href="/privacy-policy">privacy draft</Link>.
          </p>
          <button className="button" type="submit" disabled={!hydrated}>
            {"Preview " + (pricing ? "pricing enquiry" : "demo request")}
            <ArrowRight size={17} />
          </button>
        </div>
    </form>
  );
}
const privacySections = [
  "Operating entity and contact",
  "Website visitor data",
  "Customer account data",
  "Information handled within the SaaS",
  "Purposes of processing",
  "Cookies and analytics",
  "Service providers",
  "Sharing and transfers",
  "Retention and deletion",
  "Security description",
  "Individual rights and requests",
  "Policy updates",
  "Privacy contact",
];
const termsSections = [
  "Contracting entity",
  "Eligibility and accounts",
  "Service scope",
  "Customer responsibilities",
  "Acceptable use",
  "Subscriptions and payments",
  "Renewal and cancellation",
  "Customer data and intellectual property",
  "Third-party services",
  "Suspension and termination",
  "Warranties and liability",
  "Governing law and disputes",
  "Changes",
  "Contact",
];
function Legal({
  terms = false,
  cookies = false,
}: {
  terms?: boolean;
  cookies?: boolean;
}) {
  const sections = cookies
    ? ["Current website storage", "Cookies and analytics", "Your preferences"]
    : terms
      ? termsSections
      : privacySections;
  return (
    <article className={`container legal ${interiorStyles.legal}`}>
      <span className="sample-tag">Private draft · Not legally approved</span>
      <h1>
        {cookies
          ? "Cookie Policy"
          : terms
            ? "Terms of Service"
            : "Privacy Policy"}
      </h1>
      <p className="legal-intro">
        {cookies
          ? "This preview uses browser storage for your motion preference and scroll restoration. It includes no analytics scripts or non-essential cookies."
          : "This is a structured policy layout for review. It is not an effective agreement or an approved description of business practices."}
      </p>
      <p className="legal-date">
        Effective date: [EFFECTIVE_DATE] · Last updated: {siteConfig.legalPreparedDate} (draft)
      </p>
      <details className="legal-contents" open>
        <summary>
          On this page
          <ChevronDown size={18} />
        </summary>
        <nav aria-label="On this page"><ol>
          {sections.map((s, i) => (
            <li key={s}>
              <a href={"#legal-" + i}>{s}</a>
            </li>
          ))}
        </ol></nav>
      </details>
      {sections.map((s, i) => (
        <section id={"legal-" + i} key={s}>
          <h2>
            {i + 1}. {s}
          </h2>
          <p>
            {cookies
              ? i === 0
                ? "The gromoze-motion preference is stored locally in your browser. A session-only story position stores the page URL, viewport dimensions and scroll position to restore a reload. No form contents are stored."
                : i === 1
                  ? "No third-party analytics, advertising scripts or non-essential cookies are included in this preview. Review hosting infrastructure before finalizing a production cookie inventory."
                  : "Use the Reduce motion control in the footer to change the saved preference. Clearing this site’s browser storage resets it. A consent manager should be added only if actual non-essential scripts require one."
              : terms
                ? termsText(i)
                : privacyText(i)}
          </p>
        </section>
      ))}
    </article>
  );
}
function privacyText(i: number) {
  const texts = [
    "Confirm [LEGAL_ENTITY_NAME], [BUSINESS_ADDRESS] and the website operator’s verified contact before publication.",
    "This preview does not send form entries. Production visitor logs, hosting data and any future form processing must be inventoried and described before launch.",
    "Account registration and authentication are outside this preview. Confirm the actual account fields, purposes and practices before describing the service.",
    "The product may handle records uploaded by a business. These must be distinguished from Gromoze’s own website and account operations. Legal roles and instructions remain to be confirmed.",
    "Document the actual reasons for collecting and using each category of information. Do not assign a legal basis until reviewed against confirmed practices.",
    "This preview stores a local motion preference and a session-only scroll position. No analytics or advertising scripts are included. Revisit this section if the implementation changes.",
    "Confirm hosting, communication, support and other providers, their purposes and the information they handle. [SERVICE_PROVIDER_LIST]",
    "Confirm any sharing arrangements, locations and applicable safeguards. [SHARING_AND_TRANSFER_DETAILS]",
    "Define retention periods, deletion workflows and any justified exceptions. [RETENTION_RULES]",
    "Describe implemented safeguards accurately after a technical review. No certification or security guarantee is asserted in this draft.",
    "Confirm applicable rights and a verified request process, including identity verification and response handling. [RIGHTS_REQUEST_PROCESS]",
    "Confirm how changes are dated and communicated to affected people. [UPDATE_PROCESS]",
    "Provide the verified privacy contact and request address. [PRIVACY_CONTACT]",
  ];
  return texts[i];
}
function termsText(i: number) {
  const texts = [
    "Identify [LEGAL_ENTITY_NAME] and [BUSINESS_ADDRESS]. This draft does not establish a contract.",
    "Confirm eligibility rules, account ownership and account security responsibilities. [ACCOUNT_TERMS]",
    "The website demonstrates proposed capabilities using fictional records. Confirm the contracted service, limitations and documentation. [SERVICE_SCOPE]",
    "Define responsibilities for lawful customer data, authorized users, accurate instructions and account administration. [CUSTOMER_RESPONSIBILITIES]",
    "Confirm permitted uses, prohibited conduct and enforcement procedures for the actual service. [ACCEPTABLE_USE]",
    "Plans, taxes, payment schedules and fees have not been approved. [BILLING_TERMS]",
    "Confirm renewal notices, cancellation mechanisms, refund rules and effects of cancellation. [RENEWAL_AND_CANCELLATION]",
    "Confirm data ownership, necessary service permissions, export provisions and intellectual property terms. [DATA_AND_IP_TERMS]",
    "Confirm any actual external services, applicable terms and responsibilities. No integration availability is promised. [THIRD_PARTY_TERMS]",
    "Confirm grounds, notice, access and post-termination data handling. [TERMINATION_TERMS]",
    "Require review of warranties, disclaimers and liability provisions against the actual service and applicable law. [WARRANTY_AND_LIABILITY_TERMS]",
    "Confirm governing law, jurisdiction and dispute resolution. [GOVERNING_LAW]",
    "Confirm how revised terms will be communicated and when they apply. [TERMS_UPDATE_PROCESS]",
    "Provide the verified business contact for service questions. [BUSINESS_CONTACT]",
  ];
  return texts[i];
}
export function Interior({ route }: { route: string }) {
  if (route.includes("policy") || route === "terms-of-service")
    return (
      <Legal
        terms={route === "terms-of-service"}
        cookies={route === "cookie-policy"}
      />
    );
  if (["book-demo", "contact", "pricing"].includes(route))
    return (
      <section className="container interior form-page">
        <div>
          <span className="eyebrow">
            {route === "pricing"
              ? "Requirements before price"
              : route === "contact"
                ? "A conversation starts here"
                : "See the workflow together"}
          </span>
          <h1>
            {route === "pricing" ? (
              <>
                The right setup
                <br />
                starts with you.
              </>
            ) : route === "contact" ? (
              <>
                Let’s talk about
                <br />
                your sales day.
              </>
            ) : (
              <>
                Your process.
                <br />A clearer view.
              </>
            )}
          </h1>
          <p>
            Tell us about your team, the projects you work on, and what you’d
            like to bring together.
          </p>
          <ul className="check-list">
            <li>
              <Check size={18} />
              Discuss your current workflow
            </li>
            <li>
              <Check size={18} />
              Explore the proposed workspace
            </li>
            <li>
              <Check size={18} />
              Identify the requirements that matter
            </li>
          </ul>
          <div className="honest-note">
            <strong>
              {route === "pricing"
                ? "Pricing has not been confirmed."
                : "This is a preview enquiry experience."}
            </strong>
            <p>
              {route === "pricing"
                ? "No plan limits, prices or trial offers are represented here."
                : "A verified contact and submission service are still needed. No meeting is booked from this preview."}
            </p>
          </div>
        </div>
        <DemoForm pricing={route === "pricing"} />
      </section>
    );
  const feature = modules.find((m) => route === "features/" + m.slug);
  const audience = audiences.find((a) => route === "solutions/" + a.slug);
  if (feature) return <><FeaturePage feature={feature} /><Closing /></>;
  if (audience) return <><SolutionPage audience={audience} /><Closing /></>;
  if (route === "about")
    return (
      <>
        <section className="container interior about-hero">
          <span className="eyebrow">Real Estate Sales. Simplified.</span>
          <h1>
            Make room for
            <br />a better conversation.
          </h1>
          <p>
            Real estate sales moves between people, properties and decisions.
            Gromoze’s working purpose is to bring that context together in a
            shared workspace.
          </p>
          <p>
            This website explores that purpose through fictional sales records.
            The modules are planning assumptions; the final product scope is
            awaiting confirmation.
          </p>
          <CTA />
        </section>
        <section className="container section problem">
          <h2>
            Clarity starts
            <br />
            with the everyday.
          </h2>
          <div>
            <p>
              A named owner. A property match. A visit time. A next action.
              Small details give a sales team the context to keep a conversation
              moving.
            </p>
            <p>
              Company, founder and team details will be added when verified.
              This preview includes no invented founding story or customer
              claims.
            </p>
          </div>
        </section>
        <Closing />
      </>
    );
  return <><ProductOverview /><Closing /></>;
}
