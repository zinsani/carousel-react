# @zinsani/carousel-react

## 0.3.0

### Minor Changes

- 2b03eb3: Export a `useCarousel()` hook for reading carousel state and driving it imperatively from anywhere inside `Carousel.Root`. It returns `activePage`, `pageCount`, `isDesktop`, `canScrollPrev`/`canScrollNext`, `scrollPrev()`/`scrollNext()`, `scrollToPage(index)` and `scrollToItem(index)` — the last of which maps an item to its page for you.

  This replaces the `centerItemOnClick` prop, which bound a click handler to every card. That put the library in the way of anything interactive in the card content, and left `preventDefault()` as the only escape hatch — awkward, since links and buttons don't call it. Wiring the same behaviour through `useCarousel()` puts the consumer in control of when a tap should scroll, and of what to ignore.

  `Carousel.Item` now accepts any native `<div>` prop, so `onClick` and friends pass straight through.

- b917bbe: Add `mobileCardsToShow` (default `1`), so the number of cards per page below `breakpoint` is configurable rather than fixed at one. Pages group that many cards, which the indicators and swipe distance follow automatically.

  The default keeps today's behaviour: a single centred card with a sliver of both neighbours showing. Any higher value aligns pages to the start edge instead — a page of several cards has no single card to centre — so only the next card peeks, on the trailing side.

- 4509d94: Rework mobile alignment. Previously the first card was centred, with equal slivers of its neighbours showing on both sides. Now cards come to rest against the container's edges — the first against the left, the last against the right — with only the cards in between centred, so it reads as a list you scroll through rather than a centred spotlight.

  New `Carousel.Root` prop, mobile-only:

  - `mobileInset` (px, default `16`) — the gutter kept at the container's edges, so the first and last cards rest inset rather than jammed against the edge. Cards still scroll through that area; it offsets where they settle, it doesn't clip them. It's paired with a matching `scroll-padding-inline`, so a start-aligned page can't snap its first card past the gutter.

  `mobilePeek` now means only "how much of the neighbouring card shows", separate from the edge gutter; the item group no longer derives its padding from it.

## 0.2.0

### Minor Changes

- Add headless page indicators: `Carousel.IndicatorGroup` and `Carousel.Indicator`.

  `IndicatorGroup` renders one dot per page automatically (style them via `indicatorClassName`), or accepts a render function receiving `{ pages, pageCount, activePage }` for full control. Page count adapts to the layout — `ceil(items / cardsToShow)` on desktop, one per card on mobile — and the active indicator is marked with `data-active` and `aria-current` so it can be styled without any CSS shipped by the library. Clicking an indicator scrolls to that page, and the active state tracks arrow clicks, indicator clicks and swipes alike.
