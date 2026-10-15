"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Check, ChevronDown, Clock3, Users } from "lucide-react";
import { sampleLead } from "@/lib/story";
import { CTA } from "./ui";
import styles from "./homepage-sections.module.css";

const explorerItems = [
  { title: "Enquiries", text: "A person. A clear owner. A next step.", href: "/features/lead-management", link: "Explore enquiry management" },
  { title: "Properties", text: "Keep the property in the conversation.", href: "/features/property-inventory", link: "Explore property information" },
  { title: "Site visits", text: "Bring the people and the place together.", href: "/features/site-visit-management", link: "Explore site visits" },
  { title: "Sales progress", text: "See where the conversation goes next.", href: "/features/sales-pipeline", link: "Explore sales progress" },
] as const;

const questions = [
  ["Who is Gromoze intended for?", "Gromoze is being shaped around real estate developers, brokerages and sales teams. Explore the sample workflows, then discuss the needs of your team in a demo conversation."],
  ["Is the information in the product preview real?", "No. Aarya Mehta, Harbour House and the other example details are fictional. The preview illustrates how enquiries, properties, visits and next actions could connect. Product capabilities are subject to confirmation."],
  ["What should we bring to a demo conversation?", "A little context about your team, the properties you work with and the steps in your sales process. You can also include any specific requirements in the demo form."],
  ["How can we find out about pricing?", "Pricing has not been confirmed. The pricing enquiry helps you describe your business type, team size and requirements so the right setup can be discussed."],
  ["Can we discuss imports and integrations?", "Include the systems you use and the information you want to bring across in your enquiry. Availability, scope and onboarding arrangements need to be confirmed with Gromoze."],
  ["Do the sample controls change an account?", "No. The interactions on this page only change the local preview and reset when you reload. The demo request form separately explains whether enquiry delivery is configured before you submit."],
] as const;

function SampleAction({ children, onClick, expanded, controls }: { children: ReactNode; onClick: () => void; expanded?: boolean; controls?: string }) {
  return <button type="button" className={styles.sampleAction} onClick={onClick} aria-expanded={expanded} aria-controls={controls}>{children}<ArrowRight size={16} aria-hidden="true" /></button>;
}

function PreviewFrame({ title, children }: { title: string; children: ReactNode }) {
  return <div className={styles.previewFrame}>
    <div className={styles.previewRail} aria-hidden="true"><span className={styles.brandMark}>g</span><Users size={20} /><Building2 size={20} /><CalendarDays size={20} /></div>
    <div className={styles.previewSurface}>
      <div className={styles.previewTop}><span>Workspace <span className={styles.slash}>/</span> {title}</span><span className={styles.ownerInitials}>{sampleLead.ownerInitials}</span></div>
      <div className={styles.previewBody}>{children}</div>
      <div className={styles.previewFoot}><span>Sample workflow</span><span>Local preview only</span></div>
    </div>
  </div>;
}

function RecordDetails({ compact = false }: { compact?: boolean }) {
  return <div className={styles.recordDetails}>
    <div className={styles.recordIdentity}><span className={styles.avatar}>{sampleLead.initials}</span><div><strong>{sampleLead.name}</strong><span>{sampleLead.id} · {sampleLead.source}</span></div></div>
    <dl className={styles.detailPairs}><div><dt>Property</dt><dd>{sampleLead.project} · {sampleLead.unit}</dd></div><div><dt>Owner</dt><dd>{sampleLead.owner}</dd></div>{!compact && <div><dt>Stage</dt><dd>{sampleLead.status}</dd></div>}</dl>
    <div className={styles.nextAction}><span>Next action</span><strong>{sampleLead.nextAction}</strong></div>
  </div>;
}

function UnitPlan({ selected = "B-804", onSelect }: { selected?: string; onSelect?: (unit: "B-804" | "B-805") => void }) {
  return <div className={styles.unitPlan} aria-label="Illustrative floor 8 unit diagram">
    <div className={styles.planCorridor}>Floor 8</div>
    {(["B-804", "B-805"] as const).map((unit) => onSelect
      ? <button type="button" key={unit} className={`${styles.planUnit} ${selected === unit ? styles.selectedUnit : ""}`} onClick={() => onSelect(unit)} aria-pressed={selected === unit}><span>{unit}</span><span className={styles.planRooms} aria-hidden="true"><i /><i /><i /></span><small>{unit === "B-804" ? "3 bedrooms" : "2 bedrooms"}</small></button>
      : <div key={unit} className={`${styles.planUnit} ${selected === unit ? styles.selectedUnit : ""}`}><span>{unit}</span><span className={styles.planRooms} aria-hidden="true"><i /><i /><i /></span><small>{unit === "B-804" ? "Selected unit" : "Example unit"}</small></div>)}
    <div className={styles.planCaption}>Illustrative layout · not a floor plan</div>
  </div>;
}

