"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, X, Check, CircleCheck } from "lucide-react";
import { audiences, modules } from "@/lib/content";
import { HomeStory } from "./home-story";
import { HomeSections } from "./homepage-sections";
import { BuildingPoster } from "./building-poster";
import { siteConfig } from "@/lib/site-config";
import { legalDocuments, type LegalKind } from "@/lib/legal-content";
import { CTA, Logo } from "./ui";
import { FeaturePage, ProductOverview, SolutionPage } from "./interior-pages";
import interiorStyles from "./interior-pages.module.css";
import { PricingPage } from "./pricing-page";

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
                    <small>Sample workflows · availability depends on your setup</small>
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
              A workspace for real estate sales teams.
            </small>
          </div>
          <div>
            <h3>Product</h3>
            <Link href="/product">Overview</Link>
            <Link href="/features/lead-management">Lead management</Link>
            <Link href="/features/property-inventory">Property inventory</Link>
            <Link href="/features/site-visit-management">Site visits</Link>
            <Link href="/features/sales-pipeline">Sales pipeline</Link>
            <Link href="/pricing">Pricing</Link>
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
            © {new Date().getFullYear()} Gromoze · {siteConfig.legalEntity}
          </small>
          <div>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of service</Link>
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
function DemoForm() {
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
            or booked. To send an enquiry, email{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
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
          <h2>Let?s start with your team.</h2>
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
            <Link href="/privacy-policy">privacy policy</Link>.
          </p>
          <button className="button" type="submit" disabled={!hydrated}>
            Preview demo request
            <ArrowRight size={17} />
          </button>
        </div>
    </form>
  );
}
function Legal({ kind }: { kind: LegalKind }) {
  const document = legalDocuments[kind];
  return (
    <article className={`container legal ${interiorStyles.legal}`}>
      <h1>{document.title}</h1>
      <p className="legal-intro">{document.intro}</p>
      <p className="legal-date">
        Effective date: {siteConfig.legalEffectiveDate} | Last updated: {siteConfig.legalUpdatedDate}
      </p>
      <details className="legal-contents" open>
        <summary>
          On this page
          <ChevronDown size={18} />
        </summary>
        <nav aria-label="On this page"><ol>
          {document.sections.map((section, index) => (
            <li key={section.title}>
              <a href={`#legal-${index}`}>{section.title}</a>
            </li>
          ))}
        </ol></nav>
      </details>
      {document.sections.map((section, index) => (
        <section id={`legal-${index}`} key={section.title}>
          <h2>{index + 1}. {section.title}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.links && <ul>
            {section.links.map(link => <li key={link.href}>
              {link.href.startsWith("/")
                ? <Link href={link.href}>{link.label}</Link>
                : <a href={link.href}>{link.label}</a>}
            </li>)}
          </ul>}
        </section>
      ))}
    </article>
  );
}
export function Interior({ route }: { route: string }) {
  if (route.includes("policy") || route === "terms-of-service")
    return (
      <Legal kind={route === "terms-of-service" ? "terms" : route === "cookie-policy" ? "cookies" : "privacy"} />
    );
  if (route === "pricing") return <PricingPage />;
  if (["book-demo", "contact"].includes(route))
    return (
      <section className="container interior form-page">
        <div>
          <span className="eyebrow">
            {route === "contact" ? "A conversation starts here" : "See the workflow together"}
          </span>
          <h1>
            {route === "contact" ? (
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
              Explore the Gromoze workspace
            </li>
            <li>
              <Check size={18} />
              Identify the requirements that matter
            </li>
          </ul>
          <div className="honest-note">
            <strong>
              This is a preview enquiry experience.
            </strong>
            <p>
              The form below does not send a request or book a meeting. Email{" "}<a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}to contact us directly.
            </p>
          </div>
        </div>
        <DemoForm />
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
            Gromoze brings that context together in a
            shared workspace.
          </p>
          <p>
            This website illustrates those workflows with fictional sales records.
            Features depend on workspace setup and user permissions.
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
              Gromoze is a product of {siteConfig.legalEntity}, built for teams
              coordinating real estate sales and their day-to-day operations.
            </p>
          </div>
        </section>
        <Closing />
      </>
    );
  return <><ProductOverview /><Closing /></>;
}
