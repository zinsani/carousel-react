---
'@zinsani/carousel-react': minor
---

Change mobile alignment so the first card sits flush against the container's left edge and the last flush against its right edge, instead of the first card being centred. Cards in between stay centred with a neighbour peeking on each side.

The item group no longer sets its own inline padding; each card instead reserves `mobilePeek` on both sides, and the browser's clamping of the scroll range does the rest. Card sizing is unchanged.

Also adds `centerItemOnClick` on `Carousel.Root` (default `false`, mobile only): when enabled, tapping a partially visible card scrolls it into the centre. Tapping the already-active card does nothing, and the behaviour is inert above `breakpoint`.
