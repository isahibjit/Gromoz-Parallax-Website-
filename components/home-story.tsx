// @refresh reset
"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { sampleLead, storyChapters, type ScenePoint } from "@/lib/story";
import { storyCopyOpacity } from "@/lib/story-copy";
import {
  createHomeStoryState,
  storyHolds,
  type SurfaceState,
} from "@/lib/story-timeline";
import { CTA } from "./ui";
import { BuildingPoster } from "./building-poster";
import styles from "./home-story.module.css";

const PropertyScene = dynamic(() => import("./property-scene"), { ssr: false });
const desktopQuery =
  "(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
function storyMode() {
  if (!matchMedia(desktopQuery).matches) return false;
  try {
    return localStorage.getItem("gromoze-motion") !== "reduce";
  } catch {
    return document.documentElement.dataset.motion !== "reduce";
  }
}
function subscribeMode(callback: () => void) {
  const media = matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  window.addEventListener("motionchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("motionchange", callback);
    window.removeEventListener("storage", callback);
  };
}
function LeadIdentity() {
  return (
    <div className={styles.identity}>
      <span className="avatar">{sampleLead.initials}</span>
      <div>
        <strong>{sampleLead.name}</strong>
        <span>
          {sampleLead.project} <span aria-hidden="true">·</span>{" "}
          {sampleLead.unit}
        </span>
      </div>
    </div>
  );
}

