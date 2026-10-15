"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Search,
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Check,
  Phone,
  MoreHorizontal,
  ListFilter,
  Plus,
  CircleCheck,
  ArrowDown,
  Layers,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { audiences, chapters, faqs, modules } from "@/lib/content";

function subscribeMotion(callback: () => void) {
  window.addEventListener("motionchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("motionchange", callback);
    window.removeEventListener("storage", callback);
  };
}
function readMotion() {
  return localStorage.getItem("gromoze-motion") === "reduce";
}

function Logo() {
  return (
    <span className="logo-crop">
      <Image
        src="/gromoze-logo.png"
        alt="Gromoze. Real Estate Sales. Simplified."
        width={1448}
        height={1086}
        priority
      />
    </span>
  );
}
function CTA({
  children = "Book a Demo",
  href = "/book-demo",
  secondary = false,
}: {
  children?: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, readMotion, () => false);
  useEffect(() => {
    const value = localStorage.getItem("gromoze-motion") === "reduce";
    document.documentElement.dataset.motion = value ? "reduce" : "system";
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      document.documentElement.classList.toggle(
        "motion-reduced",
        value || media.matches,
      );
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function toggleMotion() {
    const value = !reduced;
    localStorage.setItem("gromoze-motion", value ? "reduce" : "system");
    document.documentElement.dataset.motion = value ? "reduce" : "system";
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
      <div className="concept-bar">
        Private concept <span>·</span> Proposed capabilities. Illustrative
        screens.
      </div>
      <header
        className="header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMenu(null);
            setMobile(false);
          }
        }}
      >
        <div className="container header-inner">
          <Link
            href="/"
            aria-label="Gromoze homepage"
            onClick={() => setMenu(null)}
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
      <main id="main" onClick={() => menu && setMenu(null)}>
        {children}
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Link href="/" aria-label="Gromoze home">
              <Logo />
            </Link>
            <p>
              Real estate sales.
              <br />A little more connected.
            </p>
            <small>
              Private website concept. Product claims pending approval.
            </small>
          </div>
          <div>
            <h3>Product</h3>
            <Link href="/product">Overview</Link>
            <Link href="/features/lead-management">Lead management</Link>
            <Link href="/features/site-visit-management">Site visits</Link>
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
              Reduce motion {reduced ? "on" : "off"}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

const leads = [
  {
    name: "Aarav Shah",
    initials: "AS",
    interest: "Cedar Heights · 3 BHK",
    stage: "Visit scheduled",
    owner: "Priya Mehta",
    color: "teal",
  },
  {
    name: "Meera Kapoor",
    initials: "MK",
    interest: "Cedar Heights · 2 BHK",
    stage: "Follow-up due",
    owner: "Rohan Desai",
    color: "amber",
  },
  {
    name: "Rohan Iyer",
    initials: "RI",
    interest: "Cedar Heights · 3 BHK",
    stage: "Qualified",
    owner: "Priya Mehta",
    color: "blue",
  },
  {
    name: "Ananya Rao",
    initials: "AR",
    interest: "Cedar Heights · 2 BHK",
    stage: "New enquiry",
    owner: "Neha Patel",
    color: "neutral",
  },
];
function Architecture() {
  return (
    <svg
      className="architecture"
      viewBox="0 0 760 620"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M60 600V260L230 180V600M230 180L440 240V600M440 240L570 160V600M570 160L700 220V600M15 600H745M60 260L270 320H440M60 340L270 400H440M60 420L270 480H440M60 500L270 560H440M270 320V600M310 204V600M370 220V600M110 235V600M170 207V600M480 216V600M525 187V600M610 178V600M655 199V600M440 320L570 240L700 300M440 400L570 320L700 380M440 480L570 400L700 460M440 560L570 480L700 540" />
        <path
          strokeDasharray="4 6"
          d="M0 610H760M230 170V40M570 150V20M50 250L0 235M710 220L760 235"
        />
      </g>
    </svg>
  );
}
function Dashboard({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [onlyVisits, setOnlyVisits] = useState(false);
  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) &&
      (!onlyVisits || l.stage === "Visit scheduled"),
  );
  return (
    <div className={`dashboard ${compact ? "compact" : ""}`}>
      <aside className="app-sidebar">
        <div className="app-brand">
          <Layers size={21} />
          <strong>gromoze</strong>
        </div>
        <small>WORKSPACE</small>
        {[
          [LayoutDashboard, "Overview"],
          [Users, "Leads"],
          [Building2, "Properties"],
          [CalendarDays, "Site visits"],
          [ChartNoAxesCombined, "Pipeline"],
        ].map(([Icon, label]) => {
          const I = Icon as typeof Users;
          return (
            <div
              className={label === "Leads" ? "app-nav active" : "app-nav"}
              key={String(label)}
            >
              <I size={16} />
              <span>{String(label)}</span>
            </div>
          );
        })}
        <div className="sidebar-bottom">
          <Settings size={16} /> Workspace settings
        </div>
      </aside>
      <div className="app-body">
        <div className="app-top">
          <span>
            Sales workspace <ChevronDown size={12} />
          </span>
          <div>
            <Bell size={16} />
            <span className="avatar small">PM</span>
          </div>
        </div>
        <div className="app-content">
          <div className="app-heading">
            <div>
              <p>Monday, 12 October</p>
              <h3>A clearer day ahead.</h3>
            </div>
            <span className="sample-tag">Sample workspace</span>
          </div>
          <div className="stat-grid">
            <div>
              <span>Enquiries in view</span>
              <strong>
                4 <small>Sample records</small>
              </strong>
            </div>
            <div>
              <span>Visits scheduled</span>
              <strong>
                1 <small>Next up: 17 Oct</small>
              </strong>
            </div>
            <div>
              <span>Follow-ups due</span>
              <strong>
                1 <small>Needs attention</small>
              </strong>
            </div>
          </div>
          <div className="lead-table">
            <div className="table-toolbar">
              <strong>
                Your enquiries <span>04</span>
              </strong>
              <button
                className={onlyVisits ? "filter active" : "filter"}
                aria-pressed={onlyVisits}
                onClick={() => setOnlyVisits(!onlyVisits)}
              >
                <ListFilter size={13} />
                {onlyVisits ? "Show all" : "Visits"}
              </button>
            </div>
            <label className="sample-search">
              <Search size={14} />
              <input
                aria-label="Search sample leads"
                placeholder="Search sample enquiries…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="table-head">
              <span>Name / interest</span>
              <span>Status</span>
              <span>Owner</span>
            </div>
            {filtered.map((l) => (
              <button
                className="lead-row"
                key={l.name}
                onClick={() => setSelected(selected === l.name ? null : l.name)}
                aria-expanded={selected === l.name}
              >
                <div>
                  <span className="avatar">{l.initials}</span>
                  <span>
                    <strong>{l.name}</strong>
                    <small>{l.interest}</small>
                  </span>
                </div>
                <span className={"status " + l.color}>{l.stage}</span>
                <span className="owner">{l.owner}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="empty">
                No sample enquiries match. Try another name.
              </p>
            )}
            {selected && (
              <div className="inline-detail">
                <strong>{selected} · Sample record</strong>
                <p>
                  {selected === "Aarav Shah"
                    ? "GR-1042 · Owner: Priya Mehta · Cedar Heights, A-1204 · Next: site visit on 17 Oct at 11:00 am."
                    : "Illustrative enquiry. Select Aarav Shah to follow the connected product story."}
                </p>
              </div>
            )}
          </div>
          <div className="app-lower">
            <div>
              <span className="mini-label">
                <CalendarDays size={14} /> Upcoming site visit
              </span>
              <strong>
                Aarav Shah{" "}
                <span className="status teal">Confirmed · sample</span>
              </strong>
              <small>Cedar Heights · A-1204</small>
              <div className="visit-time">
                17 Oct <span>11:00 am — 12:00 pm</span>
              </div>
            </div>
            <div>
              <span className="mini-label">
                <Building2 size={14} /> Property in focus
              </span>
              <strong>Cedar Heights</strong>
              <small>A-1204 · 3 BHK · 1,650 sq ft</small>
              <div className="unit-strip">
                <span>Sample unit</span>
                <span className="status teal">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordScene({ index = 0 }: { index?: number }) {
  const c = chapters[index];
  return (
    <div className="record-scene">
      <div className="scene-top">
        <span>
          <span className="live-dot" /> Enquiry workspace
        </span>
        <span>GR-1042</span>
      </div>
      <div className="record-person">
        <span className="avatar large">AS</span>
        <div>
          <h3>Aarav Shah</h3>
          <p>3 BHK · Cedar Heights</p>
        </div>
        <MoreHorizontal size={20} />
      </div>
      <div className="record-fields">
        <div>
          <small>Assigned owner</small>
          <strong>Priya Mehta</strong>
        </div>
        <div>
          <small>Source</small>
          <strong>Website enquiry</strong>
        </div>
        <div>
          <small>Property match</small>
          <strong>Cedar Heights · A-1204</strong>
        </div>
        <div>
          <small>Current stage</small>
          <span className="status teal">{c.stage}</span>
        </div>
      </div>
      <div className="next-action">
        <span>
          <CalendarDays size={18} /> Next action
        </span>
        <h4>{c.action}</h4>
        <p>{c.date}</p>
      </div>
      <div className="activity">
        <CircleCheck size={17} />
        <div>
          <strong>
            {index === 0
              ? "Owner assigned"
              : index === 1
                ? "Property match added"
                : index === 2
                  ? "Visit confirmed"
                  : "Visit completed · Interested"}
          </strong>
          <small>Recorded in the sample activity history</small>
        </div>
      </div>
      <div className="scene-caption">
        Illustrative product preview · Fictional sample data
      </div>
    </div>
  );
}

function Journey() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const current = useRef<ScrollTrigger | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let context: gsap.Context;
    const setup = () => {
      context?.revert();
      if (document.documentElement.classList.contains("motion-reduced")) return;
      context = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(
          "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
          () => {
            const tween = gsap.to(track.current, {
              xPercent: -75,
              ease: "none",
              scrollTrigger: {
                trigger: section.current,
                start: "top 90px",
                end: "+=1400",
                pin: stage.current,
                scrub: 0.5,
                onUpdate: (self) =>
                  setActive(Math.min(3, Math.floor(self.progress * 4))),
              },
            });
            current.current = tween.scrollTrigger ?? null;
            return () => {
              current.current = null;
            };
          },
        );
      }, section);
    };
    setup();
    window.addEventListener("motionchange", setup);
    return () => {
      context?.revert();
      window.removeEventListener("motionchange", setup);
    };
  }, []);
  function choose(i: number) {
    setActive(i);
    if (current.current) {
      const s = current.current;
      window.scrollTo({
        top: s.start + (s.end - s.start) * (i / 3),
        behavior: "smooth",
      });
    }
  }
  return (
    <section ref={section} id="walkthrough" className="journey">
      <div ref={stage} className="container journey-stage">
        <div className="journey-copy">
          <span className="eyebrow light">One enquiry. A connected story.</span>
          <h2>
            From first enquiry
            <br />
            to a clear next step.
          </h2>
          <p>Follow Aarav’s enquiry through a proposed Gromoze workspace.</p>
          <div
            className="chapter-nav"
            role="tablist"
            aria-label="Product journey"
          >
            {chapters.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={active === i}
                aria-controls={"chapter-" + i}
                id={"chapter-tab-" + i}
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    choose((i + 1) % 4);
                    document
                      .getElementById("chapter-tab-" + ((i + 1) % 4))
                      ?.focus();
                  }
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    choose((i + 3) % 4);
                    document
                      .getElementById("chapter-tab-" + ((i + 3) % 4))
                      ?.focus();
                  }
                }}
                onClick={() => choose(i)}
              >
                <span>0{i + 1}</span>
                <strong>{c.title}</strong>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <a className="text-link light" href="#modules">
            Skip walkthrough <ArrowDown size={15} />
          </a>
        </div>
        <div className="journey-visual">
          <div className="scene-window">
            <div ref={track} className="scene-track">
              {chapters.map((c, i) => (
                <div
                  className={"chapter " + (active === i ? "selected" : "")}
                  key={c.title}
                  id={"chapter-" + i}
                  role="tabpanel"
                  aria-labelledby={"chapter-tab-" + i}
                >
                  <div className="mobile-chapter">
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                  <RecordScene index={i} />
                  <p className="chapter-description">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="journey-progress">
            <span>0{active + 1} / 04</span>
            <div>
              {chapters.map((c, i) => (
                <span className={i <= active ? "filled" : ""} key={c.title} />
              ))}
            </div>
            <span>Enquiry → Opportunity</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleIndex() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="modules" className="container section module-section">
      <div className="section-head">
        <div>
          <span className="eyebrow">A place for the details</span>
          <h2>
            The tools behind a<br />
            connected sales process.
          </h2>
        </div>
        <p>
          Explore the proposed modules.
          <br />
          Each one starts with a practical task.
        </p>
      </div>
      <div className="module-grid">
        <div
          role="tablist"
          aria-label="Proposed modules"
          className="module-list"
        >
          {modules
            .filter((m) => m.status !== "hidden")
            .map((m, i) => (
              <button
                key={m.slug}
                role="tab"
                aria-selected={selected === i}
                aria-controls="module-panel"
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                <strong>{m.title}</strong>
                <ArrowUpRight size={18} />
              </button>
            ))}
        </div>
        <div
          id="module-panel"
          role="tabpanel"
          aria-label={modules[selected].title}
          className="module-panel"
        >
          <span className="sample-tag">Proposed module · Draft</span>
          <h3>{modules[selected].task}</h3>
          <p>{modules[selected].detail}</p>
          <div className="module-mini">
            {selected === 0 ? (
              <>
                <div>
                  <span className="avatar">AS</span>
                  <strong>Aarav Shah</strong>
                  <span className="status teal">Assigned</span>
                </div>
                <div className="mini-owner">
                  <span>Enquiry owner</span>
                  <strong>
                    Priya Mehta <Check size={14} />
                  </strong>
                </div>
              </>
            ) : selected === 1 ? (
              <>
                <Building2 size={32} />
                <h4>Cedar Heights · A-1204</h4>
                <p>3 BHK · 1,650 sq ft · Sample availability</p>
                <span className="status teal">Available · sample</span>
              </>
            ) : selected === 2 ? (
              <>
                <CalendarDays size={30} />
                <h4>17 October · 11:00 am</h4>
                <p>Aarav Shah · Cedar Heights · A-1204</p>
                <span className="status teal">Visit confirmed · sample</span>
              </>
            ) : selected === 3 ? (
              <>
                <div className="pipeline-mini">
                  <span>Qualified</span>
                  <ArrowRight size={16} />
                  <span>Visit</span>
                  <ArrowRight size={16} />
                  <strong>Negotiation</strong>
                </div>
                <p>GR-1042 · Next: share payment-plan details</p>
              </>
            ) : selected === 4 ? (
              <>
                <Users size={30} />
                <h4>Referral context, together.</h4>
                <p>GR-1042 · Assigned to Priya Mehta</p>
              </>
            ) : (
              <>
                <ChartNoAxesCombined size={30} />
                <h4>A view of the sample workspace</h4>
                <p>4 enquiries · 1 upcoming visit · 1 follow-up due</p>
              </>
            )}
          </div>
          <Link
            className="text-link"
            href={"/features/" + modules[selected].slug}
          >
            Explore {modules[selected].title.toLowerCase()}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function Audience() {
  const [selected, setSelected] = useState(0);
  const a = audiences[selected];
  return (
    <section className="audience-section">
      <div className="container audience-grid">
        <div>
          <span className="eyebrow">Different teams. Shared clarity.</span>
          <h2>
            Built around the way
            <br />
            your team sells.
          </h2>
          <div className="audience-tabs" role="tablist" aria-label="Team type">
            {audiences.map((item, i) => (
              <button
                role="tab"
                aria-selected={selected === i}
                aria-controls="audience-panel"
                key={item.slug}
                onClick={() => setSelected(i)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div id="audience-panel" role="tabpanel" aria-label={a.title}>
            <h3>{a.heading}</h3>
            <p>{a.text}</p>
            <ul className="check-list">
              {a.needs.map((n) => (
                <li key={n}>
                  <Check size={16} />
                  {n}
                </li>
              ))}
            </ul>
            <Link className="text-link" href={"/solutions/" + a.slug}>
              Explore for {a.title.toLowerCase()}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="audience-art">
          <Architecture />
          <div className="project-label">
            <Building2 size={24} />
            <div>
              <strong>Cedar Heights</strong>
              <small>A fictional project. A connected perspective.</small>
            </div>
          </div>
          <div className="art-label">Built on a clearer view.</div>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  return (
    <section className="container section faq-grid">
      <div>
        <span className="eyebrow">A few things to know</span>
        <h2>
          Clear answers.
          <br />
          No guesswork.
        </h2>
        <p>
          Have a workflow in mind?
          <br />
          <Link href="/contact">Let’s talk about it.</Link>
        </p>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Closing() {
  return (
    <section className="closing">
      <div className="container">
        <Architecture />
        <div>
          <span className="eyebrow light">Your workflow. Your next step.</span>
          <h2>
            See how Gromoze could
            <br />
            fit your sales process.
          </h2>
          <p>
            Walk through your team’s workflow and discuss the setup you need.
          </p>
          <CTA />
        </div>
      </div>
    </section>
  );
}
export function Home() {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (document.documentElement.dataset.motion === "reduce") return;
          gsap.to(".hero .architecture", {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: hero.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(".hero-product", {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: hero.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      );
    }, hero);
    const stop = () => context.revert();
    window.addEventListener("motionchange", stop);
    return () => {
      context.revert();
      window.removeEventListener("motionchange", stop);
    };
  }, []);
  return (
    <>
      <section ref={hero} className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="live-dot" /> Real Estate Sales Software
            </span>
            <h1>
              Every enquiry.
              <br />
              Every follow-up.
              <br />
              <span>One clear view.</span>
            </h1>
            <p>
              Bring your leads, properties, site visits, and sales activity into
              one workspace—so your team knows what needs attention next.
            </p>
            <div className="hero-actions">
              <CTA />
              <CTA href="#walkthrough" secondary>
                Explore the Product
              </CTA>
            </div>
            <div className="hero-for">
              <span className="short-line" /> For developers, brokerages, and
              <br className="desktop-break" /> real estate sales teams.
            </div>
          </div>
          <div className="hero-art">
            <Architecture />
            <div className="hero-product">
              <div className="preview-heading">
                <span>
                  <span className="live-dot" /> A connected sales workspace
                </span>
                <span>GROMOZE / CONCEPT 01</span>
              </div>
              <Dashboard />
              <div className="preview-note">
                <span className="tiny-rule" /> Illustrative product preview ·
                Sample data
              </div>
            </div>
            <div className="floating-note">
              <span className="check-circle">
                <Check size={17} />
              </span>
              <div>
                <strong>One owner. A clear next step.</strong>
                <small>Aarav Shah · Site visit, 17 Oct</small>
              </div>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>Less scattered information.</span>
          <span className="bottom-rule" />
          <span>More room for the next conversation.</span>
          <ArrowDown size={17} />
        </div>
      </section>
      <section className="container section problem">
        <div>
          <span className="eyebrow">The everyday, brought together</span>
          <h2>
            Know who to call.
            <br />
            Know what comes next.
          </h2>
        </div>
        <div>
          <p>
            Enquiries in messages. Details in spreadsheets. Follow-ups in
            someone’s memory. A sales day has enough moving parts.
          </p>
          <p>
            Gromoze’s proposed workspace connects the person, the property, and
            the next action—so the conversation can keep moving.
          </p>
          <div className="connected-records">
            <span>
              <Users size={17} /> Aarav Shah
            </span>
            <i />
            <span>
              <Building2 size={17} /> A-1204
            </span>
            <i />
            <span>
              <Phone size={17} /> Follow up
            </span>
          </div>
        </div>
      </section>
      <Journey />
      <ModuleIndex />
      <Audience />
      <section className="container section comparison">
        <div>
          <span className="eyebrow">Small moments. Useful clarity.</span>
          <h2>
            A clearer way
            <br />
            to run the day.
          </h2>
          <p>
            Illustrative workflow benefits.
            <br />A starting point for your demo discussion.
          </p>
        </div>
        <div>
          <div className="comparison-head">
            <span>When details are scattered</span>
            <span>A connected way forward</span>
          </div>
          {[
            ["Who’s following up?", "A named owner"],
            ["Where are the visit details?", "A shared visit schedule"],
            ["What happens next?", "A visible next action"],
          ].map(([before, after]) => (
            <div className="comparison-row" key={before}>
              <span>{before}</span>
              <ArrowRight size={18} />
              <strong>
                <CircleCheck size={17} />
                {after}
              </strong>
            </div>
          ))}
        </div>
      </section>
      <section className="pricing-invite container">
        <div>
          <span className="eyebrow">Start with your requirements</span>
          <h2>
            Find the right setup
            <br />
            for your team.
          </h2>
          <p>
            Let’s discuss your team size, projects, and the way you sell.
            <br />
            No made-up plans. A conversation about what you need.
          </p>
        </div>
        <div>
          <CTA />
          <Link className="text-link" href="/pricing">
            Explore pricing enquiries
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <FAQ />
      <Closing />
    </>
  );
}

function DemoForm({ pricing = false }: { pricing?: boolean }) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="demo-form"
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        window.setTimeout(() => {
          setBusy(false);
          setDone(true);
        }, 400);
      }}
    >
      <span className="sample-tag">
        Preview form · No data is sent or saved
      </span>
      {done ? (
        <div role="status" className="form-result">
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
            onClick={() => setDone(false)}
          >
            Back to the form
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <h2>
            {pricing
              ? "Tell us about your setup."
              : "Let’s start with your team."}
          </h2>
          <div className="form-grid">
            <label>
              Name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                maxLength={100}
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
              />
            </label>
            <label>
              Team size
              <select required defaultValue="">
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
              <select required defaultValue="">
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
          <button className="button" disabled={busy} type="submit">
            {busy
              ? "Checking…"
              : "Preview " + (pricing ? "pricing enquiry" : "demo request")}
            <ArrowRight size={17} />
          </button>
        </>
      )}
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
    <article className="container legal">
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
          ? "This preview uses local storage for your motion preference. It includes no analytics scripts or non-essential cookies."
          : "This is a structured policy layout for review. It is not an effective agreement or an approved description of business practices."}
      </p>
      <p className="legal-date">
        Effective date: [EFFECTIVE_DATE] · Draft prepared 15 October 2026
      </p>
      <details className="legal-contents" open>
        <summary>
          On this page
          <ChevronDown size={18} />
        </summary>
        <ol>
          {sections.map((s, i) => (
            <li key={s}>
              <a href={"#legal-" + i}>{s}</a>
            </li>
          ))}
        </ol>
      </details>
      {sections.map((s, i) => (
        <section id={"legal-" + i} key={s}>
          <h2>
            {i + 1}. {s}
          </h2>
          <p>
            {cookies
              ? i === 0
                ? "The gromoze-motion preference is stored locally in your browser so the site can remember your motion setting. No form contents are stored."
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
    "Only the motion preference is stored locally in this preview. No analytics or advertising scripts are included. Revisit this section if the implementation changes.",
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
  if (feature)
    return (
      <>
        <section className="container interior feature-hero">
          <div>
            <span className="sample-tag">
              Proposed module · Draft capability
            </span>
            <h1>{feature.task}</h1>
            <p>{feature.detail}</p>
            <div className="hero-actions">
              <CTA />
              <CTA href="/#walkthrough" secondary>
                Follow one enquiry
              </CTA>
            </div>
          </div>
          <RecordScene
            index={Math.max(0, Math.min(3, modules.indexOf(feature)))}
          />
        </section>
        <section className="container section">
          <span className="eyebrow">{feature.title}</span>
          <h2>
            Bring the next conversation
            <br />
            into focus.
          </h2>
          <div className="workflow-grid">
            {(feature.slug === "lead-management"
              ? [
                  "Understand the enquiry",
                  "Assign an owner",
                  "Record the next action",
                ]
              : feature.slug === "property-inventory"
                ? [
                    "Start with requirements",
                    "Review a sample unit",
                    "Keep the match in context",
                  ]
                : feature.slug === "site-visit-management"
                  ? [
                      "Agree a suitable time",
                      "Keep visit details together",
                      "Record the outcome",
                    ]
                  : feature.slug === "sales-pipeline"
                    ? [
                        "Review the current stage",
                        "Discuss what changed",
                        "Set a visible next step",
                      ]
                    : feature.slug === "channel-partners"
                      ? [
                          "Capture referral context",
                          "Clarify responsibility",
                          "Discuss progress",
                        ]
                      : [
                          "Review the sample records",
                          "Understand upcoming activity",
                          "Discuss team priorities",
                        ]
            ).map((t, i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>
                  Explore this step using the fictional Cedar Heights enquiry.
                  The final capability is subject to product approval.
                </p>
              </div>
            ))}
          </div>
          <p className="honest-note">
            These are proposed workflows, not a verified specification of
            existing software. Confirm exact fields, permissions and behavior
            during a demo discussion.
          </p>
        </section>
        <FAQ />
        <Closing />
      </>
    );
  if (audience)
    return (
      <>
        <section className="container interior feature-hero">
          <div>
            <span className="sample-tag">
              Solution concept · For {audience.title.toLowerCase()}
            </span>
            <h1>{audience.heading}</h1>
            <p>{audience.text}</p>
            <CTA />
          </div>
          <div className="solution-needs">
            <Building2 size={40} />
            <h2>A conversation around your team.</h2>
            <ul className="check-list">
              {audience.needs.map((n) => (
                <li key={n}>
                  <Check size={18} />
                  {n}
                </li>
              ))}
            </ul>
            <p>
              Proposed workflows. Confirm fit, access rules and capabilities
              before making a product decision.
            </p>
          </div>
        </section>
        <ModuleIndex />
        <Closing />
      </>
    );
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
  return (
    <>
      <section className="container interior product-overview">
        <span className="eyebrow">The proposed Gromoze workspace</span>
        <h1>
          Separate details.
          <br />
          <span>One connected story.</span>
        </h1>
        <p>
          Explore how enquiries, properties, visits and next actions could come
          together around the work your team does every day.
        </p>
        <CTA href="/#walkthrough">Explore the walkthrough</CTA>
        <Dashboard />
      </section>
      <ModuleIndex />
      <Audience />
      <Closing />
    </>
  );
}
