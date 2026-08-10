import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode
}

export function CarouselItem({ children, style, ...props }: CarouselItemProps) {
  const { isDesktop, centred } = useCarouselContext('Item')

  // Desktop: evenly divide the viewport across `cardsToShow` cards, minus the
  // gaps between them, so cards fill the container edge-to-edge.
  // Single-card mobile: leave `mobilePeek` free on *both* sides, since the page
  // is centred and shows a neighbour either way. Clamping to [0, maxScroll]
  // then settles the first and last cards against the container's edges.
  // Multi-card mobile: pages align to the start edge, so only the trailing side
  // needs room for the next card to peek through.
  let width =
    'calc((100% - (var(--carousel-cards-to-show) - 1) * var(--carousel-gap)) / var(--carousel-cards-to-show))'
  if (!isDesktop) {
    width = centred
      ? 'calc(100% - 2 * var(--carousel-mobile-peek))'
      : 'calc((100% - var(--carousel-mobile-peek) - (var(--carousel-mobile-cards-to-show) - 1) * var(--carousel-gap)) / var(--carousel-mobile-cards-to-show))'
  }

  const itemStyle: CSSProperties = {
    flex: '0 0 auto',
    width,
    scrollSnapAlign: centred ? 'center' : 'start',
    ...style,
  }

  return (
    <div
      style={itemStyle}
      role="group"
      aria-roledescription="slide"
      data-carousel-item=""
      {...props}
    >
      {children}
    </div>
  )
}
