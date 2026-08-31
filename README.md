# VMEN Power Technology — Website

A multi-page, mobile-first website for VMEN Power Technology Energy Company
Limited, built from the verified company information provided (no invented
certifications, clients, projects, awards, statistics, or technical specs).

## What's included

- `index.html` — Home
- `about.html` — About VMEN Power Technology
- `generators.html` — Diesel Generator Solutions (10kVA–1250kVA)
- `solar-solutions.html` — Solar Solutions
- `batteries.html` — Lithium battery / energy storage solutions
- `inverters.html` — Inverter solutions
- `spare-parts-services.html` — Generator spare parts, maintenance, support
- `contact.html` — Contact info, quote form, map
- `css/style.css` — Full design system (mobile-first, light theme)
- `js/main.js` — Preloader, nav (mega menu + mobile accordion), hero
  slideshow, scroll reveal, quote-form → WhatsApp handoff
- `assets/vmen-logo.png` — the official VMEN logo with the black background
  removed (transparent PNG, drops cleanly onto any background colour)

## How to view it

Open `index.html` in any browser — no build step needed. If anything looks
off opened directly as a file, serve the folder locally instead:
`python3 -m http.server` then visit `http://localhost:8000`.

## Design notes

- **Light theme, as requested** — navy blue (from the logo's "V") and an
  energy-amber accent color, with dark navy used only for the footer, the
  hero photo overlay, and CTA bands — the standard way premium industrial
  sites punctuate a light layout, not an all-dark design.
- **Typography:** Oswald (bold, condensed — industrial/engineering feel)
  for headings, Inter for body text.
- **Signature element:** the "energy line" — an animated dashed
  voltage-pulse line used as a section divider, echoing the brand's power
  identity, plus a matching pulse animation in the preloader.
- **Preloader:** plays once per browser session on the home page only, and
  is skipped automatically for visitors with reduced-motion preferences.
- **Hero slideshow:** rotates through 4 real power/energy photos
  (generators, solar, battery installation) behind the headline.
- **Photography:** all photos are stock images (Pexels) standing in for
  real VMEN photography — generators, solar panels, battery installs,
  inverters. Every image is a simple `src` swap once real VMEN photos are
  available.

## Content accuracy

Every claim on this site is either directly from the brief (company name,
location, phone/WhatsApp, product range, generator range 10kVA–1250kVA) or
phrased in general, non-specific terms per the brief's instruction not to
invent certifications, clients, projects, awards, statistics, guarantees,
prices, or technical specifications. Wherever a page would normally need a
specific number (fees, capacities, warranty terms, response times), it
instead includes an honest note directing the visitor to contact VMEN
directly — this is intentional, not a placeholder that was missed.

## Things to plug in before going live

- Real VMEN photography (hero, product pages, about)
- Verified pricing, generator model numbers, and technical specifications,
  once available
- Verified certifications, accreditations, or client/project references,
  if VMEN wants to add these later
- A working backend for the contact form if you want submissions to land
  somewhere other than WhatsApp (it currently opens a pre-filled WhatsApp
  message to +260 777 777 894 — no backend required, but no submission
  tracking either)
- Social media links, only once confirmed as real VMEN accounts
- A custom domain and hosting

---
Built for VMEN Power Technology Energy Company Limited.
