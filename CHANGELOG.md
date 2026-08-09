# @zinsani/carousel-react

## 0.2.0

### Minor Changes

- Add headless page indicators: `Carousel.IndicatorGroup` and `Carousel.Indicator`.

  `IndicatorGroup` renders one dot per page automatically (style them via `indicatorClassName`), or accepts a render function receiving `{ pages, pageCount, activePage }` for full control. Page count adapts to the layout — `ceil(items / cardsToShow)` on desktop, one per card on mobile — and the active indicator is marked with `data-active` and `aria-current` so it can be styled without any CSS shipped by the library. Clicking an indicator scrolls to that page, and the active state tracks arrow clicks, indicator clicks and swipes alike.
