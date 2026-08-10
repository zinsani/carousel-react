---
'@zinsani/carousel-react': minor
---

Export a `useCarousel()` hook for reading carousel state and driving it imperatively from anywhere inside `Carousel.Root`. It returns `activePage`, `pageCount`, `isDesktop`, `canScrollPrev`/`canScrollNext`, `scrollPrev()`/`scrollNext()`, `scrollToPage(index)` and `scrollToItem(index)` — the last of which maps an item to its page for you.

This replaces the `centerItemOnClick` prop, which bound a click handler to every card. That put the library in the way of anything interactive in the card content, and left `preventDefault()` as the only escape hatch — awkward, since links and buttons don't call it. Wiring the same behaviour through `useCarousel()` puts the consumer in control of when a tap should scroll, and of what to ignore.

`Carousel.Item` now accepts any native `<div>` prop, so `onClick` and friends pass straight through.