function ActivityList() {
  return <ol className={styles.activityList}>
    <li><span className={styles.activityDot} /><div><strong>Property requirements discussed</strong><span>{sampleLead.project} · {sampleLead.unit}</span></div></li>
    <li><span className={styles.activityDot} /><div><strong>Site visit</strong><span>{sampleLead.visitDate} · {sampleLead.visitTime}</span></div></li>
    <li><span className={styles.activityDot} /><div><strong>{sampleLead.status}</strong><span>{sampleLead.nextAction}</span></div></li>
  </ol>;
}

function EnquiryPreview() {
  const [selected, setSelected] = useState(false);
  return <PreviewFrame title="Enquiries"><div className={styles.previewTitle}><h3>Every conversation has context.</h3><span>01 enquiry</span></div>
    <div className={styles.enquiryColumns}><div className={styles.enquiryList}><span className={styles.fieldLabel}>Enquiry</span><button type="button" className={`${styles.enquiryRow} ${selected ? styles.selectedRow : ""}`} aria-expanded={selected} aria-controls="sample-enquiry-detail" onClick={() => setSelected(!selected)}><strong>{sampleLead.name}</strong><span>{sampleLead.project}</span><small>{sampleLead.status}</small><ArrowUpRight size={17} aria-hidden="true" /></button><p>Select the enquiry to see its next action.</p></div>
    <div id="sample-enquiry-detail" className={styles.enquiryDetail}>{selected ? <RecordDetails /> : <div className={styles.selectionPrompt}><Users size={28} aria-hidden="true" /><h4>A shared point of reference.</h4><p>Open {sampleLead.name}’s enquiry to connect the property, owner and next conversation.</p><SampleAction onClick={() => setSelected(true)}>Open sample enquiry</SampleAction></div>}</div></div>
  </PreviewFrame>;
}

function PropertyPreview() {
  const [unit, setUnit] = useState<"B-804" | "B-805">("B-804");
  return <PreviewFrame title="Properties"><div className={styles.previewTitle}><h3>{sampleLead.project}</h3><span>Floor 8</span></div><div className={styles.propertyColumns}><UnitPlan selected={unit} onSelect={setUnit} /><div className={styles.unitInformation}><span className={styles.fieldLabel}>Selected property</span><h4>{unit}</h4><p>{unit === "B-804" ? sampleLead.requirement : "2 bedroom apartment"}</p><dl className={styles.detailPairs}><div><dt>Project</dt><dd>{sampleLead.project}</dd></div><div><dt>Enquiry</dt><dd>{unit === "B-804" ? sampleLead.name : "No linked sample enquiry"}</dd></div></dl><div className={styles.nextAction}><span>{unit === "B-804" ? "Connected conversation" : "Example property"}</span><strong>{unit === "B-804" ? "Keep the buyer’s requirements alongside the unit." : "Choose B-804 to return to Aarya’s enquiry."}</strong></div></div></div></PreviewFrame>;
}

function VisitPreview() {
  const [open, setOpen] = useState(false);
  return <PreviewFrame title="Site visits"><div className={styles.previewTitle}><h3>A time. A place. A clear owner.</h3><span>October 2026</span></div><div className={styles.weekStrip}>{["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Sun 18"].map((day) => <span key={day} className={day === "Sat 17" ? styles.selectedDay : ""}>{day.split(" ")[0]}<strong>{day.split(" ")[1]}</strong></span>)}</div><button type="button" className={styles.visitRow} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="explorer-visit-detail"><span className={styles.visitTime}><Clock3 size={17} aria-hidden="true" />{sampleLead.visitTime}</span><span><strong>{sampleLead.name}</strong><span>{sampleLead.project} · {sampleLead.unit}</span></span><ChevronDown size={19} className={open ? styles.expanded : ""} aria-hidden="true" /></button><div id="explorer-visit-detail" className={styles.visitDetail}>{open ? <><dl className={styles.detailPairs}><div><dt>Visit</dt><dd>{sampleLead.visitDate}</dd></div><div><dt>Owner</dt><dd>{sampleLead.owner}</dd></div></dl><div className={styles.nextAction}><span>After the visit</span><strong>{sampleLead.nextAction}</strong></div></> : <p>Open the sample visit to see the people, property and next step together.</p>}</div></PreviewFrame>;
}

