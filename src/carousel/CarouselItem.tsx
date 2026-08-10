import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export function CarouselItem({ children, className, style, onClick }: CarouselItemProps) {
  const { isDesktop, centred, mobileCardsToShow, centerItemOnClick, activePage, scrollToPage } =
    useCarouselContext('Item')
  const itemRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    // Opt-in, and mobile-only.
    if (!centerItemOnClick || isDesktop) return

    const element = itemRef.current
    const group = element?.parentElement
    if (!element || !group) return

    const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-carousel-item]'))
    const index = items.indexOf(element)
    if (index < 0) return

    // Cards are grouped into pages, so the item's position among its siblings
    // only equals its page index when there is one card per page.
    const page = Math.floor(index / Math.max(1, mobileCardsToShow))
    if (page !== activePage) scrollToPage(page)
  }

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
      ref={itemRef}
      className={className}
      style={itemStyle}
      onClick={handleClick}
      role="group"
      aria-roledescription="slide"
      data-carousel-item=""
    >
      {children}
    </div>
  )
}
