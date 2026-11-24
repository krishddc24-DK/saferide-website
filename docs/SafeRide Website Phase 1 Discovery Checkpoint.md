# SafeRide Website: Phase 1 Discovery Checkpoint

Nov 23, 2026 · @Niraj

Phase 1 (Discovery) is done. Arjun (Prompt Engineer), Kavya (Visual Stylist) and Maya (Product Manager) have finished. Before Phase 2 (Design), four decisions are needed (see the last section).

**Note:** a few points below are labelled \[Inference\] or \[Unverified\]. Everything else comes from the SafeRide documents (README, PRD, ARCHITECTURE) or from the linked sources.

## Brand brief (Arjun)

- **Name:** SafeRide, operated by Saferide Co, at www.saferide.co.nz.
- **Industry and audience:** Rideshare in Wellington. Mainly riders who want a clear price and safety features, and also P-endorsed drivers.
- **Tone:** Trustworthy, friendly, local.
- **Main selling point (draft):** "You see the road-route price before you book, your card is only charged when the trip starts, and drivers keep more of every fare." This needs review; see decision 3.

## Visual decisions (Kavya)

- **Colours:** Navy #0F2C4C as the main colour, with yellow #FFC72C on the action buttons, both taken from the poster.
- **Green:** The poster green #3FA535 is too light to read as text on white (3.16:1, below the 4.5:1 accessibility minimum). It is used only for decoration. Text and buttons use a darker green #1E7A2E (5.41:1).
- **Style:** Light, bold and colourful, using the Inter font at heavy weights to echo the poster.
- **Logo:** A simplified SVG redraw of the car and road swoosh. No original logo file was supplied.

## Pages in scope (22)

| Group | Pages |
| --- | --- |
| Main | `index.html`, `how-it-works.html`, `pricing.html`, `safety.html`, `drive-with-saferide.html`, `faq.html`, `support.html`, `contact.html` |
| Legal | `privacy-policy.html`, `passenger-agreement.html`, `driver-terms.html` |
| City | `wellington-rideshare.html`, `auckland-rideshare.html`, `christchurch-rideshare.html`, `hamilton-rideshare.html` |
| SEO | `airport-transfers.html`, `pre-booked-rides.html`, `become-a-rideshare-driver-nz.html`, `rideshare-app-nz.html` |
| Comparison | `saferide-vs-uber.html`, `saferide-vs-didi.html`, `saferide-vs-tripzy.html` |

## Requirements (Maya)

- **Scope:** 22 pages and 4 forms: waitlist, driver interest, support and contact.
- **User stories:** about 45, each with checks that can be tested.
- **Primary action:** Join the waitlist on 18 pages and Apply to drive on 3. Support and Contact each have their own form.

## What the competitor research found

1. **Tripzy \[Unverified\]:** No New Zealand rideshare app by that name could be found. Search results were Indian travel agencies and an AI trip planner. For now its page makes no claims about Tripzy and is hidden from Google (noindex).
2. **Uber:** Uber's own NZ blog uses a 28% driver Service Fee for illustration ([Uber NZ blog](https://www.uber.com/nz/en/blog/understanding-earnings-post-1-april-2024/)). Uber uses dynamic pricing that adjusts rates for distance, traffic and rider-to-driver demand ([NZ Herald](https://nzherald.co.nz/nz/uber-shock-passenger-quoted-168-cab-fare-from-auckland-airport-to-ponsonby/ZSBDPMDQYTQS2IWAQCXECDZU2Y)).
3. **DiDi is a direct competitor in Wellington.** DiDi operates in Auckland and Wellington ([Newstalk ZB, March 2026](https://www.newstalkzb.co.nz/news/national/didi-announces-surcharge-in-new-zealand-uber-monitoring-situation-as-drivers-hit-by-rising-fuel-prices)). Its NZ fee schedule sets a flat 10% Services Fee for in-city trips ([DiDi NZ fee schedule](https://web.didiglobal.com/nz/legal/fee-schedule-nz/)). That matches SafeRide's 10% now and is lower than SafeRide's 15% from 1 April 2027.
4. **Bolt (not named in the brief):** Consumer NZ reports three active ride-share companies in Aotearoa: Uber, DiDi and Bolt, with Bolt launched only in Auckland ([Consumer NZ, Dec 2025](https://consumer.org.nz/travel-and-transport/travel/review-how-good-is-the-new-ride-hailing-service-bolt)).

## Decisions needed before Phase 2

1. **Tripzy:** Send a link to Tripzy's website or app store listing, or decide whether to drop the page or keep it as a hidden placeholder.
2. **Surge pricing:** \[Inference\] The fare formula in the documents has no surge multiplier. Can the product owner confirm SafeRide has no surge or demand pricing? This would be the strongest point against Uber, but it will not be claimed without confirmation.
3. **Driver message:** "Drivers keep more" is true compared with Uber but not compared with DiDi. Suggested replacement: "a low, published fee and jobs offered one at a time".
4. **Bolt:** Add a SafeRide vs Bolt page as well?

## Next step

Confirm to proceed to Phase 2 (Design), or describe what to change. Common changes at this point: brand name spelling, page list, primary colour, tone.
