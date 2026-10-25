# Test report — cafe-demo (T-003)

Build: `npm run build` OK (static export in `out/`, served with python http.server). Checks: `tests/site.check.js` (Playwright, desktop 1280px and 375px).

Result: **PASS** (21/21)

| Story | Criterion | Desktop | 375px |
|---|---|---|---|
| S1 | one h1 with name, visible above fold | PASS | PASS |
| S1 | tagline mentioning Auckland under h1 | PASS | PASS |
| S1 | CTA link scrolls to #menu | PASS | PASS |
| S1 | title contains café name | PASS | PASS |
| S2 | #menu, "Menu" heading, 6 items with name/desc/NZD price | PASS | PASS |
| S2 | single column at 375px | n/a | PASS |
| S3 | #hours, "Opening hours", 7 days in list/table, no image | PASS | PASS |
| S4 | #location, "Find us", Auckland address, "View on map" Google Maps, target=_blank rel=noopener, tappable | PASS | PASS |
| S5 | #contact "Contact us" mailto/tel link, >=44px, fully visible | PASS | PASS |
| S5 | header link to #contact scrolls | PASS | PASS |
| - | no horizontal scroll | PASS | PASS |

No failures.
