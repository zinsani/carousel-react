# carousel-react

A headless, accessible React carousel. No drag/gesture library, no CSS to import, no styling opinion — sliding is powered entirely by native CSS scroll-snap, and the responsive mobile/desktop switch is a small `matchMedia` hook. Style it however you like with `className`/`style`.

## Install

```bash
npm install @zinsani/carousel-react
```

`react` and `react-dom` (`^18 || ^19`) are peer dependencies — nothing else. There's no companion stylesheet to import.

## Usage

The carousel is a compound component — `Carousel.Root` provides shared state via context, and the rest are composable, unstyled parts. Every part accepts `className`/`style`, so bring your own CSS:

```tsx
import { Carousel } from '@zinsani/carousel-react'

function Example() {
  return (
    <Carousel.Root cardsToShow={4} gap={16}>
      <Carousel.ItemGroup aria-label="Featured cards">
        {items.map((item) => (
          <Carousel.Item key={item.id}>{/* your card content */}</Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.IndicatorGroup />
    </Carousel.Root>
  )
}
```

## Behavior

- **Desktop** (≥ `breakpoint`, default 576px): shows `cardsToShow` cards edge-to-edge, auto-sized to fill the container. Arrow buttons slide by exactly one container-width (i.e. `cardsToShow` cards) per click, and native scroll clamping means the last click on an uneven card count slides only as far as needed to land the final card flush against the edge — no special-casing required.
- **Mobile** (below `breakpoint`): shows 1 card at a time with `mobilePeek` of room on each side, so neighbouring cards peek through. The first card comes to rest against the container's left edge and the last against its right edge, with `mobileInset` kept as a gutter so they aren't jammed against it; every card in between is centred. Cards still scroll through that gutter — it offsets where they settle, it doesn't clip them. Swipe left/right to slide — native touch scrolling, no gesture library. Arrow buttons render nothing at all (not just visually hidden) below the breakpoint. Set `centerItemOnClick` to also scroll a tapped, non-active card into the centre.

## Styling

The library ships zero visual or positioning opinion — no colors, no shadows, no button layout. What it *does* apply inline, because the carousel can't function without it: the scroll container setup (`overflow-x`, `scroll-snap-type`), computed item widths, and the CSS custom properties (`--carousel-gap`, `--carousel-cards-to-show`, `--carousel-mobile-peek`) those widths depend on. Everything else is yours:

- Every part takes `className` and `style`, applied on top of (never overriding) the library's own functional inline styles.
- `Carousel.PrevTrigger`/`NextTrigger` set the native `disabled` attribute *and* `data-disabled` at the start/end of scroll range, so you can target either `:disabled` or `[data-disabled]` in your own CSS.
- `Carousel.Root` is `position: relative` internally, so absolutely-positioned children (e.g. arrows straddling the edge of the container) work out of the box.

`playground/App.tsx` is a complete worked example — it styles the arrows (bled over the container edge, colors, hover, disabled state) and the mobile peek entirely via `className`, using PandaCSS, with zero changes to the library itself. Any styling approach works the same way (CSS Modules, Tailwind, plain CSS, styled-components, etc.) since the library doesn't care.

### Parts & props

| Component | Props |
|---|---|
| `Carousel.Root` | `cardsToShow` (number, required) · `gap` (px, default `16`) · `breakpoint` (px, default `576`) · `mobilePeek` (px, default `32`) · `mobileInset` (px, default `16` — mobile only) · `centerItemOnClick` (boolean, default `false` — mobile only) · `className` · `style` |
| `Carousel.ItemGroup` | `aria-label` · `className` · `style` |
| `Carousel.Item` | `className` · `style` |
| `Carousel.Control` | Wrapper for the arrow buttons; renders `null` below `breakpoint`. `className` · `style` |
| `Carousel.PrevTrigger` / `Carousel.NextTrigger` | Any native `<button>` prop (`className`, `style`, `aria-label`, `onClick` is already wired, etc.) |
| `Carousel.IndicatorGroup` | Page dots. Renders one `Carousel.Indicator` per page automatically — pass `indicatorClassName` to style them. `className` · `style` · `aria-label`. For full control, pass a render function as `children`: it receives `{ pages, pageCount, activePage }`. |
| `Carousel.Indicator` | A single dot. `index` (required) · any native `<button>` prop. Clicking scrolls to that page. |

### Page indicators

Page count adapts to the layout: on desktop it's `ceil(items / cardsToShow)` (so 7 cards at 2-per-view gives 4 dots); on mobile it's one dot per card. The active dot tracks whatever moved the carousel — arrow clicks, indicator clicks, or a plain swipe.

The active indicator gets `data-active` and `aria-current`, which is all you need to style it:

```tsx
<Carousel.IndicatorGroup className={dotRow} indicatorClassName={dot} />
```

```css
.dot            { width: 8px; height: 8px; border-radius: 9999px; background: #d1d5db; }
.dot[data-active] { width: 24px; background: black; }   /* capsule */
```

## Local development

This repo also contains a `playground/` — a small Vite app (using PandaCSS) that consumes the library from source (`../src`) and demonstrates styling it. It's not part of the published package.

```bash
npm install
npm run dev              # playground dev server
npm run build             # library build → dist/ (what gets published)
npm run build:playground  # playground demo build
npm run typecheck
```

`npm install` runs `panda codegen` automatically (via `prepare`) to generate `styled-system/` for the playground — it's gitignored, so if `styled-system/*` imports ever go missing, re-run `npm run panda:codegen`.

## How it works

- **No drag library**: native `overflow-x: auto` + `scroll-snap-type: x mandatory` handle touch/trackpad gestures for free. Arrow clicks call `element.scrollBy({ left: viewportWidth, behavior: 'smooth' })` — the browser's own scroll clamping produces the "last card lands flush" behavior on uneven card counts.
- **No CSS-in-JS at runtime**: all styling is either a plain inline `style` object (the functional bits) or left to the consumer (`className`).
- **Responsive switch**: a `useSyncExternalStore`-backed `matchMedia` hook (`src/carousel/use-media-query.ts`) drives `isDesktop` through context — no CSS media query inside the library at all.
