# V2 validation - 15 October 2026

Results below cover the integrated architectural V2 revision. Browser checks used local Chrome; they do not establish production hosting or real-product behavior.

## Source and build

- Full `npm.cmd run lint`, strict TypeScript check and final production build passed. The static build generated 20 pages.
- Homepage source review found explicit sample/local behavior, conditional partner scope and no invented pricing or integration claims.
- The homepage design detector reported only the Inter font-popularity warning; that existing font is required by the brief.
- Runtime dependency audit: zero findings. Five high-severity development-only findings remain in the `eslint-config-next` -> `micromatch` -> `braces@3.0.3` chain (GHSA-vfj7-8cjw-p6xm), with no compatible fix available in the checked dependency set.

## Browser behavior

- Inspected the real story at progress `0.00`, `0.17`, `0.34`, `0.52`, `0.70`, `0.86` and `0.97`: camera movement, floor reveal, persistent sample identity, linked visit/pipeline views and release into normal content.
- Checked 1440x900, 1366x768, 1920x1080, 768x1024 and 390x844 compositions. The property page was additionally recaptured at 375x812.
- Fast forward/reverse scrolling, chapter links, browser back/forward, Skip and its focus destination, and reload at a restored mid-story scroll position passed.
- Reduced motion and WebGL context loss produced four normal-flow chapters. Returning from mobile/tablet size to desktop resumed scene rendering.
- Explorer keyboard navigation, unit selection, visit expansion and linked activity worked. The action queue reached three of three local tasks complete.
- Forms accepted an optional blank phone, rejected whitespace-only required text, retained values when returning, and clearly reported preview completion without sending a request.
- Required routes returned HTTP 200; an unknown route returned 404.
- The production static export was opened in Chrome: the WebGL canvas initialized and development frame controls were absent (`production-home.jpg`).

## Captured evidence

Actual screenshots are in `artifacts/v2/`:

| Coverage | Files |
| --- | --- |
| Story holds at 1440x900 | `frame-000.jpg`, `frame-017.jpg`, `frame-034.jpg`, `frame-052.jpg`, `frame-070.jpg`, `frame-086.jpg`, `frame-097.jpg` |
| Intermediate and smaller desktop | `mid-scroll.jpg`, `laptop-1366.jpg`, `laptop-workspace.jpg` |
| Wide, tablet and phone | `wide-1920.jpg`, `tablet-768.jpg`, `mobile-390.jpg`, `mobile-visit.jpg` |
| Motion/WebGL alternatives | `reduced-motion.jpg`, `webgl-fallback.jpg` |
| Property, visits and pipeline | `property-desktop.jpg`, `property-mobile.jpg`, `visits-desktop.jpg`, `visits-mobile.jpg`, `pipeline-desktop.jpg`, `pipeline-mobile.jpg` |
| Partner, privacy and demo pages | `partners-desktop.jpg`, `partners-mobile.jpg`, `privacy-desktop.jpg`, `privacy-mobile.jpg`, `demo-form.jpg`, `demo-mobile.jpg` |

No scroll recording was captured. Transition checks were performed interactively; screenshots document individual states.

## Measured limits and remaining configuration

The actual development renderer reported **34 draw calls, 6,568 triangles, 3 programs and 0 textures at DPR 1**. These are local renderer statistics, not field Web Vitals. Field LCP/INP/CLS, Safari, physical iOS/Android devices and screen-reader behavior were not verified.

No CRM backend, database or migration was added. Real enquiry delivery, approved product capabilities, business/contact details, pricing and finalized legal wording remain required. Local preview form behavior does not prove delivery or booking.

No hosted publication is claimed. The Sites connector returned `Sites project not found` for the project recorded in the existing manifest. The owner then clarified that Gromoze has no existing website and supplied a separate property-business site as a workflow reference. Work remains in the local Gromoze checkout; the old hosting manifest was preserved without creating or changing an external Site. Confirm the intended hosting destination before publication.
