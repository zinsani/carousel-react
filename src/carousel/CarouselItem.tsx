import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export function CarouselItem({ children, className, style, onClick }: CarouselItemProps) {
  const { isDesktop, centerItemOnClick, activePage, scrollToPage } = useCarouselContext('Item')
  const itemRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    // Opt-in, and mobile-only: one item per page there, so the item's position
    // among its siblings is also its page index.
    if (!centerItemOnClick || isDesktop) return

    const element = itemRef.current
    const group = element?.parentElement
    if (!element || !group) return

    const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-carousel-item]'))
    const index = items.indexOf(element)
    if (index >= 0 && index !== activePage) scrollToPage(index)
  }

  const itemStyle: CSSProperties = {
    flex: '0 0 auto',
    // Desktop: evenly divide the viewport across `cardsToShow` cards, minus the
    // gaps between them, so cards fill the container edge-to-edge.
    // Mobile: leave `mobilePeek` free on both sides so neighbouring cards peek
    // through. Snapping stays centred, but the browser clamps scrolling to
    // [0, maxScroll], so the first card settles flush left and the last flush
    // right while everything between is centred.
    width: isDesktop
      ? 'calc((100% - (var(--carousel-cards-to-show) - 1) * var(--carousel-gap)) / var(--carousel-cards-to-show))'
      : 'calc(100% - 2 * var(--carousel-mobile-peek))',
    scrollSnapAlign: isDesktop ? 'start' : 'center',
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
