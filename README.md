# carousel-react

A responsive, accessible carousel built with React, TypeScript, and [PandaCSS](https://panda-css.com/) — no drag/gesture library required. Sliding is powered entirely by native CSS scroll-snap, so touch/trackpad gestures work for free.

## Behavior

- **Desktop** (≥ the `xs` breakpoint, 576px): shows `cardsToShow` cards edge-to-edge, auto-sized to fill the container. Arrow buttons slide by exactly one container-width (i.e. `cardsToShow` cards) per click, and native scroll clamping means the last click on an uneven card count slides only as far as needed to land the final card flush against the right edge — no special-casing required.
- **Mobile** (below the `xs` breakpoint): shows 1 card, centered, with symmetric padding on the container so neighboring cards peek in from both edges. Swipe left/right to slide; arrow buttons are hidden.

## Quick start

```bash
npm install
npm run dev
```

`npm install` runs `panda codegen` automatically (via the `prepare` script) to generate `styled-system/` — it's gitignored, so if imports from `styled-system/*` ever go missing, re-run `npm run panda:codegen`.

## Usage

The carousel is a compound component — `Carousel.Root` provides shared state via context, and the rest are composable parts:

```tsx
import { Carousel } from './shared/ui/carousel'

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
    </Carousel.Root>
  )
}
```

### Parts

| Component | Description |
|---|---|
| `Carousel.Root` | Provides context. Props: `cardsToShow` (number, required — desktop cards-per-view and per-click step) and `gap` (number, px, default `16`). |
| `Carousel.ItemGroup` | The scrollable container. Accepts an `aria-label`. |
| `Carousel.Item` | Wraps a single slide. Sizing is handled automatically based on `cardsToShow`/breakpoint — put any content inside. |
| `Carousel.Control` | Wrapper for the arrow buttons; hidden on mobile. On desktop it drops out of layout (`display: contents`) so the triggers can position themselves against `Carousel.Root`, straddling its edges. |
| `Carousel.PrevTrigger` / `Carousel.NextTrigger` | Arrow buttons. Auto-disable at the start/end of the scroll range; accept any native `<button>` prop, including `aria-label` overrides. |

### Card content

`src/shared/ui/card/Card.tsx` is a presentational component (unrelated to the carousel's own logic — `Carousel.Item` accepts any children) with a title, description, and centered bottom image, used by the demo in `src/App.tsx`:

```tsx
<Card
  title="Whiskers"
  description="A curious tabby who supervises every keystroke from the edge of the desk."
  imageSrc="https://loremflickr.com/300/300/cat?lock=1"
  accentColor="hsl(266 90% 62%)"
/>
```

- `title`: clamped to 2 lines.
- `description`: clamped to 5 lines.
- `imageSrc` / `imageAlt`: rendered as a 96px circle, centered at the bottom of the card.
- `accentColor`: optional background color.

## Customizing breakpoints

The desktop/mobile switch is a single custom breakpoint (`xs`, currently `576px`) defined in `panda.config.ts` under `theme.extend.breakpoints`, and referenced as `xs:` throughout `src/shared/ui/carousel/*` and `src/App.tsx`. Change the value there and re-run `npm run panda:codegen`.

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [PandaCSS](https://panda-css.com/) for styling, integrated via PostCSS (`postcss.config.cjs`) with `jsxFramework: 'react'` and `preflight: true`
- No carousel/drag library — native CSS scroll-snap + `Element.scrollBy()`
