---
'@zinsani/carousel-react': minor
---

Rework mobile alignment. Previously the first card was centred, with equal slivers of its neighbours showing on both sides. Now cards come to rest against the container's edges — the first against the left, the last against the right — with only the cards in between centred, so it reads as a list you scroll through rather than a centred spotlight.

New `Carousel.Root` prop, mobile-only:

- `mobileInset` (px, default `16`) — the gutter kept at the container's edges, so the first and last cards rest inset rather than jammed against the edge. Cards still scroll through that area; it offsets where they settle, it doesn't clip them. It's paired with a matching `scroll-padding-inline`, so a start-aligned page can't snap its first card past the gutter.

`mobilePeek` now means only "how much of the neighbouring card shows", separate from the edge gutter; the item group no longer derives its padding from it.
