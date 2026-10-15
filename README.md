# Gromoze website — V2

Private marketing concept for **Gromoze — Real Estate Sales. Simplified.** An original procedural building connects to a fictional enquiry, selected property, site visit and next action. Product text is HTML; architecture is Three.js. This illustrates a proposed product, not a production CRM or a promised 3D inventory configurator.

## Run and build

Use Node.js 20.9 or later, as required by the installed Next.js version. Use the lockfile:

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

The development server defaults to `http://localhost:3000`. Other shells can use `npm` instead of `npm.cmd`. The static export uses trailing slashes and writes the deployable site to `out/`. Deploy that directory through the existing private hosting workflow; no Next.js server is required. A local build does not update the previously shared private preview automatically. Keep hosting access controls in place; noindex is not access control.

The stack is Next.js App Router, React, strict TypeScript, CSS Modules, GSAP/ScrollTrigger with `@gsap/react`, Three.js and React Three Fiber. Native scrolling remains the default.

## Source map

| Source | Responsibility |
| --- | --- |
| `components/site.tsx` | Shared shell, navigation/footer, form/legal layouts and route composition |
| `components/ui.tsx` | Reusable original-logo presentation and CTA links |
| `components/home-story.tsx` | Desktop stage, persistent product surfaces, one GSAP timeline, chapter/Skip navigation and editorial fallback |
| `lib/story.ts`, `lib/story-timeline.ts` | Canonical sample, typed scene/surface state and reading holds |
| `components/property-scene.tsx` | Procedural architecture, instanced repeated elements, camera, floor reveal and WebGL lifecycle |
| `components/building-poster.tsx` | Original vector poster and fallback architecture |
| `components/homepage-sections.tsx` | Interactive explorer, audience rows, local action queue, pricing invitation, FAQs and closing CTA |
| `components/interior-pages.tsx` | Differentiated product, feature and solution pages with focused previews |
| `lib/content.ts`, `lib/site-config.ts` | Proposed modules/routes and centralized unverified business details |
| `app/globals.css` and adjacent CSS Modules | Shared brand/shell rules and isolated page composition |

## Motion and fallback

The desktop story initially requires a viewport of at least 1100×720, motion permission and WebGL2 support. One normalized progress value drives camera position/target, floor separation, facade displacement, the selected unit, HTML surfaces and connector. One wrapper is pinned below the header, with 0.45-second scrub catch-up and approximately 4.2 viewport heights of travel. Reading holds: `0.00`, `0.17`, `0.34`, `0.52`, `0.70`, `0.86`, `0.97`.

The enquiry remains a persistent HTML object. Canvas projection supplies the selected-unit endpoint; later connections use actual DOM positions. Continuous motion changes refs rather than React state every frame. Timeline updates invalidate the demand-rendered scene, whose DPR is capped at 1.5. Rendering pauses outside the active story or while the document is hidden. Scene errors/context loss select the static alternative.

Phones, short screens and reduced motion use normal document flow with a hero and four focused chapters. The original SVG building is available before WebGL. The footer motion preference is stored locally. Chapter links navigate real scroll positions; Skip targets `#product-explorer` and focuses `#explorer-heading`. Development-only seek controls expose the reading holds.

These describe implementation, not measured performance or browser verification. Record actual evidence in `VALIDATION.md`.

## Data and content truth

The shared fictional identity is **Aarya Mehta**, `GR-1042`, **Harbour House / B-804**, owner **Riya Shah**, visit **17 October 2026, 11:00 am**, post-visit stage **Follow-up**, next action **Share the requested property details**. The visit is a fixed example, not a live appointment. B-805 is a separate fictional explorer property.

The explorer opens an enquiry, selects a unit, opens a visit and shows activity. Tabs support arrows, Home and End. Task-queue actions are reversible local examples. They do not update accounts and reset on reload.

Product capabilities, partner access, integrations/imports, reports, onboarding and prices remain unconfirmed. Edit proposed modules and their approval status in `lib/content.ts`. Removing a module from navigation is insufficient for public launch: also remove any unwanted exported route.

`lib/site-config.ts` leaves legal entity, address, contact details, sign-in URL and submission endpoint unset. Forms validate locally and explicitly report that no enquiry was sent, saved or booked. Returning to the form retains inputs. `.env.example` documents future server-only configuration; it does not implement delivery. Real delivery needs a server endpoint/service, validation, rate limiting, failure handling, receipt verification and matching privacy wording.

Legal pages remain private drafts with missing fields. No authentication service, CRM backend, billing, database migration or analytics integration is included. No non-essential cookies are configured by this source. Account separately for local motion preferences, external font requests and the host's actual logs/cookies when finalizing policies.

All routes are noindex and `public/robots.txt` disallows crawling. No production canonical or sitemap is emitted without a verified public domain. Update public indexing, canonical/social URLs and sitemap only after content approval.

## Assets

- `public/gromoze-logo.png`: original user-supplied logo, preserved; excess whitespace is cropped only in its display wrapper.
- `components/property-scene.tsx`: original procedural eleven-storey model. No purchased GLB, stock model or external textures.
- `components/building-poster.tsx`: original SVG companion illustration; it is not a substitute for desktop 3D motion.
- Product interfaces and unit diagrams: original HTML/CSS/SVG with fictional data.
- Lucide icons use the package's ISC license. Manrope and Inter use their open font licenses and currently load from Google Fonts; self-host if required by deployment/privacy decisions.

The supplied visual concept guides composition and materials; it is not embedded as a replacement for the scene.

## Launch inputs

Confirm product scope, prices, legal identity, verified contact and application destination; finalize legal drafts; implement and verify real enquiry delivery; complete the checks in `VALIDATION.md`; and verify representative devices/browsers. Measure laboratory performance separately from field Web Vitals. LCP/INP/CLS targets are goals, not results established by a local build.
