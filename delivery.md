# ✅ Delivery Complete — SafeRide Website

## What Was Built

- **Brand:** SafeRide, operated by Saferide Co, at www.saferide.co.nz
- **Industry:** Ride-hailing / rideshare transport, New Zealand. Pre-launch, Wellington first.
- **Purpose:** To explain the app beyond the store listing, collect waitlist sign-ups from riders and drivers, and rank for real search intent (Wellington rideshare, airport transfers, pre-booked rides, becoming a driver, app comparisons).
- **Main user goal:** Join the waitlist (riders) or apply to drive (drivers). Every page has one primary action.
- **Pages generated:** 22, plus a 404 page and two QR redirect pages (`go/app-store/`, `go/google-play/`)
- **Versions:** Static HTML/CSS/JS only. No build step, no backend, no React.
- **Checks completed:** QA (Deepak), accessibility (Aisha) and security (Kiran). All passed after one round of fixes.

## Design Summary

- Primary colour applied: `#0F2C4C` (navy, from the poster)
- Text and button green: `#1E7A2E`. The poster green `#3FA535` is decorative only, because it fails contrast as text.
- Accent: `#FFC72C` (yellow, from the poster's "Coming Soon")
- Background colour applied: `#F6F9FC`
- Font style used: modern
- Heading font used: Inter (800 to 900 weight, to echo the poster)
- Body font used: Inter
- Theme: light
- Style mood: vibrant (gradient heroes, diagonal green strip, animated phone demo)
- Logo: simplified SVG redraw from the poster. No original vector file was supplied; replace `assets/logo.svg` and the inline logo when one exists.
- Number of pages generated: 22
- Total agents that contributed: 12

## File Manifest

| File | Description |
|---|---|
| `index.html` | Home: main benefit, animated phone demo, store badges, QR codes, placeholder reviews, waitlist, FAQ teaser |
| `how-it-works.html` | Six-step rider journey, ride types, extras |
| `pricing.html` | Fare formula, worked example, "When you pay" table, driver fee |
| `safety.html` | PIN, SOS, driver checks, NZTA work-time limits |
| `drive-with-saferide.html` | Driver recruitment and Apply to drive form |
| `faq.html` | 21 questions in 5 groups, with FAQPage structured data |
| `support.html` | Quick help and support request form |
| `contact.html` | Contact details (placeholders) and contact form |
| `privacy-policy.html` | Draft privacy policy, marked for legal review |
| `passenger-agreement.html` | Placeholder page for the Passenger Agreement |
| `driver-terms.html` | Placeholder page for the Driver Terms and Contract |
| `wellington-rideshare.html` | Launch-city SEO page, waitlist pre-set to Wellington |
| `auckland-rideshare.html` | "Coming soon" city page, waitlist pre-set to Auckland |
| `christchurch-rideshare.html` | "Coming soon" city page, waitlist pre-set to Christchurch |
| `hamilton-rideshare.html` | "Coming soon" city page, waitlist pre-set to Hamilton |
| `airport-transfers.html` | Airport fee, pre-booking, vehicles for luggage |
| `pre-booked-rides.html` | Scheduling rules and when you're charged |
| `become-a-rideshare-driver-nz.html` | Driver guide with sourced fee comparison |
| `rideshare-app-nz.html` | Six questions to ask any app |
| `404.html` | Not-found page (uses absolute paths; served by your host) |
| `go/app-store/index.html`, `go/google-play/index.html` | QR code landing pages that forward to the waitlist until launch |
| `style.css` | Kavya's design system (34 KB) |
| `shared.js` | Navigation, demo pause, form validation, cookie consent, deferred GA4 (12 KB) |
| `assets/logo.svg`, `assets/favicon.svg` | Logo and browser-tab icon |
| `assets/og-image.png` | 1200x630 social share image |
| `assets/qr/qr-app-store.svg` / `.png` | App Store QR code, SVG for the web and PNG for print |
| `assets/qr/qr-google-play.svg` / `.png` | Google Play QR code, SVG for the web and PNG for print |
| `sitemap.xml`, `robots.txt`, `site.webmanifest` | SEO and browser support files |
| `.htaccess` | Apache: HTTPS and www redirect, /go/ redirects, security headers, caching |
| `netlify.toml` | Netlify: security headers and /go/ redirects |
| `_headers` | Netlify alternative: security headers only |
| `README.md` | Deployment guide |
| `delivery.md` | This document |

## Quality Assurance Summary

**Deepak (QA): ✅ Pass**
- Automated checks on all 25 HTML files: 0 unclosed or mismatched tags, 0 duplicate IDs, 0 broken internal links (anchors included), one H1 per page, no skipped heading levels, every input labelled.
- Headless Chrome at 320, 375, 768, 1024 and 1200 px: no horizontal overflow and no script errors on any page.
- All four forms tested: empty, invalid and valid input; NZ mobile in both `021` and `+64` formats; macron names; honeypot; city pre-selection; UTM capture.

**Aisha (Accessibility): ✅ Pass**
- Contrast measured from rendered colours on all 22 pages at two widths: 0 failures after fixes.
- Verified in the browser: skip link, focus order, visible 3px focus ring, mobile menu focus and Escape handling, and reduced-motion support.
- Estimated Lighthouse accessibility score: 95 to 100 per page. This is an estimate; Lighthouse wasn't available here.

**Kiran (Security): ✅ Pass, posture 🟢 Good**
- No XSS vectors, no secrets, no unsafe JavaScript.
- Strict CSP with no `unsafe-inline`, tested with the site served under it: 0 violations.
- Analytics loads only after consent.

**Fixed during QA (round 1):** two contrast failures on dark backgrounds, mobile menu not receiving focus, a faint placeholder avatar, and a yellow focus ring that was hard to see on light backgrounds.

**Known limitations:**
- No real screen reader, axe-core or Lighthouse run was possible in the build environment. Run these yourself before launch.
- The "Ka pai" in the waitlist success message isn't tagged as te reo Māori, because the message is inserted as plain text.
- Forms validate in the browser only until you connect a handler.

## How To Use The Website

### HTML/CSS/JS Version

1. Open the `saferide` folder.
2. Double-click `index.html` to preview it in a browser. No server is needed. (`404.html` and the `/go/` redirects only behave correctly once hosted.)
3. Click through the navigation, footer links and breadcrumbs to confirm the pages connect.
4. Upload the whole folder to your hosting platform, keeping the folder structure. `style.css`, `shared.js`, `assets/` and `go/` must stay next to the HTML files.
5. Keep the security config that matches your host: `.htaccess` (Apache), or `netlify.toml` or `_headers` (Netlify, not both). On any other platform, enter the same headers and the two `/go/` redirects in its settings.
6. After deployment, check that the headers are live with a header-scanning tool, and confirm `http://saferide.co.nz` redirects to `https://www.saferide.co.nz`.

**Values to replace before go-live**

| Where | Placeholder | Replace with |
|---|---|---|
| `shared.js` | `FORM_ENDPOINT: ''` | Your form handler URL. Also add its domain to `form-action` in the CSP |
| `shared.js` | `G-XXXXXXXXXX` | Your GA4 measurement ID. Analytics stays off until you do |
| `index.html` | `REPLACE_WITH_SEARCH_CONSOLE_TOKEN` | Your Search Console verification token. Then submit `sitemap.xml` |
| `contact.html` | Email, phone and address (labelled Placeholder) | Real contact details |
| `privacy-policy.html` | Last-updated date, form provider, privacy contact | Real values, after legal review |
| `passenger-agreement.html`, `driver-terms.html` | Placeholder notice | Full agreement text |
| `index.html` | Placeholder testimonials, stats and press | Real reviews (with permission) and real numbers only |
| Store badges (all pages) | Generic icons with "Soon" pills | Official Apple and Google badge artwork at launch |

**At app launch:** change the two `/go/` redirect targets (in `.htaccess` or `netlify.toml`, and in `go/*/index.html`) to the store listing URLs. Every QR code already printed will then open the right store. Also remove the "Soon" pills and the "Coming soon" top bar.

**Decisions needing sign-off, outside this website**
1. **Driver fee:** the site publishes a flat 10% fee. This needs product owner approval. The app code (`src/utils/driverEarnings.js`) still switches to 15% on 1 April 2027 and must be changed, or the app and website will disagree.
2. **No surge pricing:** stated as current policy. If that changes, update Pricing, the FAQ, the Home hero points, the city pages and the comparison pages.
3. **Pre-booked rides:** the site says rides are sent to drivers 20 minutes before pickup. Your ARCHITECTURE.md notes that `release-scheduled-bookings` exists but no migration schedules it. Confirm it runs, or pre-booked rides won't be dispatched.
4. **Te reo Māori review:** please have a fluent speaker check Haere mai, Kia ora, Ka pai, Aotearoa, Te Whanganui-a-Tara, Tāmaki Makaurau, Ōtautahi and Kirikiriroa, and their placement.
5. ~~**Comparison pages:**~~ **Resolved 2026-11-24** — the three named-competitor comparison pages, the fee-comparison table on `become-a-rideshare-driver-nz.html`, and every link to them, have been removed site-wide. SafeRide's policy is not to name competitors by name anywhere in the app or on this site.
6. **Poster:** the poster artwork shows Auckland's Sky Tower in a Wellington scene, so it wasn't used on the site. Check it before printing.

## Agent Team — All 12 Contributors

| Agent | Role | Contribution |
|---|---|---|
| Arjun | Prompt Engineer | Brand brief from the poster, the three app documents and your answers |
| Kavya | Visual Stylist | Design tokens and `style.css`, with accessible greens and focus states |
| Maya | Product Manager | Requirements for 22 pages, with one primary action each |
| Priya | Senior Planner | Final delivery sign-off and handover documentation |
| Riya | UX Designer | Wireframes, tab order and landmarks for every page |
| Rahul | Solution Architect | Static architecture and the QR redirect strategy |
| Sita | Data Architect | Four form schemas, validation, NZ Privacy Act 2020 copy |
| Nisha | Content Writer | NZ English copy, sourced comparisons and SEO metadata |
| Vikram | Frontend Developer | HTML, `shared.js`, QR codes, sitemap and share image |
| Deepak | QA Tester | WCAG 2.0 AA, link, form and responsive QA |
| Aisha | Accessibility Tester | Contrast, keyboard, screen-reader and Lighthouse-style review |
| Kiran | Security Tester | CSP, headers, form and privacy review, and hosting configs |

## Next Steps

1. **Connect the form handler and email tool:** route waitlist sign-ups into the email tool you'll use for launch, segmented by city and rider or driver. That segmentation is what makes the city pages pay off.
2. **Replace placeholders with real proof:** collect 3 to 5 beta testimonials with permission and real waitlist and driver numbers, then swap them into the Home page.
3. **Record a real demo:** a 15 to 30 second screen recording from the app can replace or sit beside the CSS phone mockup.
4. **Measure the funnels:** once GA4 is on, track Join the waitlist and Apply to drive submissions per page and per QR code (`utm_source=qr`), and watch which SEO pages bring sign-ups.
5. **Self-host the Inter font and run Lighthouse:** this removes the last third-party request before consent. Then run real Lighthouse, axe and VoiceOver checks on Home, Pricing and Drive.

> Delivery document complete. Website package ready for handover.
