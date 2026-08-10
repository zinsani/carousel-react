---
'@zinsani/carousel-react': minor
---

Add `mobileCardsToShow` (default `1`), so the number of cards per page below `breakpoint` is configurable rather than fixed at one. Pages group that many cards, which the indicators and swipe distance follow automatically.

The default keeps today's behaviour: a single centred card with a sliver of both neighbours showing. Any higher value aligns pages to the start edge instead — a page of several cards has no single card to centre — so only the next card peeks, on the trailing side.
