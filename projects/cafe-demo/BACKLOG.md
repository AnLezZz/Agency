# Backlog — cafe-demo

One-page site for a small Auckland café. Smallest useful version: static single page, no booking, no ordering, no CMS.

### S1 — Hero
As a visitor I want to see the café's name and what it is straight away so that I know I'm in the right place.

Acceptance criteria:
- [ ] The page has exactly one `<h1>` containing the café name, visible without scrolling on desktop and mobile.
- [ ] A one-line tagline mentioning Auckland is visible directly under the `<h1>`.
- [ ] The hero contains a visible call-to-action link that scrolls to the menu section (`#menu`).
- [ ] The page `<title>` contains the café name.

### S2 — Menu
As a visitor I want to see what the café serves and what it costs so that I can decide whether to visit.

Acceptance criteria:
- [ ] A section with id `menu` and a heading "Menu" is present.
- [ ] Exactly 6 menu items are listed.
- [ ] Each item shows a name, a short description, and a price in NZD (e.g. "$5.50").
- [ ] On a 375px-wide viewport the items stack in a single column with no horizontal scrolling.

### S3 — Opening hours
As a visitor I want to see when the café is open so that I don't turn up when it's closed.

Acceptance criteria:
- [ ] A section with id `hours` and a heading "Opening hours" is present.
- [ ] All 7 days (Monday to Sunday) are listed, each with open and close times or "Closed".
- [ ] The hours are marked up as a list or table, not an image.
- [ ] The section is readable on a 375px-wide viewport without horizontal scrolling.

### S4 — Location
As a visitor I want a link to the café's location so that I can get directions.

Acceptance criteria:
- [ ] A section with id `location` and a heading "Find us" is present.
- [ ] The street address (Auckland) is shown as text.
- [ ] A link labelled "View on map" points to a Google Maps URL and opens in a new tab (`target="_blank"` with `rel="noopener"`).
- [ ] The link is reachable and tappable on a 375px-wide viewport.

### S5 — Contact button
As a visitor I want an easy way to contact the café so that I can ask a question or make an enquiry.

Acceptance criteria:
- [ ] A section with id `contact` contains a visible button labelled "Contact us".
- [ ] The button is a `mailto:` link (or `tel:` link) with a valid address or number.
- [ ] The button is at least 44px tall and fully visible on a 375px-wide viewport.
- [ ] A navigation or header link to `#contact` is present and scrolls to the section.