function ProgressPreview() {
  const [activity, setActivity] = useState(false);
  return <PreviewFrame title="Sales progress"><div className={styles.previewTitle}><h3>Make the next step visible.</h3><span>Linked activity</span></div><div className={styles.pipelineStrip}><span>Enquiry</span><ArrowRight size={14} aria-hidden="true" /><span>Site visit</span><ArrowRight size={14} aria-hidden="true" /><strong>{sampleLead.status}</strong></div><div className={styles.progressColumns}><RecordDetails compact /><div className={styles.progressActivity}><SampleAction onClick={() => setActivity(!activity)} expanded={activity} controls="explorer-activity">{activity ? "Hide linked activity" : "View linked activity"}</SampleAction><div id="explorer-activity">{activity ? <ActivityList /> : <p>Follow the same enquiry from the property conversation to the next action.</p>}</div></div></div></PreviewFrame>;
}

function ProductExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % explorerItems.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + explorerItems.length) % explorerItems.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = explorerItems.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <section id="product-explorer" className={`${styles.section} ${styles.explorer}`} aria-labelledby="explorer-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="explorer-heading" tabIndex={-1}>The details behind<br />every next step.</h2>
          <p>Explore the connections in a sales day.<br />Try the sample workspace for yourself.</p>
        </div>
        <div className={styles.explorerLayout}>
          <div role="tablist" aria-label="Explore product workflows" aria-orientation="vertical" className={styles.explorerIndex}>
            {explorerItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`explorer-tab-${index}`}
                aria-selected={selected === index}
                aria-controls={`explorer-panel-${index}`}
                tabIndex={selected === index ? 0 : -1}
                ref={(node) => { tabs.current[index] = node; }}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => navigate(event, index)}
                className={selected === index ? styles.activeIndex : ""}
              >
                <span className={styles.indexNumber}>0{index + 1}</span>
                <span><strong>{item.title}</strong><small>{item.text}</small></span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.previewColumn}>
            {[<EnquiryPreview key="enquiry" />, <PropertyPreview key="property" />, <VisitPreview key="visit" />, <ProgressPreview key="progress" />].map((preview, index) => (
              <div key={explorerItems[index].title} role="tabpanel" id={`explorer-panel-${index}`} aria-labelledby={`explorer-tab-${index}`} tabIndex={0} hidden={selected !== index}>
                {preview}
              </div>
            ))}
            <Link className={styles.inlineLink} href={explorerItems[selected].href}>
              {explorerItems[selected].link}<ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceStories() {
  return <section className={`${styles.section} ${styles.audiences}`} aria-labelledby="audiences-heading"><div className={styles.container}><div className={styles.sectionHeading}><h2 id="audiences-heading">Built around your<br />sales operation.</h2><p>Different teams. Different perspectives.<br />A connected view of the work.</p></div>
    <article className={`${styles.audienceRow} ${styles.developerRow}`}><div className={styles.audienceCopy}><span className={styles.audienceLabel}>For developers</span><h3>The project, down to<br />the conversation.</h3><p>Explore project and unit information alongside the enquiry and the person responsible for its next step.</p><Link href="/solutions/developers" className={styles.inlineLink}>Explore the developer workflow<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className={styles.developerSlice}><div className={styles.sliceHeading}><Building2 size={20} aria-hidden="true" /><strong>{sampleLead.project}</strong><span>Sample project</span></div><div className={styles.developerSliceBody}><UnitPlan /><dl className={styles.detailPairs}><div><dt>Enquiry</dt><dd>{sampleLead.name}</dd></div><div><dt>Unit</dt><dd>{sampleLead.unit}</dd></div><div><dt>Sales owner</dt><dd>{sampleLead.owner}</dd></div></dl></div></div></article>
    <article className={`${styles.audienceRow} ${styles.brokerageRow}`}><div className={styles.brokerageSlice}><div className={styles.sliceHeading}><Users size={20} aria-hidden="true" /><strong>One conversation, shared context</strong></div><RecordDetails compact /></div><div className={styles.audienceCopy}><span className={styles.audienceLabel}>For brokerages</span><h3>Stay close to<br />the next conversation.</h3><p>Bring the buyer’s needs, property discussion and follow-up into view, with a clear owner for the enquiry.</p><Link href="/solutions/brokerages" className={styles.inlineLink}>Explore the brokerage workflow<ArrowUpRight size={18} aria-hidden="true" /></Link></div></article>
    <article className={`${styles.audienceRow} ${styles.partnerRow}`}><div className={styles.audienceCopy}><span className={styles.audienceLabel}>For channel partners</span><h3>A handover with context.</h3><p>Discuss how referral details, responsibility and progress could work across your partner relationships.</p><Link href="/solutions/channel-partners" className={styles.inlineLink}>Discuss your partner workflow<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className={styles.partnerSlice}><span className={styles.fieldLabel}>Illustrative handover · scope to confirm</span><div className={styles.handover}><span>Referral context</span><ArrowRight size={22} aria-hidden="true" /><span><strong>{sampleLead.owner}</strong>Enquiry owner</span></div><div className={styles.handoverRecord}><span>{sampleLead.name} · {sampleLead.unit}</span><strong>{sampleLead.status}</strong></div></div></article>
  </div></section>;
}

