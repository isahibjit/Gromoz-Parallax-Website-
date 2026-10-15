# V2 validation — 15 October 2026

This record covers the architectural V2 revision. Previous V1 browser checks do not validate the replacement scene or changed page compositions. Add only checks actually completed against the final integrated source.

## Implementation checks completed

- `npm.cmd run typecheck`: passed after the homepage sections were added; repeat after final integration.
- Scoped ESLint for `components/homepage-sections.tsx`: passed.
- Mechanical detector for the homepage sections and CSS Module: only the Inter font-popularity warning. The existing font is required by the brief.
- Homepage copy review: interactions are explicitly local, prices are not fabricated, partner scope is conditional, and integrations/imports/onboarding are not asserted as available.

These checks do not establish browser behavior. Add final production build, full-project lint and typecheck results after integration.

## Browser evidence to record

No V2 browser result is claimed in this initial record. Add actual evidence paths and outcomes:

- 1440×900 captures at progress `0.00`, `0.17`, `0.34`, `0.52`, `0.70`, `0.86`, `0.97`.
- 1366×768, 1920×1080, 768×1024, 390×844 and reduced motion.
- First-frame composition, floor reveal, persistent identity, connector endpoints, readable intermediate states and release into normal content.
- Forward/reverse and fast scrolling, stopping between holds, chapter controls, Skip focus, anchor entry, back/forward, restored-position reload and resize.
- WebGL unavailability/context loss and rendering restart after offscreen/hidden-document states.
- Explorer keyboard/sample interactions, reversible action queue, navigation and 404 recovery.
- Form validation, retained values, completion focus and explicit preview wording.
- Required inner/legal routes, mobile navigation and legal contents links.

Record any actual scroll recording location. Screenshots alone do not verify motion continuity; report unavailable recording or device checks precisely.

## Performance and delivery boundaries

Instancing, demand rendering and a 1.5 DPR cap are implementation choices. Fewer than approximately 120 draw calls and 80,000 triangles are targets until measured. Record renderer/laboratory measurements with test conditions; do not label them field results.

Physical iOS/Android devices, Safari, screen readers, field LCP/INP/CLS, real delivery, actual product behavior and legal approval remain separate checks unless explicitly recorded. There is no real enquiry endpoint, CRM backend, database migration or analytics integration. A local `out/` build does not prove the deployed host serves this revision.
