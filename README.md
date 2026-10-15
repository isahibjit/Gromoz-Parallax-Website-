# Gromoze website

Private concept built with Next.js App Router, strict TypeScript, shared React components and isolated GSAP ScrollTrigger animation.

## Run

`npm install`, then `npm run dev`. `npm run build` statically exports all routes to `out/`. `npm run typecheck` and `npm run lint` validate source.

## Content and approval

Edit proposed modules and their `draft`, `approved`, or `hidden` status in `lib/content.ts`. This deployment is entirely private concept content. Do not publicly launch until claims are approved; hidden modules are removed from the index and menu, but their pre-rendered route must also be removed before public launch. All routes are noindex, and robots disallows crawling. No production canonical or sitemap is emitted because a verified public domain has not been supplied.

Forms validate locally; no details are sent, saved, or booked. `.env.example` documents future server-only configuration, not an implemented delivery adapter. A production form requires a server endpoint, validation, rate limiting, accessible errors and verified privacy wording before enabling delivery. No authentication, CRM backend, billing, analytics, or non-essential cookies are included.

The walkthrough uses Aarav Shah, record GR-1042, Priya Mehta, Cedar Heights and unit A-1204 consistently. Sample dates are illustrative fixed dates, not a live schedule. Search, visit filtering, lead detail, module selection, audience controls, FAQs, navigation and local motion preference work in the browser. Desktop pinning uses native scrolling and GSAP; small screens and reduced motion show stacked chapters.

## Assets

`public/gromoze-logo.png`: original supplied by the user, unchanged; displayed through a whitespace crop. All product interfaces and architectural geometry are original HTML/CSS/SVG. Lucide icons use the installed package's ISC license. Manrope and Inter are served via Google Fonts under their open font licenses; self-host before launch if business privacy requirements call for it.

## Launch inputs and checks

- Approve actual product modules and all marketing claims.
- Supply legal entity, business contact, verified app URL if relevant, pricing and production domain.
- Finalize policy drafts and all bracketed fields against actual operations.
- Implement real form delivery and verify receipt and failure handling.
- Revisit hosting cookies and logs, fonts, consent, analytics and data handling.
- Update indexing, canonical URLs, sitemap and metadata only after public content approval.
- Verify keyboard/screen-reader interactions, mobile browsers and actual devices. Measure field Web Vitals after launch; no performance guarantees are claimed.