const dayTasks = [
  { title: "Give a new enquiry an owner", text: "A fictional website enquiry is ready to review.", action: "Assign to Riya", done: "Assigned in this preview", icon: Users },
  { title: "Confirm the Harbour House visit", text: `${sampleLead.name} · ${sampleLead.visitShortDate}, ${sampleLead.visitTime}`, action: "Confirm sample visit", done: "Confirmed in this preview", icon: CalendarDays },
  { title: "Follow up on the property conversation", text: `${sampleLead.name} · ${sampleLead.nextAction}`, action: "Mark sample task done", done: "Completed in this preview", icon: Check },
] as const;

function DayQueue() {
  const [complete, setComplete] = useState<readonly number[]>([]);
  return <section className={`${styles.section} ${styles.day}`} aria-labelledby="day-heading"><div className={`${styles.container} ${styles.dayLayout}`}><div className={styles.dayCopy}><h2 id="day-heading">A clearer start<br />to the sales day.</h2><p>An owner to assign. A visit to confirm. A conversation to continue.</p><p className={styles.previewNote}>Try these sample actions. Changes stay in this page and reset when you reload.</p></div><div className={styles.actionQueue}><div className={styles.queueHeading}><h3>Next actions</h3><span>Sample workspace</span></div>{dayTasks.map((task, index) => { const done = complete.includes(index); const Icon = task.icon; return <div key={task.title} className={`${styles.taskRow} ${done ? styles.taskDone : ""}`}><Icon size={21} aria-hidden="true" /><div><h4>{task.title}</h4><p>{task.text}</p><button type="button" className={styles.taskAction} onClick={() => setComplete((current) => done ? current.filter((item) => item !== index) : [...current, index])} aria-label={done ? `Undo: ${task.title}` : task.action}>{done ? <><Check size={15} aria-hidden="true" />{task.done}<span>Undo</span></> : <>{task.action}<ArrowRight size={15} aria-hidden="true" /></>}</button></div></div>; })}<span className={styles.queueStatus} role="status">{complete.length === 0 ? "Three example moments in a sales day." : `${complete.length} of 3 sample actions complete.`}</span></div></div></section>;
}

function PricingInvitation() {
  return <section className={styles.pricing} aria-labelledby="pricing-invitation-heading"><div className={`${styles.container} ${styles.pricingInner}`}><div><h2 id="pricing-invitation-heading">Find the right setup<br />for your team.</h2><p>Tell us about your team size and the way you sell.<br />Pricing and availability can be discussed from there.</p></div><div className={styles.pricingAction}><CTA href="/pricing">Discuss your requirements</CTA><span>Plans and pricing are yet to be confirmed.</span></div></div></section>;
}

function Questions() {
  return <section className={`${styles.section} ${styles.faq}`} aria-labelledby="questions-heading"><div className={`${styles.container} ${styles.faqLayout}`}><div><h2 id="questions-heading">A few things<br />you might ask.</h2><p>A little more context before<br />the conversation.</p></div><div className={styles.questions}>{questions.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>;
}

function FinalInvitation() {
  return <section className={styles.closing} aria-labelledby="final-invitation-heading"><div className={`${styles.container} ${styles.closingInner}`}><div className={styles.closingCopy}><h2 id="final-invitation-heading">Bring your sales<br />process into view.</h2><p>Explore Gromoze with your team’s workflow in mind.</p><CTA /></div><div className={styles.closingMotif} aria-hidden="true"><div className={styles.closingFloor}><span /><span /><span /></div><div className={styles.closingConnector} /><div className={styles.closingRecord}><span>Sample workflow</span><strong>{sampleLead.name}</strong><span>{sampleLead.project} · {sampleLead.unit}</span><div /><span>Next action</span><strong>{sampleLead.nextAction}</strong></div></div></div></section>;
}

export function HomeSections() {
  return <div className={styles.homeSections}><ProductExplorer /><AudienceStories /><DayQueue /><PricingInvitation /><Questions /><FinalInvitation /></div>;
}