function UnitDiagram() {
  return (
    <svg
      className={styles.unitDiagram}
      viewBox="0 0 280 150"
      aria-label="Sample floor plan with unit B-804 highlighted"
      role="img"
    >
      <path d="M15 15H265V135H15Z" fill="#E9F0EE" stroke="#D8E1E3" />
      <path
        d="M15 15H110V75H15ZM175 15H265V75H175ZM15 95H110V135H15Z"
        fill="white"
        stroke="#B9CBCE"
      />
      <path d="M175 95H265V135H175Z" fill="#009A9A" />
      <path
        d="M110 15V135M175 15V135M110 75H175M110 95H175"
        fill="none"
        stroke="#0B3159"
        strokeWidth="2"
      />
      <path d="M197 95V112H265M230 112V135" fill="none" stroke="white" />
      <text
        x="220"
        y="126"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        B-804
      </text>
      <text
        x="141"
        y="87"
        textAnchor="middle"
        fill="#526777"
        fontSize="9"
        fontFamily="Inter, sans-serif"
      >
        Lobby
      </text>
    </svg>
  );
}
function PropertyDetail() {
  return (
    <>
      <div className={styles.surfaceLabel}>
        <Building2 size={16} />
        <span>Property detail</span>
        <span>{sampleLead.unit}</span>
      </div>
      <div className={styles.propertyIdentity}>
        <strong>{sampleLead.project}</strong>
        <span>
          3 bedrooms <span aria-hidden="true">·</span> {sampleLead.area}
        </span>
      </div>
      <div className={styles.propertyContent}>
        <UnitDiagram />
        <p>
          Selected unit <strong>{sampleLead.unit}</strong>
        </p>
      </div>
    </>
  );
}
function VisitDetail() {
  return (
    <>
      <div className={styles.surfaceLabel}>
        <CalendarDays size={16} />
        <span>Site visit</span>
        <span>Sample</span>
      </div>
      <div className={styles.visitIdentity}>
        <strong>
          {sampleLead.visitShortDate}, {sampleLead.visitTime}
        </strong>
        <span>
          {sampleLead.name} <span aria-hidden="true">·</span> {sampleLead.unit}
        </span>
      </div>
      <div className={styles.weekBody}>
        <div className={styles.weekDates}>
          {["Thu 15", "Fri 16", "Sat 17", "Sun 18"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className={styles.weekGrid}>
          <span className={styles.weekTime}>11:00</span>
          <div className={styles.visitEvent}>
            <strong>{sampleLead.name}</strong>
            <span>{sampleLead.project}</span>
            <span>
              {sampleLead.visitTime} <span aria-hidden="true">·</span> Sample
              visit
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
function SalesWorkspace() {
  return (
    <>
      <aside className={styles.workspaceSidebar}>
        <span className={styles.appMonogram}>g</span>
        <LayoutDashboard size={19} />
        <Users size={19} />
        <Building2 size={19} />
        <CalendarDays size={19} />
      </aside>
      <div className={styles.workspaceMain}>
        <div className={styles.workspaceTop}>
          <span>
            Sales workspace <ChevronRight size={13} /> Pipeline
          </span>
          <span className="avatar">RS</span>
        </div>
        <div className={styles.workspaceHeading}>
          <div>
            <span>Harbour House</span>
            <strong>Every conversation has a next step.</strong>
          </div>
          <span>Sample workspace</span>
        </div>
        <div className={styles.pipeline}>
          {["New enquiry", "Site visit", "Follow-up"].map((name, i) => (
            <div className={styles.lane} key={name}>
              <div>
                <span className={styles.laneDot} />
                <strong>{name}</strong>
                <span data-lane-count={i}>{i === 1 ? "01" : "—"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EditorialStory() {
  return (
    <div
      className={`container ${styles.editorial}`}
      aria-label="Sample workflow explained"
    >
      {[
        storyChapters[0],
        storyChapters[1],
        storyChapters[2],
        storyChapters[4],
      ].map((chapter, i) => (
        <article
          className={styles.editorialChapter}
          id={`story-${chapter.id}`}
          key={chapter.id}
          tabIndex={-1}
        >
          <div>
            <span className={styles.chapterNumber}>
              0{i + 1} <span aria-hidden="true">/</span> {chapter.label}
            </span>
            <h2>{chapter.heading}</h2>
            <p>{chapter.text}</p>
          </div>
          <div className={styles.editorialVisual}>
            {i === 0 ? (
              <div className={styles.editorialRecord}>
                <span className={styles.surfaceLabel}>
                  Sample workflow <span>{sampleLead.id}</span>
                </span>
                <LeadIdentity />
                <dl>
                  <div>
                    <dt>Source</dt>
                    <dd>{sampleLead.source}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{sampleLead.owner}</dd>
                  </div>
                  <div>
                    <dt>Next action</dt>
                    <dd>{sampleLead.nextAction}</dd>
                  </div>
                </dl>
              </div>
            ) : i === 1 ? (
              <div className={styles.editorialProperty}>
                <PropertyDetail />
              </div>
            ) : i === 2 ? (
              <div className={styles.editorialVisit}>
                <VisitDetail />
              </div>
            ) : (
              <div className={styles.editorialRecord}>
                <span className={styles.surfaceLabel}>
                  Pipeline stage <span>{sampleLead.status}</span>
                </span>
                <LeadIdentity />
                <div className={styles.editorialActivity}>
                  <Check size={16} /> Visit completed{" "}
                  <span>{sampleLead.visitShortDate}</span>
                </div>
                <div className={styles.nextAction}>
                  <small>Next action</small>
                  <strong>{sampleLead.nextAction}</strong>
                  <span>Owner: {sampleLead.owner}</span>
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function HomeStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const model = useRef<HTMLDivElement>(null);
  const record = useRef<HTMLDivElement>(null);
  const connector = useRef<SVGPathElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const userNavigated = useRef(false);
  const [state] = useState(createHomeStoryState);
  const renderScene = useRef<() => void>(() => {});
  const lastPoint = useRef<ScenePoint | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const eligible = useSyncExternalStore(subscribeMode, storyMode, () => false);
  const enhanced = eligible && !webglFailed;
  const onFailure = useCallback(() => setWebglFailed(true), []);
  const updateConnector = useCallback((point?: ScenePoint) => {
    if (point) lastPoint.current = point;
    if (
      !connector.current ||
      !record.current ||
      !model.current ||
      !frame.current
    )
      return;
    const origin = frame.current.getBoundingClientRect();
    const box = record.current.getBoundingClientRect();
    const modelBox = model.current.getBoundingClientRect();
    const pointValue = lastPoint.current;
    let targetX =
      modelBox.left -
      origin.left +
      (pointValue
        ? pointValue.x * state.surfaces.model.scale
        : modelBox.width * 0.48);
    let targetY =
      modelBox.top -
      origin.top +
      (pointValue
        ? pointValue.y * state.surfaces.model.scale
        : modelBox.height * 0.4);
    if (state.progress >= 0.43) {
      const related = frame.current.querySelector<HTMLElement>(
        state.progress < 0.6
          ? '[data-surface="visit"]'
          : '[data-surface="property"]',
      );
      if (related) {
        const relatedBox = related.getBoundingClientRect();
        targetX = relatedBox.left - origin.left + relatedBox.width * 0.5;
        targetY =
          relatedBox.top - origin.top + Math.min(relatedBox.height, 100) * 0.5;
      }
    }
    const startX =
      (targetX > box.right - origin.left ? box.right : box.left) - origin.left;
    const visibleHeight = box.height * (1 - state.leadCompact * 0.64);
    const startY = box.top - origin.top + Math.min(visibleHeight / 2, 110);
    const middle = (startX + targetX) / 2;
    connector.current.setAttribute(
      "d",
      `M ${startX} ${startY} C ${middle} ${startY}, ${middle} ${targetY}, ${targetX} ${targetY}`,
    );
  }, [state]);
  const onReady = useCallback((invalidate: () => void) => {
    renderScene.current = invalidate;
    setSceneReady(true);
    invalidate();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = true;
    const update = () => setSceneActive(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { rootMargin: "150px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!root.current || !stage.current || !frame.current || !enhanced)
        return;
      gsap.registerPlugin(ScrollTrigger);
      const element = root.current;
      const pinned = stage.current;
      const canvas = frame.current;
      Object.assign(state, createHomeStoryState());
      const scene = state;
      const elements = Object.fromEntries(
        Object.keys(scene.surfaces).map((key) => [
          key,
          canvas.querySelector<HTMLElement>(`[data-surface="${key}"]`),
        ]),
      );
      const hero = canvas.querySelector<HTMLElement>(`.${styles.heroCopy}`);
      const leadDetails = canvas.querySelector<HTMLElement>(
        `.${styles.extraLeadDetails}`,
      );
      const propertyBody = canvas.querySelector<HTMLElement>(
        `.${styles.propertyContent}`,
      );
      const visitBody = canvas.querySelector<HTMLElement>(
        `.${styles.weekBody}`,
      );
      const workspaceDetails = canvas.querySelector<HTMLElement>(
        `.${styles.recordActivity}`,
      );
      const closing = canvas.querySelector<HTMLElement>(
        `.${styles.closingAction}`,
      );
      const captions = canvas.querySelectorAll<HTMLElement>("[data-caption]");
      const rail =
        element.querySelectorAll<HTMLAnchorElement>("[data-story-nav]");
      const progressFill = element.querySelector<HTMLElement>(
        `.${styles.railProgress}`,
      );
      let active = -2;
      let disposed = false;
      let width = canvas.clientWidth,
        height = canvas.clientHeight;
      const applySurface = (
        node: HTMLElement | null | undefined,
        value: SurfaceState,
      ) => {
        if (node) {
          node.style.transform = `translate3d(${value.x * width}px,${value.y * height}px,0) scale(${value.scale})`;
          node.style.opacity = String(value.opacity);
          node.style.visibility = value.opacity < 0.005 ? "hidden" : "visible";
        }
      };
      const render = () => {
        for (const [key, value] of Object.entries(scene.surfaces)) {
          // Derive compact-laptop placement from the same timeline state.
          // Keep tween starting values stable when ScrollTrigger refreshes.
          const compact = height < 740;
          applySurface(elements[key], {
            ...value,
            y: value.y + (compact && key === "lead" ? 0.035 * scene.workspaceDetails : 0),
            scale: value.scale - (compact && key === "property" ? 0.1 * scene.leadCompact : 0),
          });
        }
        if (hero) {
          const opacity = storyCopyOpacity(scene.progress, -1);
          hero.style.opacity = String(opacity);
          hero.style.visibility =
            opacity < 0.01 ? "hidden" : "visible";
          hero.style.transform = `translateY(${-12 * (1 - opacity)}px)`;
        }
        captions.forEach((caption, i) => {
          const opacity = storyCopyOpacity(scene.progress, i);
          caption.style.opacity = String(opacity);
          caption.style.visibility = opacity < 0.01 ? "hidden" : "visible";
          caption.style.transform = `translateY(${8 * (1 - opacity)}px)`;
        });
        if (leadDetails) leadDetails.style.opacity = String(scene.leadDetails);
        if (record.current)
          record.current.style.clipPath = `inset(0 0 ${scene.leadCompact * 64}% 0 round 10px)`;
        if (elements.property)
          elements.property.style.clipPath = `inset(0 0 ${scene.propertyCompact * 65}% 0 round 10px)`;
        if (elements.visit)
          elements.visit.style.clipPath = `inset(0 0 ${scene.visitCompact * 67}% 0 round 10px)`;
        if (propertyBody)
          propertyBody.style.opacity = String(1 - scene.propertyCompact);
        if (visitBody) visitBody.style.opacity = String(1 - scene.visitCompact);
        if (workspaceDetails)
          workspaceDetails.style.opacity = String(scene.workspaceDetails);
        if (closing) {
          const opacity = storyCopyOpacity(scene.progress, storyChapters.length - 1);
          closing.style.opacity = String(opacity);
          closing.style.visibility =
            opacity < 0.01 ? "hidden" : "visible";
        }
        if (progressFill)
          progressFill.style.transform = `scaleX(${scene.progress})`;
        const chapter =
          scene.progress < 0.1
            ? -1
            : scene.progress < 0.25
              ? 0
              : scene.progress < 0.43
                ? 1
                : scene.progress < 0.6
                  ? 2
                  : scene.progress < 0.79
                    ? 3
                    : scene.progress < 0.93
                      ? 4
                      : 5;
        if (chapter !== active) {
          active = chapter;
          canvas.querySelectorAll<HTMLElement>("[data-lane-count]").forEach((count) => {
            count.textContent = Number(count.dataset.laneCount) === (chapter >= 4 ? 2 : 1) ? "01" : "—";
          });
          element.dataset.chapter = String(chapter);
          rail.forEach((link) => {
            const current =
              Number(link.dataset.storyNav) ===
              Math.max(0, chapter === 3 ? 2 : chapter > 3 ? 3 : chapter);
            if (current) link.setAttribute("aria-current", "step");
            else link.removeAttribute("aria-current");
          });
        }
        updateConnector();
        renderScene.current();
      };
      const headerHeight = () =>
        document.querySelector(".header")?.getBoundingClientRect().height ?? 76;
      const sequence = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        onUpdate: render,
        scrollTrigger: {
          id: "gromoze-home-story",
          trigger: pinned,
          pin: pinned,
          start: () => `top ${headerHeight()}px`,
          end: () => `+=${Math.round(innerHeight * 4.2)}`,
          scrub: 0.6,
          invalidateOnRefresh: false,
          onRefresh: () => {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            const finalCaption = captions.item(captions.length - 1);
            if (closing && finalCaption?.parentElement) {
              closing.style.top = `${finalCaption.parentElement.offsetTop + finalCaption.offsetHeight + 24}px`;
            }
            render();
          },
        },
      });
      timeline.current = sequence;
      sequence
        .to(scene, { progress: 1, duration: 1, ease: "none" }, 0)
        .to(
          scene.surfaces.lead,
          { x: 0.065, y: 0.38, scale: 1.05, duration: 0.055 },
          0.1,
        )
        .to(scene, { leadDetails: 1, duration: 0.04 }, 0.12)
        .to(
          scene.camera,
          { x: 9.0, y: 7.2, z: 10.5, targetY: 3.1, duration: 0.055 },
          0.1,
        )
        .addLabel("enquiry", 0.17)
        .to(
          scene.camera,
          { x: 8.5, y: 7.4, z: 10.8, targetY: 3.6, duration: 0.065 },
          0.25,
        )
        .to(
          scene.architecture,
          {
            upperLift: 0.85,
            facadeShift: 0.65,
            unitOffset: 0.22,
            duration: 0.065,
          },
          0.25,
        )
        .to(
          scene.surfaces.property,
          { opacity: 1, y: 0.42, duration: 0.055 },
          0.27,
        )
        .addLabel("property", 0.34)
        .to(
          scene.camera,
          {
            x: 6.2,
            y: 5.8,
            z: 7.6,
            targetX: 0.6,
            targetY: 3.8,
            targetZ: 0.3,
            duration: 0.05,
          },
          0.43,
        )
        .to(
          scene.surfaces.model,
          { x: 0.67, y: 0.05, scale: 0.56, opacity: 0.75, duration: 0.065 },
          0.43,
        )
        .to(
          scene.surfaces.lead,
          { x: 0.065, y: 0.43, scale: 0.9, duration: 0.06 },
          0.43,
        )
        .to(scene, { leadCompact: 1, duration: 0.05 }, 0.43)
        .to(
          scene.surfaces.property,
          { x: 0.065, y: 0.60, scale: 0.8, duration: 0.06 },
          0.43,
        )
        .to(
          scene.surfaces.visit,
          { opacity: 1, y: 0.40, duration: 0.06 },
          0.45,
        )
        .addLabel("visit", 0.52)
        .to(
          scene.camera,
          {
            x: 10.5,
            y: 8.5,
            z: 13.5,
            targetX: 0,
            targetY: 3.2,
            targetZ: 0,
            duration: 0.07,
          },
          0.6,
        )
        .to(
          scene.architecture,
          { upperLift: 0, facadeShift: 0, unitOffset: 0, duration: 0.07 },
          0.6,
        )
        .to(
          scene.surfaces.model,
          { x: 0.015, y: 0.56, scale: 0.38, opacity: 0.65, duration: 0.07 },
          0.6,
        )
        .to(scene.surfaces.workspace, { opacity: 1, duration: 0.05 }, 0.61)
        .to(
          scene.surfaces.lead,
          { x: 0.525, y: 0.445, scale: 0.82, duration: 0.075 },
          0.6,
        )
        .to(
          scene,
          {
            leadCompact: 0,
            propertyCompact: 1,
            visitCompact: 1,
            workspaceDetails: 1,
            duration: 0.065,
          },
          0.6,
        )
        .to(
          scene.surfaces.property,
          { x: 0.325, y: 0.755, scale: 1, duration: 0.07 },
          0.6,
        )
        .to(
          scene.surfaces.visit,
          { x: 0.57, y: 0.755, scale: 0.9, duration: 0.07 },
          0.6,
        )
        .addLabel("workspace", 0.7)
        .to(scene.surfaces.lead, { x: 0.745, y: 0.445, duration: 0.055 }, 0.79)
        .addLabel("progress", 0.86)
        .addLabel("demo", 0.97);
      render();
      const goToHash = () => {
        const chapter = storyChapters.find(
          (c) => location.hash === `#story-${c.id}`,
        );
        if (chapter && sequence.scrollTrigger)
          window.scrollTo({
            top: sequence.scrollTrigger.labelToScroll(chapter.id),
            behavior: "instant",
          });
      };
      const navigationEntry = performance.getEntriesByType("navigation")[0];
      const restoredNavigation = navigationEntry instanceof PerformanceNavigationTiming &&
        (navigationEntry.type === "reload" || navigationEntry.type === "back_forward");
      let restored = false;
      const rememberPosition = () => {
        try {
          sessionStorage.setItem("gromoze-story-position", JSON.stringify({
            url: location.href, width: innerWidth, height: innerHeight, y: scrollY,
          }));
        } catch { /* Native browser restoration remains available. */ }
      };
      const refresh = () => {
        if (!disposed) {
          ScrollTrigger.refresh();
          if (userNavigated.current) return;
          if (!restoredNavigation) goToHash();
          else if (!restored && navigationEntry.type === "reload") {
            restored = true;
            try {
              const saved: unknown = JSON.parse(sessionStorage.getItem("gromoze-story-position") ?? "null");
              if (saved && typeof saved === "object" && "url" in saved && saved.url === location.href &&
                "width" in saved && saved.width === innerWidth && "height" in saved && saved.height === innerHeight &&
                "y" in saved && typeof saved.y === "number" && Number.isFinite(saved.y)) {
                window.scrollTo({ top: saved.y, behavior: "instant" });
                ScrollTrigger.update();
              }
            } catch { /* Use the browser's restored position if storage is unavailable. */ }
          }
        }
      };
      void document.fonts.ready.then(refresh);
      window.addEventListener("hashchange", goToHash);
      window.addEventListener("popstate", goToHash);
      window.addEventListener("pageshow", refresh);
      window.addEventListener("pagehide", rememberPosition);
      return () => {
        disposed = true;
        timeline.current = null;
        window.removeEventListener("hashchange", goToHash);
        window.removeEventListener("popstate", goToHash);
        window.removeEventListener("pageshow", refresh);
        window.removeEventListener("pagehide", rememberPosition);
        Object.values(elements).forEach((node) =>
          node?.removeAttribute("style"),
        );
        hero?.removeAttribute("style");
        record.current?.removeAttribute("style");
        captions.forEach((c) => c.removeAttribute("style"));
        closing?.removeAttribute("style");
        [leadDetails, propertyBody, visitBody, workspaceDetails, progressFill].forEach((node) => node?.removeAttribute("style"));
        delete element.dataset.chapter;
      };
    },
    { scope: root, dependencies: [enhanced], revertOnUpdate: true },
  );

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const trigger = timeline.current?.scrollTrigger;
    if (
      !trigger ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    userNavigated.current = true;
    history.pushState(null, "", `#story-${id}`);
    window.scrollTo({ top: trigger.labelToScroll(id), behavior: "instant" });
  }
  function skip(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById("explorer-heading");
    if (!target) return;
    event.preventDefault();
    userNavigated.current = true;
    const header =
      document.querySelector(".header")?.getBoundingClientRect().height ?? 76;
    const top = target.getBoundingClientRect().top + scrollY - header - 24;
    history.pushState(null, "", "#product-explorer");
    window.scrollTo({ top, behavior: "instant" });
    target.focus({ preventScroll: true });
  }
  function seek(value: number) {
    userNavigated.current = true;
    const trigger = timeline.current?.scrollTrigger;
    if (!trigger) return;
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * value,
      behavior: "instant",
    });
    timeline.current?.progress(value);
    renderScene.current();
  }

  return (
    <section
      id="home-story"
      ref={root}
      className={styles.story}
      data-enhanced={enhanced}
    >
      <div ref={stage} className={styles.stage}>
        <div ref={frame} className={styles.frame}>
          <div className={styles.heroCopy}>
            <span className={styles.category}>
              Real estate sales software <span />
            </span>
            <h1>
              Property sales.
              <br />
              In clear view.
            </h1>
            <p>
              Connect enquiries, properties, site visits, and the next action
              your team needs to take.
            </p>
            <div className={styles.heroActions}>
              <CTA />
              <a href="#story-enquiry" onClick={(e) => navigate(e, "enquiry")}>
                Explore Gromoze <ArrowRight size={20} />
              </a>
            </div>
            <span className={styles.audience}>
              For developers, brokerages, and sales teams.
            </span>
          </div>
          <div
            className={styles.modelLayer}
            data-surface="model"
            ref={model}
            aria-hidden="true"
          >
            <div
              className={`${styles.poster} ${sceneReady && enhanced ? styles.posterHidden : ""}`}
            >
              <BuildingPoster />
            </div>
            {enhanced && (
              <PropertyScene
                state={state}
                active={sceneActive}
                onReady={onReady}
                onProject={updateConnector}
                onFailure={onFailure}
              />
            )}
          </div>
          <div
            className={styles.workspace}
            data-surface="workspace"
            aria-hidden="true"
          >
            <SalesWorkspace />
          </div>
          <div
            className={styles.property}
            data-surface="property"
            aria-hidden="true"
          >
            <PropertyDetail />
          </div>
          <div className={styles.visit} data-surface="visit" aria-hidden="true">
            <VisitDetail />
          </div>
          <svg className={styles.connector} aria-hidden="true">
            <path ref={connector} d="M 1000 350 C 1030 350 1060 450 1100 450" />
          </svg>
          <div
            className={styles.lead}
            data-surface="lead"
            data-persistent-lead={sampleLead.id}
            ref={record}
            aria-hidden="true"
          >
            <span className={styles.surfaceLabel}>
              Sample workflow <span>{sampleLead.id}</span>
            </span>
            <LeadIdentity />
            <div className={styles.leadFields}>
              <div>
                <span>Owner</span>
                <strong>{sampleLead.owner}</strong>
              </div>
              <div>
                <span>Next action</span>
                <strong>{sampleLead.nextAction}</strong>
              </div>
            </div>
            <div className={styles.extraLeadDetails}>
              <span>Source</span>
              <strong>{sampleLead.source}</strong>
            </div>
            <div className={styles.recordActivity}>
              <Check size={13} />
              <span>
                Visit completed <span aria-hidden="true">·</span>{" "}
                {sampleLead.visitShortDate}
              </span>
            </div>
          </div>
          <div className={styles.captions} aria-hidden="true">
            {storyChapters.map((c, i) => (
              <div data-caption={i} data-caption-layout={i >= 3 ? "compact" : "wide"} key={c.id}>
                <span>
                  0{Math.min(i + 1, 4)} <span aria-hidden="true">/</span>{" "}
                  {c.label}
                </span>
                <h2>{c.heading}</h2>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.closingAction}>
            <CTA />
          </div>
          <div className={styles.rail}>
            <span className={styles.railProgress} />
            <nav aria-label="Explore the sample story">
              {[
                storyChapters[0],
                storyChapters[1],
                storyChapters[2],
                storyChapters[4],
              ].map((chapter, i) => (
                <a
                  key={chapter.id}
                  data-story-nav={i}
                  href={`#story-${chapter.id}`}
                  onClick={(event) => navigate(event, chapter.id)}
                >
                  <span>0{i + 1}</span>
                  {chapter.label}
                </a>
              ))}
            </nav>
            <span className={styles.scrollCue}>
              Scroll to explore <ArrowDown size={14} />
            </span>
            <a className={styles.skip} href="#product-explorer" onClick={skip}>
              Skip story <ArrowRight size={15} />
            </a>
          </div>
          {process.env.NODE_ENV === "development" && enhanced && (
            <details className={styles.debug}>
              <summary>Review frames</summary>
              <div>
                {storyHolds.map((value) => (
                  <button onClick={() => seek(value)} key={value}>
                    {value.toFixed(2)}
                  </button>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
      <EditorialStory />
    </section>
  );
}
